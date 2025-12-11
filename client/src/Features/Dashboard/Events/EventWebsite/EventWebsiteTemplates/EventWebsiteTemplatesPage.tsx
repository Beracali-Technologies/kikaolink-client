import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TemplatePreviewCard from './TemplatePreviewCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import EventStatusBar from '../../components/EventStatusBar/EventStatusBar';
import { FiGlobe, FiEye, FiGrid, FiInfo } from 'react-icons/fi';

const templates = [
  {
    id: 'template1',
    name: 'Modern Dark',
    description: 'Elegant dark theme with gradient backgrounds',
    category: 'Premium',
    features: ['Hero Section', 'Event Details', 'Registration CTA'],
  },
  {
    id: 'template2',
    name: 'Clean Professional',
    description: 'Minimalist design for corporate events',
    category: 'Professional',
    features: ['Sticky Header', 'Stats Section', 'About Event'],
  },
  {
    id: 'template3',
    name: 'Bright & Engaging',
    description: 'Vibrant design to increase engagement',
    category: 'Engaging',
    features: ['Feature Cards', 'Registration Panel', 'Multiple CTAs'],
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
  eventTitle?: string;
  eventSlug?: string;
  eventData?: any;
}

const EventWebsiteTemplatesPage: React.FC<EventWebsiteTemplatesPageProps> = ({
  eventTitle = 'Your Event',
  eventSlug,
  eventData,
}) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTemplate, setActiveTemplate] = useState<string>('template1');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    console.log(`Template ${templateId} selected for event ${eventId}`);
  };

  const handlePreviewTemplate = (templateId: string) => {
    setPreviewTemplate(templateId);
    setShowPreviewModal(true);
  };

  if (!eventId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-gray-500">Event ID not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Event Status Bar at the top */}
      <div className="mb-6">
        <EventStatusBar 
          eventId={eventId}
          eventData={eventData}
        />
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Website Templates</h1>
            <p className="text-gray-600 mt-2">
              Choose a design for your event website. Preview each template before selecting.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiGrid className="w-4 h-4" />
            <span>{templates.length} templates available</span>
          </div>
        </div>
      </div>

      {/* Active Template Info */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiGlobe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Template</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-gray-600">
                  Using: <span className="font-semibold text-gray-900">{templates.find(t => t.id === activeTemplate)?.name}</span>
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              {eventSlug && (
                <p className="text-sm text-blue-600 mt-2">
                  Your event website: {window.location.origin}/e/{eventSlug}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handlePreviewTemplate(activeTemplate)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <FiEye />
              Preview Current
            </button>
            {eventSlug && (
              <button
                onClick={() => {
                  const url = `${window.location.origin}/e/${eventSlug}?template=${activeTemplate}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FiGlobe />
                Open Website
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Template Selection Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Available Templates</h3>
          <div className="text-sm text-gray-500">
            Click 👁️ to preview • Click Select to apply
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

      {/* Quick Guide */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FiInfo className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">How to Use Templates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
              1
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Preview Templates</h4>
            <p className="text-sm text-gray-600">
              Click the eye icon on any template card to see a full preview.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-3">
              2
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Select Your Design</h4>
            <p className="text-sm text-gray-600">
              Click "Select" on your preferred template to make it active.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-3">
              3
            </div>
            <h4 className="font-medium text-gray-900 mb-2">View Live Website</h4>
            <p className="text-sm text-gray-600">
              Click "Open Website" to see your event with the selected template.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && previewTemplate && (
        <TemplatePreviewModal
          templateId={previewTemplate}
          eventTitle={eventTitle}
          eventSlug={eventSlug}
          eventData={eventData}
          onClose={() => setShowPreviewModal(false)}
          onSelectTemplate={() => handleSelectTemplate(previewTemplate)}
        />
      )}
    </div>
  );
};

export default EventWebsiteTemplatesPage;