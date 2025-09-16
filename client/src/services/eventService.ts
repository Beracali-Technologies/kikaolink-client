import api from '../lib/axios'; // Import the shared instance
import { TEvent } from '@/types/event'; // Adjust path if needed


// Function to get all events
export const getEvents = () => {
    return api.get<{ data: TEvent[] }>('/api/events');
};

// Function to create a new event
export const createNewEvent = (eventData: Omit<TEvent, 'id' | 'status'>) => {
    return api.post<{ data: TEvent }>('/api/events', eventData);
};
