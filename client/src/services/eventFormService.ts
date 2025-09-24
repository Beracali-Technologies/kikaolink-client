import api from '../lib/axios';


export const eventFormService = {
    getFormConfig: async (eventId: number) => {
        const response = await api.get(`/api/events/${eventId}/form-config`);
        return response.data;
    },

    getFormConfigBySlug: async (eventSlug: string) => {
        const response = await api.get(`/api/events/slug/${eventSlug}/form-config`);
        return response.data;
    },

    saveFormConfig: async (eventId: number, fields: any[]) => {
        const response = await api.post(`/api/events/${eventId}/form-config`, { fields });
        return response.data;
    },

    getPublicFormConfig: async (eventId: number) => {
        const response = await api.get(`/api/events/${eventId}/public-form-config`);
        return response.data;
    },

    getPublicFormConfigBySlug: async (eventSlug: string) => {
        const response = await api.get(`/api/events/slug/${eventSlug}/public-form-config`);
        return response.data;
    }
};
