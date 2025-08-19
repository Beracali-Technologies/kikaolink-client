import api, { initializeApi } from '../lib/axios';
import { useAuthStore } from '../lib/stores/authStore';
import { TUser, TLoginCredentials } from '../../types'; // Use your actual types

// Login function (already exists)
export const loginUser = async (credentials: TLoginCredentials) => {
    await initializeApi();
    const response = await api.post('/api/login', credentials);
    useAuthStore.setState({ user: response.data, isAuthenticated: true });
};

// Logout function (already exists)
export const logoutUser = async () => {
    await api.post('/api/logout');
    useAuthStore.setState({ user: null, isAuthenticated: false });
};

// --- THIS IS THE NEW, CRITICAL FUNCTION ---
// It will check if a valid session cookie exists and fetch the user.
export const checkAuthStatus = async (): Promise<void> => {
    try {
        const { data } = await api.get('/api/user');
        if (data) {
            useAuthStore.setState({ user: data, isAuthenticated: true });
        }
    } catch (error) {
        // If the request fails (e.g., 401), it means no active session.
        // We ensure the state is logged out.
        useAuthStore.setState({ user: null, isAuthenticated: false });
    }
};
