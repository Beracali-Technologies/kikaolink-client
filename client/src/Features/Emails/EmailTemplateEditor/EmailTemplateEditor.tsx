// src/Features/Emails/EmailTemplateEditor/EmailTemplateEditor.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEmailTemplate } from '@/lib/hooks/emailTemplates/useEmailTemplate';
import { EmailSettingsPanel } from './components/EmailSettingsPanel';
import { EmailContentEditor } from './components/EmailContentEditor';
import { EmailSectionsPanel } from './components/EmailSectionsPanel';
import { EmailPreview } from './components/EmailPreview';
import { MergeFieldsPanel } from './components/MergeFieldsPanel';
import { Button } from '@/components/ui/Button';

type EmailTextField =
  | 'name'
  | 'subject'
  | 'greeting'
  | 'message'
  | 'closing'
  | 'from_name'
  | 'reply_to'
  | 'banner_text';

export default function EmailTemplateEditor() {
  const { eventId } = useParams<{ eventId: string }>();
  const eventIdNum = eventId ? Number(eventId) : 0;

  // Early guard — prevents React from ever stringifying an invalid ID
  if (!eventId || isNaN(eventIdNum) || eventIdNum <= 0) {
    return (
      <div className="flex h-96 items-center justify-center text-red-600">
        <div className="text-center">
          <p className="text-2xl font-bold">Invalid Event ID</p>
          <p className="mt-2">Expected a number, got: "{eventId}"</p>
        </div>
      </div>
    );
  }

  const {
    template,
    updateTemplate,
    updateSection,
    uploadBanner,
    removeBanner,
    previewEmail,
    isSaving,
    preview,
  } = useEmailTemplate(eventIdNum);

  const [showMergeFields, setShowMergeFields] = useState(false);
  const [editingField, setEditingField] = useState<EmailTextField | null>(null);

  const handleSave = async () => {
    try {
      await updateTemplate();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleInsertMergeField = (field: string) => {
    if (!template || !editingField) return;
    const current = (template as any)[editingField];
    const text = typeof current === 'string' ? current : '';
    updateTemplate({ [editingField]: text + field });
    setShowMergeFields(false);
    setEditingField(null);
  };

  if (!template) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Template</h1>
          <p className="mt-1 text-gray-600">Customize your attendee confirmation email</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowMergeFields(true)}>
            Insert Merge Field
          </Button>
          <Button variant="outline" onClick={previewEmail}>
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          <EmailSettingsPanel
            template={template}
            onUpdate={updateTemplate}
            onBannerUpload={uploadBanner}
            onBannerRemove={removeBanner}
          />
          <EmailSectionsPanel
            sections={template.enabled_sections}
            onSectionToggle={updateSection}
          />
        </aside>

        {/* Main */}
        <main className="lg:col-span-2 space-y-8">
          <EmailContentEditor
            template={template}
            onUpdate={updateTemplate}
            onFieldFocus={setEditingField}
          />

          {preview && (
            <EmailPreview preview={preview} />
          )}
        </main>
      </div>

      {/* Modal */}
      <MergeFieldsPanel
        isOpen={showMergeFields}
        onClose={() => setShowMergeFields(false)}
        onInsert={handleInsertMergeField}
      />
    </div>
  );
}
