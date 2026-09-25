import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PrescriptionRequestCardProps {
  patientName: string;
  doctorName: string;
  time: string;
}

export const PrescriptionRequestCard: React.FC<PrescriptionRequestCardProps> = ({
  patientName,
  doctorName,
  time,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.patient}>{patientName}</Text>
      <Text style={styles.details}>Prescribed by {doctorName} • {time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  patient: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  details: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
