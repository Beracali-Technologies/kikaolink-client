import { create } from 'zustand';
import { TUser, TLoginCredentials, TSignupCredentials } from '@/types';
import { loginUser, logoutUser, checkAuthStatus, registerUser } from '../../services/authService';

interface AuthState {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  hasCheckedAuth: boolean;
  login: (credentials: TLoginCredentials) => Promise<void>;
  signup: (credentials: TSignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
  hasCheckedAuth: false,

  login: async (credentials) => {
    const response = await loginUser(credentials);
    if (response.token || response.access_token) {
      set({ isAuthenticated: true });
    }
  },

  signup: async (credentials) => {
    const response = await registerUser(credentials);
    if (response.token || response.access_token) {
      set({ isAuthenticated: true });
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null, isAuthenticated: false, hasCheckedAuth: false });
  },

  checkAuth: async () => {
    if (get().hasCheckedAuth) {
      return;
    }

    set({ isAuthLoading: true });

    try {
      const data = await checkAuthStatus();
      set({ user: data, hasCheckedAuth: true, isAuthLoading: false, isAuthenticated: !!data });
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
