import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimeSlot } from '../../types/clinic';

interface BookingSummaryProps {
  slot?: TimeSlot;
  clinicName: string;
  dateStr: string;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  slot,
  clinicName,
  dateStr,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Summary</Text>
      <View style={styles.row}>
        <Ionicons name="business-outline" size={16} color="#007AFF" />
        <Text style={styles.text}>{clinicName}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={16} color="#007AFF" />
        <Text style={styles.text}>{dateStr}</Text>
      </View>
      {slot && (
        <View style={styles.row}>
          <Ionicons name="time-outline" size={16} color="#007AFF" />
          <Text style={styles.text}>{slot.time} ({slot.type.toUpperCase()} OPD)</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
});
