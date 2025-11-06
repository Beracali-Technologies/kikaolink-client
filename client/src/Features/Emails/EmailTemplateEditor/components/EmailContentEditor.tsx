import React, { useState, useRef } from 'react';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { EmailTemplate } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface EmailContentEditorProps {
  template: EmailTemplate;
  onUpdate: (updates: Partial<EmailTemplate>) => void;
  onFieldFocus: (field: string | null) => void;
}

type EditableField =
  | 'subject'
  | 'greeting'
  | 'message'
  | 'closing'
  | 'from_name'
  | 'reply_to';

export const EmailContentEditor: React.FC<EmailContentEditorProps> = ({
  template,
  onUpdate,
  onFieldFocus,
}) => {
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const startEditing = (field: EditableField) => {
    setEditingField(field);
    setEditValue(template[field] || '');
    onFieldFocus(field);

    // Focus the input after a small delay
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const saveEdit = () => {
    if (editingField && editValue !== template[editingField]) {
      onUpdate({ [editingField]: editValue });
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
    onFieldFocus(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const renderEditableField = (
    field: EditableField,
    label: string,
    placeholder: string,
    isTextarea: boolean = false
  ) => {
    const isEditing = editingField === field;
    const value = template[field] || '';

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => startEditing(field)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={`Edit ${label.toLowerCase()}`}
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={saveEdit}
                className="p-1 text-green-600 hover:text-green-700 transition-colors"
                aria-label="Save"
              >
                <FiCheck className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="p-1 text-red-600 hover:text-red-700 transition-colors"
                aria-label="Cancel"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div
            className="min-h-[40px] p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-text"
            onClick={() => startEditing(field)}
          >
            {value ? (
              <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
            ) : (
              <p className="text-gray-400 italic">{placeholder}</p>
            )}
          </div>
        ) : isTextarea ? (
          <Textarea
            ref={inputRef as React.Ref<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={field === 'message' ? 6 : 3}
            className="w-full resize-none"
          />
        ) : (
          <Input
            ref={inputRef as React.Ref<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Email Content
        </h2>
        <p className="text-gray-600 mb-6">
          Customize the content of your confirmation email. Click on any field or the edit icon to make changes.
        </p>
      </div>

      {renderEditableField(
        'subject',
        'Subject Line',
        'Your Ticket for ((event_title))'
      )}

      {renderEditableField(
        'greeting',
        'Greeting',
        'Dear ((attendee_first_name)) ((attendee_last_name)),'
      )}

      {renderEditableField(
        'message',
        'Message',
        'Thank you for registering for **((event_title))**! We are excited to have you join us.',
        true
      )}

      {renderEditableField(
        'closing',
        'Closing',
        'Best regards,\\nThe ((event_title)) Team',
        true
      )}

      {renderEditableField(
        'from_name',
        'From Name',
        'Event Team'
      )}

      {renderEditableField(
        'reply_to',
        'Reply To Email',
        'support@yourevent.com'
      )}

      {/* Merge Fields Helper */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Available Merge Fields
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {[
            '((event_title))',
            '((event_date))',
            '((event_location))',
            '((attendee_first_name))',
            '((attendee_last_name))',
            '((attendee_email))',
            '((attendee_company))',
            '((registration_id))',
          ].map((field) => (
            <code key={field} className="bg-white px-2 py-1 rounded border text-blue-700">
              {field}
            </code>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Use <strong>**text**</strong> for bold formatting in the message field.
        </p>
      </div>
    </div>
  );
};
