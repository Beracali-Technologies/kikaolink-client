import React, { useState, useRef, useEffect } from 'react';

interface OpenEventButtonProps {
  url: string;
  eventId: string;
  isLive: boolean;
  onToggleLive: (eventId: string) => Promise<any>;
  isLoading?: boolean;
}

const templates = [
  { id: 'template1', name: 'Template 1' },
  { id: 'template2', name: 'Template 2' },
  { id: 'template3', name: 'Template 3' },
];

const OpenEventButton: React.FC<OpenEventButtonProps> = ({ url, eventId, isLive, onToggleLive }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = async () => {
    if (!isLive) {
      await onToggleLive(eventId);
    }
    setOpen((prev) => !prev);
  };

  const handleTemplateClick = (template: string) => {
    window.open(`${url}?template=${template}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleButtonClick}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium"
      >
        {isLive ? 'Open Event' : 'Make Live & Open'}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTemplateClick(t.id)}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpenEventButton;
