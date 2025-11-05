// src/features/email-templates/hooks/useEmailTemplate.ts
import { useState, useEffect } from 'react';
import { EmailTemplate, EmailPreviewData } from '@/types';
import { emailTemplateService } from '@/services/emails/emailTemplateService';

export const useEmailTemplate = (eventId: number) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState<EmailPreviewData | null>(null);



  useEffect(() => {
    loadTemplate();
  }, [eventId]);

  const loadTemplate = async () => {
    try {
      const templateData = await emailTemplateService.getTemplate(eventId);
      setTemplate(templateData);
    } catch (error) {
      console.error('Failed to load template:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const updateTemplate = async (updates?: Partial<EmailTemplate>) => {
      if (!template) return;

          setIsSaving(true);
          try {
            // ALWAYS use the latest state
                const templateToSend = updates
                  ? { ...template, ...updates }
                  : template;

                const updatedTemplate = await emailTemplateService.updateTemplate(
                  eventId,
                  templateToSend
                );

            setTemplate(updatedTemplate);
          } catch (error) {
                console.error('Failed to update template:', error);
                throw error;
          } finally {
                setIsSaving(false);
          }
      };


  const updateSection = (section: keyof EmailTemplate['enabled_sections'], value: boolean) => {
    if (!template) return;

    setTemplate({
      ...template,
      enabled_sections: {
        ...template.enabled_sections,
        [section]: value,
      },
    });
  };

  const uploadBanner = async (file: File) => {
    try {
      const result = await emailTemplateService.uploadBanner(eventId, file);
      await updateTemplate({ banner_image: result.banner_url });
    } catch (error) {
      console.error('Failed to upload banner:', error);
      throw error;
    }
  };

  const removeBanner = async () => {
    try {
      await emailTemplateService.removeBanner(eventId);
      await updateTemplate({ banner_image: undefined });
    } catch (error) {
      console.error('Failed to remove banner:', error);
      throw error;
    }
  };

  const previewEmail = async () => {
    try {
      const previewData = await emailTemplateService.previewEmail(eventId);
      setPreview(previewData);
    } catch (error) {
      console.error('Failed to generate preview:', error);
    }
  };

  return {
    template,
    isLoading,
    isSaving,
    preview,
    updateTemplate: (updates?: Partial<EmailTemplate>) => updateTemplate(updates),
    updateSection,
    uploadBanner,
    removeBanner,
    previewEmail,
  };
};
