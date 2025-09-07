import { create } from 'zustand';

import { TUser, TLoginCredentials } from '@/types/user';
import { loginUser, logoutUser, checkAuthStatus } from '../../services/authService';

interface AuthState {
    user: TUser | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean; // For the initial app load check
    login: (credentials: TLoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isAuthLoading: true, // App starts in a loading state

    login: async (credentials) => {
        await loginUser(credentials);
        // After login, we know the user is authenticated.
        const user = useAuthStore.getState().user;
        set({ isAuthenticated: !!user });
    },

    logout: async () => {
        await logoutUser();
        set({ user: null, isAuthenticated: false });
    },

    // --- THIS IS THE CORRECTED LOGIC ---
    checkAuth: async () => {
        try {
            // Attempt to fetch the user.
            // checkAuthStatus service will update the store internally on success.
            await checkAuthStatus();
        } catch (error) {
            // If it fails, the service already logged us out in the store.
            // We just need to log that it happened.
            console.log("No active session found.");
        } finally {
            // *** This is the crucial part that was missing ***
            // No matter what happens, after the check is done, stop the initial loading state.
            set({ isAuthLoading: false });
        }
    },
}));
