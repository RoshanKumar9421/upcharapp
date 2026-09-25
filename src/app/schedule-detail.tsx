import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import { useClinic } from '../context/ClinicContext';
import { sampleDates } from '../data/clinicData';
import { TimeSlot } from '../types/clinic';
import { CircularProgress } from '../components/CircularProgress';
import { AddAppointmentModal } from '../components/AddAppointmentModal';
import { PatientDetailModal } from '../components/PatientDetailModal';

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

  // If a clinicId param was passed in URL, sync it if needed
  React.useEffect(() => {
    if (params.clinicId && typeof params.clinicId === 'string' && params.clinicId !== selectedClinicId) {
      selectClinic(params.clinicId);
    }
  }, [params.clinicId]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<string | undefined>(undefined);
  const [inspectedSlot, setInspectedSlot] = useState<TimeSlot | null>(null);

  // Compute dynamic capacity
  const allSlots = [...currentSchedule.morningSlots, ...currentSchedule.eveningSlots];
  const openSlotsCount = allSlots.filter((s) => s.status === 'available').length;
  const totalSlotsCount = allSlots.length;
  const bookedSlotsCount = allSlots.filter((s) => s.status === 'booked').length;
  const freeCapacityPercent = totalSlotsCount > 0 ? Math.round((openSlotsCount / totalSlotsCount) * 100) : 0;

  const morningOpenCount = currentSchedule.morningSlots.filter((s) => s.status === 'available').length;
  const eveningOpenCount = currentSchedule.eveningSlots.filter((s) => s.status === 'available').length;

  const handleSlotPress = (slot: TimeSlot) => {
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
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.navBackBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#1E293B" />
        </TouchableOpacity>

        <View style={styles.navTitleContainer}>
          <MaterialCommunityIcons name="stethoscope" size={20} color="#007AFF" style={{ marginRight: 6 }} />
          <Text style={styles.navTitle}>Clinic Schedule Detail</Text>
        </View>

        <View style={styles.navRightActions}>
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
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* DOCTOR INFO CARD */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorHeaderRow}>
            <Image
              source={require('../../assets/images/doctor_ayesha.jpg')}
              style={styles.doctorAvatar}
            />

            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <View style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>{doctor.specialty}</Text>
              </View>
              <Text style={styles.doctorAssociation} numberOfLines={1}>
                {doctor.association}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => showToast('Edit Doctor Profile')}
              style={styles.editBtn}
            >
              <Feather name="edit" size={14} color="#007AFF" style={{ marginRight: 4 }} />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Attached Clinics Section */}
          <View style={styles.attachedClinicsHeader}>
            <View style={styles.attachedClinicsLabelRow}>
              <MaterialCommunityIcons name="hospital-building" size={16} color="#007AFF" style={{ marginRight: 6 }} />
              <Text style={styles.attachedClinicsTitle}>
                ATTACHED CLINICS ({clinics.length})
              </Text>
            </View>
            <TouchableOpacity onPress={() => showToast('Select Clinic')}>
              <Text style={styles.switchClinicLink}>Switch Clinic</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Clinic Selector Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.clinicChipsRow}>
            {clinics.map((clinic) => {
              const isSelected = clinic.id === selectedClinicId;
              return (
                <TouchableOpacity
                  key={clinic.id}
                  onPress={() => selectClinic(clinic.id)}
                  style={[styles.clinicChip, isSelected && styles.clinicChipSelected]}
                >
                  {isSelected && <View style={styles.chipActiveDot} />}
                  <Text style={[styles.clinicChipText, isSelected && styles.clinicChipTextSelected]}>
                    {clinic.shortName}
                  </Text>
                  {isSelected && (
                    <View style={styles.activeNowPill}>
                      <Text style={styles.activeNowText}>Active Now</Text>
                    </View>
                  )}
                  {!isSelected && (
                    <MaterialCommunityIcons
                      name="hospital-box"
                      size={14}
                      color="#64748B"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Selected Clinic Sub-Card */}
          <View style={styles.selectedClinicSubCard}>
            <View style={styles.subCardTopRow}>
              <View style={styles.subCardTitleGroup}>
                <View style={styles.subCardIconBox}>
                  <MaterialCommunityIcons name="hospital-box" size={18} color="#007AFF" />
                </View>
                <Text style={styles.subCardClinicName}>{selectedClinic.name}</Text>
              </View>

              <View style={styles.activeClinicBadge}>
                <View style={styles.activeClinicDot} />
                <Text style={styles.activeClinicBadgeText}>Active Clinic</Text>
              </View>
            </View>

            <View style={styles.subCardLocationRow}>
              <Ionicons name="location-outline" size={14} color="#007AFF" style={{ marginRight: 4 }} />
              <Text style={styles.subCardLocationText}>{selectedClinic.location}</Text>
            </View>

            <View style={styles.subCardScheduleRow}>
              <Ionicons name="calendar-outline" size={14} color="#007AFF" style={{ marginRight: 4 }} />
              <Text style={styles.subCardScheduleText}>{selectedClinic.detailedTiming}</Text>
            </View>
          </View>
        </View>

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

          <View style={styles.capacityBadgeBox}>
            <View style={styles.capacityPill}>
              <Text style={styles.capacityPillText}>
                {openSlotsCount} of {totalSlotsCount} Slots Open
              </Text>
            </View>
            <Text style={styles.capacitySubtitle}>{freeCapacityPercent}% capacity free</Text>
          </View>
        </View>

        {/* QUEUE STATUS CARD */}
        <View style={styles.queueStatusCard}>
          <CircularProgress
            value={openSlotsCount}
            total={totalSlotsCount}
            size={50}
            strokeWidth={4.5}
            strokeColor="#007AFF"
            bgColor="#E2E8F0"
          />

          <View style={styles.queueInfoGroup}>
            <Text style={styles.queueReadyTitle}>Queue Ready</Text>
            <Text style={styles.queueSubtext}>
              Next patient expected at {currentSchedule.nextExpectedPatientTime || '09:30 AM'}
            </Text>
          </View>

          <View style={styles.autoSyncedBadge}>
            <Text style={styles.autoSyncedText}>Auto-{"\n"}synced</Text>
          </View>
        </View>

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
            {currentSchedule.morningSlots.map((slot) => {
              const isAvailable = slot.status === 'available';
              return (
                <TouchableOpacity
                  key={slot.id}
                  onPress={() => handleSlotPress(slot)}
                  activeOpacity={0.85}
                  style={[
                    styles.slotCard,
                    isAvailable ? styles.slotCardAvailable : styles.slotCardBooked,
                  ]}
                >
                  <View style={styles.slotHeader}>
                    <Text style={[styles.slotTime, isAvailable ? styles.slotTimeAvailable : styles.slotTimeBooked]}>
                      {slot.time}
                    </Text>
                    <View
                      style={[
                        styles.slotIndicatorDot,
                        isAvailable ? styles.dotAvailable : styles.dotBooked,
                      ]}
                    />
                  </View>

                  <View style={styles.slotFooter}>
                    {isAvailable ? (
                      <View style={styles.availableRow}>
                        <Text style={styles.availableLabel}>Available</Text>
                        <Ionicons name="add-circle-outline" size={16} color="#0D9488" />
                      </View>
                    ) : (
                      <View style={styles.bookedRow}>
                        <Text style={styles.bookedLabel}>Booked</Text>
                        <Text style={styles.bookedPatientName} numberOfLines={1}>
                          {slot.patientName}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
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
            {currentSchedule.eveningSlots.map((slot) => {
              const isAvailable = slot.status === 'available';
              return (
                <TouchableOpacity
                  key={slot.id}
                  onPress={() => handleSlotPress(slot)}
                  activeOpacity={0.85}
                  style={[
                    styles.slotCard,
                    isAvailable ? styles.slotCardAvailable : styles.slotCardBooked,
                  ]}
                >
                  <View style={styles.slotHeader}>
                    <Text style={[styles.slotTime, isAvailable ? styles.slotTimeAvailable : styles.slotTimeBooked]}>
                      {slot.time}
                    </Text>
                    <View
                      style={[
                        styles.slotIndicatorDot,
                        isAvailable ? styles.dotAvailable : styles.dotBooked,
                      ]}
                    />
                  </View>

                  <View style={styles.slotFooter}>
                    {isAvailable ? (
                      <View style={styles.availableRow}>
                        <Text style={styles.availableLabel}>Available</Text>
                        <Ionicons name="add-circle-outline" size={16} color="#0D9488" />
                      </View>
                    ) : (
                      <View style={styles.bookedRow}>
                        <Text style={styles.bookedLabel}>Booked</Text>
                        <Text style={styles.bookedPatientName} numberOfLines={1}>
                          {slot.patientName}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* LIVE WALK-IN QUEUE CARD */}
        <View style={styles.walkInCard}>
          <View style={styles.bellIconCircle}>
            <Ionicons name="notifications" size={18} color="#007AFF" />
          </View>

          <View style={styles.walkInInfoGroup}>
            <Text style={styles.walkInTitle}>Live Walk-in Queue</Text>
            <Text style={styles.walkInSubtitle}>
              {currentSchedule.walkInsWaiting} walk-ins waiting at clinic reception
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCallNext}
            style={[
              styles.callNextBtn,
              currentSchedule.walkInsWaiting <= 0 && styles.callNextBtnDisabled,
            ]}
          >
            <Text style={styles.callNextBtnText}>Call Next</Text>
          </TouchableOpacity>
        </View>

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
        <TouchableOpacity
          onPress={() => {
            setSelectedSlotForBooking(undefined);
            setIsAddModalOpen(true);
          }}
          activeOpacity={0.88}
          style={styles.addAppointmentBtn}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.addAppointmentBtnText}>Add Walk-in Appointment</Text>
        </TouchableOpacity>
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
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  navBackBtn: {
    padding: 6,
    borderRadius: 8,
  },
  navTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  navRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  doctorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  specialtyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0284C7',
  },
  doctorAssociation: {
    fontSize: 12,
    color: '#64748B',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  attachedClinicsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  attachedClinicsLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachedClinicsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
  },
  switchClinicLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  clinicChipsRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  clinicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  clinicChipSelected: {
    backgroundColor: '#007AFF',
  },
  chipActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
    marginRight: 6,
  },
  clinicChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  clinicChipTextSelected: {
    color: '#FFFFFF',
  },
  activeNowPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  activeNowText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  selectedClinicSubCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subCardTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subCardIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  subCardClinicName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  activeClinicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  activeClinicDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#0D9488',
    marginRight: 4,
  },
  activeClinicBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F766E',
  },
  subCardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  subCardLocationText: {
    fontSize: 12,
    color: '#64748B',
  },
  subCardScheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subCardScheduleText: {
    fontSize: 11,
    color: '#475569',
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
  capacityBadgeBox: {
    alignItems: 'flex-end',
  },
  capacityPill: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  capacityPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F766E',
  },
  capacitySubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 3,
  },
  queueStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  queueInfoGroup: {
    flex: 1,
    marginLeft: 12,
  },
  queueReadyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  queueSubtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  autoSyncedBadge: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoSyncedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4F46E5',
    textAlign: 'center',
    lineHeight: 12,
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
  slotCard: {
    width: '48.5%',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
  },
  slotCardAvailable: {
    backgroundColor: '#E8F7F8',
    borderColor: '#B9E6FE',
  },
  slotCardBooked: {
    backgroundColor: '#F1F3FB',
    borderColor: '#E2E8F0',
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  slotTime: {
    fontSize: 13,
    fontWeight: '700',
  },
  slotTimeAvailable: {
    color: '#0891B2',
  },
  slotTimeBooked: {
    color: '#334155',
  },
  slotIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotAvailable: {
    backgroundColor: '#007AFF',
  },
  dotBooked: {
    backgroundColor: '#64748B',
  },
  slotFooter: {
    marginTop: 2,
  },
  availableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availableLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D9488',
  },
  bookedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookedLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  bookedPatientName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E293B',
    maxWidth: '65%',
  },
  walkInCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  bellIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  walkInInfoGroup: {
    flex: 1,
  },
  walkInTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  walkInSubtitle: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  callNextBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  callNextBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  callNextBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
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
    backgroundColor: '#007AFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  addAppointmentBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
