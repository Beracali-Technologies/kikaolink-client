// src/features/email-templates/components/EmailSettingsPanel.tsx
import React, { useCallback } from 'react';
import { FiSettings } from 'react-icons/fi';
import { EmailTemplate } from '@/types';
import { Input } from '@/components/ui/Input';
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
  // Stable callback for banner changes
  const handleBannerChange = useCallback((bannerUrl: string | null) => {
    onUpdate({
      banner_image: bannerUrl,
      show_banner: !!bannerUrl
    });
  }, [onUpdate]);

  // Stable callbacks for input changes
  const handleFromNameChange = useCallback((value: string) => {
    onUpdate({ from_name: value });
  }, [onUpdate]);

  const handleReplyToChange = useCallback((value: string) => {
    onUpdate({ reply_to: value });
  }, [onUpdate]);

  const handleBannerTextChange = useCallback((value: string) => {
    onUpdate({ banner_text: value });
  }, [onUpdate]);

  const handleShowBannerChange = useCallback((checked: boolean) => {
    onUpdate({ show_banner: checked });
  }, [onUpdate]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FiSettings className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold">Email Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <Input
            label="From Name"
            value={template.from_name || ''}
            onChange={(e) => handleFromNameChange(e.target.value)}
            placeholder="Event Organizer"
          />

          <Input
            label="Reply To Email"
            type="email"
            value={template.reply_to || ''}
            onChange={(e) => handleReplyToChange(e.target.value)}
            placeholder="noreply@yourevent.com"
          />
        </div>

        {/* Banner Settings */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">Email Banner</h3>
              <p className="text-sm text-gray-500">Add a banner image to your email template</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Show Banner</label>
              <input
                type="checkbox"
                checked={template.show_banner || false}
                onChange={(e) => handleShowBannerChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                disabled={!template.banner_image}
              />
            </div>
          </div>

          <EmailBannerUpload
            eventId={eventId}
            onBannerChange={handleBannerChange}
          />

          {template.show_banner && template.banner_image && (
            <Input
              label="Banner Text"
              value={template.banner_text || ''}
              onChange={(e) => handleBannerTextChange(e.target.value)}
              placeholder="THANK YOU FOR REGISTERING"
              className="mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};
