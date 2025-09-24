import api from '../lib/axios';



export const attendeeRegistrationService = {
    register: async (data: { event_id: number; form_data: Record<string, any> }) => {
        const response = await api.post('/api/register', data);
        return response.data;
    }
};
