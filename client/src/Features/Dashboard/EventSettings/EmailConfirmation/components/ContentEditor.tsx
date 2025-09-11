import React from 'react';
import { FiEdit, FiType } from 'react-icons/fi';

interface ContentEditorProps {
    greeting: string;
    message: string;
    closing: string;
    subject: string;
    onContentChange: (field: string, value: string) => void;
    onFocus: (field: string) => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
    greeting,
    message,
    closing,
    subject,
    onContentChange,
    onFocus
}) => {
    const EditableField: React.FC<{
        label: string;
        value: string;
        field: string;
        multiline?: boolean;
        className?: string;
    }> = ({ label, value, field, multiline = false, className = '' }) => (
        <div className={`mb-6 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={(e) => onContentChange(field, e.target.value)}
                        onFocus={() => onFocus(field)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px]"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onContentChange(field, e.target.value)}
                        onFocus={() => onFocus(field)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                )}
                <FiEdit className="absolute right-3 top-3 text-gray-400" />
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-6">
                <FiType className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold">Email Content</h2>
            </div>

            <EditableField
                label="Subject Line"
                value={subject}
                field="subject"
            />

            <EditableField
                label="Greeting"
                value={greeting}
                field="greeting"
                multiline
            />

            <EditableField
                label="Message"
                value={message}
                field="message"
                multiline
            />

            <EditableField
                label="Closing"
                value={closing}
                field="closing"
                multiline
            />
        </div>
    );
};
