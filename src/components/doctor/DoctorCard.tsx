import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Doctor } from '../../types/doctor';
import { colors } from '../../theme/colors';

interface DoctorCardProps {
  doctor: Doctor;
  onPressAction?: () => void;
  onPressInfo?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
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
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
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
});
