import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SlotStatus } from '../../types/clinic';
import { StatusBadge } from '../common/StatusBadge';

interface AppointmentStatusProps {
  status: SlotStatus;
}

export const AppointmentStatus: React.FC<AppointmentStatusProps> = ({ status }) => {
  const getVariant = () => {
    switch (status) {
      case 'available':
        return 'active';
      case 'booked':
        return 'neutral';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBadge label={status.toUpperCase()} variant={getVariant()} showDot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});
