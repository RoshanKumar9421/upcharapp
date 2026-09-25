import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderCardProps {
  orderId: string;
  itemsCount: number;
  totalAmount: string;
  status: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  itemsCount,
  totalAmount,
  status,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.items}>{itemsCount} items</Text>
        <Text style={styles.amount}>{totalAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  orderId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  status: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D9488',
  },
  items: {
    fontSize: 12,
    color: '#64748B',
  },
  amount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007AFF',
  },
});
