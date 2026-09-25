import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from './AppButton';

interface OfflineStateProps {
  onCheckAgain?: () => void;
}

export const OfflineState: React.FC<OfflineStateProps> = ({ onCheckAgain }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="cloud-offline-outline" size={32} color="#64748B" />
      </View>
      <Text style={styles.title}>You are Offline</Text>
      <Text style={styles.message}>
        Please check your internet connection to sync real-time clinic appointments.
      </Text>
      {onCheckAgain && (
        <AppButton
          title="Check Again"
          onPress={onCheckAgain}
          size="medium"
          style={styles.btn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  btn: {
    marginTop: 16,
  },
});
