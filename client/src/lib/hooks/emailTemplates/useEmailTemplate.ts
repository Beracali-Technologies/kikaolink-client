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

  const uploadBanner = async (file: File) => {
    try {
      setError(null);
      const result = await emailTemplateService.uploadBanner(eventId, file);
      updateTemplate({ banner_image: result.banner_url });
      return result;
    } catch (error) {
      console.error('Failed to upload banner:', error);
      setError('Failed to upload banner');
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
