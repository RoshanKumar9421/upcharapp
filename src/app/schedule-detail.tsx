import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useClinic } from '../context/ClinicContext';
import { sampleDates } from '../data/clinicData';
import { TimeSlot as TimeSlotType } from '../types/clinic';
import { AppHeader } from '../components/common/AppHeader';
import { AppButton } from '../components/common/AppButton';
import { DoctorCard } from '../components/doctor/DoctorCard';
import { ClinicStats } from '../components/clinic/ClinicStats';
import { QueueStatus } from '../components/queue/QueueStatus';
import { WaitingPatients } from '../components/queue/WaitingPatients';
import { TimeSlot } from '../components/appointment/TimeSlot';
import { AddAppointmentModal } from '../components/appointment/AddAppointmentModal';
import { PatientDetailModal } from '../components/queue/PatientDetailModal';

export default function ClinicScheduleDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    clinics,
    selectedClinicId,
    selectedClinic,
    selectedDate,
    currentSchedule,
    doctor,
    selectClinic,
    selectDate,
    callNextPatient,
    toastMessage,
    showToast,
  } = useClinic();

  React.useEffect(() => {
    if (params.clinicId && typeof params.clinicId === 'string' && params.clinicId !== selectedClinicId) {
      selectClinic(params.clinicId);
    }
  }, [params.clinicId]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<string | undefined>(undefined);
  const [inspectedSlot, setInspectedSlot] = useState<TimeSlotType | null>(null);

  const allSlots = [...currentSchedule.morningSlots, ...currentSchedule.eveningSlots];
  const openSlotsCount = allSlots.filter((s) => s.status === 'available').length;
  const totalSlotsCount = allSlots.length;
  const freeCapacityPercent = totalSlotsCount > 0 ? Math.round((openSlotsCount / totalSlotsCount) * 100) : 0;

  const morningOpenCount = currentSchedule.morningSlots.filter((s) => s.status === 'available').length;
  const eveningOpenCount = currentSchedule.eveningSlots.filter((s) => s.status === 'available').length;

  const handleSlotPress = (slot: TimeSlotType) => {
    if (slot.status === 'available') {
      setSelectedSlotForBooking(slot.id);
      setIsAddModalOpen(true);
    } else {
      setInspectedSlot(slot);
    }
  };

  const handleCallNext = () => {
    const res = callNextPatient();
    if (res) {
      Alert.alert('Patient Called', res);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Top Navigation Bar */}
      <AppHeader
        title="Clinic Schedule Detail"
        onBack={() => router.back()}
        icon={
          <MaterialCommunityIcons
            name="stethoscope"
            size={20}
            color="#007AFF"
            style={{ marginRight: 6 }}
          />
        }
        rightActions={
          <>
            <TouchableOpacity
              style={styles.navIconBtn}
              onPress={() => showToast('Clinic Schedule Options')}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#64748B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => showToast(`Logged in as ${doctor.name}`)}
            >
              <Ionicons name="person" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        }
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* DOCTOR INFO & ATTACHED CLINICS CARD */}
        <DoctorCard
          doctor={doctor}
          clinics={clinics}
          selectedClinicId={selectedClinicId}
          selectedClinic={selectedClinic}
          onSelectClinic={selectClinic}
          onEditPress={() => showToast('Edit Doctor Profile')}
          onSwitchClinicPress={() => showToast('Switch Attached Clinic')}
        />

        {/* SELECT DATE SECTION */}
        <View style={styles.dateSection}>
          <View style={styles.dateSectionHeader}>
            <Text style={styles.dateSectionLabel}>SELECT DATE</Text>
            <TouchableOpacity onPress={() => showToast('Calendar View')}>
              <Text style={styles.monthYearLink}>{currentSchedule.monthYear}</Text>
            </TouchableOpacity>
          </View>

          {/* Date Horizontal Carousel */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateChipsScroll}>
            {sampleDates.map((d) => {
              const isSelected = d.date === selectedDate;
              return (
                <TouchableOpacity
                  key={d.date}
                  onPress={() => selectDate(d.date)}
                  style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                >
                  {d.label && (
                    <Text style={[styles.dateLabel, isSelected && styles.dateLabelSelected]}>
                      {d.label}
                    </Text>
                  )}
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberSelected]}>
                    {d.dayNumber}
                  </Text>
                  <Text style={[styles.dateDay, isSelected && styles.dateDaySelected]}>
                    {d.dayName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* TODAY'S SCHEDULE BANNER */}
        <View style={styles.scheduleBannerCard}>
          <View style={styles.scheduleBannerLeft}>
            <View style={styles.scheduleIconCircle}>
              <Ionicons name="calendar" size={20} color="#007AFF" />
            </View>
            <View>
              <Text style={styles.scheduleBannerTitle}>
                {selectedDate === '2024-09-25' ? "Today's Schedule" : "Day's Schedule"}
              </Text>
              <Text style={styles.scheduleBannerSubtitle}>{currentSchedule.fullDateStr}</Text>
            </View>
          </View>

          <ClinicStats
            openSlots={openSlotsCount}
            totalSlots={totalSlotsCount}
            capacityPercent={freeCapacityPercent}
          />
        </View>

        {/* QUEUE STATUS CARD */}
        <QueueStatus
          openSlots={openSlotsCount}
          totalSlots={totalSlotsCount}
          nextExpectedPatientTime={currentSchedule.nextExpectedPatientTime}
        />

        {/* MORNING OPD SECTION */}
        <View style={styles.opdSection}>
          <View style={styles.opdHeaderRow}>
            <View style={styles.opdTitleGroup}>
              <View style={styles.morningIconCircle}>
                <Ionicons name="sunny" size={18} color="#0284C7" />
              </View>
              <View>
                <View style={styles.opdNameWithDot}>
                  <Text style={styles.opdTitle}>Morning OPD</Text>
                  <View style={styles.blueDot} />
                </View>
                <Text style={styles.opdDuration}>09:00 AM — 12:00 PM • 30 min duration</Text>
              </View>
            </View>

            <View style={styles.openCountPill}>
              <Text style={styles.openCountText}>{morningOpenCount} Open</Text>
            </View>
          </View>

          {/* Morning Slots 2-Col Grid */}
          <View style={styles.slotsGrid}>
            {currentSchedule.morningSlots.map((slot) => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                onPress={() => handleSlotPress(slot)}
              />
            ))}
          </View>
        </View>

        {/* EVENING OPD SECTION */}
        <View style={styles.opdSection}>
          <View style={styles.opdHeaderRow}>
            <View style={styles.opdTitleGroup}>
              <View style={styles.eveningIconCircle}>
                <Ionicons name="moon" size={17} color="#4F46E5" />
              </View>
              <View>
                <View style={styles.opdNameWithDot}>
                  <Text style={styles.opdTitle}>Evening OPD</Text>
                  <View style={styles.blueDot} />
                </View>
                <Text style={styles.opdDuration}>05:00 PM — 08:00 PM • 30 min duration</Text>
              </View>
            </View>

            <View style={styles.openCountPill}>
              <Text style={styles.openCountText}>{eveningOpenCount} Open</Text>
            </View>
          </View>

          {/* Evening Slots 2-Col Grid */}
          <View style={styles.slotsGrid}>
            {currentSchedule.eveningSlots.map((slot) => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                onPress={() => handleSlotPress(slot)}
              />
            ))}
          </View>
        </View>

        {/* LIVE WALK-IN QUEUE CARD */}
        <WaitingPatients
          count={currentSchedule.walkInsWaiting}
          onCallNext={handleCallNext}
        />

        {/* SLOT LEGEND */}
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>SLOT LEGEND</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} />
              <Text style={styles.legendLabel}>Available</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#64748B' }]} />
              <Text style={styles.legendLabel}>Booked</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#CBD5E1' }]} />
              <Text style={styles.legendLabel}>Complete</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendLabel}>Cancelled</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM PRIMARY BUTTON */}
        <AppButton
          title="Add Walk-in Appointment"
          icon={<Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />}
          onPress={() => {
            setSelectedSlotForBooking(undefined);
            setIsAddModalOpen(true);
          }}
          style={styles.addAppointmentBtn}
        />
      </ScrollView>

      {/* Add Walk-in Modal */}
      <AddAppointmentModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        preSelectedSlotId={selectedSlotForBooking}
      />

      {/* Booked Slot Inspection Modal */}
      <PatientDetailModal
        visible={inspectedSlot !== null}
        onClose={() => setInspectedSlot(null)}
        slot={inspectedSlot}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    right: 20,
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  navIconBtn: {
    padding: 6,
  },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  dateSection: {
    marginBottom: 16,
  },
  dateSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  monthYearLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007AFF',
  },
  dateChipsScroll: {
    flexDirection: 'row',
  },
  dateCard: {
    width: 64,
    height: 76,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 6,
  },
  dateCardSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  dateLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 2,
  },
  dateLabelSelected: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  dateNumberSelected: {
    color: '#FFFFFF',
  },
  dateDay: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  dateDaySelected: {
    color: '#FFFFFF',
  },
  scheduleBannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  scheduleBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  scheduleBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  scheduleBannerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  opdSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  opdHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  opdTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  morningIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  eveningIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  opdNameWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  opdTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginLeft: 6,
  },
  opdDuration: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  openCountPill: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F766E',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  legendContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  legendTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 5,
  },
  legendLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  addAppointmentBtn: {
    marginTop: 4,
  },
});
