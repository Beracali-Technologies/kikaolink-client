import React from 'react';
import { FiCheckSquare, FiUser, FiCalendar, FiList, FiEye } from 'react-icons/fi';
import { QrCode } from 'lucide-react';
import { ToggleSection } from './ToggleSection';


interface EmailSectionsPanelProps {
  sections?: {
    qrCode: boolean;
    attendeeInfo: boolean;
    eventInfo: boolean;
    registrationSummary?: boolean;
    viewRegistration?: boolean;
  };
  onSectionToggle: (sectionKey: string, enabled: boolean) => void;
  compact?: boolean;
}

export const EmailSectionsPanel: React.FC<EmailSectionsPanelProps> = ({
  sections = { 
    qrCode: true, 
    attendeeInfo: true, 
    eventInfo: true,
    registrationSummary: true,
    viewRegistration: true
  },
  onSectionToggle,
  compact = false,
}) => {
  const sectionOptions = [
    {
      key: 'qrCode',
      label: 'QR Code',
      description: 'Digital ticket QR code',
      icon: <QrCode className="h-3 w-3" />,
    },
    {
      key: 'attendeeInfo',
      label: 'Attendee Info',
      description: 'Attendee details',
      icon: <FiUser className="h-3 w-3" />,
    },
    {
      key: 'eventInfo',
      label: 'Event Info',
      description: 'Event details',
      icon: <FiCalendar className="h-3 w-3" />,
    },
    {
      key: 'registrationSummary',
      label: 'Registration',
      description: 'Registration summary',
      icon: <FiList className="h-3 w-3" />,
    },
    {
      key: 'viewRegistration',
      label: 'View Link',
      description: 'View registration link',
      icon: <FiEye className="h-3 w-3" />,
    },
  ];

  if (compact) {
    return (
      <div className="bg-white rounded-lg border p-3">
        <div className="flex items-center mb-2">
          <FiCheckSquare className="h-3 w-3 text-gray-600 mr-1" />
          <h2 className="text-xs font-semibold">Email Sections</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          {sectionOptions.map((section) => (
            <ToggleSection
              key={section.key}
              sectionKey={section.key}
              label={section.label}
              description={section.description}
              icon={section.icon}
              isEnabled={sections[section.key as keyof typeof sections] !== false}
              onChange={onSectionToggle}
              compact={true}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center mb-3">
        <FiCheckSquare className="h-4 w-4 text-gray-600 mr-2" />
        <h2 className="text-sm font-semibold">Email Sections</h2>
      </div>
      <p className="text-xs text-gray-500 mb-3">Toggle sections to include in email</p>

      <div className="space-y-2">
        {sectionOptions.map((section) => (
          <ToggleSection
            key={section.key}
            sectionKey={section.key}
            label={section.label}
            description={section.description}
            icon={section.icon}
            isEnabled={sections[section.key as keyof typeof sections] !== false}
            onChange={onSectionToggle}
          />
        ))}
      </div>
    </div>
  );
};