import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { DoctorProfile, Clinic } from '../../types/clinic';
import { Avatar } from '../common/Avatar';
import { ClinicHeader } from '../clinic/ClinicHeader';

interface DoctorCardProps {
  doctor: DoctorProfile;
  clinics: Clinic[];
  selectedClinicId: string;
  selectedClinic: Clinic;
  onSelectClinic: (clinicId: string) => void;
  onEditPress?: () => void;
  onSwitchClinicPress?: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  clinics,
  selectedClinicId,
  selectedClinic,
  onSelectClinic,
  onEditPress,
  onSwitchClinicPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Header Profile Row */}
      <View style={styles.headerRow}>
        <Avatar
          source={require('../../../assets/images/doctor_ayesha.jpg')}
          size={52}
          bordered
        />

        <View style={styles.details}>
          <Text style={styles.name}>{doctor.name}</Text>
          <View style={styles.specialtyBadge}>
            <Text style={styles.specialtyText}>{doctor.specialty}</Text>
          </View>
          <Text style={styles.association} numberOfLines={1}>
            {doctor.association}
          </Text>
        </View>

        <TouchableOpacity onPress={onEditPress} style={styles.editBtn}>
          <Feather name="edit" size={14} color="#007AFF" style={{ marginRight: 4 }} />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Attached Clinics Section */}
      <View style={styles.attachedClinicsHeader}>
        <View style={styles.labelRow}>
          <MaterialCommunityIcons name="hospital-building" size={16} color="#007AFF" style={{ marginRight: 6 }} />
          <Text style={styles.attachedClinicsTitle}>
            ATTACHED CLINICS ({clinics.length})
          </Text>
        </View>
        <TouchableOpacity onPress={onSwitchClinicPress}>
          <Text style={styles.switchClinicLink}>Switch Clinic</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Clinic Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        {clinics.map((clinic) => {
          const isSelected = clinic.id === selectedClinicId;
          return (
            <TouchableOpacity
              key={clinic.id}
              onPress={() => onSelectClinic(clinic.id)}
              style={[styles.clinicChip, isSelected && styles.clinicChipSelected]}
            >
              {isSelected && <View style={styles.chipActiveDot} />}
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {clinic.shortName}
              </Text>
              {isSelected && (
                <View style={styles.activeNowPill}>
                  <Text style={styles.activeNowText}>Active Now</Text>
                </View>
              )}
              {!isSelected && (
                <MaterialCommunityIcons
                  name="hospital-box"
                  size={14}
                  color="#64748B"
                  style={{ marginLeft: 4 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Selected Clinic Sub Card */}
      <ClinicHeader clinic={selectedClinic} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  specialtyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0284C7',
  },
  association: {
    fontSize: 12,
    color: '#64748B',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  attachedClinicsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachedClinicsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
  },
  switchClinicLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  chipsRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  clinicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  clinicChipSelected: {
    backgroundColor: '#007AFF',
  },
  chipActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
    marginRight: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  activeNowPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  activeNowText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
