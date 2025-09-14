import axios from 'axios';
import { getAuthToken, clearAuthToken } from './utils/tokenUtils';
import { useAuthStore } from './stores/authStore';



// Fallback to your default local server URL if the variable is not set.
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    console.error("VITE_API_URL is not set! Please check your .env file.");

    console.error("Please ensure you have a .env.development file with VITE_API_URL=http://localhost:8000");
}

const api = axios.create({

    baseURL: API_BASE_URL,
    withCredentials: true, // ESSENTIAL for Laravel Sanctum
    headers: {
        'Accept': 'application/json', // Tell Laravel we want JSON responses
        // This header helps ensure the CSRF token is sent automatically
        'X-Requested-With': 'XMLHttpRequest',
    }
});



// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      clearAuthToken();
      // Safely call logout without circular dependencies
      if (typeof useAuthStore !== 'undefined' && useAuthStore.getState) {
        useAuthStore.getState().logout();
      }
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const initializeApi = () => {
    // Callin this to get the cookie, don't need the response
    return api.get('/sanctum/csrf-cookie');
};

export default api;
