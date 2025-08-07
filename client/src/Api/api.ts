
import axios from 'axios';

const api = axios.create({
    // Vite replaces this variable with the correct URL at build time
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // ESSENTIAL for Laravel Sanctum
});

export default api;
