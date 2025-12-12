import api from "@/lib/axios";
import { EmailTemplate, ApiResponse, EmailPreviewData } from '@/types';

export const emailTemplateService = {
  // Get email template for event
  getTemplate: async (eventId: number): Promise<EmailTemplate> => {
    const response = await api.get<ApiResponse<EmailTemplate>>(`/api/events/${eventId}/email-template`);
    return response.data.data; // Returns EmailTemplate
  },

  // Update email template - FIX THIS!
  updateTemplate: async (eventId: number, templateData: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    const response = await api.put<ApiResponse<EmailTemplate>>(
      `/api/events/${eventId}/email-template`,
      templateData
    );
    // FIX: Return response.data.data instead of response.data
    return response.data.data; // Changed from response.data
  },

  // Preview email - returns EmailPreviewData with template and dummy data
  previewEmail: async (eventId: number): Promise<EmailPreviewData> => {
    const response = await api.get<ApiResponse<EmailPreviewData>>(
      `/api/events/${eventId}/email-template/preview`
    );
    return response.data.data; // Returns EmailPreviewData
  },
};