import React, { useState, useEffect } from 'react';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { EmailTemplate } from '@/types';

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

  // Use useEffect to focus the input when editing starts
  useEffect(() => {
    if (editingField) {
      const element = document.querySelector(`[data-editing-field="${editingField}"]`) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  }, [editingField]);

  const startEditing = (field: EditableField) => {
    setEditingField(field);
    setEditValue(template[field] || '');
    onFieldFocus(field);
  };

  const saveEdit = () => {
    // Check if onUpdate is a function before calling it
    if (typeof onUpdate === 'function') {
      if (editingField && editValue !== template[editingField]) {
        onUpdate({ [editingField]: editValue });
      }
    } else {
      console.error('onUpdate is not a function in EmailContentEditor');
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
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
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
              <FiEdit2 className="h-3 w-3" />
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={saveEdit}
                className="p-1 text-green-600 hover:text-green-700 transition-colors"
                aria-label="Save"
              >
                <FiCheck className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="p-1 text-red-600 hover:text-red-700 transition-colors"
                aria-label="Cancel"
              >
                <FiX className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div
            className="min-h-[30px] p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-text text-sm"
            onClick={() => startEditing(field)}
          >
            {value ? (
              <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
            ) : (
              <p className="text-gray-400 italic text-xs">{placeholder}</p>
            )}
          </div>
        ) : isTextarea ? (
          <textarea
            data-editing-field={field}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={field === 'message' ? 4 : 2}
            className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        ) : (
          <input
            data-editing-field={field}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Email Content
        </h2>
        <p className="text-sm text-gray-600">
          Customize your confirmation email. Click on any field to edit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {renderEditableField(
          'subject',
          'Subject Line',
          'Your Ticket for ((event_title))'
        )}

        {renderEditableField(
          'greeting',
          'Greeting',
          'Dear ((attendee_first_name)),'
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
      </div>

      {renderEditableField(
        'message',
        'Message',
        'Thank you for registering for ((event_title))...',
        true
      )}

      {renderEditableField(
        'closing',
        'Closing',
        'Best regards,\\nThe Event Team',
        true
      )}
    </div>
  );
};