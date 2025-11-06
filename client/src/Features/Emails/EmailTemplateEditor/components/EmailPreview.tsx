// src/features/email-templates/components/EmailPreview.tsx
import React, { useState } from 'react';
import { FiEye, FiX, FiMaximize2, FiMinimize2, FiAlertTriangle } from 'react-icons/fi';
import { EmailPreviewData } from '@/types';

interface EmailPreviewProps {
  preview?: EmailPreviewData | null;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ preview }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle case where preview is undefined or null
  if (!preview) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <FiEye className="h-5 w-5 text-gray-600 mr-2" />
            Email Preview
          </h3>
        </div>
        <div className="p-8 text-center">
          <FiAlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-500">No preview available</p>
          <p className="text-sm text-gray-400 mt-1">
            Click "Preview Email" to generate a preview
          </p>
        </div>
      </div>
    );
  }

  const generatePreviewHtml = (): string => {
    const { template, dummy_data } = preview;

    const processMergeFields = (content: string): string => {
      let processed = content;
      Object.entries(dummy_data).forEach(([key, value]) => {
        processed = processed.replace(new RegExp(`\\(\\(${key}\\)\\)`, 'g'), value);
      });
      return processed;
    };

    const greeting = processMergeFields(template.greeting || '');
    const message = processMergeFields(template.message || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const closing = processMergeFields(template.closing || '').replace(/\n/g, '<br>');

    return `
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">


      ${template.show_banner ? `
            ${template.banner_url ? `
            <div class="w-full">
              <img src="${template.banner_url}" alt="Event Banner" class="w-full h-auto max-h-48 object-cover" />
            </div>
            ` : template.banner_text ? `
            <div class="bg-gray-800 text-white text-center py-4 font-bold text-lg">
              ${template.banner_text}
            </div>
            ` : ''}
        ` : ''}

        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
          <h1 class="text-2xl font-bold">🎟 Your Event Ticket</h1>
          <p class="text-blue-100">Registration Confirmed</p>
        </div>

        <div class="p-6">
          <div class="whitespace-pre-line mb-4">${greeting}</div>
          <div class="whitespace-pre-line mb-6">${message}</div>

          ${template.enabled_sections?.qrCode ? `
            <div class="text-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-blue-300 mb-6">
              <h3 class="text-lg font-semibold mb-3">Your Digital Ticket</h3>
              <p class="text-gray-600 mb-4">Present this QR code at the event for check-in:</p>
              <div class="bg-gray-200 w-48 h-48 mx-auto flex items-center justify-center rounded-lg mb-3">
                <span class="text-gray-500">QR Code Preview</span>
              </div>
              <p class="text-sm text-gray-500">Registration ID: <strong>${dummy_data.registration_id}</strong></p>
            </div>
          ` : ''}

          ${template.enabled_sections?.attendeeInfo ? `
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 class="font-semibold text-blue-900 mb-2">Attendee Information</h3>
              <div class="bg-white p-3 rounded border">
                <p><strong>Name:</strong> ${dummy_data.attendee_full_name}</p>
                <p><strong>Email:</strong> ${dummy_data.attendee_email}</p>
                <p><strong>Company:</strong> ${dummy_data.attendee_company}</p>
              </div>
            </div>
          ` : ''}

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 class="font-semibold text-gray-900 mb-2">Event Details</h3>
            <div class="bg-white p-3 rounded border">
              <p><strong>Event:</strong> ${dummy_data.event_title}</p>
              <p><strong>Date:</strong> ${dummy_data.event_date}</p>
              <p><strong>Location:</strong> ${dummy_data.event_location}</p>
            </div>
          </div>

          <div class="whitespace-pre-line mt-6 pt-4 border-t border-gray-200">${closing}</div>
        </div>

        <div class="bg-gray-800 text-white p-4 text-center text-sm">
          <p>Powered by <strong>KikaoLink</strong> - Professional Event Management</p>
          <p>Need help? Contact: ${template.reply_to}</p>
        </div>
      </div>
    `;
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Email Preview - {preview.subject}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <FiMinimize2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div
              className="max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: generatePreviewHtml() }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center">
          <FiEye className="h-5 w-5 text-gray-600 mr-2" />
          Email Preview
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFullscreen(true)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <FiMaximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject:
          </label>
          <div className="text-sm text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded border">
            {preview.subject}
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div
            className="h-96 overflow-auto bg-gray-50 p-4"
            dangerouslySetInnerHTML={{ __html: generatePreviewHtml() }}
          />
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            This is a preview of how the email will look when sent to attendees.
            Actual attendee data will replace the placeholder information.
          </p>
        </div>
      </div>
    </div>
  );
};
