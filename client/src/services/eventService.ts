import api from '../lib/axios'; // Import the shared instance
import { TEvent } from '../types'; // Adjust path if needed

// Function to initialize Sanctum's CSRF cookie
export const initializeCsrfCookie = () => {
    return api.get('/sanctum/csrf-cookie');
};

// Function to get all events
export const getEvents = () => {
    return api.get<{ data: TEvent[] }>('/api/events');
};

// Function to create a new event
export const createNewEvent = (eventData: Omit<TEvent, 'id' | 'status'>) => {
    return api.post<{ data: TEvent }>('/api/events', eventData);
};
