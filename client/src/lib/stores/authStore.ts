// authStore.ts
import { create } from 'zustand';
import { TUser, TLoginCredentials } from '@/types';
import { loginUser, logoutUser, checkAuthStatus } from '../../services/authService';

interface AuthState {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  hasCheckedAuth: boolean; // NEW: Track if we've already checked
  login: (credentials: TLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
  hasCheckedAuth: false, // Initialize as false

  login: async (credentials) => {
    await loginUser(credentials);
    set({ isAuthenticated: true });
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, isAuthenticated: false, hasCheckedAuth: false });
  },

  checkAuth: async () => {
    // Prevent multiple simultaneous auth checks
    if (get().hasCheckedAuth) {
      return;
    }

    set({ isAuthLoading: true });

    try {
      await checkAuthStatus();
      set({ hasCheckedAuth: true, isAuthLoading: false });
    } catch (error) {
      console.log("No active session found.");
      set({
        user: null,
        isAuthenticated: false,
        hasCheckedAuth: true,
        isAuthLoading: false
      });
    }
  },
}));
