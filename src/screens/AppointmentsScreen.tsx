import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockAppointments } from '../services/mock/data';
import { colors } from '../theme/colors';

export const AppointmentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <Text style={styles.subtitle}>Track upcoming visits and live queue tokens</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {mockAppointments.map((apt) => (
          <View key={apt.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: apt.doctorAvatarUrl }} style={styles.avatar} />
              <View style={styles.details}>
                <Text style={styles.docName}>{apt.doctorName}</Text>
                <Text style={styles.specialty}>{apt.specialty}</Text>
                <Text style={styles.clinic}>{apt.clinicName}</Text>
              </View>
              <View style={[styles.badge, apt.status === 'confirmed' ? styles.badgeConfirmed : styles.badgePending]}>
                <Text
                  style={[
                    styles.badgeText,
                    apt.status === 'confirmed' ? styles.badgeTextConfirmed : styles.badgeTextPending,
                  ]}
                >
                  {apt.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={15} color={colors.primary} />
                <Text style={styles.metaText}>{apt.appointmentDate}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={15} color={colors.primary} />
                <Text style={styles.metaText}>{apt.appointmentTime}</Text>
              </View>
              {apt.tokenNumber && (
                <View style={styles.tokenPill}>
                  <Text style={styles.tokenText}>Token #{apt.tokenNumber}</Text>
                </View>
              )}
            </View>

            <View style={styles.actionRow}>
              {apt.isQueueEnabled && (
                <TouchableOpacity
                  style={styles.trackBtn}
                  onPress={() => Alert.alert('Live Queue', `Now tracking appointment at ${apt.clinicName}`)}
                >
                  <Text style={styles.trackBtnText}>Live Tracker</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => Alert.alert('Appointment Details', `Consultation fee: ₹${apt.fee}\nStatus: ${apt.status}`)}
              >
                <Text style={styles.detailsBtnText}>View Details</Text>
              </TouchableOpacity>
            </View>
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
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  details: {
    flex: 1,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  specialty: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  clinic: {
    fontSize: 12,
    color: '#64748B',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeConfirmed: {
    backgroundColor: '#DCFCE7',
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextConfirmed: {
    color: '#16A34A',
  },
  badgeTextPending: {
    color: '#D97706',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  tokenPill: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  tokenText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0080FF',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trackBtn: {
    flex: 1,
    backgroundColor: '#0080FF',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  detailsBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailsBtnText: {
    color: '#1E293B',
    fontWeight: '600',
    fontSize: 13,
  },
});
