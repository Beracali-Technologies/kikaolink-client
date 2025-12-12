import { useState, useEffect, useCallback } from 'react';
import { EmailTemplate, EmailPreviewData } from '@/types';
import { emailTemplateService } from '@/services/emails/emailTemplateService';

export const useEmailTemplate = (eventId: number) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState<EmailPreviewData | null>(null);
  const [error, setError] = useState<null | null>(null);


    //Helper function for parse sections
    const parseSections = (sections: any) => {
      if (!sections) {
        return {
          qrCode: true,
          attendeeInfo: true,
          eventInfo: true,
          registrationSummary: true,
          viewRegistration: true
        };
      }


  if (typeof sections === 'string') {
      try {
        const parsed = JSON.parse(sections);
        return {
          qrCode: parsed.qrCode !== false,
          attendeeInfo: parsed.attendeeInfo !== false,
          eventInfo: parsed.eventInfo !== false,
          registrationSummary: parsed.registrationSummary !== false,
          viewRegistration: parsed.viewRegistration !== false
        };
      } catch (e) {
        console.error('Failed to parse sections:', e);
        return {
          qrCode: true,
          attendeeInfo: true,
          eventInfo: true,
          registrationSummary: true,
          viewRegistration: true
        };
      }
    }

    // If sections is already an object
    return {
      qrCode: sections.qrCode !== false,
      attendeeInfo: sections.attendeeInfo !== false,
      eventInfo: sections.eventInfo !== false,
      registrationSummary: sections.registrationSummary !== false,
      viewRegistration: sections.viewRegistration !== false
    };
  };

  useEffect(() => {
    loadTemplate();
  }, [eventId]);

  const loadTemplate = async () => {
    try {
      setError(null);
      const templateData = await emailTemplateService.getTemplate(eventId);
      
      // Parse sections correctly
      const parsedTemplate = {
        ...templateData,
        enabled_sections: parseSections(templateData.enabled_sections)
      };
      
      console.log('Loaded template with parsed sections:', parsedTemplate);
      setTemplate(parsedTemplate);
    } catch (error) {
      console.error('Failed to load template:', error);
      setError('Failed to load template');
    } finally {
      setIsLoading(false);
    }
  };




  const updateTemplate = useCallback((updates: Partial<EmailTemplate>) => {
    setTemplate(prev => {
      if (!prev) return prev;
      
      const updated = { ...prev, ...updates };
      
      // If updating sections, parse them
      if (updates.enabled_sections) {
        updated.enabled_sections = parseSections(updates.enabled_sections);
      }
      
      return updated;
    });
  }, []);

  const updateSection = useCallback((sectionKey: string, enabled: boolean) => {
    console.log('Updating section:', sectionKey, 'to', enabled);
    
    setTemplate(prev => {
      if (!prev) return prev;
      
      const updatedSections = {
        ...prev.enabled_sections,
        [sectionKey]: enabled
      };
      
      console.log('Updated sections:', updatedSections);
      
      return {
        ...prev,
        enabled_sections: updatedSections
      };
    });
  }, []);



  
  const saveTemplate = async () => {
    if (!template) return;

    setIsSaving(true);
    setError(null);
    try {
      // Prepare sections for backend (stringify if needed)
      const templateData = {
        ...template,
        enabled_sections: JSON.stringify(template.enabled_sections)
      };

      const updatedTemplate = await emailTemplateService.updateTemplate(
        eventId,
        templateData
      );
      
      // Parse the response
      const parsedTemplate = {
        ...updatedTemplate,
        enabled_sections: parseSections(updatedTemplate.enabled_sections)
      };
      
      setTemplate(parsedTemplate);
      return parsedTemplate;
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
      
      // First, save any unsaved changes
      if (template) {
        await saveTemplate();
      }
      
      const previewData = await emailTemplateService.previewEmail(eventId);
      
      const enhancedPreview: EmailPreviewData = {
        ...previewData,
        template: template!,
        dummy_data: previewData.dummy_data || {
          event_title: 'Event Title',
          event_date: new Date().toLocaleDateString(),
          event_location: 'Event Location',
          attendee_first_name: 'First Name',
          attendee_last_name: 'Last Name',
          attendee_full_name: 'First Last Name',
          attendee_email: 'attendee@example.com',
          attendee_company: 'Company',
          registration_id: 'REG-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      };
      
      setPreview(enhancedPreview);
      return enhancedPreview;
    } catch (error) {
      console.error('Failed to generate preview:', error);
      setError('Failed to generate preview');
      throw error;
    }
  };

  // Note: updateTemplate was referenced in return but never defined — removing it unless you add it later
  return {
    template,
    isLoading,
    isSaving,
    preview,
    error,
    saveTemplate,
    updateSection,
    previewEmail,
    // Removed: updateTemplate (not defined)
    // If you need it, implement it properly
  };
};