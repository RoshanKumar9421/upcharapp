import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Doctor } from '../../types/doctor';
import { colors } from '../../theme/colors';

interface DoctorCardProps {
  doctor: Doctor;
  onPressAction?: () => void;
  onPressInfo?: () => void;
=======
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { DoctorProfile, Clinic } from '../../types/clinic';
import { Avatar } from '../common/Avatar';
import { ClinicHeader } from '../clinic/ClinicHeader';

interface DoctorCardProps {
  doctor: DoctorProfile;
  clinics: Clinic[];
  selectedClinicId: string;
  selectedClinic: Clinic;
  onSelectClinic: (clinicId: string) => void;
  onEditPress?: () => void;
  onSwitchClinicPress?: () => void;
>>>>>>> 1323a644eb5f899c379eb40be1d3bba0d4ae0a91
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
<<<<<<< HEAD
  onPressAction,
  onPressInfo,
}) => {
  const isQueueMode = !!doctor.queueStatus;

  return (
    <View style={styles.card}>
      {/* Header Info Row */}
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: doctor.avatarUrl }} style={styles.avatar} />
          {doctor.isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameAndRatingRow}>
            <Text style={styles.name}>{doctor.name}</Text>
            <View style={styles.ratingPill}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}>
                {doctor.rating} <Text style={styles.reviewCount}>({doctor.reviewCount})</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.subQualifications}>
            {doctor.qualifications} • {doctor.specialty}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{doctor.experienceYears} yrs exp • </Text>
            <Feather name="arrow-up-right" size={13} color={colors.textSecondary} />
            <Text style={styles.metaText}>
              {doctor.clinicName} ({doctor.distanceKm} km)
            </Text>
          </View>
        </View>
      </View>

      {/* Dynamic Status / Availability Strip */}
      <View style={styles.statusStrip}>
        <View style={styles.statusLeft}>
          {isQueueMode ? (
            <>
              <View style={styles.blueDot} />
              <Text style={styles.statusText}>
                Serving #{doctor.queueStatus?.nowServingToken} • Token #{doctor.queueStatus?.availableToken} available
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="calendar-outline" size={14} color={colors.primaryDeep} />
              <Text style={styles.statusText}>{doctor.nextAvailableSlot}</Text>
            </>
          )}
        </View>
        <Text style={styles.feeText}>₹{doctor.consultationFee} fee</Text>
      </View>

      {/* Action Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={onPressAction}
          activeOpacity={0.8}
        >
          {isQueueMode ? (
            <>
              <Ionicons name="ticket-outline" size={16} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>Join Queue</Text>
            </>
          ) : (
            <>
              <Ionicons name="calendar" size={16} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>Book Token</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoBtn}
          onPress={onPressInfo}
          activeOpacity={0.7}
        >
          <Feather name="info" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
=======
  clinics,
  selectedClinicId,
  selectedClinic,
  onSelectClinic,
  onEditPress,
  onSwitchClinicPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Header Profile Row */}
      <View style={styles.headerRow}>
        <Avatar
          source={require('../../../assets/images/doctor_ayesha.jpg')}
          size={52}
          bordered
        />

        <View style={styles.details}>
          <Text style={styles.name}>{doctor.name}</Text>
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialtyText}>{doctor.specialty}</Text>
          </View>
          <Text style={styles.association} numberOfLines={1}>
            {doctor.association}
          </Text>
        </View>

        <TouchableOpacity onPress={onEditPress} style={styles.editBtn}>
          <Feather name="edit" size={14} color="#007AFF" style={{ marginRight: 4 }} />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Attached Clinics Section */}
      <View style={styles.attachedClinicsHeader}>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="hospital-building" size={16} color="#007AFF" style={{ marginRight: 6 }} />
          <Text style={styles.attachedClinicsTitle}>
            ATTACHED CLINICS ({clinics.length})
          </Text>
        </View>
        <TouchableOpacity onPress={onSwitchClinicPress}>
          <Text style={styles.switchClinicLink}>Switch Clinic</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Clinic Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        {clinics.map((clinic) => {
          const isSelected = clinic.id === selectedClinicId;
          return (
            <TouchableOpacity
              key={clinic.id}
              onPress={() => onSelectClinic(clinic.id)}
              style={[styles.clinicChip, isSelected && styles.clinicChipSelected]}
            >
              {isSelected && <View style={styles.chipActiveDot} />}
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
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

      {/* Selected Clinic Sub Card */}
      <ClinicHeader clinic={selectedClinic} />
>>>>>>> 1323a644eb5f899c379eb40be1d3bba0d4ae0a91
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
<<<<<<< HEAD
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F1F5F9',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0080FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  nameAndRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
=======
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  details: {
    flex: 1,
    marginLeft: 12,
>>>>>>> 1323a644eb5f899c379eb40be1d3bba0d4ae0a91
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
<<<<<<< HEAD
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  reviewCount: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  subQualifications: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '400',
  },
  statusStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F6FF',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0080FF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066FF',
  },
  feeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080FF',
    paddingVertical: 12,
    borderRadius: 24,
    gap: 6,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
=======
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
  association: {
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
  labelRow: {
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
  chipsRow: {
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
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextSelected: {
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
>>>>>>> 1323a644eb5f899c379eb40be1d3bba0d4ae0a91
});
