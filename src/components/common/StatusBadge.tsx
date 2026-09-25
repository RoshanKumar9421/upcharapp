import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface StatusBadgeProps {
  label: string;
  variant?: 'active' | 'success' | 'warning' | 'info' | 'purple' | 'neutral';
  showDot?: boolean;
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'active',
  showDot = false,
  style,
}) => {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      {showDot && <View style={[styles.dot, styles[`${variant}Dot`]]} />}
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
  active: {
    backgroundColor: '#E6F8F3',
  },
  activeDot: {
    backgroundColor: '#0D9488',
  },
  activeText: {
    color: '#0D9488',
  },
  success: {
    backgroundColor: '#DCFCE7',
  },
  successDot: {
    backgroundColor: '#16A34A',
  },
  successText: {
    color: '#16A34A',
  },
  warning: {
    backgroundColor: '#FEF3C7',
  },
  warningDot: {
    backgroundColor: '#D97706',
  },
  warningText: {
    color: '#B45309',
  },
  info: {
    backgroundColor: '#E0F2FE',
  },
  infoDot: {
    backgroundColor: '#0284C7',
  },
  infoText: {
    color: '#0284C7',
  },
  purple: {
    backgroundColor: '#EEF0FB',
  },
  purpleDot: {
    backgroundColor: '#4F46E5',
  },
  purpleText: {
    color: '#4F46E5',
  },
  neutral: {
    backgroundColor: '#F1F5F9',
  },
  neutralDot: {
    backgroundColor: '#64748B',
  },
  neutralText: {
    color: '#475569',
  },
});
