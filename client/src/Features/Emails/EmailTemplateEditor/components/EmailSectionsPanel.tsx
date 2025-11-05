import React from 'react';
import { FiCheckSquare, FiUser, FiInfo, FiList, FiEye } from 'react-icons/fi';
import { MdQrCode2 } from "react-icons/md";
import { EmailSections } from '@/types';

interface EmailSectionsPanelProps {
  sections: EmailSections;
  onSectionToggle: (section: keyof EmailSections, value: boolean) => void;
}

export const EmailSectionsPanel: React.FC<EmailSectionsPanelProps> = ({
  sections,
  onSectionToggle,
}) => {
  const sectionConfig = [
    {
      key: 'qrCode' as keyof EmailSections,
      label: 'QR Code Ticket',
      description: 'Include the QR code for event check-in',
      icon: MdQrCode2,
    },
    {
      key: 'attendeeInfo' as keyof EmailSections,
      label: 'Attendee Information',
      description: 'Show attendee name, email, and company',
      icon: FiUser,
    },
    {
      key: 'aboutEvent' as keyof EmailSections,
      label: 'About Event',
      description: 'Include event description and details',
      icon: FiInfo,
    },
    {
      key: 'registrationSummary' as keyof EmailSections,
      label: 'Registration Summary',
      description: 'Show registration date and confirmation number',
      icon: FiList,
    },
    {
      key: 'attendeeDetails' as keyof EmailSections,
      label: 'Attendee Details',
      description: 'Include custom attendee fields',
      icon: FiUser,
    },
    {
      key: 'viewRegistration' as keyof EmailSections,
      label: 'View Registration',
      description: 'Add link to view registration details',
      icon: FiEye,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <FiCheckSquare className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold">Email Sections</h2>
      </div>

      <div className="space-y-4">
        {sectionConfig.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.key} className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={sections[section.key] || false}
                onChange={(e) => onSectionToggle(section.key, e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4 text-gray-500" />
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">
                    {section.label}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {section.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          Toggle sections to include or exclude from the confirmation email.
          All sections will be automatically formatted.
        </p>
      </div>
    </div>
  );
};
