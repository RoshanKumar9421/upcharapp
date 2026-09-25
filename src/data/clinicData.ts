import { Clinic, DaySchedule, DoctorProfile, TimeSlot } from '../types/clinic';

export const initialDoctorProfile: DoctorProfile = {
  name: 'Dr. Ayesha Rahman',
  title: 'Verified MD',
  specialty: 'General Physician',
  association: 'Associated as Lead General Physician',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  isVerified: true,
  totalClinicsActive: 5,
};

const createDaySlots = (dateStr: string, isDefaultCityCareDay: boolean): { morningSlots: TimeSlot[]; eveningSlots: TimeSlot[] } => {
  if (isDefaultCityCareDay) {
    return {
      morningSlots: [
        { id: `${dateStr}-m1`, time: '09:00 AM', status: 'available', type: 'morning' },
        { id: `${dateStr}-m2`, time: '09:30 AM', status: 'booked', patientName: 'S. Dutta', patientPhone: '+91 98301 23456', patientProblem: 'Hypertension Follow-up', tokenNumber: 1, type: 'morning' },
        { id: `${dateStr}-m3`, time: '10:00 AM', status: 'available', type: 'morning' },
        { id: `${dateStr}-m4`, time: '10:30 AM', status: 'available', type: 'morning' },
        { id: `${dateStr}-m5`, time: '11:00 AM', status: 'booked', patientName: 'R. Ghosh', patientPhone: '+91 98312 98765', patientProblem: 'Viral Fever & Cough', tokenNumber: 2, type: 'morning' },
        { id: `${dateStr}-m6`, time: '11:30 AM', status: 'available', type: 'morning' },
      ],
      eveningSlots: [
        { id: `${dateStr}-e1`, time: '05:00 PM', status: 'available', type: 'evening' },
        { id: `${dateStr}-e2`, time: '05:30 PM', status: 'booked', patientName: 'M. Roy', patientPhone: '+91 98322 45678', patientProblem: 'Type 2 Diabetes Review', tokenNumber: 3, type: 'evening' },
        { id: `${dateStr}-e3`, time: '06:00 PM', status: 'available', type: 'evening' },
        { id: `${dateStr}-e4`, time: '06:30 PM', status: 'available', type: 'evening' },
        { id: `${dateStr}-e5`, time: '07:00 PM', status: 'booked', patientName: 'P. Mukherjee', patientPhone: '+91 98333 11223', patientProblem: 'Chronic Migraine & Fatigue', tokenNumber: 4, type: 'evening' },
        { id: `${dateStr}-e6`, time: '07:30 PM', status: 'available', type: 'evening' },
      ],
    };
  }

  // Dynamic slots for other days
  return {
    morningSlots: [
      { id: `${dateStr}-m1`, time: '09:00 AM', status: 'available', type: 'morning' },
      { id: `${dateStr}-m2`, time: '09:30 AM', status: 'available', type: 'morning' },
      { id: `${dateStr}-m3`, time: '10:00 AM', status: 'booked', patientName: 'A. Sen', patientPhone: '+91 98765 43210', patientProblem: 'General Checkup', tokenNumber: 1, type: 'morning' },
      { id: `${dateStr}-m4`, time: '10:30 AM', status: 'available', type: 'morning' },
      { id: `${dateStr}-m5`, time: '11:00 AM', status: 'available', type: 'morning' },
      { id: `${dateStr}-m6`, time: '11:30 AM', status: 'booked', patientName: 'K. Banerjee', patientPhone: '+91 91234 56789', patientProblem: 'Chest Pain Screening', tokenNumber: 2, type: 'morning' },
    ],
    eveningSlots: [
      { id: `${dateStr}-e1`, time: '05:00 PM', status: 'available', type: 'evening' },
      { id: `${dateStr}-e2`, time: '05:30 AM', status: 'available', type: 'evening' },
      { id: `${dateStr}-e3`, time: '06:00 PM', status: 'booked', patientName: 'D. Chatterjee', patientPhone: '+91 94321 87654', patientProblem: 'Blood Pressure Check', tokenNumber: 3, type: 'evening' },
      { id: `${dateStr}-e4`, time: '06:30 PM', status: 'available', type: 'evening' },
      { id: `${dateStr}-e5`, time: '07:00 PM', status: 'available', type: 'evening' },
      { id: `${dateStr}-e6`, time: '07:30 PM', status: 'available', type: 'evening' },
    ],
  };
};

export const sampleDates: { date: string; dayName: string; dayNumber: number; label?: string; fullDateStr: string; monthYear: string }[] = [
  { date: '2024-09-25', dayName: 'FRI', dayNumber: 25, label: 'Today', fullDateStr: 'Friday, 25 Sep 2024', monthYear: 'September 2024' },
  { date: '2024-09-26', dayName: 'SAT', dayNumber: 26, label: 'Tomorrow', fullDateStr: 'Saturday, 26 Sep 2024', monthYear: 'September 2024' },
  { date: '2024-09-27', dayName: 'SUN', dayNumber: 27, fullDateStr: 'Sunday, 27 Sep 2024', monthYear: 'September 2024' },
  { date: '2024-09-28', dayName: 'MON', dayNumber: 28, fullDateStr: 'Monday, 28 Sep 2024', monthYear: 'September 2024' },
  { date: '2024-09-29', dayName: 'TUE', dayNumber: 29, fullDateStr: 'Tuesday, 29 Sep 2024', monthYear: 'September 2024' },
  { date: '2024-09-30', dayName: 'WED', dayNumber: 30, fullDateStr: 'Wednesday, 30 Sep 2024', monthYear: 'September 2024' },
];

const buildClinicSchedules = (isCityCare: boolean): Record<string, DaySchedule> => {
  const schedules: Record<string, DaySchedule> = {};
  sampleDates.forEach((d) => {
    const isToday = d.date === '2024-09-25';
    const slots = createDaySlots(d.date, isCityCare && isToday);
    schedules[d.date] = {
      date: d.date,
      dayName: d.dayName,
      dayNumber: d.dayNumber,
      label: d.label,
      fullDateStr: d.fullDateStr,
      monthYear: d.monthYear,
      morningSlots: slots.morningSlots,
      eveningSlots: slots.eveningSlots,
      walkInsWaiting: isToday ? 2 : 0,
      nextExpectedPatientTime: isToday ? '09:30 AM' : '10:00 AM',
    };
  });
  return schedules;
};

export const initialClinics: Clinic[] = [
  {
    id: 'city-care',
    name: 'City Care Clinic',
    shortName: 'City Care',
    location: 'Asansol, West Bengal',
    fullLocation: 'Asansol, West Bengal',
    isActive: true,
    activeStatusText: 'Active',
    role: 'General Physician',
    scheduleDays: 'Mon • Wed • Fri',
    detailedTiming: 'Mon, Wed, Fri • 09:00 AM - 12:00 PM, 05:00 PM - 08:00 PM',
    nextSlotText: 'Today, 5:30 PM',
    nextSlotLabel: 'NEXT CONSULTATION SLOT',
    isPrimary: true,
    iconType: 'plus',
    schedules: buildClinicSchedules(true),
  },
  {
    id: 'healthpoint',
    name: 'HealthPoint Clinic',
    shortName: 'HealthPoint (Durgapur)',
    location: 'Durgapur, West Bengal',
    fullLocation: 'City Centre, Durgapur, West Bengal',
    isActive: true,
    activeStatusText: 'Active',
    role: 'General Physician',
    scheduleDays: 'Tue • Thu • Sat',
    detailedTiming: 'Tue, Thu, Sat • 10:00 AM - 01:00 PM, 04:00 PM - 07:00 PM',
    nextSlotText: 'Tomorrow, 10:00 AM',
    nextSlotLabel: 'Next Available Slot',
    iconType: 'briefcase',
    schedules: buildClinicSchedules(false),
  },
  {
    id: 'medicare',
    name: 'Medicare Centre',
    shortName: 'Medicare Centre',
    location: 'Burnpur, West Bengal',
    fullLocation: 'Station Road, Burnpur, West Bengal',
    isActive: true,
    activeStatusText: 'Active',
    role: 'General Physician',
    scheduleDays: 'Monday • Thursday',
    detailedTiming: 'Mon, Thu • 04:00 PM - 08:00 PM',
    nextSlotText: 'Monday, 4:00 PM',
    nextSlotLabel: 'Next Available Slot',
    iconType: 'shield',
    schedules: buildClinicSchedules(false),
  },
  {
    id: 'apollo',
    name: 'Apollo Clinic Hub',
    shortName: 'Apollo Clinic',
    location: 'Raniganj, West Bengal',
    fullLocation: 'GT Road, Raniganj, West Bengal',
    isActive: true,
    activeStatusText: 'Active',
    role: 'General Physician',
    scheduleDays: 'Wednesday',
    detailedTiming: 'Wed • 02:00 PM - 06:00 PM',
    nextSlotText: 'Wednesday, 02:00 PM',
    nextSlotLabel: 'Next Available Slot',
    iconType: 'hospital',
    schedules: buildClinicSchedules(false),
  },
  {
    id: 'suraksha',
    name: 'Suraksha Care Point',
    shortName: 'Suraksha Care',
    location: 'Asansol Station Rd',
    fullLocation: 'Station Road Complex, Asansol',
    isActive: true,
    activeStatusText: 'Active',
    role: 'General Physician',
    scheduleDays: 'Sunday',
    detailedTiming: 'Sun • 11:00 AM - 03:00 PM',
    nextSlotText: 'Sunday, 11:00 AM',
    nextSlotLabel: 'Next Available Slot',
    iconType: 'bandage',
    schedules: buildClinicSchedules(false),
  },
];
