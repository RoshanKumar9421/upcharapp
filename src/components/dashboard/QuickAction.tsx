import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuickActionProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  label,
  iconName,
  color = '#007AFF',
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
        <Ionicons name={iconName} size={22} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 72,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
});
