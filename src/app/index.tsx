import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/HomeScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { PrescriptionsScreen } from '../screens/PrescriptionsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { BottomTabBar, TabType } from '../components/navigation/BottomTabBar';

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen onNavigateToTab={(tab) => setActiveTab(tab as TabType)} />}
        {activeTab === 'appointments' && <AppointmentsScreen />}
        {activeTab === 'prescriptions' && <PrescriptionsScreen />}
        {activeTab === 'profile' && <ProfileScreen onSelectRole={() => {}} />}
      </View>

      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});
