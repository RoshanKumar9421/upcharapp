import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface DividerProps {
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    width: '100%',
  },
});
