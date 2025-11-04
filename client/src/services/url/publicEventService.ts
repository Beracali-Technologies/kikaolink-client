import api from '@/lib/axios';

export interface PublicEvent {
    id: number;
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    location?: string;
    status: string;
    custom_slug: string;
    is_live: boolean;
    live_url?: string;
    registration_url?: string;
}

export const publicEventService = {
    /** Fetch event by custom slug for public access */
    getEventByCustomSlug: async (customSlug: string): Promise<PublicEvent> => {
        const response = await api.get(`/api/public/events/custom/${customSlug}`);
        return response.data;
    },

    /** Get event for registration */
    getRegistrationEvent: async (customSlug: string): Promise<PublicEvent> => {
        const response = await api.get(`/api/public/events/custom/${customSlug}/register`);
        return response.data;
    }
};
