import React, { useRef } from 'react';
import { FiUpload, FiTrash2, FiSettings } from 'react-icons/fi';
import { EmailTemplate } from '.@/types';
import { Input } from '@/components/ui/Input';

interface EmailSettingsPanelProps {
  template: EmailTemplate;
  onUpdate: (updates: Partial<EmailTemplate>) => void;
  onBannerUpload: (file: File) => void;
  onBannerRemove: () => void;
}

export const EmailSettingsPanel: React.FC<EmailSettingsPanelProps> = ({
  template,
  onUpdate,
  onBannerUpload,
  onBannerRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onBannerUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onBannerUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FiSettings className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold">Email Settings</h2>
      </div>

      <div className="space-y-4">
        <Input
          label="From Name"
          value={template.from_name}
          onChange={(e) => onUpdate({ from_name: e.target.value })}
          placeholder="Event Organizer"
        />

        <Input
          label="Reply To Email"
          type="email"
          value={template.reply_to}
          onChange={(e) => onUpdate({ reply_to: e.target.value })}
          placeholder="noreply@yourevent.com"
        />

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Show Banner</label>
          <input
            type="checkbox"
            checked={template.show_banner}
            onChange={(e) => onUpdate({ show_banner: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </div>

        {template.show_banner && (
          <>
            <Input
              label="Banner Text"
              value={template.banner_text || ''}
              onChange={(e) => onUpdate({ banner_text: e.target.value })}
              placeholder="THANK YOU FOR REGISTERING"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>

              {template.banner_image ? (
                <div className="relative">
                  <img
                    src={template.banner_image}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    onClick={onBannerRemove}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
