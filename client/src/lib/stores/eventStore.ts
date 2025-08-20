import { create } from 'zustand';
import api from '../axios'; // Import our new shared axios instance
import { TEvent, TEventCreate } from '../../types';



interface EventState {
    events: TEvent[];
    isLoading: boolean;
    error: string | null;
    fetchEvents: () => Promise<void>;
    createEvent: (newEventData: TEventCreate) => Promise<TEvent>;
}

export const useEventStore = create<EventState>((set) => ({
    events: [],
    isLoading: false,
    error: null,

    fetchEvents: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/api/events');
            set({ events: response.data.data, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch events:", error);
            set({ error: "Could not load your events.", isLoading: false });
        }
    },

    createEvent: async (newEventData) => {
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
            console.error("Failed to create event:", error);
            const errorMessage = "Could not create the event. Please check the details and try again.";
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
        }
    }
}));
