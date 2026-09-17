import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

const AUTH_STORAGE_KEY = 'ekalavya_auth_user';
const SELECTED_ROLE_KEY = 'ekalavya_selected_role';

export const authService = {
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Default to student demo user if nothing is logged in yet
    return DEMO_USERS.student;
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  getSelectedRole(): UserRole {
    try {
      const stored = localStorage.getItem(SELECTED_ROLE_KEY);
      if (stored && ['student', 'teacher', 'mentor', 'admin'].includes(stored)) {
        return stored as UserRole;
      }
    } catch {
      // fallback
    }
    return 'student';
  },

  setSelectedRole(role: UserRole): void {
    localStorage.setItem(SELECTED_ROLE_KEY, role);
  },

  login(email: string, role?: UserRole): { success: boolean; user?: User; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    
    // Find matching demo user by email or by chosen role
    const matchedRole = Object.keys(DEMO_USERS).find(
      (r) => DEMO_USERS[r].email.toLowerCase() === cleanEmail
    ) as UserRole | undefined;

    const targetRole = role || matchedRole || 'student';
    const demoUser = DEMO_USERS[targetRole];

    if (demoUser) {
      // Create a user instance
      const user: User = {
        ...demoUser,
        email: cleanEmail || demoUser.email,
        role: targetRole,
      };
      this.setCurrentUser(user);
      this.setSelectedRole(targetRole);
      return { success: true, user };
    }

    // Generic fallback for any email
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email: cleanEmail,
      role: targetRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'September 2026',
      center: 'Ranchi Learning Center',
    };
    this.setCurrentUser(newUser);
    this.setSelectedRole(targetRole);
    return { success: true, user: newUser };
  },

  register(userData: {
    name: string;
    email: string;
    role: UserRole;
    center?: string;
    phone?: string;
  }): { success: boolean; user: User } {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase(),
      role: userData.role,
      center: userData.center || 'Ranchi Learning Center',
      phone: userData.phone || '+91 98000 00000',
      avatar: userData.role === 'student'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'September 2026',
    };

    this.setCurrentUser(newUser);
    this.setSelectedRole(newUser.role);
    return { success: true, user: newUser };
  },

  switchDemoRole(role: UserRole): User {
    const demo = DEMO_USERS[role];
    this.setCurrentUser(demo);
    this.setSelectedRole(role);
    return demo;
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getRoleDashboardPath(role: UserRole): string {
    switch (role) {
      case 'student':
        return '/student/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'mentor':
        return '/mentor/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  },
};
