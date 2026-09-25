import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InventoryAlertProps {
  itemName: string;
  remainingUnits: number;
}

export const InventoryAlert: React.FC<InventoryAlertProps> = ({
  itemName,
  remainingUnits,
}) => {
  return (
    <View style={styles.card}>
      <Ionicons name="warning-outline" size={18} color="#D97706" />
      <View style={styles.info}>
        <Text style={styles.name}>{itemName}</Text>
        <Text style={styles.units}>Only {remainingUnits} units remaining in pharmacy stock</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 8,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  units: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
});
