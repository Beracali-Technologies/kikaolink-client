import api from '@/lib/axios';
import { RegistrationData, RegistrationResponse } from '@/types';



export const attendeeRegistrationService = {
  register: async (data: RegistrationData): Promise<RegistrationResponse> => {
    try {
      const response = await api.post('/api/events/{event}/register', data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};
