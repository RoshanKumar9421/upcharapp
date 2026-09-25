import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, UserProfile } from '../types/auth';
import { DEMO_USERS } from '../constants/roleConfig';

interface AuthContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  user: UserProfile | null;
  rememberDevice: boolean;
  setRememberDevice: (remember: boolean) => void;
  signIn: (roleOverride?: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('patient');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [rememberDevice, setRememberDevice] = useState<boolean>(true);

  const signIn = (roleOverride?: UserRole) => {
    const roleToLogin = roleOverride || activeRole;
    setActiveRole(roleToLogin);
    setUser(DEMO_USERS[roleToLogin]);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        activeRole,
        setActiveRole,
        isAuthenticated,
        user,
        rememberDevice,
        setRememberDevice,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
