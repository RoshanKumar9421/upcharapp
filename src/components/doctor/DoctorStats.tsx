import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DoctorStatsProps {
  patientsSeenToday?: number;
  totalConsultations?: number;
  rating?: number;
}

export const DoctorStats: React.FC<DoctorStatsProps> = ({
  patientsSeenToday = 14,
  totalConsultations = 182,
  rating = 4.9,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{patientsSeenToday}</Text>
        <Text style={styles.statLabel}>Today's Patients</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>{totalConsultations}</Text>
        <Text style={styles.statLabel}>This Month</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBox}>
        <Text style={styles.statNumber}>★ {rating}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
});
