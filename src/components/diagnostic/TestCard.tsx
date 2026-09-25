import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TestCardProps {
  name: string;
  price: string;
  tat: string;
}

export const TestCard: React.FC<TestCardProps> = ({ name, price, tat }) => {
  return (
    <View style={styles.card}>
      <Ionicons name="fitness-outline" size={18} color="#007AFF" />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tat}>Turnaround: {tat}</Text>
      </View>
      <Text style={styles.price}>{price}</Text>
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
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tat: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007AFF',
  },
});
