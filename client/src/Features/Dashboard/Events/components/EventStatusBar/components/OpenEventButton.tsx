import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify'; 

interface OpenEventButtonProps {
  url: string;
  eventId: string;
  isLive: boolean;
  onToggleLive: (eventId: string) => Promise<any>;
  isLoading?: boolean;
  onTemplateSelect: (template: string) => void;
}

const templates = [
  { id: 'template1', name: 'Template 1' },
  { id: 'template2', name: 'Template 2' },
  { id: 'template3', name: 'Template 3' },
];

const OpenEventButton: React.FC<OpenEventButtonProps> = ({ url, eventId, isLive, onToggleLive, onTemplateSelect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = async () => {
    if (!isLive) {
      await onToggleLive(eventId);
    }
    setOpen((prev) => !prev);
  };

  
  const handleTemplateClick = (template: string) => {
    onTemplateSelect(template);
    
    // Extract the customSlug from the current URL or props
    let customSlug = url;
    
    // If url is a full path or URL, extract just the slug
    if (url.includes('/events/')) {
      customSlug = url.split('/events/')[1];
    } else if (url.includes('/e/')) {
      customSlug = url.split('/e/')[1];
    }
    
    // Remove any existing query parameters from the slug
    customSlug = customSlug.split('?')[0];
    
    // Construct the correct event website URL with ONLY ONE template parameter
    const websiteUrl = `${window.location.origin}/e/${customSlug}?template=${template}`;
    
    console.log('Opening event website:', websiteUrl); // Debug
    
    window.open(websiteUrl, '_blank', 'noopener,noreferrer');
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

          {/* Header with info */}
          <div className="px-4 py-2 bg-gray-50 border-b">
            <p className="text-xs text-gray-600 font-medium">Choose a template:</p>
            <p className="text-xs text-gray-500">Preview different designs</p>
          </div>

          {templates.map((t) => (
            <button
              key={t.id}
              // ← Fixed: now passes both id and name
              onClick={() => handleTemplateClick(t.id, t.name)}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              {t.name}
            </button>
          ))}

          <div className="px-4 py-2 bg-blue-50 border-t">
            <p className="text-xs text-blue-700">
              Each template offers a unique design for your event website
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default OpenEventButton;