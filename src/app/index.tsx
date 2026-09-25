import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useClinic } from '../context/ClinicContext';
import { Clinic } from '../types/clinic';
import { ClinicDashboard } from '../components/clinic/ClinicDashboard';
import { DoctorHeader } from '../components/doctor/DoctorHeader';
import { ClinicCard } from '../components/clinic/ClinicCard';
import { SectionHeader } from '../components/dashboard/SectionHeader';

export default function HomeScreen() {
  const router = useRouter();
  const { clinics, selectClinic, doctor, toastMessage } = useClinic();
  
  // Default to 'clinic-dashboard' so the exact mockup design is displayed immediately
  const [activePortal, setActivePortal] = useState<'clinic-dashboard' | 'doctor-clinics'>('clinic-dashboard');

  const handleOpenClinic = (clinic: Clinic) => {
    selectClinic(clinic.id);
    router.push({
      pathname: '/schedule-detail',
      params: { clinicId: clinic.id },
    });
  };

  return (
    <View style={styles.root}>
      {/* Top Portal Switcher (Clinic Operations vs Doctor Schedule) */}
      <SafeAreaView style={styles.switcherSafeArea}>
        <View style={styles.switcherBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActivePortal('clinic-dashboard')}
            style={[
              styles.switchBtn,
              activePortal === 'clinic-dashboard' && styles.switchBtnActive,
            ]}
          >
            <Ionicons
              name="business"
              size={14}
              color={activePortal === 'clinic-dashboard' ? '#007AFF' : '#64748B'}
            />
            <Text
              style={[
                styles.switchBtnText,
                activePortal === 'clinic-dashboard' && styles.switchBtnTextActive,
              ]}
            >
              Clinic Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActivePortal('doctor-clinics')}
            style={[
              styles.switchBtn,
              activePortal === 'doctor-clinics' && styles.switchBtnActive,
            ]}
          >
            <Ionicons
              name="medkit"
              size={14}
              color={activePortal === 'doctor-clinics' ? '#007AFF' : '#64748B'}
            />
            <Text
              style={[
                styles.switchBtnText,
                activePortal === 'doctor-clinics' && styles.switchBtnTextActive,
              ]}
            >
              Doctor Portal
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Render Active Portal */}
      {activePortal === 'clinic-dashboard' ? (
        <ClinicDashboard />
      ) : (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#F8FAFD" />

          {/* Floating Toast Notification */}
          {toastMessage && (
            <View style={styles.toastContainer}>
              <Ionicons name="information-circle" size={18} color="#FFFFFF" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          )}

          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Doctor Header & Active Badges */}
            <DoctorHeader
              doctor={doctor}
              onAvatarPress={() =>
                router.push({ pathname: '/schedule-detail', params: { clinicId: 'city-care' } })
              }
            />

            {/* Section Heading */}
            <SectionHeader
              title="My Clinics"
              subtitle="Clinics you're currently associated with"
            />

            {/* Clinic Cards List */}
            <View style={styles.clinicsList}>
              {clinics.map((clinic) => (
                <ClinicCard
                  key={clinic.id}
                  clinic={clinic}
                  isHighlighted={clinic.isPrimary}
                  onPress={() => handleOpenClinic(clinic)}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  switcherSafeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  switcherBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 3,
  },
  switchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 9,
    gap: 6,
  },
  switchBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  switchBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  switchBtnTextActive: {
    color: '#007AFF',
    fontWeight: '700',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
    paddingBottom: 40,
  },
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    right: 20,
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  clinicsList: {
    gap: 14,
  },
});
