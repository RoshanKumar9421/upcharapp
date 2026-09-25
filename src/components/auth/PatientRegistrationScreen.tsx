import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { GenderType, GenderSelector } from './GenderSelector';
import { RegistrationHeader } from './RegistrationHeader';
import { ProfilePhotoPicker } from './ProfilePhotoPicker';
import { PhoneVerificationInput } from './PhoneVerificationInput';
import { BloodGroupPicker } from './BloodGroupPicker';

interface PatientRegistrationScreenProps {
  onBackToLogin: () => void;
  onSuccessRegistration?: () => void;
}

export const PatientRegistrationScreen: React.FC<PatientRegistrationScreenProps> = ({
  onBackToLogin,
  onSuccessRegistration,
}) => {
  const { registerPatient } = useAuth();

  // Form State
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [dateOfBirth, setDateOfBirth] = useState('14 / 08 / 1996');
  const [gender, setGender] = useState<GenderType>('male');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [isPhoneVerified, setIsPhoneVerified] = useState(true);

  // Optional State
  const [avatarUri, setAvatarUri] = useState<string | undefined>(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  );
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [bloodGroup, setBloodGroup] = useState<string>('O+');
  const [address, setAddress] = useState(
    'Flat 402, Green Valley Apartments, MG Road, New Delhi'
  );

  const handleSubmit = () => {
    if (!fullName.trim()) {
      Alert.alert('Required Field', 'Please enter your Full Name.');
      return;
    }
    if (!dateOfBirth.trim()) {
      Alert.alert('Required Field', 'Please enter your Date of Birth.');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      Alert.alert(
        'Required Field',
        'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    registerPatient({
      fullName,
      dateOfBirth,
      gender,
      mobileNumber,
      isPhoneVerified,
      email,
      bloodGroup,
      address,
      avatarUri,
    });

    onSuccessRegistration?.();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFD" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top App Bar with Emblem */}
        <Animated.View entering={FadeInDown.duration(400)}>
          <RegistrationHeader onBack={onBackToLogin} />
        </Animated.View>

        {/* Onboarding Capsule & Subtitle */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(100)}
          style={styles.onboardingPillRow}
        >
          <View style={styles.onboardingPill}>
            <Ionicons name="person-circle-outline" size={13} color="#059669" />
            <Text style={styles.onboardingPillText}>Patient Account Setup</Text>
          </View>
          <Text style={styles.bulletSeparator}>•</Text>
          <Text style={styles.quickOnboardingText}>Quick Onboarding</Text>
        </Animated.View>

        {/* Title and Explanation */}
        <Animated.View entering={FadeInDown.duration(400).delay(150)}>
          <Text style={styles.headingTitle}>Create Patient Profile</Text>
          <Text style={styles.headingSubtitle}>
            Complete your basic health profile to book appointments, consult
            certified doctors, and store digital records securely.
          </Text>
        </Animated.View>

        {/* Profile Photo Card (Optional) */}
        <Animated.View entering={FadeInDown.duration(400).delay(200)}>
          <ProfilePhotoPicker
            avatarUri={avatarUri}
            onPhotoSelected={(uri) => setAvatarUri(uri)}
          />
        </Animated.View>

        {/* Card: Required Details */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(250)}
          style={styles.card}
        >
          {/* Section Header */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleWithDot}>
              <View style={styles.blueDot} />
              <Text style={styles.cardSectionTitle}>REQUIRED DETAILS</Text>
            </View>
            <Text style={styles.mandatoryBadge}>* Mandatory</Text>
          </View>

          {/* Full Name Input */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <Text style={styles.requiredAsterisk}> *</Text>
            </View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="id-card-outline"
                size={18}
                color="#64748B"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name (e.g. Rahul Sharma)"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Date of Birth Input */}
          <View style={styles.fieldGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <Text style={styles.requiredAsterisk}> *</Text>
            </View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color="#64748B"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#94A3B8"
              />
              <Ionicons name="calendar" size={18} color="#94A3B8" />
            </View>
          </View>

          {/* Gender Selector */}
          <GenderSelector
            selectedGender={gender}
            onSelectGender={(g) => setGender(g)}
          />

          {/* Mobile Number Verification */}
          <PhoneVerificationInput
            value={mobileNumber}
            onChangeText={setMobileNumber}
            isVerified={isPhoneVerified}
            onVerifiedChange={setIsPhoneVerified}
          />
        </Animated.View>

        {/* Card: Medical & Contact Info (Optional) */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(350)}
          style={styles.card}
        >
          {/* Section Header */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleWithDot}>
              <View style={styles.grayDot} />
              <Text style={styles.cardSectionTitle}>
                MEDICAL & CONTACT INFO (OPTIONAL)
              </Text>
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email Address (Optional)</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={18}
                color="#64748B"
                style={styles.fieldIcon}
              />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="rahul.sharma@example.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <Text style={styles.fieldHelperText}>
              For consultation receipts and digital prescriptions
            </Text>
          </View>

          {/* Blood Group Dropdown Picker */}
          <BloodGroupPicker
            value={bloodGroup}
            onSelect={(bg) => setBloodGroup(bg)}
          />

          {/* Address Multiline Input */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Address (Optional)</Text>
            <View style={[styles.inputContainer, styles.multilineContainer]}>
              <Ionicons
                name="location-outline"
                size={18}
                color="#64748B"
                style={[styles.fieldIcon, { marginTop: 4 }]}
              />
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address (e.g. Flat 402, Green Valley Apartments, MG Road, New Delhi)"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </Animated.View>

        {/* Bottom CTA Button */}
        <Animated.View entering={FadeInDown.duration(400).delay(450)}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              Create Account & Continue
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Already registered Footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>Already registered? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onBackToLogin}>
              <Text style={styles.footerLink}>Sign In ›</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 40,
  },
  onboardingPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  onboardingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  onboardingPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#059669',
  },
  bulletSeparator: {
    fontSize: 12,
    color: '#94A3B8',
  },
  quickOnboardingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  headingSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#475569',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blueDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#0080FF',
  },
  grayDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#94A3B8',
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  mandatoryBadge: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#DC2626',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  requiredAsterisk: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fieldIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
    paddingVertical: 0,
  },
  multilineContainer: {
    height: 'auto',
    minHeight: 74,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  fieldHelperText: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#0080FF',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 16,
    shadowColor: '#0080FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerPrompt: {
    fontSize: 13.5,
    color: '#475569',
  },
  footerLink: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0080FF',
  },
});
