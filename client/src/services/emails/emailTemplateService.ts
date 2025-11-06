import api from "@/lib/axios";
import { EmailTemplate, ApiResponse } from '@/types';

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



  // Preview email
  previewEmail: async (eventId: number): Promise<{ subject: string; content: string }> => {
    const response = await api.get<ApiResponse<{ subject: string; content: string }>>(
      `/api/events/${eventId}/email-template/preview`
    );
    return response.data.data;
  },
};
