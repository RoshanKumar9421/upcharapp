import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimeSlot } from '../../types/clinic';
import { StatusBadge } from '../common/StatusBadge';

interface AppointmentCardProps {
  slot: TimeSlot;
  clinicName?: string;
  onPress?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  slot,
  clinicName,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.timeGroup}>
          <Ionicons name="time-outline" size={16} color="#007AFF" />
          <Text style={styles.timeText}>{slot.time}</Text>
        </View>
        <StatusBadge
          label={slot.status.toUpperCase()}
          variant={slot.status === 'booked' ? 'neutral' : slot.status === 'completed' ? 'success' : 'active'}
        />
      </View>

      <Text style={styles.patientName}>{slot.patientName || 'Available Slot'}</Text>
      {slot.patientProblem && (
        <Text style={styles.problemText}>{slot.patientProblem}</Text>
      )}
      {clinicName && (
        <Text style={styles.clinicText}>{clinicName}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  problemText: {
    fontSize: 12,
    color: '#64748B',
  },
  clinicText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
  },
});
