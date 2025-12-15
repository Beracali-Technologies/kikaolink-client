import { useState, useEffect, useCallback } from "react";
import { EmailTemplate, EmailPreviewData, TEvent, EmailSections, EventLocation } from "@/types";
import { emailTemplateService } from "@/services/emails/emailTemplateService";
import { eventService } from "@/services/events/eventService";

export const useEmailTemplate = (eventId: number) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [event, setEvent] = useState<TEvent | null>(null); 
  const [preview, setPreview] = useState<EmailPreviewData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* --------------------------------------------------------
   * SECTION PARSER (Handles: null, object, string, fallback)
   * ------------------------------------------------------ */
  const parseSections = useCallback((sections: any): EmailSections => {
    const defaults: EmailSections = {
      qrCode: true,
      attendeeInfo: true,
      aboutEvent: true,
      eventInfo: true,
      registrationSummary: true,
      viewRegistration: true,
      attendeeDetails: false
    };

    if (!sections) return defaults;
    if (typeof sections === "object") return { ...defaults, ...sections };

    try {
      const parsed = JSON.parse(sections);
      return { ...defaults, ...parsed };
    } catch (e) {
      console.error("Failed to parse sections:", e);
      return defaults;
    }
  }, []);

  // Helper to extract location string from EventLocation object
  const getLocationString = useCallback((location: string | EventLocation | null | undefined): string => {
    if (!location) return "Location to be announced";
    if (typeof location === 'string') return location;
    // If it's an EventLocation object, get the name or address
    return (location as any).name || (location as any).address || "Location to be announced";
  }, []);

  /* --------------------------------------------------------
   * LOAD EVERYTHING (event + template) IN PARALLEL
   * ------------------------------------------------------ */
  const loadEverything = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [eventData, templateData] = await Promise.all([
        eventService.getEvent(eventId),
        emailTemplateService.getTemplate(eventId),
      ]);

      const parsedTemplate = {
        ...templateData,
        enabled_sections: parseSections(templateData.enabled_sections),
      };

      setEvent(eventData);
      setTemplate(parsedTemplate);

      // Build preview stub
      setPreview({
        subject: parsedTemplate.subject || "",
        content: "",
        template: parsedTemplate,
        dummy_data: {
          event_title: eventData.title || "Event Title",
          event_date: eventData.start_date
            ? new Date(eventData.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date to be announced",
          event_location: getLocationString(eventData.location), // Fixed: use helper
          attendee_first_name: "John",
          attendee_last_name: "Doe",
          attendee_full_name: "John Doe",
          attendee_email: "attendee@example.com",
          attendee_company: "Demo Company",
          registration_id:
            "REG-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      });
    } catch (err) {
      console.error("Failed to load:", err);
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [eventId, parseSections, getLocationString]);

  // Initial load
  useEffect(() => {
    loadEverything();
  }, [loadEverything]);

  /* --------------------------------------------------------
   * UPDATE TEMPLATE FIELDS
   * ------------------------------------------------------ */
  const updateTemplate = useCallback((updates: Partial<EmailTemplate>) => {
    setTemplate((prev) => {
      if (!prev) return prev;

      let updated = { ...prev, ...updates };

      // Only parse sections if they changed
      if (updates.enabled_sections) {
        updated.enabled_sections = parseSections(updates.enabled_sections);
      }

      return updated;
    });
  }, [parseSections]);

  /* --------------------------------------------------------
   * UPDATE INDIVIDUAL SECTION
   * ------------------------------------------------------ */
  const updateSection = useCallback((sectionKey: string, enabled: boolean) => {
    setTemplate((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        enabled_sections: {
          ...prev.enabled_sections,
          [sectionKey]: enabled,
        },
      };

      return updated;
    });
  }, []);

  /* --------------------------------------------------------
   * SAVE TEMPLATE - FIXED VERSION
   * ------------------------------------------------------ */
  const saveTemplate = useCallback(async () => {
    if (!template) return;

    setIsSaving(true);
    setError(null);

    try {
      // Create payload with proper types
      const payload: Partial<EmailTemplate> = {
        ...template,
        // Don't stringify enabled_sections - let the service handle it if needed
        enabled_sections: template.enabled_sections,
      };

      const saved = await emailTemplateService.updateTemplate(eventId, payload);

      // Parse returned template
      const parsedTemplate = {
        ...saved,
        enabled_sections: parseSections(saved.enabled_sections),
      };

      setTemplate(parsedTemplate);
      return parsedTemplate;
    } catch (err) {
      console.error("Failed to save template:", err);
      setError("Failed to save template");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [template, eventId, parseSections]);

  /* --------------------------------------------------------
   * GENERATE EMAIL PREVIEW
   * ------------------------------------------------------ */
  const previewEmail = useCallback(async () => {
    try {
      setError(null);

      if (template) {
        try {
          await saveTemplate();
        } catch (saveErr) {
          console.warn('Save before preview failed, continuing anyway:', saveErr);
        }
      }

      const previewData = await emailTemplateService.previewEmail(eventId);

      const enhancedPreview: EmailPreviewData = {
        ...previewData,
        template: template || previewData.template,
        dummy_data: {
          event_title: event?.title ?? "Event Title",
          event_date: event?.start_date 
            ? new Date(event.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : new Date().toLocaleDateString(),
          event_location: getLocationString(event?.location), // Fixed: use helper
          attendee_first_name: "First",
          attendee_last_name: "Last",
          attendee_full_name: "First Last",
          attendee_email: "attendee@example.com",
          attendee_company: "Company",
          registration_id: "REG-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      };

      setPreview(enhancedPreview);
      return enhancedPreview;
    } catch (err) {
      console.error("Failed to generate preview:", err);
      setError("Failed to generate preview");
      throw err;
    }
  }, [eventId, template, saveTemplate, event, getLocationString]);

  /* --------------------------------------------------------
   * RETURN API
   * ------------------------------------------------------ */
  return {
    template,
    event,
    preview,
    isLoading,
    isSaving,
    error,

    updateTemplate,
    updateSection,
    saveTemplate,
    previewEmail,
    reload: loadEverything,
  };
};