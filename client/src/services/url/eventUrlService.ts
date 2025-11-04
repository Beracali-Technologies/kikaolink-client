import api from '@/lib/axios';

export interface EventUrls {
    live_url: string;
    registration_url: string;
    custom_slug: string;
    is_live: boolean;
}

export const eventUrlService = {
    getEventUrls: async (eventId: string): Promise<EventUrls> => {
        const response = await api.get(`/api/events/${eventId}/urls`);
        return {
            live_url: response.data.live_url || '',
            registration_url: response.data.registration_url || '',
            custom_slug: response.data.custom_slug || '',
            is_live: response.data.is_live || false
        };
    },

    updateEventSlug: async (eventId: string, customSlug: string): Promise<EventUrls> => {
        const response = await api.put(`/api/events/${eventId}/slug`, { custom_slug: customSlug });
        return {
            live_url: response.data.urls.live_url || '',
            registration_url: response.data.urls.registration_url || '',
            custom_slug: response.data.urls.custom_slug || '',
            is_live: response.data.urls.is_live || false
        };
    },

    checkSlugAvailability: async (customSlug: string, eventId?: string): Promise<{ available: boolean; suggested_slug: string }> => {
        const response = await api.post('/api/events/check-slug', {
            custom_slug: customSlug,
            event_id: eventId
        });
        return response.data;
    }
};
