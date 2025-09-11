import React, { useState } from 'react';
import { EmailHeader } from './components/EmailHeader';
import { EmailContent } from './components/EmailContent';
import { SectionToggles } from './components/SectionToggles';
import { MergeFieldsPanel } from './components/MergeFieldsPanel';
import { Preview } from './components/Preview';
import { EmailSettings, EmailSections } from './types/email';

const EmailConfirmation: React.FC = () => {
    const [emailSettings, setEmailSettings] = useState<EmailSettings>({
        fromName: "Test Event Pte Ltd.",
        replyTo: "noreply@eventnook.com",
        subject: "[Test Event] Registration Confirmation (#[order.orderNo]) - [Demo] Leadership Conference",
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

    const handleSettingsUpdate = (field: keyof EmailSettings, value: string | boolean) => {
        setEmailSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSectionToggle = (section: string) => {
        setSections(prev => ({ ...prev, [section]: !prev[section as keyof EmailSections] }));
    };

    const handleInsertMergeField = (field: string) => {
        // This would typically insert the field at the current cursor position
        console.log('Insert merge field:', field);
        setShowMergeFields(false);
    };

    const handleSave = () => {
        console.log('Saving email settings:', { emailSettings, sections });
        alert('Email settings saved successfully!');
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Confirmation Email</h1>
                <p className="text-gray-600">This email will be sent when the registration is confirmed.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Settings */}
                <div>
                    <EmailHeader
                        settings={{
                            fromName: emailSettings.fromName,
                            replyTo: emailSettings.replyTo,
                            subject: emailSettings.subject
                        }}
                        onUpdate={(field, value) => handleSettingsUpdate(field as keyof EmailSettings, value)}
                    />

                    <EmailContent
                        content={{
                            greeting: emailSettings.greeting,
                            message: emailSettings.message,
                            closing: emailSettings.closing,
                            showBanner: emailSettings.showBanner,
                            bannerText: emailSettings.bannerText
                        }}
                        onUpdate={(field, value) => handleSettingsUpdate(field as keyof EmailSettings, value)}
                        onToggleBanner={() => handleSettingsUpdate('showBanner', !emailSettings.showBanner)}
                        onShowMergeFields={() => setShowMergeFields(true)}
                    />

                    <SectionToggles
                        sections={sections}
                        onToggle={handleSectionToggle}
                    />

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>

                {/* Right Column - Preview */}
                <div>
                    <Preview settings={emailSettings} sections={sections} />
                </div>
            </div>

            <MergeFieldsPanel
                isOpen={showMergeFields}
                onClose={() => setShowMergeFields(false)}
                onInsert={handleInsertMergeField}
            />
        </div>
    );
};

export default EmailConfirmation;
