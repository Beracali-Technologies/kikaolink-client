import { useState, useEffect } from 'react';
import { EmailTemplate, EmailPreviewData } from '@/types';
import { emailTemplateService } from '@/services/emails/emailTemplateService';

export const useEmailTemplate = (eventId: number) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState<EmailPreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTemplate();
  }, [eventId]);

  const loadTemplate = async () => {
    try {
      setError(null);
      const templateData = await emailTemplateService.getTemplate(eventId);
      setTemplate(templateData);
    } catch (error) {
      console.error('Failed to load template:', error);
      setError('Failed to load template');
    } finally {
      setIsLoading(false);
    }
  };

  // Update local state only - no auto-save
  const updateTemplate = (updates: Partial<EmailTemplate>) => {
    if (!template) return;
    setTemplate(prev => prev ? { ...prev, ...updates } : null);
  };

  // Explicit save to backend
  const saveTemplate = async () => {
    if (!template) return;

    setIsSaving(true);
    setError(null);
    try {
      const updatedTemplate = await emailTemplateService.updateTemplate(
        eventId,
        template
      );
      setTemplate(updatedTemplate);
      return updatedTemplate;
    } catch (error) {
      console.error('Failed to save template:', error);
      setError('Failed to save template');
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (section: keyof EmailTemplate['enabled_sections'], value: boolean) => {
    if (!template) return;

    setTemplate(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        enabled_sections: {
          ...prev.enabled_sections,
          [section]: value,
        },
      };
    });
  };


  const uploadBanner = async (formData: FormData) => {
  try {
    setError(null);
    const result = await emailTemplateService.uploadBanner(eventId, formData);

    // Handle both response formats
    const bannerUrl = result.banner_url || result.data?.banner_url;

    if (!bannerUrl) {
      throw new Error('No banner URL returned from server');
    }

    updateTemplate({ banner_image: bannerUrl });
    return result;
  } catch (error: any) {
    console.error('Failed to upload banner:', error);

    let errorMessage = 'Failed to upload banner';

    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      errorMessage = Object.values(errors).flat().join(', ');
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    setError(errorMessage);
    throw error;
  }
};


  const removeBanner = async () => {
    try {
      setError(null);
      await emailTemplateService.removeBanner(eventId);
      updateTemplate({ banner_image: undefined });
    } catch (error) {
      console.error('Failed to remove banner:', error);
      setError('Failed to remove banner');
      throw error;
    }
  };

  const previewEmail = async () => {
    try {
      setError(null);
      const previewData = await emailTemplateService.previewEmail(eventId);
      setPreview(previewData);
      return previewData;
    } catch (error) {
      console.error('Failed to generate preview:', error);
      setError('Failed to generate preview');
      throw error;
    }
  };

  return {
    template,
    isLoading,
    isSaving,
    preview,
    error,
    updateTemplate,
    saveTemplate,
    updateSection,
    uploadBanner,
    removeBanner,
    previewEmail,
  };
};
