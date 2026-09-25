import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useClinic } from '../context/ClinicContext';
import { Clinic } from '../types/clinic';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RoleTopBar } from '../components/common/RoleTopBar';
import { PatientDashboard } from '../components/patient/PatientDashboard';
import { DoctorDashboard } from '../components/doctor/DoctorDashboard';
import { LabDashboard } from '../components/lab/LabDashboard';

export default function AppEntry() {
  const router = useRouter();
  const { isAuthenticated, activeRole } = useAuth();
  const { selectClinic, toastMessage } = useClinic();

  const handleOpenClinic = (clinic: Clinic) => {
    selectClinic(clinic.id);
    router.push({
      pathname: '/schedule-detail',
      params: { clinicId: clinic.id },
    });
  };

  // If user is not yet logged in, show the tri-role login screen
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Once authenticated, show the active role experience with the RoleTopBar
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Floating Toast Notification from ClinicContext */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Ionicons name="information-circle" size={18} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Top Role Switcher Bar: Allows instantaneous switching between Patient, Doctor, and Lab */}
      <RoleTopBar />

      {/* Render the Active Role Experience */}
      <View style={styles.content}>
        {activeRole === 'patient' && (
          <PatientDashboard
            onNavigateToClinicDetail={(clinicId) => {
              selectClinic(clinicId);
              router.push({
                pathname: '/schedule-detail',
                params: { clinicId },
              });
            }}
          />
        )}

        {activeRole === 'doctor' && (
          <DoctorDashboard onOpenClinic={handleOpenClinic} />
        )}

        {activeRole === 'lab' && <LabDashboard />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  content: {
    flex: 1,
  },
  toastContainer: {
    position: 'absolute',
    top: 50,
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
});
