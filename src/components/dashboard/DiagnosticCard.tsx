import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DiagnosticCardProps {
  testName: string;
  patientName: string;
  date: string;
  status: 'Sample Collected' | 'Processing' | 'Report Ready';
  onPress?: () => void;
}

export const DiagnosticCard: React.FC<DiagnosticCardProps> = ({
  testName,
  patientName,
  date,
  status,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <Ionicons name="flask-outline" size={16} color="#007AFF" />
          <Text style={styles.testName}>{testName}</Text>
        </View>
        <Text style={styles.status}>{status}</Text>
      </View>
      <Text style={styles.patient}>{patientName}</Text>
      <Text style={styles.date}>{date}</Text>
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
    marginBottom: 6,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  testName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  status: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D9488',
  },
  patient: {
    fontSize: 13,
    color: '#475569',
  },
  date: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
});
