import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EventDetails, TEventCreate } from '@/types';   // full event details
import { eventsApi } from '../api/events';

// --- STATE SHAPE ---
interface EventState {
  events: EventDetails[];               // store full details to avoid mismatch in templates
  currentEvent: EventDetails | null;
  lastActiveEventId: string | number | null;
  isLoading: boolean;
  error: string | null;
}

// --- ACTIONS ---
interface EventActions {
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  createEvent: (data: TEventCreate) => Promise<EventDetails>;
  updateEvent: (id: string, data: TEventCreate) => Promise<EventDetails>;
  toggleLiveStatus: (id: string) => Promise<void>;
  setCurrentEventId: (id: string | number) => void;
  clearError: () => void;
}

// --- COMBINED STORE ---
type EventStore = EventState & EventActions;

export const useEventStore = create(
  persist<EventStore>(
    (set, get) => ({
      // --- INITIAL STATE ---
      events: [],
      currentEvent: null,
      lastActiveEventId: null,
      isLoading: false,
      error: null,

      // --- ACTION IMPLEMENTATIONS ---
      fetchEvents: async () => {
        set({ isLoading: true, error: null });
        try {
          const events = await eventsApi.getEvents(); // should return EventDetails[]
          set({ events, isLoading: false });
        } catch (err) {
          set({ error: 'Failed to fetch events.', isLoading: false });
        }
      },

      fetchEventById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const event = await eventsApi.getEvent(id); // should return EventDetails
          set({ currentEvent: event, lastActiveEventId: id, isLoading: false });
        } catch (error) {
          set({ error: 'Could not load event.', isLoading: false });
          throw error;
        }
      },

      createEvent: async (data: TEventCreate) => {
        set({ isLoading: true });
        try {
          const newEvent = await eventsApi.createEvent(data); // returns EventDetails
          set((state) => ({
            events: [...state.events, newEvent],
            isLoading: false,
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
          const updatedEvent = await eventsApi.updateEvent(id, data);
          set((state) => ({
            currentEvent: updatedEvent,
            events: state.events.map((e) =>
              e.id.toString() === id ? updatedEvent : e
            ),
            isLoading: false,
          }));
          return updatedEvent;
        } catch (error) {
          set({ isLoading: false, error: 'Failed to update event.' });
          throw error;
        }
      },

      toggleLiveStatus: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const liveDetail = await eventsApi.toggleLiveStatus(id);
          const { currentEvent } = get();
          if (currentEvent) {
            set({
              currentEvent: {
                ...currentEvent,
                live_detail: liveDetail,
                status: liveDetail.is_live ? 'LIVE' : 'DRAFT',
              },
              events: get().events.map((e) =>
                e.id.toString() === id
                  ? {
                      ...e,
                      live_detail: liveDetail,
                      status: liveDetail.is_live ? 'LIVE' : 'DRAFT',
                    }
                  : e
              ),
              isLoading: false,
            });
          }
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
      setCurrentEventId: (id: string | number) => set({ lastActiveEventId: id }),
    }),
    {
      name: 'kikaolink-event-storage',
    }
  )
);
