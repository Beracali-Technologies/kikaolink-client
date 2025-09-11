import React from 'react';
import { FiEdit, FiPlus } from 'react-icons/fi';

interface EmailContentProps {
    content: {
        greeting: string;
        message: string;
        closing: string;
        showBanner: boolean;
        bannerText: string;
    };
    onUpdate: (field: string, value: string) => void;
    onToggleBanner: () => void;
    onShowMergeFields: () => void;
}

export const EmailContent: React.FC<EmailContentProps> = ({
    content,
    onUpdate,
    onToggleBanner,
    onShowMergeFields
}) => {
    const EditableField: React.FC<{
        label: string;
        value: string;
        field: string;
        multiline?: boolean;
    }> = ({ label, value, field, multiline = false }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={(e) => onUpdate(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onUpdate(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                )}
                <FiEdit className="absolute right-3 top-3 text-gray-400" />
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Email Content</h2>

            {/* Banner Settings */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Email Banner</label>
                    <button
                        onClick={onToggleBanner}
                        className={`px-3 py-1 rounded-md text-sm ${
                            content.showBanner
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        {content.showBanner ? 'Remove Banner' : 'Add Banner'}
                    </button>
                </div>

                {content.showBanner && (
                    <input
                        type="text"
                        value={content.bannerText}
                        onChange={(e) => onUpdate('bannerText', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                        placeholder="Banner text..."
                    />
                )}
            </div>

            {/* Content Fields */}
            <EditableField
                label="Greeting"
                value={content.greeting}
                field="greeting"
            />

            <EditableField
                label="Message"
                value={content.message}
                field="message"
                multiline
            />

            <EditableField
                label="Closing"
                value={content.closing}
                field="closing"
                multiline
            />

            {/* Merge Fields Button */}
            <button
                onClick={onShowMergeFields}
                className="w-full py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center"
            >
                <FiPlus className="mr-2" />
                Insert Merge Field
            </button>
        </div>
    );
};
