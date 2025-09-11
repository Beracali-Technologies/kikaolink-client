import React from 'react';
import { FiSettings, FiCheckSquare } from 'react-icons/fi';
import { EmailSections } from '../types/email';


interface SettingsPanelProps {
    fromName: string;
    replyTo: string;
    sections: {
        qrCode: boolean;
        attendeeInfo: boolean;
        aboutEvent: boolean;
        registrationSummary: boolean;
        attendeeDetails: boolean;
        viewRegistration: boolean;
    };
    onSettingsChange: (field: string, value: string) => void;
    onSectionToggle: (section: keyof EmailSections) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
    fromName,
    replyTo,
    sections,
    onSettingsChange,
    onSectionToggle
}) => {
    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex items-center mb-6">
                <FiSettings className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold">Settings</h2>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                    </label>
                    <input
                        type="text"
                        value={fromName}
                        onChange={(e) => onSettingsChange('fromName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reply To Email
                    </label>
                    <input
                        type="email"
                        value={replyTo}
                        onChange={(e) => onSettingsChange('replyTo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex items-center mb-4">
                <FiCheckSquare className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="font-semibold">Email Sections</h3>
            </div>

            <div className="space-y-3">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={sections.qrCode}
                        onChange={() => onSectionToggle('qrCode')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">QR Code Ticket</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={sections.attendeeInfo}
                        onChange={() => onSectionToggle('attendeeInfo')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">Attendee Information</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={sections.registrationSummary}
                        onChange={() => onSectionToggle('registrationSummary')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">Registration Summary</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={sections.viewRegistration}
                        onChange={() => onSectionToggle('viewRegistration')}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">View Registration</span>
                </label>
            </div>
        </div>
    );
};
