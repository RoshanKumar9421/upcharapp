import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueueProgress } from '../queue/QueueProgress';

interface QueueCardProps {
  openSlots: number;
  totalSlots: number;
  clinicName: string;
}

export const QueueCard: React.FC<QueueCardProps> = ({
  openSlots,
  totalSlots,
  clinicName,
}) => {
  return (
    <View style={styles.card}>
      <QueueProgress value={openSlots} total={totalSlots} size={44} />
      <View style={styles.info}>
        <Text style={styles.title}>{clinicName}</Text>
        <Text style={styles.subtext}>{openSlots} of {totalSlots} slots remaining</Text>
      </View>
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
