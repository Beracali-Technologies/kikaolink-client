// src/services/events/eventService.ts
import api from "@/lib/axios";
import { Event, ApiResponse } from '@/types';

export const eventService = {
  // Get event by ID
  getEvent: async (eventId: number): Promise<Event> => {
    const response = await api.get<ApiResponse<Event>>(`/api/events/${eventId}`);
    return response.data.data;
  },

  // Get user's events
  getUserEvents: async (): Promise<Event[]> => {
    const response = await api.get<ApiResponse<Event[]>>('/api/user/events');
    return response.data.data;
  },

  // Update event
  updateEvent: async (eventId: number, eventData: Partial<Event>): Promise<Event> => {
    const response = await api.put<ApiResponse<Event>>(
      `/api/events/${eventId}`,
      eventData
    );
    return response.data.data;
  },
};