import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Clinic } from '../../types/clinic';
import { StatusBadge } from '../common/StatusBadge';

interface ClinicHeaderProps {
  clinic: Clinic;
}

export const ClinicHeader: React.FC<ClinicHeaderProps> = ({ clinic }) => {
  return (
    <View style={styles.subCard}>
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="hospital-box" size={18} color="#007AFF" />
          </View>
          <Text style={styles.name}>{clinic.name}</Text>
        </View>

        <StatusBadge label="Active Clinic" variant="active" showDot />
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={14} color="#007AFF" style={{ marginRight: 4 }} />
        <Text style={styles.locationText}>{clinic.location}</Text>
      </View>

      <View style={styles.scheduleRow}>
        <Ionicons name="calendar-outline" size={14} color="#007AFF" style={{ marginRight: 4 }} />
        <Text style={styles.scheduleText}>{clinic.detailedTiming}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 11,
    color: '#475569',
  },
});
