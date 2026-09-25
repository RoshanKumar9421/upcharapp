export type SlotStatus = 'available' | 'booked' | 'completed' | 'cancelled';

export interface TimeSlot {
  id: string;
  time: string; // e.g. "09:00 AM"
  status: SlotStatus;
  patientName?: string;
  patientPhone?: string;
  patientProblem?: string;
  tokenNumber?: number;
  type: 'morning' | 'evening';
}

export interface DaySchedule {
  date: string; // e.g. "2024-09-25"
  dayName: string; // e.g. "FRI"
  dayNumber: number; // e.g. 25
  label?: string; // "Today" | "Tomorrow"
  fullDateStr: string; // "Friday, 25 Sep 2024"
  monthYear: string; // "September 2024"
  morningSlots: TimeSlot[];
  eveningSlots: TimeSlot[];
  walkInsWaiting: number;
  nextExpectedPatientTime?: string;
}

export interface Clinic {
  id: string;
  name: string;
  shortName: string;
  location: string;
  fullLocation: string;
  isActive: boolean;
  activeStatusText: string;
  role: string; // "General Physician"
  scheduleDays: string; // "Mon • Wed • Fri"
  detailedTiming: string; // "Mon, Wed, Fri • 09:00 AM - 12:00 PM, 05:00 PM - 08:00 PM"
  nextSlotText: string; // "Today, 5:30 PM"
  nextSlotLabel: string; // "NEXT CONSULTATION SLOT" or "Next Available Slot"
  isPrimary?: boolean;
  iconType: 'plus' | 'briefcase' | 'shield' | 'hospital' | 'bandage';
  schedules: Record<string, DaySchedule>;
}

export interface DoctorProfile {
  name: string;
  title: string;
  specialty: string;
  association: string;
  avatar: string;
  isVerified: boolean;
  totalClinicsActive: number;
}
