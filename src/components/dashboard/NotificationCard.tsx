import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  time,
}) => {
  return (
    <View style={styles.card}>
      <Ionicons name="notifications-outline" size={18} color="#007AFF" />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
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
    alignItems: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  message: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  time: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
  },
});
