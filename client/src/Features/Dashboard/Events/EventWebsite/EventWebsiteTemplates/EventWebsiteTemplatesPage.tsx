// src/Features/Dashboard/Events/components/EventWebsiteTemplates/EventWebsiteTemplatesPage.tsx
import React, { useState } from 'react';
import TemplatePreviewCard from './TemplatePreviewCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import { FiGlobe, FiEye, FiCheck, FiInfo, FiGrid } from 'react-icons/fi';

// Template data - no loading needed
const templates = [
  {
    id: 'template1',
    name: 'Modern Dark',
    description: 'Elegant dark theme with gradient backgrounds and modern design',
    category: 'Premium',
    features: ['Hero Section', 'Event Details', 'Registration CTA', 'Social Proof'],
  },
  {
    id: 'template2',
    name: 'Clean Professional',
    description: 'Minimalist design perfect for corporate and professional events',
    category: 'Professional',
    features: ['Sticky Header', 'Stats Section', 'About Event', 'Location Details'],
  },
  {
    id: 'template3',
    name: 'Bright & Engaging',
    description: 'Vibrant design to attract attention and increase engagement',
    category: 'Engaging',
    features: ['Feature Cards', 'Registration Panel', 'Detailed Info', 'Multiple CTAs'],
  },
  {
    id: 'template4',
    name: 'Professional Corporate',
    description: 'Business-oriented design perfect for conferences and corporate events',
    category: 'Corporate',
    thumbnailColor: 'from-blue-50 to-indigo-50',
    tags: ['Business', 'Corporate', 'Formal'],
    popularity: 85,
    features: ['Professional Layout', 'Stats Section', 'Detailed Agenda', 'Formal'],
  },
];

interface EventWebsiteTemplatesPageProps {
  eventId: string;
  eventTitle?: string;
  eventSlug?: string;
}

const EventWebsiteTemplatesPage: React.FC<EventWebsiteTemplatesPageProps> = ({
  eventId,
  eventTitle = 'Your Event',
  eventSlug,
}) => {
  const [activeTemplate, setActiveTemplate] = useState<string>('template1');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    console.log(`Template ${templateId} selected`);
  };

  const handlePreviewTemplate = (templateId: string) => {
    setPreviewTemplate(templateId);
    setShowPreviewModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Compact Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Website Templates</h1>
            <p className="text-sm text-gray-500 mt-1">Choose your event website design</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiGrid className="w-4 h-4" />
            <span>{templates.length} templates</span>
          </div>
        </div>
      </div>

      {/* Active Template Status - Compact */}
      {eventSlug && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiGlobe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Active: {templates.find(t => t.id === activeTemplate)?.name}</h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  {window.location.origin}/e/{eventSlug}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const url = `${window.location.origin}/e/${eventSlug}?template=${activeTemplate}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
            >
              <FiGlobe className="w-4 h-4" />
              Open Website
            </button>
          </div>
        </div>
      )}

      {/* Compact Template Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Template</h3>
          <div className="text-xs text-gray-500">Click to preview, select to apply</div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <TemplatePreviewCard
              key={template.id}
              template={template}
              isActive={template.id === activeTemplate}
              onSelect={() => handleSelectTemplate(template.id)}
              onPreview={() => handlePreviewTemplate(template.id)}
              eventTitle={eventTitle}
              eventSlug={eventSlug}
            />
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-2">
              1
            </div>
            <h4 className="text-sm font-medium text-gray-900">Preview</h4>
            <p className="text-xs text-gray-600 mt-0.5">Click 👁️ to see full design</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mx-auto mb-2">
              2
            </div>
            <h4 className="text-sm font-medium text-gray-900">Select</h4>
            <p className="text-xs text-gray-600 mt-0.5">Click Select to apply</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-2">
              3
            </div>
            <h4 className="text-sm font-medium text-gray-900">Open</h4>
            <p className="text-xs text-gray-600 mt-0.5">Click ↗️ to view live</p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && previewTemplate && (
        <TemplatePreviewModal
          templateId={previewTemplate}
          eventTitle={eventTitle}
          eventSlug={eventSlug}
          onClose={() => setShowPreviewModal(false)}
          onSelectTemplate={() => handleSelectTemplate(previewTemplate)}
        />
      )}
    </div>
  );
};

export default EventWebsiteTemplatesPage;