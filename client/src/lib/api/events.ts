import { Event, EventFormData, EventLiveDetail } from '../../types/event';
import api from '../axios'; // Use your axios instance

export const eventsApi = {

      //gets all events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get('/api/events');
    return response.data.data || response.data;
  },

      //get event Id
  getEvent: async (eventId: string): Promise<Event> => {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data.data || response.data;
  },

      //create event
  createEvent: async (data: EventFormData): Promise<Event> => {
    const response = await api.post('/api/events', data);
    return response.data.data || response.data;
  },

  updateEvent: async (eventId: string, data: Partial<EventFormData>): Promise<Event> => {
    const response = await api.put(`/api/events/${eventId}`, data);
    return response.data.data || response.data;
  },

  toggleLiveStatus: async (eventId: string): Promise<EventLiveDetail> => {
    const response = await api.post(`/api/events/${eventId}/toggle-live`);
    return response.data.data || response.data;
  },

      
  getLiveStatus: async (eventId: string): Promise<EventLiveDetail> => {
    const response = await api.get(`/api/events/${eventId}/live-status`);
    return response.data.data || response.data;
  }
};
