// services/registrationService.ts
import { RegistrationData, RegistrationResponse } from '@/types';

class RegistrationService {
  async register(data: RegistrationData): Promise<RegistrationResponse> {
    console.log('🚀 Making registration request to:', `api/events/${data.event_id}/register`);
    console.log('📦 Request data:', data);

    const response = await fetch(`/api/events/${data.event_id}/register`, { // Added leading slash
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(data),
    });

    console.log('📨 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('✅ API Response data:', responseData);

    return responseData;
  }
}

export const registrationService = new RegistrationService();
