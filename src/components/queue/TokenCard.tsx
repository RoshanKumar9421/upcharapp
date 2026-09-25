import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimeSlot } from '../../types/clinic';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';

interface TokenCardProps {
  slot: TimeSlot;
  clinicName?: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({ slot, clinicName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.tokenBadge}>
            <Text style={styles.tokenText}>Token #{slot.tokenNumber || '01'}</Text>
          </View>
          <StatusBadge
            label={slot.status.toUpperCase()}
            variant={slot.status === 'booked' ? 'neutral' : slot.status === 'completed' ? 'success' : 'active'}
          />
        </View>
      </View>

      <View style={styles.patientInfo}>
        <Avatar name={slot.patientName || 'Patient'} size={44} />
        <View style={styles.nameCol}>
          <Text style={styles.patientName}>{slot.patientName || 'Walk-in Patient'}</Text>
          {clinicName && <Text style={styles.clinicSubtext}>{clinicName}</Text>}
        </View>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={15} color="#007AFF" />
          <Text style={styles.detailLabel}>Slot:</Text>
          <Text style={styles.detailVal}>{slot.time}</Text>
        </View>
        {slot.patientPhone && (
          <View style={styles.detailItem}>
            <Ionicons name="call-outline" size={15} color="#007AFF" />
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailVal}>{slot.patientPhone}</Text>
          </View>
        )}
        {slot.patientProblem && (
          <View style={styles.detailItem}>
            <Ionicons name="medkit-outline" size={15} color="#007AFF" />
            <Text style={styles.detailLabel}>Reason:</Text>
            <Text style={styles.detailVal}>{slot.patientProblem}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tokenText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  nameCol: {
    marginLeft: 12,
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  clinicSubtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  detailsGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
    width: 60,
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
});
