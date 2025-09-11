import React, { useState } from 'react';
import { EmailBannerEditor } from './components/EmailBannerEditor';
import { ContentEditor } from './components/ContentEditor';
import { SettingsPanel } from './components/SettingsPanel';
import { MergeFieldsPanel } from './components/MergeFieldsPanel';
import { useEmailEditor } from './hooks/useEmailEditor';

const EmailConfirmation: React.FC = () => {
    const {
        emailSettings,
        sections,
        showMergeFields,
        updateSettings,
        toggleSection,
        setShowMergeFields,
        setEditingField,
        insertMergeField
    } = useEmailEditor();

    const [bannerImage, setBannerImage] = useState<File | null>(null);

    const handleBannerImageChange = (file: File) => {
        setBannerImage(file);
    };

    const handleRemoveBanner = () => {
        setBannerImage(null);
        updateSettings('showBanner', false);
    };

    const handleSave = () => {
        console.log('Saving email configuration:', {
            emailSettings,
            sections,
            bannerImage
        });
        alert('Email configuration saved successfully!');
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Confirmation Email</h1>
                <p className="text-gray-600">This email will be sent when the registration is confirmed.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Settings */}
                <div className="lg:col-span-1">
                    <SettingsPanel
                        fromName={emailSettings.fromName}
                        replyTo={emailSettings.replyTo}
                        sections={sections}
                        onSettingsChange={(field, value) => updateSettings(field as any, value)}
                        onSectionToggle={toggleSection}
                    />
                </div>

                {/* Middle Column - Content Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <EmailBannerEditor
                        bannerText={emailSettings.bannerText}
                        bannerImage={bannerImage || undefined}
                        showBanner={emailSettings.showBanner}
                        onBannerTextChange={(text) => updateSettings('bannerText', text)}
                        onBannerImageChange={handleBannerImageChange}
                        onRemoveBanner={handleRemoveBanner}
                        onToggleBanner={() => updateSettings('showBanner', !emailSettings.showBanner)}
                    />

                    <ContentEditor
                        greeting={emailSettings.greeting}
                        message={emailSettings.message}
                        closing={emailSettings.closing}
                        subject={emailSettings.subject}
                        onContentChange={(field, value) => updateSettings(field as any, value)}
                        onFocus={setEditingField}
                    />

                    <div className="bg-white rounded-lg p-6">
                        <button
                            onClick={() => setShowMergeFields(true)}
                            className="w-full py-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-100 font-medium flex items-center justify-center"
                        >
                            + Insert Merge Field
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                    >
                        Save Configuration
                    </button>
                </div>
            </div>

            <MergeFieldsPanel
                isOpen={showMergeFields}
                onClose={() => setShowMergeFields(false)}
                onInsert={insertMergeField}
            />
        </div>
    );
};

export default EmailConfirmation;
