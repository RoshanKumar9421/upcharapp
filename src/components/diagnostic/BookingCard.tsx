import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BookingCardProps {
  id: string;
  testName: string;
  date: string;
}

export const BookingCard: React.FC<BookingCardProps> = ({ id, testName, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.id}>#{id}</Text>
      <Text style={styles.testName}>{testName}</Text>
      <Text style={styles.date}>{date}</Text>
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
  id: {
    fontSize: 10,
    color: '#007AFF',
    fontWeight: '700',
  },
  testName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
