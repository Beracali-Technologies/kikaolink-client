import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../axios';
import { TEvent, TEventCreate } from '@/types/event';
import { eventsApi } from '../api/events';


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
        (set, get) => ({
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
          const events = await eventsApi.getEvents(); // Use eventsApi
          set({ events, isLoading: false });
        } catch (err) {
          set({ error: "Failed to fetch events.", isLoading: false });
        }
      },

      fetchEventById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const event = await eventsApi.getEvent(id); // Use eventsApi
          set({ currentEvent: event, lastActiveEventId: id, isLoading: false });
        } catch (error) {
          set({ error: "Could not load event.", isLoading: false });
          throw error;
        }
      },


            createEvent: async (newEventData: EventFormData) => {
               set({ isLoading: true });
                   try {
                         const newEvent = await eventsApi.createEvent(newEventData); // Use eventsApi
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
                  //  const response = await api.put(`/api/events/${id}`, data);  replace direct api calls with eventsApi
                    const updatedEvent = await eventsApi.updateEvent(id, data);

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
                                status: liveDetail.is_live ? 'LIVE' : 'DRAFT'
                          },
                            isLoading: false
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
            //partialize: (state) => ({ lastActiveEventId: state.lastActiveEventId }),
        },
    )
);
