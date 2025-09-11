import React from 'react';

interface EmailHeaderProps {
    settings: {
        fromName: string;
        replyTo: string;
        subject: string;
    };
    onUpdate: (field: string, value: string) => void;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({ settings, onUpdate }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Email Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                    </label>
                    <input
                        type="text"
                        value={settings.fromName}
                        onChange={(e) => onUpdate('fromName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reply To Email
                    </label>
                    <input
                        type="email"
                        value={settings.replyTo}
                        onChange={(e) => onUpdate('replyTo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Email Subject
                </label>
                <input
                    type="text"
                    value={settings.subject}
                    onChange={(e) => onUpdate('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Email subject..."
                />
            </div>
        </div>
    );
};
