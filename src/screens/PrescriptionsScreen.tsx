import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { mockPrescriptions } from '../services/mock/data';
import { colors } from '../theme/colors';

export const PrescriptionsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Prescriptions & Records</Text>
        <Text style={styles.subtitle}>Verified digital prescriptions from consultations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {mockPrescriptions.map((rx) => (
          <View key={rx.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="file-document-check" size={24} color={colors.primary} />
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.docName}>{rx.doctorName}</Text>
                <Text style={styles.clinic}>{rx.clinicName} • {rx.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => Alert.alert('Prescription PDF', 'Downloading encrypted medical prescription...')}
              >
                <Feather name="download" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.diagnosisBox}>
              <Text style={styles.diagnosisLabel}>DIAGNOSIS</Text>
              <Text style={styles.diagnosisText}>{rx.diagnosis}</Text>
            </View>

            <Text style={styles.medsTitle}>Prescribed Medicines ({rx.medications.length})</Text>
            {rx.medications.map((med, index) => (
              <View key={index} style={styles.medItem}>
                <View style={styles.medHeader}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDosage}>{med.dosage}</Text>
                </View>
                <Text style={styles.medFrequency}>{med.frequency} • {med.duration}</Text>
                <Text style={styles.medInstructions}>{med.instructions}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.orderPharmacyBtn}
              onPress={() => Alert.alert('Medical Store', 'Forwarding prescription to nearby verified pharmacy for fulfillment.')}
            >
              <MaterialCommunityIcons name="storefront-outline" size={17} color="#FFFFFF" />
              <Text style={styles.orderPharmacyText}>Order from Medical Store</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  list: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  clinic: {
    fontSize: 12,
    color: '#64748B',
  },
  downloadBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diagnosisBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  diagnosisLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  diagnosisText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 2,
  },
  medsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  medItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  medDosage: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  medFrequency: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  medInstructions: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontStyle: 'italic',
  },
  orderPharmacyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080FF',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
    gap: 8,
  },
  orderPharmacyText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
