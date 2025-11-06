import { useState, useCallback, useEffect } from 'react';
import { emailBannerService, EmailBanner } from '@/services/emails/emailBannerService';

interface UseEmailBannerReturn {
  banner: EmailBanner | null;
  isUploading: boolean;
  isDeleting: boolean;
  error: string | null;
  uploadBanner: (file: File) => Promise<void>;
  deleteBanner: (bannerId: number) => Promise<void>;
  clearError: () => void;
  clearBanner: () => void;
}

export const useEmailBanner = (eventId?: number): UseEmailBannerReturn => {
  const [banner, setBanner] = useState<EmailBanner | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load banner automatically when eventId changes
  useEffect(() => {
    if (eventId) {
      const loadBanner = async () => {
        setError(null);
        try {
          const activeBanner = await emailBannerService.getActiveBanner(eventId);
          setBanner(activeBanner);
        } catch (err: any) {
          const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch banner';
          setError(errorMessage);
        }
      };
      loadBanner();
    }
  }, [eventId]);

  // Use useCallback to stabilize function references
  const uploadBanner = useCallback(async (file: File): Promise<void> => {
    if (!eventId) {
      throw new Error('Event ID is required');
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('banner', file);

      const uploadedBanner = await emailBannerService.uploadBanner(eventId, formData);
      setBanner(uploadedBanner);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to upload banner';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [eventId]);

  const deleteBanner = useCallback(async (bannerId: number): Promise<void> => {
    if (!eventId) {
      throw new Error('Event ID is required');
    }

    setIsDeleting(true);
    setError(null);

    try {
      await emailBannerService.deleteBanner(eventId, bannerId);
      setBanner(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete banner';
      setError(errorMessage);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, [eventId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearBanner = useCallback(() => {
    setBanner(null);
  }, []);

  return {
    banner,
    isUploading,
    isDeleting,
    error,
    uploadBanner,
    deleteBanner,
    clearError,
    clearBanner,
  };
};
