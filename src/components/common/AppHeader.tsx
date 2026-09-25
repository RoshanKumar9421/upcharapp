import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  icon?: React.ReactNode;
  rightActions?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onBack,
  icon,
  rightActions,
}) => {
  return (
    <View style={styles.navBar}>
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.navBackBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#1E293B" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} />
      )}

      <View style={styles.navTitleContainer}>
        {icon}
        <Text style={styles.navTitle}>{title}</Text>
      </View>

      <View style={styles.navRightActions}>
        {rightActions}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  navBackBtn: {
    padding: 6,
    borderRadius: 8,
  },
  navTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  navRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
