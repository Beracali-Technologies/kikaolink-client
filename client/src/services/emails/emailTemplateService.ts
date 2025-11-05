import api from "@/lib/axios";
import { EmailTemplate, ApiResponse } from '/types';

export const emailTemplateService = {
  // Get email template for event
  getTemplate: async (eventId: number): Promise<EmailTemplate> => {
    const response = await api.get<ApiResponse<EmailTemplate>>(`/api/events/${eventId}/email-template`);
    return response.data.data;
  },

  // Update email template
  updateTemplate: async (eventId: number, templateData: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    const response = await api.put<ApiResponse<EmailTemplate>>(
      `/api/events/${eventId}/email-template`,
      templateData
    );
    return response.data.data;
  },

      // Upload banner image
      uploadBanner: async (eventId: number, formData: FormData): Promise<{ banner_url: string }> => {
          const response = await api.post(
            `/api/events/${eventId}/email-template/banner`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          
          // Handle both response formats
          if (response.data.data) {
            // If response has data wrapper (ApiResponse format)
            return response.data.data;
          } else {
            // If response is direct (like your current backend)
            return response.data;
          }
    },

  // Remove banner image
  removeBanner: async (eventId: number): Promise<void> => {
    await api.delete(`/api/events/${eventId}/email-template/banner`);
  },

  // Preview email
  previewEmail: async (eventId: number): Promise<{ subject: string; content: string }> => {
    const response = await api.get<ApiResponse<{ subject: string; content: string }>>(
      `/api/events/${eventId}/email-template/preview`
    );
    return response.data.data;
  },
};
