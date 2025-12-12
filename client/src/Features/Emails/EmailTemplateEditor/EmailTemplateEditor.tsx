// src/Features/Emails/EmailTemplateEditor/EmailTemplateEditor.tsx
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useEmailTemplate } from '@/lib/hooks/emailTemplates/useEmailTemplate';
import { EmailSettingsPanel } from './components/EmailSettingsPanel';
import { EmailContentEditor } from './components/EmailContentEditor';
import { EmailSectionsPanel } from './components/EmailSectionsPanel';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { MergeFieldsPanel } from './components/MergeFieldsPanel';
import { EmailTemplate } from '@/types';

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

  const {
    template,
    event,
    updateTemplate,
    saveTemplate,
    updateSection,
    previewEmail,
    isSaving,
    preview,
    error,
    isLoading,
  } = useEmailTemplate(eventIdNum);

  const [showMergeFields, setShowMergeFields] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingField, setEditingField] = useState<EmailTextField | null>(null);

  const handleSave = useCallback(async () => {
    try {
      await saveTemplate();
      // Show success message
    } catch (err) {
      console.error('Save failed:', err);
    }
  }, [saveTemplate]);

  const handleInsertMergeField = useCallback((field: string) => {
    if (!template || !editingField) return;
    
    const currentValue = (template as any)[editingField] || '';
    const newValue = currentValue + field;
    
    updateTemplate({ [editingField]: newValue });
    setShowMergeFields(false);
    setEditingField(null);
  }, [template, editingField, updateTemplate]);

  const handlePreview = useCallback(async () => {
    try {
      // Save current changes first
      await saveTemplate();
      // Generate preview with latest data
      const previewData = await previewEmail();
      if (previewData) {
        setShowPreviewModal(true);
      }
    } catch (err) {
      console.error('Preview failed:', err);
    }
  }, [saveTemplate, previewEmail]);

  if (!eventId || isNaN(eventIdNum) || eventIdNum <= 0) {
    return (
      <div className="flex h-96 items-center justify-center text-red-600">
        <div className="text-center">
          <p className="text-lg font-bold">Invalid Event ID</p>
          <p className="text-sm mt-2">Please check the URL and try again</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading email template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-bold">Template Not Found</div>
          <p className="text-gray-600 mt-2">Unable to load email template for this event</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Email Template</h1>
          <p className="text-sm text-gray-600 mt-1">Customize confirmation email for {event?.title}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowMergeFields(true)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Merge Fields
          </button>
          <button
            onClick={handlePreview}
            disabled={isSaving}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Preview Email'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings & Sections */}
        <div className="space-y-6">
          <EmailSettingsPanel
            template={template}
            onUpdate={updateTemplate}
            eventId={eventIdNum}
          />
          <EmailSectionsPanel
            sections={template.enabled_sections}
            onSectionToggle={updateSection}
          />
        </div>

        {/* Center Column - Email Content Editor */}
        <div className="lg:col-span-2">
          <EmailContentEditor
            template={template}
            onUpdate={updateTemplate}
            onFieldFocus={setEditingField}
          />
        </div>
      </div>


      {/* Merge Fields Modal */}
      <MergeFieldsPanel
        isOpen={showMergeFields}
        onClose={() => {
          setShowMergeFields(false);
          setEditingField(null);
        }}
        onInsert={handleInsertMergeField}
      />

      {/* Email Preview Modal */}
      {showPreviewModal && preview && template && (
        <EmailPreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          preview={preview}
          template={template}
          event={event}
        />
      )}
    </div>
  );
}