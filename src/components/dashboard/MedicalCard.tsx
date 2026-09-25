import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MedicalCardProps {
  medicineName: string;
  dosage: string;
  stockStatus: string;
}

export const MedicalCard: React.FC<MedicalCardProps> = ({
  medicineName,
  dosage,
  stockStatus,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Ionicons name="bandage-outline" size={18} color="#007AFF" />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>{medicineName}</Text>
          <Text style={styles.dosage}>{dosage}</Text>
        </View>
      </View>
      <Text style={styles.status}>{stockStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  dosage: {
    fontSize: 11,
    color: '#64748B',
  },
  status: {
    fontSize: 11,
    color: '#0D9488',
    fontWeight: '600',
  },
});
