import api, { initializeApi } from '../lib/axios';
import { useAuthStore } from '../lib/stores/authStore';
import { TUser, TLoginCredentials } from '../../types';

// Called on successful login
export const loginUser = async (credentials: TLoginCredentials) => {
    const response = await api.post('/api/login', credentials);
    useAuthStore.setState({ user: response.data, isAuthenticated: true });
};

// Called when checking auth on app startup
export const checkAuthStatus = async () => {
    try {
        const { data } = await api.get('/api/user');
        useAuthStore.setState({ user: data, isAuthenticated: true });
    } catch (error) {
        // If this fails, it means the user is not logged in.
        // We must ensure the state is clean.
        useAuthStore.setState({ user: null, isAuthenticated: false });
        throw error; // Re-throw the error so AppInitializer can see it failed
    }
};

// Called on logout
export const logoutUser = async () => {
    await api.post('/api/logout');
    useAuthStore.setState({ user: null, isAuthenticated: false });
};
