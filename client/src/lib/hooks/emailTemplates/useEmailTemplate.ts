import { useState, useEffect, useCallback } from "react";
import { EmailTemplate, EmailPreviewData } from "@/types";
import { emailTemplateService } from "@/services/emails/emailTemplateService";
import { eventService } from "@/services/events/eventService";

export const useEmailTemplate = (eventId: number) => {
  const [template, setTemplate] = useState<EmailTemplate | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [preview, setPreview] = useState<EmailPreviewData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* --------------------------------------------------------
   * SECTION PARSER (Handles: null, object, string, fallback)
   * ------------------------------------------------------ */
  const parseSections = useCallback((sections: any) => {
    const defaults = {
      qrCode: true,
      attendeeInfo: true,
      eventInfo: true,
      registrationSummary: true,
      viewRegistration: true,
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
        event: eventData,
        dummy_data: {
          event_title: eventData.title || "Event Title",
          event_date: eventData.start_date
            ? new Date(eventData.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date to be announced",
          event_location: eventData.location || "Location to be announced",
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
  }, [eventId, parseSections]);

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
   * SAVE TEMPLATE
   * ------------------------------------------------------ */
  const saveTemplate = useCallback(async () => {
    if (!template) return;

    setIsSaving(true);
    setError(null);

    try {
      const payload = {
        ...template,
        enabled_sections: JSON.stringify(template.enabled_sections),
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

      if (template) await saveTemplate();

      const previewData = await emailTemplateService.previewEmail(eventId);

      const enhancedPreview: EmailPreviewData = {
        ...previewData,
        template: template!,
        dummy_data: {
          event_title: previewData.event?.title ?? "Event Title",
          event_date:
            previewData.event?.start_date ??
            new Date().toLocaleDateString(),
          event_location: previewData.event?.location ?? "Event Location",
          attendee_first_name: "First",
          attendee_last_name: "Last",
          attendee_full_name: "First Last",
          attendee_email: "attendee@example.com",
          attendee_company: "Company",
          registration_id:
            "REG-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      };

      setPreview(enhancedPreview);
      return enhancedPreview;
    } catch (err) {
      console.error("Failed to generate preview:", err);
      setError("Failed to generate preview");
      throw err;
    }
  }, [eventId, template, saveTemplate]);

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
