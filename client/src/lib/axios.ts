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
    withCredentials: false, // Disable cookies since we're using token-based auth
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      if (typeof useAuthStore !== 'undefined' && useAuthStore.getState) {
        useAuthStore.getState().logout();
      }
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
export { publicApi };
