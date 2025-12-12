// src/Features/Emails/EmailTemplateEditor/components/ToggleSection.tsx
import React from 'react';
import { FiQrCode, FiUser, FiCalendar, FiList, FiEye } from 'react-icons/fi';

interface ToggleSectionProps {
  sectionKey: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isEnabled: boolean;
  onChange: (sectionKey: string, enabled: boolean) => void;
  compact?: boolean;
}

export const ToggleSection: React.FC<ToggleSectionProps> = ({
  sectionKey,
  label,
  description,
  icon,
  isEnabled,
  onChange,
  compact = false,
}) => {
  const handleToggle = () => {
    onChange(sectionKey, !isEnabled);
  };

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
          isEnabled 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded ${
            isEnabled 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-400'
          }`}>
            {icon}
          </div>
          <div>
            <div className="text-xs font-medium text-gray-900">{label}</div>
            <div className="text-xs text-gray-500 truncate max-w-[120px]">
              {description}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
            isEnabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={isEnabled}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-sm ${
        isEnabled 
          ? 'bg-blue-50 border-blue-200' 
          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isEnabled 
            ? 'bg-blue-100 text-blue-600' 
            : 'bg-gray-100 text-gray-500'
        }`}>
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
      
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isEnabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={isEnabled}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isEnabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};