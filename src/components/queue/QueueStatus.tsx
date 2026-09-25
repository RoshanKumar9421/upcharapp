import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueueProgress } from './QueueProgress';

interface QueueStatusProps {
  openSlots: number;
  totalSlots: number;
  nextExpectedPatientTime?: string;
  isAutoSynced?: boolean;
}

export const QueueStatus: React.FC<QueueStatusProps> = ({
  openSlots,
  totalSlots,
  nextExpectedPatientTime = '09:30 AM',
  isAutoSynced = true,
}) => {
  return (
    <View style={styles.card}>
      <QueueProgress
        value={openSlots}
        total={totalSlots}
        size={50}
        strokeWidth={4.5}
        strokeColor="#007AFF"
        bgColor="#E2E8F0"
      />

      <View style={styles.infoGroup}>
        <Text style={styles.title}>Queue Ready</Text>
        <Text style={styles.subtext}>
          Next patient expected at {nextExpectedPatientTime}
        </Text>
      </View>

      {isAutoSynced && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Auto-{"\n"}synced</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  infoGroup: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#EEF0FB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4F46E5',
    textAlign: 'center',
    lineHeight: 12,
  },
});
