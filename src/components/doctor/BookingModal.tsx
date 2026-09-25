import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Doctor } from '../../types/doctor';
import { colors } from '../../theme/colors';

interface BookingModalProps {
  visible: boolean;
  doctor: Doctor | null;
  onClose: () => void;
  onConfirmBooking: (doctor: Doctor, mode: 'queue' | 'slot', timeOrToken: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  doctor,
  onClose,
  onConfirmBooking,
}) => {
  if (!doctor) return null;

  const isQueueMode = !!doctor.queueStatus;
  const [selectedDate, setSelectedDate] = useState('Today, 25 Sep');
  const [selectedSlot, setSelectedSlot] = useState(
    isQueueMode ? `Token #${doctor.queueStatus?.availableToken}` : '04:00 PM'
  );

  const dates = ['Today, 25 Sep', 'Tomorrow, 26 Sep', 'Mon, 28 Sep'];
  const slots = isQueueMode
    ? [`Token #${doctor.queueStatus?.availableToken}`, `Token #${(doctor.queueStatus?.availableToken || 18) + 1}`]
    : ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'];

  const handleConfirm = () => {
    onConfirmBooking(doctor, isQueueMode ? 'queue' : 'slot', selectedSlot);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isQueueMode ? 'Join Live Queue' : 'Book Appointment'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* Doctor Info */}
            <View style={styles.docSummary}>
              <Image source={{ uri: doctor.avatarUrl }} style={styles.avatar} />
              <View style={styles.docDetails}>
                <Text style={styles.docName}>{doctor.name}</Text>
                <Text style={styles.docSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.docClinic}>{doctor.clinicName} • ₹{doctor.consultationFee} Fee</Text>
              </View>
            </View>

            {/* Date Selection */}
            <Text style={styles.sectionLabel}>Select Date</Text>
            <View style={styles.chipRow}>
              {dates.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.chip, selectedDate === d && styles.activeChip]}
                  onPress={() => setSelectedDate(d)}
                >
                  <Text style={[styles.chipText, selectedDate === d && styles.activeChipText]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Slot / Token Selection */}
            <Text style={styles.sectionLabel}>
              {isQueueMode ? 'Available Live Token' : 'Available Time Slots'}
            </Text>
            <View style={styles.chipRow}>
              {slots.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, selectedSlot === s && styles.activeChip]}
                  onPress={() => setSelectedSlot(s)}
                >
                  <Text style={[styles.chipText, selectedSlot === s && styles.activeChipText]}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Patient Info */}
            <Text style={styles.sectionLabel}>Patient Details</Text>
            <View style={styles.patientCard}>
              <Text style={styles.patientName}>Safa (Primary)</Text>
              <Text style={styles.patientMeta}>Indore • Age: 28 • +91 98765 43210</Text>
            </View>

            {/* Payment Summary */}
            <View style={styles.billBox}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Consultation Fee</Text>
                <Text style={styles.billValue}>₹{doctor.consultationFee}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Platform Convenience Fee</Text>
                <Text style={[styles.billValue, { color: '#10B981' }]}>FREE</Text>
              </View>
              <View style={styles.billDivider} />
              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>Total Payable at Clinic</Text>
                <Text style={styles.totalValue}>₹{doctor.consultationFee}</Text>
              </View>
            </View>

            {/* Confirm CTA */}
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
              <Text style={styles.confirmBtnText}>
                {isQueueMode ? `Confirm Token (${selectedSlot})` : 'Confirm Appointment'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  docSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  docDetails: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  docSpecialty: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  docClinic: {
    fontSize: 12,
    color: '#64748B',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    marginTop: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  activeChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#0080FF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  activeChipText: {
    color: '#0080FF',
    fontWeight: '700',
  },
  patientCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  patientName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  patientMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  billBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0080FF',
  },
  confirmBtn: {
    backgroundColor: '#0080FF',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
