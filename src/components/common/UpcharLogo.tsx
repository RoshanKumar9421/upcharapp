import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface UpcharLogoProps {
  size?: 'small' | 'medium';
}

export const UpcharLogo: React.FC<UpcharLogoProps> = ({ size = 'medium' }) => {
  const iconSize = size === 'small' ? 22 : 28;

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name="medical-bag" size={iconSize * 0.75} color="#DC2626" />
        <View style={styles.orbitRing} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.brandTitle}>UPCHAR</Text>
        <Text style={styles.brandSubtitle}>HEALTH</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#DC2626',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    position: 'relative',
  },
  orbitRing: {
    position: 'absolute',
    width: 38,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0284C7',
    transform: [{ rotate: '45deg' }],
  },
  textContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1.5,
    lineHeight: 12,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 2,
    lineHeight: 10,
  },
});
