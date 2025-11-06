import { useState, useEffect, useCallback } from 'react';
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

  // FIXED: Remove template dependency and use functional update
  const updateTemplate = useCallback((updates: Partial<EmailTemplate>) => {
    setTemplate(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  }, []); // Empty dependency array - stable function

  // Also fix updateSection to be stable
  const updateSection = useCallback((section: keyof EmailTemplate['enabled_sections'], value: boolean) => {
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
  }, []); // Empty dependency array - stable function

  // Explicit save to backend
  const saveTemplate = async () => {
    if (!template) return;

    setIsSaving(true);
    setError(null);
    try {
      const templateData = {
        ...template,
        enabled_sections: template.enabled_sections
      };

      const updatedTemplate = await emailTemplateService.updateTemplate(
        eventId,
        templateData
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
    previewEmail,
  };
};
