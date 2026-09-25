export type UserRole = 'patient' | 'doctor' | 'lab';

export interface RoleConfig {
  role: UserRole;
  title: string;
  subtitle: string;
  iconName: string; // Ionicons name
  identifierLabel: string;
  identifierPlaceholder: string;
  identifierRightActionText: string;
  defaultEmailOrId: string;
  demoPassword: string;
  portalName: string;
  primaryColor: string;
  badgeText: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  identifier: string; // UHID or Registration No or Lab ID
  email?: string;
  phone?: string;
  avatarUrl?: string;
  specialtyOrTagline?: string;
  isVerified?: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  activeRole: UserRole;
  user: UserProfile | null;
  rememberDevice: boolean;
}
