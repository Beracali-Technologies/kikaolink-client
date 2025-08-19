import { create } from 'zustand';
import { TUser, TLoginCredentials } from '../../types';
import { loginUser, logoutUser, checkAuthStatus } from '../../services/authService';

interface AuthState {
    user: TUser | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    login: (credentials: TLoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isAuthLoading: true, // Start in a loading state

    login: async (credentials) => {
        await loginUser(credentials);
    },
    logout: async () => {
        await logoutUser();
    },
    // --- IMPLEMENT THE NEW ACTION ---
    checkAuth: async () => {
        set({ isAuthLoading: true });
        await checkAuthStatus();
        set({ isAuthLoading: false });
    },
}));
