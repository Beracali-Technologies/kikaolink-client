import api from '../lib/axios';
import { useAuthStore } from '../lib/stores/authStore';
import { TLoginCredentials } from '@/types/user';
import { storeAuthToken, clearAuthToken } from '../lib/utils/tokenUtils';
import { initializeCsrfCookie } from './eventService';
import api from '../lib/axios';


// Function to initialize Sanctum's CSRF cookie
export const initializeCsrfCookie = () => {
    return api.get('/sanctum/csrf-cookie');
};

export const loginUser = async (credentials: TLoginCredentials) => {
          await initializeCsrfCookie();

  const response = await api.post('/api/login', credentials);

  // ADD THESE LINES to store the token
  if (response.data.token) {
    storeAuthToken(response.data.token);
  } else if (response.data.access_token) {
    storeAuthToken(response.data.access_token);
  } else {
    console.warn('No token found in login response. Please check your API response format.');
  }

  useAuthStore.setState({ user: response.data, isAuthenticated: true });
};


// Called when checking auth on app startup
export const checkAuthStatus = async () => {
    try {
        const { data } = await api.get('/api/user');
        useAuthStore.setState({ user: data, isAuthenticated: true });

        return data;

    } catch (error) {

            //clear token on token failure
            clearAuthToken();

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
