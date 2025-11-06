import React, { useRef, useState, useEffect } from 'react';
import { FiTrash2, FiImage, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { useEmailBanner } from '@/lib/hooks/emailTemplates/useEmailBanner';
import { Button } from '@/components/ui/Button';

interface EmailBannerUploadProps {
  eventId: number;
  onBannerChange?: (bannerUrl: string | null) => void;
}

export const EmailBannerUpload: React.FC<EmailBannerUploadProps> = ({
  eventId,
  onBannerChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Pass eventId to hook - it will auto-load the banner
  const {
    banner,
    isUploading,
    isDeleting,
    error,
    uploadBanner,
    deleteBanner,
    clearError,
  } = useEmailBanner(eventId);

  // Notify parent when banner changes - FIXED: Remove banner from dependencies
  useEffect(() => {
    if (onBannerChange) {
      onBannerChange(banner?.url || null);
    }
  }, [banner?.url, onBannerChange]); // Only depend on banner.url, not the entire banner object

  const validateFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Please use JPEG, PNG, GIF, or WebP.';
    }

    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return `File too large. Maximum size is 2MB. Your file: ${fileSizeMB}MB`;
    }

    return null;
  };

  const handleFileSelect = async (file: File) => {
    clearError();

    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      await uploadBanner(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleRemoveBanner = async () => {
    if (!banner) return;

    if (window.confirm('Are you sure you want to remove this banner?')) {
      try {
        await deleteBanner(banner.id);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Display */}
      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <FiAlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Banner Preview */}
      {banner ? (
        <div className="space-y-3">
          <div className="relative rounded-lg border-2 border-dashed border-green-200 bg-green-50 p-4">
            <div className="flex items-center space-x-3">
              <FiCheck className="h-5 w-5 text-green-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800">Banner Uploaded</p>
                <p className="text-xs text-green-600 truncate">{banner.original_name}</p>
                <p className="text-xs text-green-500">
                  {banner.dimensions.width}×{banner.dimensions.height} • {banner.size}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveBanner}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <FiTrash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Image Preview */}
          <div className="relative rounded-lg border border-gray-200 overflow-hidden">
            <img
              src={banner.url}
              alt="Banner preview"
              className="w-full h-32 object-cover"
              onError={() => {
                console.error('Failed to load banner image:', banner.url);
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
              Preview - {banner.dimensions.width}×{banner.dimensions.height}
            </div>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600">Uploading banner...</p>
            </>
          ) : (
            <>
              <FiImage className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF, WebP up to 2MB
              </p>
            </>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
        onChange={handleFileInput}
        className="hidden"
        disabled={isUploading}
      />

      {/* Help Text */}
      <div className="text-xs text-gray-500">
        <p>Recommended: 600px width, aspect ratio 3:1 for best email display</p>
      </div>
    </div>
  );
};
