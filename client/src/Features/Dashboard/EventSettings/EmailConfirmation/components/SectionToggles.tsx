import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';

interface SectionTogglesProps {
    sections: {
        qrCode: boolean;
        attendeeInfo: boolean;
        aboutEvent: boolean;
        registrationSummary: boolean;
        attendeeDetails: boolean;
        viewRegistration: boolean;
    };
    onToggle: (section: string) => void;
}

export const SectionToggles: React.FC<SectionTogglesProps> = ({ sections, onToggle }) => {
    const sectionLabels = {
        qrCode: 'QR Code Ticket Information',
        attendeeInfo: 'Attendee Information',
        aboutEvent: 'About Event',
        registrationSummary: 'Registration Summary',
        attendeeDetails: 'Attendee Details',
        viewRegistration: 'View Registration / Invoice / Receipt'
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiCheckSquare className="mr-2" />
                Choose Sections in the email
            </h2>

            <div className="space-y-3">
                {Object.entries(sections).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() => onToggle(key)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                            {sectionLabels[key as keyof typeof sectionLabels]}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};
