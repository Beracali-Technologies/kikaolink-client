// src/Features/Emails/EmailTemplateEditor/components/MergeFieldsPanel.tsx
import React, { useState } from 'react';
import { FiX, FiSearch, FiCopy } from 'react-icons/fi';

interface MergeFieldsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (field: string) => void;
}

// Update the interface to include all properties you're using
interface MergeField {
  value: string;
  label: string;
  category: string;
  description?: string; // Make optional
  icon?: string; // Add icon property
  badgeColor?: string; // Add badgeColor property
  isRealData?: boolean; // Add isRealData property
}

export const MergeFieldsPanel: React.FC<MergeFieldsPanelProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const mergeFields: MergeField[] = [
    // Event Fields - Show with green badge
    { 
      value: '((event_title))', 
      label: 'Event Title', 
      category: 'Event', 
      description: 'Real event title from database',
      icon: '📅',
      isRealData: true
    },
    { 
      value: '((event_date))', 
      label: 'Event Date', 
      category: 'Event', 
      description: 'Real event date from database',
      icon: '📅',
      isRealData: true
    },
    { 
      value: '((event_location))', 
      label: 'Event Location', 
      category: 'Event', 
      description: 'Real event location from database', // Added description
      icon: '📍',
      isRealData: true
    },
    
    // Attendee Fields - Show with blue badge
    { 
      value: '((attendee_first_name))', 
      label: 'First Name', 
      category: 'Attendee', 
      description: 'Attendee\'s first name (per-person)',
      icon: '👤',
      isRealData: false
    },
    { 
      value: '((attendee_last_name))', 
      label: 'Last Name', 
      category: 'Attendee', 
      description: 'Attendee\'s last name (per-person)',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    { 
      value: '((attendee_full_name))', 
      label: 'Full Name', 
      category: 'Attendee', 
      description: 'Attendee\'s full name (per-person)',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    { 
      value: '((attendee_email))', 
      label: 'Email', 
      category: 'Attendee', 
      description: 'Attendee\'s email address (per-person)',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    { 
      value: '((attendee_company))', 
      label: 'Company', 
      category: 'Attendee', 
      description: 'Attendee\'s company name (per-person)',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    { 
      value: '((registration_id))', 
      label: 'Reg ID', 
      category: 'Attendee', 
      description: 'Registration ID (per-person)',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
  ];

  const filteredFields = mergeFields.filter(field =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (field: string) => {
    navigator.clipboard.writeText(field);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Merge Fields</h2>
            <p className="text-xs text-gray-600 mt-1">Insert dynamic fields</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {filteredFields.length === 0 ? (
            <div className="text-center py-4">
              <FiSearch className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">No fields found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredFields.map((field) => (
                <div
                  key={field.value}
                  className="p-3 border border-gray-200 rounded hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1">
                        {field.icon && (
                          <span className="text-xs">{field.icon}</span>
                        )}
                        <span className="text-xs font-medium text-gray-800">{field.label}</span>
                        <span 
                          className={`text-xs px-1 py-0.5 rounded ${
                            field.badgeColor || 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {field.category}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-blue-600 mt-1 truncate">
                        {field.value}
                      </p>
                      {field.description && (
                        <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onInsert(field.value)}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Insert
                      </button>
                      <button
                        onClick={() => copyToClipboard(field.value)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Copy"
                      >
                        <FiCopy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  {copiedField === field.value && (
                    <div className="mt-1 text-xs text-green-600 animate-pulse">
                      Copied!
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            Fields are replaced with actual data when sent
          </p>
        </div>
      </div>
    </div>
  );
};