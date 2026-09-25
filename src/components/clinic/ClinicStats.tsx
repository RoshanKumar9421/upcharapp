import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ClinicStatsProps {
  openSlots: number;
  totalSlots: number;
  capacityPercent: number;
}

export const ClinicStats: React.FC<ClinicStatsProps> = ({
  openSlots,
  totalSlots,
  capacityPercent,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <Text style={styles.pillText}>
          {openSlots} of {totalSlots} Slots Open
        </Text>
      </View>
      <Text style={styles.subtitle}>{capacityPercent}% capacity free</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  pill: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F766E',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 3,
  },
});
