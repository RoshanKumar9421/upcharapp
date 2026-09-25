import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppHeader } from '../components/home/AppHeader';
import { GreetingBanner } from '../components/home/GreetingBanner';
import { SearchBar } from '../components/home/SearchBar';
import { QuickActions } from '../components/home/QuickActions';
import { LiveTokenCard } from '../components/queue/LiveTokenCard';
import { DoctorCard } from '../components/doctor/DoctorCard';
import { TrustBanner } from '../components/home/TrustBanner';
import { LiveQueueTrackerModal } from '../components/queue/LiveQueueTrackerModal';
import { BookingModal } from '../components/doctor/BookingModal';
import { useQueue } from '../hooks/useQueue';
import {
  mockCurrentUser,
  mockDoctors,
} from '../services/mock/data';
import { Doctor } from '../types/doctor';
import { colors } from '../theme/colors';

interface HomeScreenProps {
  onNavigateToTab?: (tab: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const { session, timeline } = useQueue();

  const filteredDoctors = mockDoctors.filter((doc) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.clinicName.toLowerCase().includes(q)
    );
  });

  const handleQuickAction = (id: string) => {
    if (id === 'appointments' && onNavigateToTab) {
      onNavigateToTab('appointments');
    } else if (id === 'prescriptions' && onNavigateToTab) {
      onNavigateToTab('prescriptions');
    } else if (id === 'doctors' || id === 'clinics') {
      Alert.alert(
        id === 'doctors' ? 'Doctors Directory' : 'Nearby Clinics',
        'Showing available verified clinics & doctors in Indore, MP.'
      );
    }
  };

  const handleBookingConfirm = (
    doctor: Doctor,
    mode: 'queue' | 'slot',
    timeOrToken: string
  ) => {
    Alert.alert(
      'Booking Confirmed!',
      mode === 'queue'
        ? `You have joined the live queue for ${doctor.name}. Your token is ${timeOrToken}.`
        : `Your appointment with ${doctor.name} is confirmed for ${timeOrToken}.`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <AppHeader
          location={mockCurrentUser.city}
          avatarUrl={mockCurrentUser.avatarUrl}
          onPressLocation={() => Alert.alert('Location', 'Currently viewing healthcare services in Indore, MP.')}
          onPressProfile={() => onNavigateToTab && onNavigateToTab('profile')}
        />

        {/* Greeting Banner */}
        <GreetingBanner
          userName={mockCurrentUser.name}
          hasNotifications={true}
          onPressNotifications={() => Alert.alert('Notifications', 'Token #17 confirmed at CityCare Clinic. 4 patients ahead.')}
        />

        {/* Search & Filter Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onPressFilter={() => Alert.alert('Filter', 'Filter by Specialty, Distance, Availability, or Consultation Fee.')}
        />

        {/* Quick Action Grid */}
        <QuickActions onSelectAction={handleQuickAction} />

        {/* Hero Active Live Token Card */}
        <LiveTokenCard
          session={session}
          onPressTrackQueue={() => setIsTrackerOpen(true)}
        />

        {/* Section Header: Nearby Recommended Doctors */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Recommended Doctors</Text>
          <TouchableOpacity
            style={styles.seeAllBtn}
            onPress={() => Alert.alert('Recommended Doctors', 'Listing all 14 verified doctors near you.')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <Feather name="chevron-right" size={15} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Recommended Doctors List */}
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onPressAction={() => setSelectedDoctorForBooking(doctor)}
            onPressInfo={() =>
              Alert.alert(
                doctor.name,
                `${doctor.specialty} at ${doctor.clinicName}\n${doctor.qualifications} • ${doctor.experienceYears} Years Experience\nRating: ${doctor.rating} (${doctor.reviewCount} verified reviews)`
              )
            }
          />
        ))}

        {/* Trust & Assurance Banner */}
        <TrustBanner />
      </ScrollView>

      {/* Live Queue Tracker Modal */}
      <LiveQueueTrackerModal
        visible={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        session={session}
        timeline={timeline}
      />

      {/* Booking / Join Queue Modal */}
      <BookingModal
        visible={!!selectedDoctorForBooking}
        doctor={selectedDoctorForBooking}
        onClose={() => setSelectedDoctorForBooking(null)}
        onConfirmBooking={handleBookingConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0080FF',
  },
});
