// src/Features/Emails/EmailTemplateEditor/components/EmailPreview.tsx
import React, { useState } from 'react';
import { FiEye, FiX, FiAlertTriangle } from 'react-icons/fi';
import { EmailPreviewData } from '@/types';

interface EmailPreviewProps {
  preview?: EmailPreviewData | null;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ preview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle case where preview is undefined or null
  if (!preview) {
    return (
      <div className="bg-white rounded-lg border p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold flex items-center">
            <FiEye className="h-3 w-3 text-gray-600 mr-1" />
            Email Preview
          </h3>
        </div>
        <div className="p-3 text-center bg-gray-50 rounded">
          <FiAlertTriangle className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">No preview generated</p>
        </div>
      </div>
    );
  }

  // Quick preview generation with actual data
  const generateQuickPreview = () => {
    const { template, dummy_data } = preview;
    
    const processMergeFields = (content: string): string => {
      let processed = content;
      Object.entries(dummy_data).forEach(([key, value]) => {
        const stringValue = String(value);
        processed = processed.replace(new RegExp(`\\(\\(${key}\\)\\)`, 'g'), stringValue);
      });
      return processed;
    };

    const subject = template.subject || 'Your Event Registration';
    const greeting = processMergeFields(template.greeting || 'Dear ((attendee_first_name)),');
    const message = processMergeFields(template.message || '').substring(0, 100) + '...';

    return { subject, greeting, message };
  };

  const quickPreview = generateQuickPreview();

  return (
    <>
      {/* Compact Preview Card */}
      <div className="bg-white rounded-lg border p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold flex items-center">
            <FiEye className="h-3 w-3 text-gray-600 mr-1" />
            Email Preview
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Full
          </button>
        </div>
        
        <div className="mb-2">
          <div className="text-xs font-medium text-gray-700 mb-1">Subject:</div>
          <div className="text-xs text-gray-900 bg-gray-50 px-2 py-1 rounded border truncate">
            {quickPreview.subject}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-xs font-medium text-gray-700 mb-1">Preview:</div>
          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-100">
            {quickPreview.greeting}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Click "View Full" to see complete email preview
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Email Preview</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="max-w-2xl mx-auto bg-white border rounded-lg p-4">
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Subject:</div>
                  <div className="text-lg font-bold text-gray-900">{quickPreview.subject}</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Greeting:</div>
                    <div className="text-gray-900">{quickPreview.greeting}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Message:</div>
                    <div className="text-gray-900">{quickPreview.message}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};