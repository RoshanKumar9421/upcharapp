import React from 'react';
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useClinic } from '../context/ClinicContext';
import { Clinic } from '../types/clinic';

export default function ClinicsHomeScreen() {
  const router = useRouter();
  const { clinics, selectClinic, doctor, toastMessage } = useClinic();

  const handleOpenClinic = (clinic: Clinic) => {
    selectClinic(clinic.id);
    router.push({
      pathname: '/schedule-detail',
      params: { clinicId: clinic.id },
    });
  };

  const renderClinicIcon = (type: Clinic['iconType']) => {
    switch (type) {
      case 'plus':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <MaterialCommunityIcons name="hospital-box" size={24} color="#007AFF" />
          </View>
        );
      case 'briefcase':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: '#E6F8F3' }]}>
            <MaterialCommunityIcons name="medical-bag" size={22} color="#0D9488" />
          </View>
        );
      case 'shield':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: '#EFF6FF' }]}>
            <MaterialCommunityIcons name="shield-cross" size={22} color="#2563EB" />
          </View>
        );
      case 'hospital':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <FontAwesome5 name="hospital-alt" size={20} color="#0284C7" />
          </View>
        );
      case 'bandage':
        return (
          <View style={[styles.iconWrapper, { backgroundColor: '#EEF2FF' }]}>
            <MaterialCommunityIcons name="bandage" size={22} color="#4F46E5" />
          </View>
        );
      default:
        return (
          <View style={[styles.iconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="medkit" size={22} color="#007AFF" />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFD" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Ionicons name="information-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Badges Row */}
        <View style={styles.topBadgeRow}>
          {/* Active Clinics Badge */}
          <View style={styles.activeClinicsPill}>
            <View style={styles.greenDot} />
            <Text style={styles.activeClinicsText}>
              {doctor.totalClinicsActive} Clinics Active
            </Text>
          </View>

          {/* Verified MD Badge */}
          <View style={styles.verifiedRow}>
            <MaterialCommunityIcons name="check-decagram" size={16} color="#007AFF" />
            <Text style={styles.verifiedText}>Verified MD</Text>
          </View>
        </View>

        {/* Doctor Header Greeting */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.greetingTitle}>Good morning, Dr. Ayesha</Text>
            <Text style={styles.greetingSubtitle}>Manage your clinics and availability</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/schedule-detail', params: { clinicId: 'city-care' } })}
            style={styles.avatarButton}
          >
            <Image
              source={require('../../assets/images/doctor_ayesha.jpg')}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        {/* Section Heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Clinics</Text>
          <Text style={styles.sectionSubtitle}>Clinics you're currently associated with</Text>
        </View>

        {/* Clinic Cards List */}
        <View style={styles.clinicsList}>
          {clinics.map((clinic, index) => {
            const isHighlighted = clinic.isPrimary;

            return (
              <TouchableOpacity
                key={clinic.id}
                activeOpacity={0.92}
                onPress={() => handleOpenClinic(clinic)}
                style={[
                  styles.clinicCard,
                  isHighlighted && styles.clinicCardHighlighted,
                ]}
              >
                {/* Highlight active left blue bar */}
                {isHighlighted && <View style={styles.activeIndicatorBar} />}

                {/* Top Clinic Info Row */}
                <View style={styles.clinicTopRow}>
                  {renderClinicIcon(clinic.iconType)}

                  <View style={styles.clinicTitleGroup}>
                    <Text style={styles.clinicName} numberOfLines={1}>
                      {clinic.name}
                    </Text>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-outline" size={13} color="#64748B" />
                      <Text style={styles.locationText} numberOfLines={1}>
                        {clinic.location}
                      </Text>
                    </View>
                  </View>

                  {/* Active Status Badge */}
                  <View style={styles.activeStatusPill}>
                    <View style={styles.activeTealDot} />
                    <Text style={styles.activeStatusText}>Active</Text>
                    <Ionicons name="chevron-forward" size={14} color="#0D9488" style={{ marginLeft: 2 }} />
                  </View>
                </View>

                {/* Badges / Tags (Role & Schedule Days) */}
                <View style={styles.tagsRow}>
                  <View style={styles.tagChip}>
                    <Text style={styles.tagChipText}>{clinic.role}</Text>
                  </View>

                  <View style={styles.tagChip}>
                    <Ionicons name="calendar-outline" size={13} color="#475569" style={{ marginRight: 4 }} />
                    <Text style={styles.tagChipText}>{clinic.scheduleDays}</Text>
                  </View>
                </View>

                {/* Slot Card / Action Banner */}
                {isHighlighted ? (
                  // Bright Blue Highlighted Banner for City Care Clinic
                  <View style={styles.blueSlotBanner}>
                    <View style={styles.slotBannerLeft}>
                      <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                      <View>
                        <Text style={styles.blueBannerLabel}>{clinic.nextSlotLabel}</Text>
                        <Text style={styles.blueBannerTime}>{clinic.nextSlotText}</Text>
                      </View>
                    </View>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </View>
                ) : (
                  // Soft Lilac / Gray Slot Banner for other clinics
                  <View style={styles.softSlotBanner}>
                    <View style={styles.slotBannerLeft}>
                      <Ionicons name="time-outline" size={16} color="#007AFF" style={{ marginRight: 8 }} />
                      <View>
                        <Text style={styles.softBannerLabel}>{clinic.nextSlotLabel}</Text>
                        <Text style={styles.softBannerTime}>{clinic.nextSlotText}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
    paddingBottom: 40,
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
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  activeClinicsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8F3',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0D9488',
    marginRight: 6,
  },
  activeClinicsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D9488',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTextGroup: {
    flex: 1,
    paddingRight: 12,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  avatarButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  clinicsList: {
    gap: 14,
  },
  clinicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1.5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
    overflow: 'hidden',
  },
  clinicCardHighlighted: {
    borderColor: '#E0E7FF',
    shadowOpacity: 0.08,
  },
  activeIndicatorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4.5,
    backgroundColor: '#007AFF',
  },
  clinicTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clinicTitleGroup: {
    flex: 1,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 3,
  },
  activeStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeTealDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#0D9488',
    marginRight: 4,
  },
  activeStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D9488',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagChipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  blueSlotBanner: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  softSlotBanner: {
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  slotBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueBannerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.5,
  },
  blueBannerTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 1,
  },
  softBannerLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  softBannerTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
});
