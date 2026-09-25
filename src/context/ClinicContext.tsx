import React, { createContext, useContext, useState } from 'react';
import { Clinic, DaySchedule, DoctorProfile, TimeSlot } from '../types/clinic';
import { initialClinics, initialDoctorProfile } from '../data/clinicData';

interface ClinicContextType {
  clinics: Clinic[];
  selectedClinicId: string;
  selectedClinic: Clinic;
  selectedDate: string;
  currentSchedule: DaySchedule;
  doctor: DoctorProfile;
  selectClinic: (clinicId: string) => void;
  selectDate: (dateStr: string) => void;
  bookSlot: (slotId: string, patientName: string, patientPhone?: string, patientProblem?: string) => void;
  callNextPatient: () => string | null;
  cancelAppointment: (slotId: string) => void;
  completeAppointment: (slotId: string) => void;
  updateDoctorProfile: (updates: Partial<DoctorProfile>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
  const [selectedClinicId, setSelectedClinicId] = useState<string>('city-care');
  const [selectedDate, setSelectedDate] = useState<string>('2024-09-25');
  const [doctor, setDoctor] = useState<DoctorProfile>(initialDoctorProfile);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const currentSchedule = selectedClinic.schedules[selectedDate] || selectedClinic.schedules['2024-09-25'];

  const selectClinic = (clinicId: string) => {
    setSelectedClinicId(clinicId);
  };

  const selectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const bookSlot = (slotId: string, patientName: string, patientPhone?: string, patientProblem?: string) => {
    setClinics((prev) =>
      prev.map((clinic) => {
        if (clinic.id !== selectedClinicId) return clinic;
        const currentSched = clinic.schedules[selectedDate];
        if (!currentSched) return clinic;

        const updateSlots = (slots: TimeSlot[]) =>
          slots.map((s) => {
            if (s.id === slotId) {
              return {
                ...s,
                status: 'booked' as const,
                patientName,
                patientPhone: patientPhone || '+91 98000 11223',
                patientProblem: patientProblem || 'Walk-in Consultation',
                tokenNumber: (currentSched.morningSlots.filter(x => x.status === 'booked').length + currentSched.eveningSlots.filter(x => x.status === 'booked').length) + 1,
              };
            }
            return s;
          });

        return {
          ...clinic,
          schedules: {
            ...clinic.schedules,
            [selectedDate]: {
              ...currentSched,
              morningSlots: updateSlots(currentSched.morningSlots),
              eveningSlots: updateSlots(currentSched.eveningSlots),
              walkInsWaiting: Math.max(0, currentSched.walkInsWaiting - 1),
            },
          },
        };
      })
    );
    showToast(`Appointment booked for ${patientName}!`);
  };

  const cancelAppointment = (slotId: string) => {
    setClinics((prev) =>
      prev.map((clinic) => {
        if (clinic.id !== selectedClinicId) return clinic;
        const currentSched = clinic.schedules[selectedDate];
        if (!currentSched) return clinic;

        const revertSlots = (slots: TimeSlot[]) =>
          slots.map((s) => {
            if (s.id === slotId) {
              return {
                ...s,
                status: 'available' as const,
                patientName: undefined,
                patientPhone: undefined,
                patientProblem: undefined,
                tokenNumber: undefined,
              };
            }
            return s;
          });

        return {
          ...clinic,
          schedules: {
            ...clinic.schedules,
            [selectedDate]: {
              ...currentSched,
              morningSlots: revertSlots(currentSched.morningSlots),
              eveningSlots: revertSlots(currentSched.eveningSlots),
            },
          },
        };
      })
    );
    showToast('Appointment cancelled and slot opened.');
  };

  const completeAppointment = (slotId: string) => {
    setClinics((prev) =>
      prev.map((clinic) => {
        if (clinic.id !== selectedClinicId) return clinic;
        const currentSched = clinic.schedules[selectedDate];
        if (!currentSched) return clinic;

        const markComplete = (slots: TimeSlot[]) =>
          slots.map((s) => {
            if (s.id === slotId) {
              return { ...s, status: 'completed' as const };
            }
            return s;
          });

        return {
          ...clinic,
          schedules: {
            ...clinic.schedules,
            [selectedDate]: {
              ...currentSched,
              morningSlots: markComplete(currentSched.morningSlots),
              eveningSlots: markComplete(currentSched.eveningSlots),
            },
          },
        };
      })
    );
    showToast('Consultation marked as completed.');
  };

  const callNextPatient = (): string | null => {
    const currentSched = selectedClinic.schedules[selectedDate];
    if (!currentSched || currentSched.walkInsWaiting <= 0) {
      showToast('No more walk-ins waiting in queue.');
      return null;
    }

    setClinics((prev) =>
      prev.map((clinic) => {
        if (clinic.id !== selectedClinicId) return clinic;
        const sched = clinic.schedules[selectedDate];
        if (!sched) return clinic;
        return {
          ...clinic,
          schedules: {
            ...clinic.schedules,
            [selectedDate]: {
              ...sched,
              walkInsWaiting: Math.max(0, sched.walkInsWaiting - 1),
            },
          },
        };
      })
    );

    const callMsg = 'Token #W-02 (Walk-in) called into Consultation Room 1';
    showToast(callMsg);
    return callMsg;
  };

  const updateDoctorProfile = (updates: Partial<DoctorProfile>) => {
    setDoctor((prev) => ({ ...prev, ...updates }));
    showToast('Doctor profile updated successfully');
  };

  return (
    <ClinicContext.Provider
      value={{
        clinics,
        selectedClinicId,
        selectedClinic,
        selectedDate,
        currentSchedule,
        doctor,
        selectClinic,
        selectDate,
        bookSlot,
        callNextPatient,
        cancelAppointment,
        completeAppointment,
        updateDoctorProfile,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
