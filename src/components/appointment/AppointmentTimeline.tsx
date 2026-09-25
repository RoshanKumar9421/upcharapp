import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface AppointmentTimelineProps {
  events?: TimelineEvent[];
}

export const AppointmentTimeline: React.FC<AppointmentTimelineProps> = ({
  events = [
    { time: '09:00 AM', title: 'Clinic Opens', description: 'Reception desk ready', isCompleted: true },
    { time: '09:30 AM', title: 'First Patient Expected', description: 'Token #1 S. Dutta', isCompleted: false },
    { time: '12:00 PM', title: 'Morning OPD Ends', description: 'Break until 05:00 PM', isCompleted: false },
  ],
}) => {
  return (
    <View style={styles.container}>
      {events.map((event, idx) => (
        <View key={idx} style={styles.eventRow}>
          <View style={styles.indicatorCol}>
            <View style={[styles.circle, event.isCompleted && styles.circleCompleted]} />
            {idx < events.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.contentCol}>
            <Text style={styles.time}>{event.time}</Text>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 24,
    marginRight: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CBD5E1',
    marginTop: 4,
  },
  circleCompleted: {
    backgroundColor: '#007AFF',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  contentCol: {
    flex: 1,
  },
  time: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: '#64748B',
  },
});
