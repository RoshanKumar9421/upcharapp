import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from './AppButton';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message = 'We encountered an error loading the schedule. Please try again.',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="alert-circle-outline" size={32} color="#EF4444" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <AppButton
          title="Retry"
          onPress={onRetry}
          variant="outline"
          size="medium"
          style={styles.retryBtn}
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
    backgroundColor: '#FEF2F2',
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
  retryBtn: {
    marginTop: 16,
  },
});
