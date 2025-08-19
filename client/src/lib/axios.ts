
import axios from 'axios';


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



// The interceptor logs every request being sent from your frontend.
api.interceptors.request.use(request => {
  console.log('Starting Request', {
    url: request.url,
    method: request.method,
    headers: request.headers,
    data: request.data
  });
  return request;
});

export const initializeApi = () => {
    // Callin this to get the cookie, don't need the response
    return api.get('/sanctum/csrf-cookie');
};

export default api;
