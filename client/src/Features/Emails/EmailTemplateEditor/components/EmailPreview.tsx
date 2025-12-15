import React from 'react'; 
import { FiEye, FiAlertTriangle } from 'react-icons/fi';
import { EmailPreviewData, EmailTemplate, TEvent } from '@/types'; 

interface EmailPreviewProps {
  preview?: EmailPreviewData | null;
  template?: EmailTemplate | null;
  event?: TEvent | null; 
  onOpenPreview?: () => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ 
  preview, 
  template, 
  onOpenPreview 
}) => {
  // Handling case where preview is undefined or null
  if (!preview || !template) {
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
    const { template: previewTemplate, dummy_data } = preview;
    
    const processMergeFields = (content: string): string => {
      let processed = content;
      // Check if dummy_data exists before using it
      if (dummy_data) {
        Object.entries(dummy_data).forEach(([key, value]) => {
          const stringValue = String(value);
          processed = processed.replace(new RegExp(`\\(\\(${key}\\)\\)`, 'g'), stringValue);
        });
      }
      return processed;
    };

    const subject = previewTemplate.subject || 'Your Event Registration';
    const greeting = processMergeFields(previewTemplate.greeting || 'Dear ((attendee_first_name)),');
    const message = processMergeFields(previewTemplate.message || '').substring(0, 100) + '...';

    return { subject, greeting, message };
  };

  const quickPreview = generateQuickPreview();

  return (
    <div className="bg-white rounded-lg border p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold flex items-center">
          <FiEye className="h-3 w-3 text-gray-600 mr-1" />
          Email Preview
        </h3>
        <button
          onClick={onOpenPreview}
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
        Click "View Full" to see complete email preview with banner
      </div>
    </div>
  );
};