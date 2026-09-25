import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DoctorAvailabilityProps {
  scheduleDays: string;
  detailedTiming: string;
}

export const DoctorAvailability: React.FC<DoctorAvailabilityProps> = ({
  scheduleDays,
  detailedTiming,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={16} color="#007AFF" />
        <Text style={styles.daysText}>{scheduleDays}</Text>
      </View>
      <Text style={styles.timingText}>{detailedTiming}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  daysText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  timingText: {
    fontSize: 12,
    color: '#64748B',
  },
});
