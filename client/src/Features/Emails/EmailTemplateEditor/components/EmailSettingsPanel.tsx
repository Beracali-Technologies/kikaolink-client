// src/Features/Emails/EmailTemplateEditor/components/EmailSettingsPanel.tsx
import React, { useCallback } from 'react';
import { FiSettings } from 'react-icons/fi';
import { EmailTemplate } from '@/types';
import { EmailBannerUpload } from './EmailBannerUpload';

interface EmailSettingsPanelProps {
  template: EmailTemplate;
  onUpdate: (updates: Partial<EmailTemplate>) => void;
  eventId: number;
}

export const EmailSettingsPanel: React.FC<EmailSettingsPanelProps> = ({
  template,
  onUpdate,
  eventId,
}) => {
  // Safe callback for banner changes
  const handleBannerChange = useCallback((bannerUrl: string | null) => {
    if (typeof onUpdate === 'function') {
      onUpdate({
        banner_image: bannerUrl || undefined,
        show_banner: !!bannerUrl
      });
    } else {
      console.error('onUpdate is not a function');
    }
  }, [onUpdate]);

  // Safe callback for show banner toggle
  const handleShowBannerChange = useCallback((checked: boolean) => {
    if (typeof onUpdate === 'function') {
      onUpdate({ show_banner: checked });
    } else {
      console.error('onUpdate is not a function');
    }
  }, [onUpdate]);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center mb-4">
        <FiSettings className="h-4 w-4 text-gray-600 mr-2" />
        <h2 className="text-sm font-semibold">Email Settings</h2>
      </div>

      <div className="space-y-4">
        {/* Banner Upload */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-medium text-gray-900">Email Banner</h3>
              <p className="text-xs text-gray-500">Add banner image to emails</p>
            </div>
            <div className="flex items-center space-x-1">
              <label className="text-xs text-gray-700">Show</label>
              <input
                type="checkbox"
                checked={!!template.show_banner}
                onChange={(e) => handleShowBannerChange(e.target.checked)}
                className="h-3 w-3 text-blue-600 rounded border-gray-300"
                disabled={!template.banner_image}
              />
            </div>
          </div>

          <EmailBannerUpload
            eventId={eventId}
            onBannerChange={handleBannerChange}
          />
        </div>

        {/* From Settings */}
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              From Name
            </label>
            <input
              type="text"
              value={template.from_name || ''}
              onChange={(e) => {
                if (typeof onUpdate === 'function') {
                  onUpdate({ from_name: e.target.value })
                }
              }}
              placeholder="Event Team"
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Reply To Email
            </label>
            <input
              type="email"
              value={template.reply_to || ''}
              onChange={(e) => {
                if (typeof onUpdate === 'function') {
                  onUpdate({ reply_to: e.target.value })
                }
              }}
              placeholder="support@event.com"
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Banner Text (if banner is enabled) */}
        {template.show_banner && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Banner Text
            </label>
            <input
              type="text"
              value={template.banner_text || ''}
              onChange={(e) => {
                if (typeof onUpdate === 'function') {
                  onUpdate({ banner_text: e.target.value })
                }
              }}
              placeholder="THANK YOU FOR REGISTERING"
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};