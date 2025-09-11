import React, { useRef } from 'react';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';

interface EmailBannerEditorProps {
    bannerText: string;
    bannerImage?: string;
    showBanner: boolean;
    onBannerTextChange: (text: string) => void;
    onBannerImageChange: (image: File) => void;
    onRemoveBanner: () => void;
    onToggleBanner: () => void;
}

export const EmailBannerEditor: React.FC<EmailBannerEditorProps> = ({
    bannerText,
    bannerImage,
    showBanner,
    onBannerTextChange,
    onBannerImageChange,
    onRemoveBanner,
    onToggleBanner
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onBannerImageChange(file);
        }
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onBannerImageChange(file);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    if (!showBanner) {
        return (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">No banner added</p>
                <button
                    onClick={onToggleBanner}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                    Add Banner
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Email Banner</h3>
                <button
                    onClick={onRemoveBanner}
                    className="text-red-600 hover:text-red-800 text-sm"
                >
                    <FiTrash2 className="inline mr-1" />
                    Remove Banner
                </button>
            </div>

            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
            >
                {bannerImage ? (
                    <div className="relative">
                        <img
                            src={URL.createObjectURL(bannerImage)}
                            alt="Banner preview"
                            className="mx-auto max-h-32 object-contain rounded"
                        />
                        <div className="mt-2">
                            <input
                                type="text"
                                value={bannerText}
                                onChange={(e) => onBannerTextChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-center font-bold text-lg"
                                placeholder="Enter banner text..."
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            Drag and drop an image here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Recommended: 1200×400px, JPG/PNG
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
        </div>
    );
};
