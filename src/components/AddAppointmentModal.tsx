import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClinic } from '../context/ClinicContext';
import { TimeSlot } from '../types/clinic';

interface AddAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  preSelectedSlotId?: string;
}

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  visible,
  onClose,
  preSelectedSlotId,
}) => {
  const { currentSchedule, bookSlot, selectedClinic } = useClinic();

  const allAvailableSlots: TimeSlot[] = [
    ...currentSchedule.morningSlots.filter((s) => s.status === 'available'),
    ...currentSchedule.eveningSlots.filter((s) => s.status === 'available'),
  ];

  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    preSelectedSlotId || (allAvailableSlots[0]?.id || '')
  );
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('Routine Consultation');

  // Sync if preSelectedSlotId changes
  React.useEffect(() => {
    if (preSelectedSlotId) {
      setSelectedSlotId(preSelectedSlotId);
    } else if (allAvailableSlots.length > 0 && !selectedSlotId) {
      setSelectedSlotId(allAvailableSlots[0].id);
    }
  }, [preSelectedSlotId, visible]);

  const handleSubmit = () => {
    if (!patientName.trim()) {
      alert('Please enter patient name');
      return;
    }
    const targetSlotId = selectedSlotId || allAvailableSlots[0]?.id;
    if (!targetSlotId) {
      alert('No available slots found for today');
      return;
    }

    bookSlot(targetSlotId, patientName.trim(), phone.trim(), reason);
    setPatientName('');
    setPhone('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Add Walk-in Appointment</Text>
              <Text style={styles.subtitle}>{selectedClinic.name} • {currentSchedule.fullDateStr}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Slot selector */}
            <Text style={styles.label}>Select Slot</Text>
            {allAvailableSlots.length === 0 ? (
              <Text style={styles.noSlotsText}>No open slots left for this day.</Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slotRow}>
                {allAvailableSlots.map((slot) => {
                  const isSelected = slot.id === selectedSlotId;
                  return (
                    <TouchableOpacity
                      key={slot.id}
                      onPress={() => setSelectedSlotId(slot.id)}
                      style={[styles.slotChip, isSelected && styles.slotChipSelected]}
                    >
                      <Ionicons
                        name="time-outline"
                        size={14}
                        color={isSelected ? '#FFFFFF' : '#007AFF'}
                      />
                      <Text style={[styles.slotChipText, isSelected && styles.slotChipTextSelected]}>
                        {slot.time}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {/* Patient Name */}
            <Text style={styles.label}>Patient Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Rahul Sharma"
              placeholderTextColor="#94A3B8"
              value={patientName}
              onChangeText={setPatientName}
            />

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            {/* Reason */}
            <Text style={styles.label}>Chief Complaint / Purpose</Text>
            <View style={styles.reasonsContainer}>
              {['Fever & Cold', 'BP Follow-up', 'Routine Checkup', 'Diabetes Review', 'Chest Pain'].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setReason(item)}
                  style={[styles.reasonBadge, reason === item && styles.reasonBadgeSelected]}
                >
                  <Text style={[styles.reasonBadgeText, reason === item && styles.reasonBadgeTextSelected]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Action Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.submitBtn, allAvailableSlots.length === 0 && styles.submitBtnDisabled]}
              disabled={allAvailableSlots.length === 0}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.submitBtnText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  body: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 12,
  },
  slotRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  slotChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginRight: 8,
    gap: 4,
  },
  slotChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  slotChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
  },
  slotChipTextSelected: {
    color: '#FFFFFF',
  },
  noSlotsText: {
    fontSize: 13,
    color: '#EF4444',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  reasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reasonBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reasonBadgeSelected: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0284C7',
  },
  reasonBadgeText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  reasonBadgeTextSelected: {
    color: '#0284C7',
    fontWeight: '600',
  },
  footer: {
    paddingTop: 8,
  },
  submitBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
