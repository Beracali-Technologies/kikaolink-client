import api from '../lib/axios'; // Import the shared instance
import { TEvent } from '@/types'; // Adjust path if needed



export const getEvents = async (): Promise<{ data: TEvent[] }> => {
  try {
    const response = await api.get('/events');
    console.log('📅 Events API Response:', response.data);

    // Filter for LIVE events only if needed, or let backend handle it
    const events = response.data.data || response.data;
    return { data: Array.isArray(events) ? events : [] };
  } catch (error) {
    console.error('❌ Events service error:', error);
    return { data: [] };
  }
};

// Function to create a new event
export const createNewEvent = (eventData: Omit<TEvent, 'id' | 'status'>) => {
    return api.post<{ data: TEvent }>('/api/events', eventData);
};
