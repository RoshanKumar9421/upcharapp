import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DoctorProfile } from '../../types/clinic';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';

interface DoctorHeaderProps {
  doctor: DoctorProfile;
  onAvatarPress?: () => void;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = ({
  doctor,
  onAvatarPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Badges */}
      <View style={styles.topBadgeRow}>
        <StatusBadge
          label={`${doctor.totalClinicsActive} Clinics Active`}
          variant="active"
          showDot
          style={styles.activePill}
        />

        <View style={styles.verifiedRow}>
          <MaterialCommunityIcons name="check-decagram" size={16} color="#007AFF" />
          <Text style={styles.verifiedText}>{doctor.title}</Text>
        </View>
      </View>

      {/* Greeting Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.greetingTitle}>Good morning, Dr. Ayesha</Text>
          <Text style={styles.greetingSubtitle}>Manage your clinics and availability</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAvatarPress}
          style={styles.avatarButton}
        >
          <Avatar
            source={require('../../../assets/images/doctor_ayesha.jpg')}
            size={52}
            bordered
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  activePill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
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
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
});
