import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../common/Avatar';

interface PatientCardProps {
  name: string;
  age?: number;
  gender?: string;
  lastVisit?: string;
  onPress?: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  name,
  age,
  gender,
  lastVisit,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.card}>
      <Avatar name={name} size={40} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {(age || gender) && (
          <Text style={styles.subtext}>
            {gender ? `${gender}, ` : ''}{age ? `${age} yrs` : ''}
          </Text>
        )}
      </View>
      {lastVisit && <Text style={styles.visitText}>{lastVisit}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtext: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  visitText: {
    fontSize: 11,
    color: '#94A3B8',
  },
});
