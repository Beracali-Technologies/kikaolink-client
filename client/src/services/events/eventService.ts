import api from "@/lib/axios";
import { TEvent, ApiResponse } from '@/types';

export const eventService = {
  // Get event by ID
  getEvent: async (eventId: number): Promise<TEvent> => {
    const response = await api.get<ApiResponse<TEvent>>(`/api/events/${eventId}`);
    return response.data.data;
  },

  // Get user's events
  getUserEvents: async (): Promise<TEvent[]> => {
    const response = await api.get<ApiResponse<TEvent[]>>('/api/user/events');
    return response.data.data;
  },

  // Update event
  updateEvent: async (eventId: number, eventData: Partial<TEvent>): Promise<TEvent> => {
    const response = await api.put<ApiResponse<TEvent>>(
      `/api/events/${eventId}`,
      eventData
    );
    return response.data.data;
  },
};