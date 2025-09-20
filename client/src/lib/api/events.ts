import api from '../axios';
import { TEvent, TEventCreate, EventLiveDetail } from '@/types';


export type EventFormData = TEventCreate;

export const eventsApi = {
  /** Fetch all events */
  getEvents: async (): Promise<TEvent[]> => {
    const response = await api.get('/api/events');
    return response.data.data || response.data;
  },

  /** Fetch a single event by ID */
  getEvent: async (eventId: string): Promise<TEvent> => {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data.data || response.data;
  },

  /** Create a new event */
  createEvent: async (data: EventFormData): Promise<TEvent> => {
    const response = await api.post('/api/events', data);
    return response.data.data || response.data;
  },

  /** Update an event */
  updateEvent: async (
    eventId: string,
    data: Partial<EventFormData>
  ): Promise<TEvent> => {
    const response = await api.put(`/api/events/${eventId}`, data);
    return response.data.data || response.data;
  },

  /** Toggle an event’s live status */
  toggleLiveStatus: async (eventId: string): Promise<EventLiveDetail> => {
    const response = await api.post(`/api/events/${eventId}/toggle-live`);
    return response.data.data || response.data;
  },

  /** Get the live status of an event */
  getLiveStatus: async (eventId: string): Promise<EventLiveDetail> => {
    const response = await api.get(`/api/events/${eventId}/live-status`);
    return response.data.data || response.data;
  },
};
