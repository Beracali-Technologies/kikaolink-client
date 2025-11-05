// src/features/email-templates/components/EmailContentEditor.tsx
import React, { useState, useRef } from 'react';
import { FiType, FiEdit, FiPlus } from 'react-icons/fi';
import { EmailTemplate } from '@/types';

interface EmailContentEditorProps {
  template: EmailTemplate;
  onUpdate: (updates: Partial<EmailTemplate>) => void;
  onFieldFocus: (field: string) => void;
}

export const EmailContentEditor: React.FC<EmailContentEditorProps> = ({
  template,
  onUpdate,
  onFieldFocus,
}) => {
  const [activeField, setActiveField] = useState<string | null>(null);

  const EditableField: React.FC<{
    label: string;
    value: string;
    field: keyof EmailTemplate;
    multiline?: boolean;
    placeholder?: string;
  }> = ({ label, value, field, multiline = false, placeholder }) => {
    const handleFocus = () => {
      setActiveField(field as string);
      onFieldFocus(field as string);
    };

    const handleBlur = () => {
      setActiveField(null);
    };

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {activeField === field && (
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
              onClick={() => onFieldFocus(field as string)}
            >
              <FiPlus className="h-3 w-3 mr-1" />
              Add Merge Field
            </button>
          )}
        </div>
        <div className="relative">
          {multiline ? (
            <textarea
              value={value || ''}
              onChange={(e) => onUpdate({ [field]: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
              placeholder={placeholder}
              rows={4}
            />
          ) : (
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onUpdate({ [field]: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
            />
          )}
          <FiEdit className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FiType className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold">Email Content</h2>
      </div>

      <div className="space-y-6">
        <EditableField
          label="Email Subject"
          value={template.subject || ''}
          field="subject"
          placeholder="Your Ticket for [Event Name]"
        />

        <EditableField
          label="Greeting"
          value={template.greeting || ''}
          field="greeting"
          multiline
          placeholder="Dear ((attendee_first_name)) ((attendee_last_name)),"
        />

        <EditableField
          label="Message"
          value={template.message || ''}
          field="message"
          multiline
          placeholder="Thank you for registering for **((event_title))**! We're excited to have you join us."
        />

        <EditableField
          label="Closing"
          value={template.closing || ''}
          field="closing"
          multiline
          placeholder="Best regards,\nThe Event Team"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Available Merge Fields</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <code className="bg-white px-2 py-1 rounded border">((event_title))</code>
            <code className="bg-white px-2 py-1 rounded border">((event_date))</code>
            <code className="bg-white px-2 py-1 rounded border">((event_location))</code>
            <code className="bg-white px-2 py-1 rounded border">((attendee_first_name))</code>
            <code className="bg-white px-2 py-1 rounded border">((attendee_last_name))</code>
            <code className="bg-white px-2 py-1 rounded border">((attendee_full_name))</code>
            <code className="bg-white px-2 py-1 rounded border">((attendee_email))</code>
            <code className="bg-white px-2 py-1 rounded border">((registration_id))</code>
          </div>
        </div>
      </div>
    </div>
  );
};
