import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBadge } from '../common/StatusBadge';

interface SampleStatusProps {
  status: 'Collected' | 'In Transit' | 'Analyzing' | 'Completed';
  barcode: string;
}

export const SampleStatus: React.FC<SampleStatusProps> = ({ status, barcode }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.barcode}>Sample Barcode: {barcode}</Text>
      <StatusBadge
        label={status}
        variant={status === 'Completed' ? 'success' : 'active'}
        showDot
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  barcode: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
});
