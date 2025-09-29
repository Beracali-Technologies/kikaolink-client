import { publicApi } from "@/lib/axios";
import { RegistrationData, RegistrationResponse } from "@/types";

class RegistrationService {
  async register(data: RegistrationData): Promise<RegistrationResponse> {
    const response = await publicApi.post(`/api/events/${data.event_id}/register`, data, {
      headers: {
            "Content-Type": "application/json",
          },
    });
    return response.data;
  }
}

export const registrationService = new RegistrationService();
