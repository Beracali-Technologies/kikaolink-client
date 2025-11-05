import React, { useRef, useState } from 'react';
import { FiUpload, FiTrash2, FiSettings, FiAlertCircle } from 'react-icons/fi';
import { EmailTemplate } from '@/types';
import { Input } from '@/components/ui/Input';
import { validateImageFile, formatFileSize } from '@/lib/utils/imageUpload/fileUtils';

interface EmailSettingsPanelProps {
  template: EmailTemplate;
  onUpdate: (updates: Partial<EmailTemplate>) => void;
  onBannerUpload: (file: File) => Promise<void>;
  onBannerRemove: () => void;
}

export const EmailSettingsPanel: React.FC<EmailSettingsPanelProps> = ({
  template,
  onUpdate,
  onBannerUpload,
  onBannerRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);



  const validateFile = (file: File): string | null => {
        // Check if file exists
        if (!file) {
            return 'No file selected';
        }

        // Check file type
        const validTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp'
        ];

        if (!file.type || !validTypes.includes(file.type)) {
          return `Invalid file type. Please use: JPEG, PNG, GIF, or WebP. Your file: ${file.type || 'unknown type'}`;
        }

        // Check file size (2MB = 2 * 1024 * 1024 bytes)
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
          const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
          return `File too large. Maximum size is 2MB. Your file: ${fileSizeMB}MB`;
        }

        return null;
      };



  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset previous errors
        setUploadError(null);

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
        setUploadError(validationError);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
        }

        // Create FormData and pass it to processFileUpload
        const formData = new FormData();
        formData.append('banner', file);

        await processFileUpload(formData);
        };




        const handleDrop = async (event: React.DragEvent) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];

            if (!file) return;

            setUploadError(null);

            if (!file.type.startsWith('image/')) {
              setUploadError('Please drop a valid image file');
              return;
            }

            const validationError = validateFile(file);
            if (validationError) {
              setUploadError(validationError);
              return;
            }

            // Create FormData for drag & drop too
            const formData = new FormData();
            formData.append('banner', file);

            await processFileUpload(formData);
    };


      const processFileUpload = async (formData: FormData) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // DEBUG: Log what we're sending
      const file = formData.get('banner') as File;
      console.log('📤 Uploading file:', {
        name: file?.name,
        type: file?.type,
        size: file?.size,
        isImage: file?.type?.startsWith('image/')
      });

      await onBannerUpload(formData);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('❌ Upload failed:', error);

      // Better error extraction
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        setUploadError(errorMessages);
      } else if (error.response?.data?.message) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('Failed to upload image. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };



  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleRemoveBanner = () => {
    setUploadError(null);
    onBannerRemove();
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
          value={template.from_name || ''}
          onChange={(e) => onUpdate({ from_name: e.target.value })}
          placeholder="Event Organizer"
        />

        <Input
          label="Reply To Email"
          type="email"
          value={template.reply_to || ''}
          onChange={(e) => onUpdate({ reply_to: e.target.value })}
          placeholder="noreply@yourevent.com"
        />

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Show Banner</label>
          <input
            type="checkbox"
            checked={template.show_banner || false}
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

              {/* Upload Error Display */}
              {uploadError && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                  <FiAlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              )}

              {template.banner_image ? (
                <div className="relative">
                  <img
                    src={template.banner_image}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    onClick={handleRemoveBanner}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    type="button"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isUploading
                      ? 'border-blue-400 bg-blue-50'
                      : uploadError
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <>
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-sm text-gray-600">Uploading image...</p>
                    </>
                  ) : (
                    <>
                      <FiUpload className={`mx-auto h-8 w-8 ${
                        uploadError ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <p className={`mt-2 text-sm ${
                        uploadError ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </p>
                    </>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
