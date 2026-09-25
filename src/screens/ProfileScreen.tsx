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
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { mockCurrentUser } from '../services/mock/data';
import { colors } from '../theme/colors';

interface ProfileScreenProps {
  onSelectRole?: (role: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSelectRole }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account & Health Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: mockCurrentUser.avatarUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{mockCurrentUser.name}</Text>
            <Text style={styles.userCity}>{mockCurrentUser.city} • Patient ID: UP-82910</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>ROLE: {mockCurrentUser.role.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Quick Health Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>B+</Text>
            <Text style={styles.statLabel}>Blood Group</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>28 yrs</Text>
            <Text style={styles.statLabel}>Age</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>1 Active</Text>
            <Text style={styles.statLabel}>Token In Queue</Text>
          </View>
        </View>

        {/* Multi-Role Switcher Demo (PRD §6 & TRD §6) */}
        <Text style={styles.sectionHeader}>Ecosystem Role Views (PRD §6)</Text>
        <View style={styles.rolesGrid}>
          {[
            { id: 'patient', label: 'Patient App', icon: 'person' },
            { id: 'doctor', label: 'Doctor Dashboard', icon: 'medkit' },
            { id: 'clinic', label: 'Clinic Ops', icon: 'business' },
            { id: 'medical', label: 'Medical Store', icon: 'cart' },
            { id: 'diagnostic', label: 'Diagnostics', icon: 'flask' },
          ].map((r) => (
            <TouchableOpacity
              key={r.id}
              style={[styles.roleBtn, r.id === 'patient' && styles.activeRoleBtn]}
              onPress={() => {
                if (onSelectRole) onSelectRole(r.id);
                Alert.alert(
                  'Role Workspace',
                  `Switched context to ${r.label}. The navigation and permissions adapt to role "${r.id}".`
                );
              }}
            >
              <Ionicons
                name={r.icon as any}
                size={18}
                color={r.id === 'patient' ? colors.primary : '#475569'}
              />
              <Text style={[styles.roleBtnText, r.id === 'patient' && styles.activeRoleBtnText]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionHeader}>Preferences & Support</Text>
        <View style={styles.menuContainer}>
          {[
            { icon: 'document-text-outline', label: 'Medical History & Documents' },
            { icon: 'notifications-outline', label: 'Notification Settings' },
            { icon: 'lock-closed-outline', label: 'Privacy & Security (Supabase RLS)' },
            { icon: 'call-outline', label: '24/7 Upchar Emergency Helpline' },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.menuItem}
              onPress={() => Alert.alert(item.label, 'Feature active and synchronized with Upchar Health backend.')}
            >
              <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              <Text style={styles.menuText}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  userCity: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 6,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
    marginTop: 8,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  roleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeRoleBtn: {
    backgroundColor: '#EFF6FF',
    borderColor: '#0080FF',
  },
  roleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeRoleBtnText: {
    color: '#0080FF',
    fontWeight: '700',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
});
