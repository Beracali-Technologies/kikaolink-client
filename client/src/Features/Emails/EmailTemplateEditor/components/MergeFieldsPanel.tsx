import React, { useState } from 'react';
import { FiX, FiSearch, FiCopy } from 'react-icons/fi';

interface MergeFieldsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (field: string) => void;
}

interface MergeField {
  value: string;
  label: string;
  category: string;
  description: string;
}

export const MergeFieldsPanel: React.FC<MergeFieldsPanelProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const mergeFields: MergeField[] = [
    // Event Fields
    {
      value: '((event_title))',
      label: 'Event Title',
      category: 'Event',
      description: 'The title of the event',
    },
    {
      value: '((event_date))',
      label: 'Event Date',
      category: 'Event',
      description: 'Formatted event date',
    },
    {
      value: '((event_location))',
      label: 'Event Location',
      category: 'Event',
      description: 'Event venue or location',
    },

    // Attendee Fields
    {
      value: '((attendee_first_name))',
      label: 'First Name',
      category: 'Attendee',
      description: 'Attendee\'s first name',
    },
    {
      value: '((attendee_last_name))',
      label: 'Last Name',
      category: 'Attendee',
      description: 'Attendee\'s last name',
    },
    {
      value: '((attendee_full_name))',
      label: 'Full Name',
      category: 'Attendee',
      description: 'Attendee\'s full name',
    },
    {
      value: '((attendee_email))',
      label: 'Email Address',
      category: 'Attendee',
      description: 'Attendee\'s email address',
    },
    {
      value: '((attendee_company))',
      label: 'Company',
      category: 'Attendee',
      description: 'Attendee\'s company name',
    },
    {
      value: '((registration_id))',
      label: 'Registration ID',
      category: 'Attendee',
      description: 'Unique registration identifier',
    },
  ];

  const filteredFields = mergeFields.filter(field =>
    field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedFields = filteredFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, MergeField[]>);

  const copyToClipboard = (field: string) => {
    navigator.clipboard.writeText(field);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Insert Merge Field</h2>
            <p className="text-sm text-gray-600 mt-1">
              Personalize your email with dynamic fields
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search merge fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {Object.entries(groupedFields).length === 0 ? (
              <div className="text-center py-8">
                <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">No merge fields found</p>
                <p className="text-sm text-gray-500">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedFields).map(([category, fields]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {category}
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {fields.map((field) => (
                        <div
                          key={field.value}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 text-sm group-hover:text-blue-700">
                                {field.label}
                              </p>
                              <p className="text-xs text-blue-600 font-mono mt-1 truncate">
                                {field.value}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {field.description}
                              </p>
                            </div>
                            <div className="flex space-x-2 ml-3">
                              <button
                                onClick={() => onInsert(field.value)}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                Insert
                              </button>
                              <button
                                onClick={() => copyToClipboard(field.value)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Copy to clipboard"
                              >
                                <FiCopy className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          {copiedField === field.value && (
                            <div className="mt-2 text-xs text-green-600 animate-pulse">
                              Copied to clipboard!
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              These fields will be automatically replaced with actual data when emails are sent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
