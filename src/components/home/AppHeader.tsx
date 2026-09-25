import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UpcharLogo } from '../common/UpcharLogo';
import { colors } from '../../theme/colors';

interface AppHeaderProps {
  location?: string;
  avatarUrl?: string;
  onPressLocation?: () => void;
  onPressProfile?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  location = 'Indore, MP',
  avatarUrl = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
  onPressLocation,
  onPressProfile,
}) => {
  return (
    <View style={styles.container}>
      <UpcharLogo size="medium" />

      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.locationPill}
          onPress={onPressLocation}
          activeOpacity={0.7}
        >
          <Ionicons name="location-outline" size={15} color={colors.primary} />
          <Text style={styles.locationText}>{location}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressProfile} activeOpacity={0.8} style={styles.avatarButton}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 5,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  avatarButton: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
