import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimeSlot } from '../../types/clinic';
import { useClinic } from '../../context/ClinicContext';

interface PatientDetailModalProps {
  visible: boolean;
  onClose: () => void;
  slot: TimeSlot | null;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  visible,
  onClose,
  slot,
}) => {
  const { completeAppointment, cancelAppointment, selectedClinic } = useClinic();

  if (!slot) return null;

  const handleComplete = () => {
    completeAppointment(slot.id);
    onClose();
  };

  const handleCancel = () => {
    cancelAppointment(slot.id);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badgeRow}>
              <View style={styles.tokenBadge}>
                <Text style={styles.tokenText}>Token #{slot.tokenNumber || '01'}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  slot.status === 'booked' && styles.statusBooked,
                  slot.status === 'completed' && styles.statusCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    slot.status === 'booked' && styles.statusTextBooked,
                    slot.status === 'completed' && styles.statusTextCompleted,
                  ]}
                >
                  {slot.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Patient Details */}
          <View style={styles.patientInfo}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {slot.patientName ? slot.patientName.charAt(0) : 'P'}
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.patientName}>{slot.patientName || 'Patient'}</Text>
              <Text style={styles.clinicSubtext}>{selectedClinic.name}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="#007AFF" />
              <Text style={styles.infoLabel}>Time Slot:</Text>
              <Text style={styles.infoVal}>{slot.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={16} color="#007AFF" />
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoVal}>{slot.patientPhone || '+91 98301 23456'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="medkit-outline" size={16} color="#007AFF" />
              <Text style={styles.infoLabel}>Complaint:</Text>
              <Text style={styles.infoVal}>{slot.patientProblem || 'General Checkup'}</Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            {slot.status === 'booked' && (
              <>
                <TouchableOpacity onPress={handleComplete} style={styles.completeBtn}>
                  <Ionicons name="checkmark-done" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.completeBtnText}>Mark Done</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
                  <Ionicons name="trash-outline" size={16} color="#EF4444" style={{ marginRight: 6 }} />
                  <Text style={styles.cancelBtnText}>Cancel Slot</Text>
                </TouchableOpacity>
              </>
            )}
            {slot.status === 'completed' && (
              <View style={styles.completedNotice}>
                <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                <Text style={styles.completedNoticeText}>Consultation Completed</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 360,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBooked: {
    backgroundColor: '#F1F5F9',
  },
  statusCompleted: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextBooked: {
    color: '#475569',
  },
  statusTextCompleted: {
    color: '#16A34A',
  },
  closeBtn: {
    padding: 4,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0284C7',
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
  infoGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
    width: 75,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  completeBtn: {
    flex: 1,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  completeBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelBtnText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  completedNotice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    gap: 6,
  },
  completedNoticeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#16A34A',
  },
});
