import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

interface PatientDashboardProps {
  onNavigateToClinicDetail?: (clinicId: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onNavigateToClinicDetail,
}) => {
  const { user } = useAuth();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Patient Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri:
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            }}
            style={styles.avatar}
          />
          <View>
            <View style={styles.greetingRow}>
              <Text style={styles.greetingText}>Namaste,</Text>
              <Text style={styles.userName}>{user?.name || 'Rahul Verma'}</Text>
            </View>
            <View style={styles.uhidBadgeRow}>
              <View style={styles.uhidBadge}>
                <Ionicons name="card-outline" size={12} color="#0080FF" />
                <Text style={styles.uhidText}>
                  {user?.identifier || 'UPC-PAT-882910'}
                </Text>
              </View>
              <View style={styles.bloodBadge}>
                <Text style={styles.bloodText}>O+ Positive</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View style={styles.unreadDot} />
        </TouchableOpacity>
      </View>

      {/* 2. Search Healthcare Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors, clinics, tests, medicines..."
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color="#0080FF" />
        </TouchableOpacity>
      </View>

      {/* 3. Live OPD Queue Tracker Card (PRD Core Feature) */}
      <View style={styles.liveQueueCard}>
        <View style={styles.queueHeaderRow}>
          <View style={styles.liveIndicator}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveIndicatorText}>LIVE OPD QUEUE</Text>
          </View>
          <Text style={styles.clinicTag}>City Care Clinic</Text>
        </View>

        <View style={styles.queueBody}>
          <View style={styles.doctorInfoRow}>
            <MaterialCommunityIcons
              name="stethoscope"
              size={20}
              color="#0080FF"
            />
            <Text style={styles.doctorNameText}>
              Dr. Rajesh Sharma (General Physician)
            </Text>
          </View>

          <View style={styles.tokenHighlightRow}>
            <View style={styles.tokenBox}>
              <Text style={styles.tokenBoxLabel}>YOUR TOKEN</Text>
              <Text style={styles.tokenBoxValue}>#04</Text>
            </View>

            <View style={styles.tokenDivider} />

            <View style={styles.tokenBox}>
              <Text style={styles.tokenBoxLabel}>NOW SERVING</Text>
              <Text style={[styles.tokenBoxValue, { color: '#0D9488' }]}>
                #02
              </Text>
            </View>

            <View style={styles.tokenDivider} />

            <View style={styles.tokenBox}>
              <Text style={styles.tokenBoxLabel}>WAIT TIME</Text>
              <Text style={[styles.tokenBoxValue, { color: '#F59E0B' }]}>
                ~18m
              </Text>
            </View>
          </View>

          <View style={styles.queueFooterRow}>
            <View style={styles.aheadBadge}>
              <Ionicons name="time-outline" size={14} color="#0369A1" />
              <Text style={styles.aheadText}>
                2 patients ahead • Please proceed to clinic room 2
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewQueueDetailsBtn}
              onPress={() => onNavigateToClinicDetail?.('city-care')}
            >
              <Text style={styles.viewQueueDetailsText}>View Schedule</Text>
              <Ionicons name="chevron-forward" size={14} color="#0080FF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 4. Quick Actions Grid */}
      <Text style={styles.sectionTitle}>Healthcare Services</Text>
      <View style={styles.quickGrid}>
        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.8}
          onPress={() => onNavigateToClinicDetail?.('city-care')}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="person-add-outline" size={24} color="#0080FF" />
          </View>
          <Text style={styles.gridTitle}>Find Doctor</Text>
          <Text style={styles.gridSubtitle}>Consult OPD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          activeOpacity={0.8}
          onPress={() => onNavigateToClinicDetail?.('city-care')}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
            <Ionicons name="people-outline" size={24} color="#10B981" />
          </View>
          <Text style={styles.gridTitle}>Live Queue</Text>
          <Text style={styles.gridSubtitle}>Track Token</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
          <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
            <Ionicons name="flask-outline" size={24} color="#9333EA" />
          </View>
          <Text style={styles.gridTitle}>Lab Tests</Text>
          <Text style={styles.gridSubtitle}>Book Sample</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
          <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="document-text-outline" size={24} color="#D97706" />
          </View>
          <Text style={styles.gridTitle}>Health Rx</Text>
          <Text style={styles.gridSubtitle}>My Records</Text>
        </TouchableOpacity>
      </View>

      {/* 5. Recent Reports & Prescriptions */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Recent Diagnostic Reports</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportCard}>
        <View style={styles.reportIconBox}>
          <Ionicons name="document-attach-outline" size={24} color="#0D9488" />
        </View>
        <View style={styles.reportDetails}>
          <Text style={styles.reportName}>Complete Blood Count (CBC) + ESR</Text>
          <Text style={styles.reportLab}>Apex Diagnostic Centre • 24 Sep 2026</Text>
          <View style={styles.readyBadge}>
            <Ionicons name="checkmark-circle" size={13} color="#16A34A" />
            <Text style={styles.readyText}>Verified Report Ready</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.downloadBtn}>
          <Ionicons name="arrow-down-circle" size={26} color="#0080FF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#0080FF',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  greetingText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  uhidBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  uhidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  uhidText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0080FF',
  },
  bloodBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  bloodText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  notificationBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    marginLeft: 10,
  },
  filterBtn: {
    padding: 6,
  },
  liveQueueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  queueHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#16A34A',
  },
  liveIndicatorText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
    letterSpacing: 0.5,
  },
  clinicTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369A1',
  },
  queueBody: {
    gap: 12,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  doctorNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  tokenHighlightRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tokenBox: {
    alignItems: 'center',
  },
  tokenBoxLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  tokenBoxValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0080FF',
  },
  tokenDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E2E8F0',
  },
  queueFooterRow: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 2,
  },
  aheadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  aheadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369A1',
    flex: 1,
  },
  viewQueueDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingVertical: 2,
  },
  viewQueueDetailsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0080FF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0080FF',
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  gridSubtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  reportIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportDetails: {
    flex: 1,
  },
  reportName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  reportLab: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  readyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },
  downloadBtn: {
    padding: 4,
  },
});
