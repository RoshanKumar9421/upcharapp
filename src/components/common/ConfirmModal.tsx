import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { AppButton } from './AppButton';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <AppButton
              title={cancelLabel}
              onPress={onCancel}
              variant="secondary"
              size="medium"
              style={styles.btn}
            />
            <AppButton
              title={confirmLabel}
              onPress={onConfirm}
              variant={isDestructive ? 'danger' : 'primary'}
              size="medium"
              style={styles.btn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 340,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  message: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
  },
});
