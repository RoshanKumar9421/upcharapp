import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

interface AvatarProps {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: number;
  bordered?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 48,
  bordered = false,
}) => {
  const borderRadius = size / 2;

  if (source) {
    const imgSource = typeof source === 'string' ? { uri: source } : source;
    return (
      <Image
        source={imgSource}
        style={[
          styles.image,
          { width: size, height: size, borderRadius },
          bordered && styles.border,
        ]}
      />
    );
  }

  const initial = name ? name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <View
      style={[
        styles.fallback,
        { width: size, height: size, borderRadius },
        bordered && styles.border,
      ]}
    >
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#E2E8F0',
  },
  fallback: {
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontWeight: '700',
    color: '#0284C7',
  },
  border: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
