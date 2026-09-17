import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  currentUser: User | null;
  selectedRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  register: (userData: { name: string; email: string; role: UserRole; center?: string; phone?: string }) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  setSelectedRole: (role: UserRole) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [selectedRole, setSelectedRoleState] = useState<UserRole>(() => authService.getSelectedRole());

  useEffect(() => {
    if (currentUser) {
      setSelectedRoleState(currentUser.role);
      authService.setSelectedRole(currentUser.role);
    }
  }, [currentUser]);

  const setSelectedRole = useCallback((role: UserRole) => {
    setSelectedRoleState(role);
    authService.setSelectedRole(role);
  }, []);

  const login = useCallback((email: string, role?: UserRole) => {
    const result = authService.login(email, role);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      setSelectedRoleState(result.user.role);
      return true;
    }
    return false;
  }, []);

  const register = useCallback((userData: { name: string; email: string; role: UserRole; center?: string; phone?: string }) => {
    const result = authService.register(userData);
    if (result.success) {
      setCurrentUser(result.user);
      setSelectedRoleState(result.user.role);
      return true;
    }
    return false;
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const newUser = authService.switchDemoRole(role);
    setCurrentUser(newUser);
    setSelectedRoleState(role);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
  }, []);

  const updateCurrentUser = useCallback((updates: Partial<User>) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      authService.setCurrentUser(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        selectedRole,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        switchRole,
        setSelectedRole,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
