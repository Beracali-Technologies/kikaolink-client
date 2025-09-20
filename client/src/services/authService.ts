import api from '../lib/axios';
import { useAuthStore } from '../lib/stores/authStore';
import { TLoginCredentials } from '@/types/user';
import { storeAuthToken, getAuthToken } from '../lib/utils/tokenUtils';




// Initialize CSRF once at app start
export const initializeCsrf = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
    console.log('CSRF token initialized');
  } catch (error) {
    console.error('Failed to initialize CSRF token:', error);
  }
};

export const loginUser = async (credentials: TLoginCredentials) => {
  // CSRF should already be initialized from app startup
  const response = await api.post('/api/login', credentials);

  if (response.data.token) {
    storeAuthToken(response.data.token);
  } else if (response.data.access_token) {
    storeAuthToken(response.data.access_token);
  }

  return response.data;
};

export const checkAuthStatus = async () => {
  // Check if we have a token before making the request
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const { data } = await api.get('/api/user');
  return data;
};

// Called on logout
export const logoutUser = async () => {
    await api.post('/api/logout');
    useAuthStore.setState({ user: null, isAuthenticated: false });
};
