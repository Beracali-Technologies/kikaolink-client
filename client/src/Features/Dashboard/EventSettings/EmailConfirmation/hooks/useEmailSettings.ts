import { useState, useEffect } from 'react';
import { EmailSettings } from '../types/email';
import { useEventStore } from '../../../../../lib/stores/eventStore';

export const useEmailSettings = () => {
    const { currentEvent } = useEventStore();
    const [emailSettings, setEmailSettings] = useState<EmailSettings>({
        fromName: "Test Event Pte Ltd.",
        replyTo: "noreply@eventnook.com",
        subject: `[${currentEvent?.title || 'Event'}] Registration Confirmation (#{order.orderNo})`,
        banner: true,
        sections: {
            qrCode: false,
            attendeeInfo: true,
            aboutEvent: false,
            registrationSummary: true,
            attendeeDetails: false,
            viewRegistration: false
        }
    });

    const updateSettings = (updates: Partial<EmailSettings>) => {
        setEmailSettings(prev => ({ ...prev, ...updates }));
    };

    const updateSection = (section: keyof EmailSettings['sections'], value: boolean) => {
        setEmailSettings(prev => ({
            ...prev,
            sections: { ...prev.sections, [section]: value }
        }));
    };

    return {
        emailSettings,
        updateSettings,
        updateSection,
        currentEvent
    };
};
