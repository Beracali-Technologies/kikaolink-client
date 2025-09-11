import { useState } from 'react';
import { EmailSettings, EmailSections } from '../types/email';

export const useEmailEditor = () => {
    const [emailSettings, setEmailSettings] = useState<EmailSettings>({
        fromName: "Test Event Pte Ltd.",
        replyTo: "noreply@eventnook.com",
        subject: "[Test Event] Registration Confirmation (#[order.orderNo])",
        showBanner: true,
        bannerText: "CONNECTING THE COMMUNITY WITH INSPIRING EVENTS",
        greeting: "Dear ((attendee.firstName)) ((attendee.lastName)),",
        message: "Thank you for your registration! Your registration for **((eventInfo.title))** is complete.",
        closing: "Best regards,\nThe Event Team"
    });

    const [sections, setSections] = useState<EmailSections>({
        qrCode: true,
        attendeeInfo: true,
        aboutEvent: false,
        registrationSummary: true,
        attendeeDetails: false,
        viewRegistration: true
    });

    const [showMergeFields, setShowMergeFields] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null);

    const updateSettings = (field: keyof EmailSettings, value: string | boolean) => {
        setEmailSettings(prev => ({ ...prev, [field]: value }));
    };

    const toggleSection = (section: keyof EmailSections) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const insertMergeField = (fieldValue: string) => {
        if (editingField) {
            const currentValue = emailSettings[editingField as keyof EmailSettings] as string;
            updateSettings(editingField as keyof EmailSettings, currentValue + ' ' + fieldValue);
        }
        setShowMergeFields(false);
        setEditingField(null);
    };

    return {
        emailSettings,
        sections,
        showMergeFields,
        editingField,
        updateSettings,
        toggleSection,
        setShowMergeFields,
        setEditingField,
        insertMergeField
    };
};
