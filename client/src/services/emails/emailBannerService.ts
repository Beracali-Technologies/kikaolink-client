import api from "@/lib/axios";

export interface EmailBanner {
  id: number;
  url: string;
  filename: string;
  original_name: string;
  size: string;
  dimensions: {
    width: number;
    height: number;
  };
  uploaded_at: string;
  is_active: boolean;
}

export interface UploadBannerResponse {
  success: boolean;
  data: EmailBanner;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class EmailBannerService {
  /**
   * Upload email banner
   */
  async uploadBanner(eventId: number, formData: FormData): Promise<EmailBanner> {
    const response = await api.post<UploadBannerResponse>(
      `/api/events/${eventId}/email-banners`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  }

  /**
   * Delete email banner
   */
  async deleteBanner(eventId: number, bannerId: number): Promise<void> {
    await api.delete(`/api/events/${eventId}/email-banners/${bannerId}`);
  }

  /**
   * Get active banner for event
   */
  async getActiveBanner(eventId: number): Promise<EmailBanner | null> {
    const response = await api.get<ApiResponse<EmailBanner | null>>(
      `/api/events/${eventId}/email-banners/active`
    );
    return response.data.data;
  }
}

export const emailBannerService = new EmailBannerService();
