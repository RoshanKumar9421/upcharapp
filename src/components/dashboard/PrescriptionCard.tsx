import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PrescriptionCardProps {
  doctorName: string;
  date: string;
  medsCount: number;
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  doctorName,
  date,
  medsCount,
}) => {
  return (
    <View style={styles.card}>
      <Ionicons name="receipt-outline" size={20} color="#007AFF" />
      <View style={styles.info}>
        <Text style={styles.doctor}>{doctorName}</Text>
        <Text style={styles.sub}>{medsCount} medications • {date}</Text>
      </View>
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  doctor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  sub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
