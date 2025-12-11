// src/Features/Dashboard/Events/components/EventWebsiteTemplates/TemplatePreviewCard.tsx
import React, { useState } from 'react';
import { FiEye, FiCheck, FiExternalLink } from 'react-icons/fi';

interface TemplatePreviewCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    category: string;
    features: string[];
  };
  isActive: boolean;
  onSelect: () => void;
  onPreview: () => void;
  eventTitle: string;
  eventSlug?: string;
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  template,
  isActive,
  onSelect,
  onPreview,
  eventTitle,
  eventSlug,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Compact template previews - just visual thumbnails
  const renderTemplatePreview = () => {
    const previewTitle = eventTitle.length > 12 ? eventTitle.substring(0, 12) + '...' : eventTitle;
    
    switch(template.id) {
      case 'template1':
        return (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="mb-1">
                  <span className="inline-flex items-center">
                    <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse mr-1"></span>
                    <span className="text-[8px] text-green-300">LIVE</span>
                  </span>
                </div>
                <h3 className="text-white font-bold text-xs mb-1">{previewTitle}</h3>
                <div className="grid grid-cols-3 gap-0.5 mb-1">
                  <div className="bg-white/5 rounded-sm p-0.5">
                    <div className="w-2 h-2 bg-purple-600 rounded-sm mx-auto mb-0.5"></div>
                  </div>
                  <div className="bg-white/5 rounded-sm p-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-sm mx-auto mb-0.5"></div>
                  </div>
                  <div className="bg-white/5 rounded-sm p-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-sm mx-auto mb-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="h-3 bg-white rounded-sm"></div>
            </div>
          </div>
        );

      case 'template2':
        return (
          <div className="h-full w-full bg-white p-2">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-1">
                <div className="text-blue-600 font-semibold text-xs">{previewTitle}</div>
                <div className="w-4 h-2 bg-red-500 rounded-sm"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex gap-1 mb-1">
                  <div className="text-center flex-1">
                    <div className="text-xs font-light text-blue-600">500+</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xs font-light text-red-500">18</div>
                  </div>
                </div>
                <div className="h-px bg-gray-200"></div>
              </div>
              <div className="h-2 bg-blue-600 rounded-sm mt-1"></div>
            </div>
          </div>
        );

      case 'template3':
        return (
          <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-2">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-sm mr-0.5"></div>
                </div>
                <div className="w-4 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-0.5">
                  <span className="px-1 py-0.5 bg-green-100 text-green-800 rounded-full text-[6px]">
                    OPEN
                  </span>
                </div>
                <div className="flex gap-0.5 w-full justify-center">
                  <div className="text-[8px]">📅</div>
                  <div className="text-[8px]">⏰</div>
                  <div className="text-[8px]">📍</div>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-sm mt-1"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm">🎨</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative border rounded-lg overflow-hidden transition-all duration-200 group cursor-pointer ${
        isActive ? 'border-blue-500 ring-1 ring-blue-300 shadow-sm' : 'border-gray-200 hover:border-gray-300'
      }`}
      style={{ width: '180px', height: '240px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Preview Thumbnail */}
      <div className="h-32 bg-gray-100 overflow-hidden">
        {renderTemplatePreview()}
      </div>

      {/* Card Content - Compact */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 text-gray-700">
                {template.category}
              </span>
              {isActive && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-0.5">
                  <FiCheck className="w-2 h-2" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Compact Action Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={onPreview}
            className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
            title="Preview template"
          >
            <FiEye className="w-3 h-3" />
          </button>
          <button
            onClick={onSelect}
            disabled={isActive}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1 ${
              isActive
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title={isActive ? 'Selected' : 'Select template'}
          >
            {isActive ? <FiCheck className="w-3 h-3" /> : 'Select'}
          </button>
          {eventSlug && (
            <button
              onClick={() => {
                const url = `${window.location.origin}/e/${eventSlug}?template=${template.id}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="px-2 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-center"
              title="Open live"
            >
              <FiExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      )}
    </div>
  );
};

export default TemplatePreviewCard;