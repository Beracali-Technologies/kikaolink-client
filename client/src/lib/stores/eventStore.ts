import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../axios';
import { TEvent, TEventCreate } from '@/types/event';

// Define the shape of the STATE
interface EventState {
    events: TEvent[];
    currentEvent: TEvent | null;
    lastActiveEventId: string | number | null;
    isLoading: boolean;
    error: string | null;
}

interface Event {
  id: number;
  title: string;
  // ... other properties
  is_live?: boolean;
  live_url?: string;
  status: string;
  start_date: string;
  end_date: string;
}

// Define the shape of the ACTIONS
interface EventActions {
    fetchEvents: () => Promise<void>;
    fetchEventById: (id: string) => Promise<void>;
    createEvent: (data: TEventCreate) => Promise<TEvent>;
    updateEvent: (id: string, data: TEventCreate) => Promise<TEvent>;
    setCurrentEventId: (id: string | number) => void;
    clearError: () => void;
}

// Combine them into a single type for the store
type EventStore = EventState & EventActions;

export const useEventStore = create(
    persist<EventStore>(
        (set) => ({
            // --- STATE PROPERTIES ---
            events: [],
            currentEvent: null,
            lastActiveEventId: null,
            isLoading: false,
            error: null,

            // --- ACTION IMPLEMENTATIONS ---
            fetchEvents: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/api/events');
                    set({ events: response.data.data, isLoading: false });
                } catch (err) {
                    set({ error: "Failed to fetch events.", isLoading: false });
                }
            },
            fetchEventById: async (id: string) => {
                set({ isLoading: true, error: null });
                try {
                  const response = await fetch(`/api/events/${id}`, {
                            headers: {
                            'Authorization': `Bearer ${token}`
                            }
                            });

                    set({ currentEvent: response.data.data, lastActiveEventId: id, isLoading: false });
                } catch (error) {
                    set({ error: "Could not load event.", isLoading: false });
                    throw error;
                }
            },
            createEvent: async (newEventData: TEventCreate) => {
                set({ isLoading: true });
                try {
                    const response = await api.post('/api/events', newEventData);
                    const newEvent = response.data.data;
                    set((state) => ({
                        events: [...state.events, newEvent],
                        isLoading: false
                    }));
                    return newEvent;
                } catch (error) {
                    set({ isLoading: false, error: 'Failed to create event.' });
                    throw error;
                }
            },
            updateEvent: async (id: string, data: TEventCreate) => {
                 set({ isLoading: true });
                try {
                    const response = await api.put(`/api/events/${id}`, data);
                    const updatedEvent = response.data.data;
                    set((state) => ({
                        currentEvent: updatedEvent,
                        events: state.events.map(e => e.id.toString() === id ? updatedEvent : e),
                        isLoading: false
                    }));
                    return updatedEvent;
                } catch (error) {
                    set({ isLoading: false, error: 'Failed to update event.' });
                    throw error;
                }
            },

            clearError: () => set({ error: null }),

            setCurrentEventId: (id: string | number) => set({ lastActiveEventId: id }),
        }),
        {
            name: 'kikaolink-event-storage',
            //partialize: (state) => ({ lastActiveEventId: state.lastActiveEventId }),
        },
    )
);
