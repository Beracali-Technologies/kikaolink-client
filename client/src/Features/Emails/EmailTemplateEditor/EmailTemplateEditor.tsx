// src/Features/Emails/EmailTemplateEditor/EmailTemplateEditor.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEmailTemplate } from '@/lib/hooks/emailTemplates/useEmailTemplate';
import { EmailSettingsPanel } from './components/EmailSettingsPanel';
import { EmailContentEditor } from './components/EmailContentEditor';
import { EmailSectionsPanel } from './components/EmailSectionsPanel';
import { EmailPreview } from './components/EmailPreview';
import { EmailPreviewModal } from './components/EmailPreviewModal'; // New component
import { MergeFieldsPanel } from './components/MergeFieldsPanel';

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

  if (!eventId || isNaN(eventIdNum) || eventIdNum <= 0) {
    return (
      <div className="flex h-96 items-center justify-center text-red-600">
        <div className="text-center">
          <p className="text-lg font-bold">Invalid Event ID</p>
        </div>
      </div>
    );
  }

  const {
    template,
    updateTemplate,
    saveTemplate,
    updateSection,
    previewEmail,
    isSaving,
    preview,
    error,
  } = useEmailTemplate(eventIdNum);

  const [showMergeFields, setShowMergeFields] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingField, setEditingField] = useState<EmailTextField | null>(null);

  const handleSave = async () => {
    try {
      await saveTemplate();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleInsertMergeField = (field: string) => {
    if (!template || !editingField) return;
    const currentValue = (template as any)[editingField] || '';
    const newValue = currentValue + field;
    updateTemplate({ [editingField]: newValue });
    setShowMergeFields(false);
    setEditingField(null);
  };

  const handlePreview = async () => {
    try {
      // Save current changes first
      await saveTemplate();
      // Generate preview with latest data
      await previewEmail();
      // Open modal
      setShowPreviewModal(true);
    } catch (err) {
      console.error('Preview failed:', err);
    }
  };

  if (!template) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
          <p className="text-sm text-gray-600 mt-1">Customize confirmation email</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowMergeFields(true)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Merge Fields
          </button>
          <button
            onClick={handlePreview}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Preview Email
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
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

        {/* Center Column - Email Content */}
        <div className="lg:col-span-2">
              <EmailContentEditor
                    template={template}
                    onUpdate={typeof updateTemplate === 'function' ? updateTemplate : () => console.error('updateTemplate not available')}
                    onFieldFocus={(field) => setEditingField(field as EmailTextField | null)}
                  />
        </div>
      </div>

      {/* Preview Card (small at bottom) */}
      <div>
        <EmailPreview preview={preview} />
      </div>

      {/* Merge Fields Modal */}
      <MergeFieldsPanel
        isOpen={showMergeFields}
        onClose={() => setShowMergeFields(false)}
        onInsert={handleInsertMergeField}
      />

      {/* Preview Modal */}
      {showPreviewModal && preview && (
        <EmailPreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          preview={preview}
          template={template} // Pass the actual template data
        />
      )}
    </div>
  );
}