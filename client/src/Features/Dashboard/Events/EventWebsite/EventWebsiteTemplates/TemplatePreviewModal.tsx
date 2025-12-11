import React, { useState } from 'react';
import { FiX, FiSmartphone, FiMonitor, FiExternalLink, FiPlay } from 'react-icons/fi';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import Template3 from './Templates/Template3';
import Template4 from './Templates/Template4';


interface TemplatePreviewModalProps {
  templateId: string;
  eventTitle: string;
  eventSlug?: string;
  eventData?: any;
  onClose: () => void;
  onSelectTemplate?: () => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  templateId,
  eventTitle,
  eventSlug,
  eventData,
  onClose,
  onSelectTemplate,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [isInteractive, setIsInteractive] = useState(false);
  const [showLiveDemo, setShowLiveDemo] = useState(false);

  const mockEventData = {
    id: 1,
    title: eventTitle,
    description: "This is a preview of how your event will look with this template.",
    startDate: "2024-12-25",
    endDate: "2024-12-26",
    startTime: "09:00",
    endTime: "17:00",
    location: "Virtual Event",
    status: "LIVE",
    custom_slug: eventSlug,
  };

  const registrationLink = eventSlug ? `/r/${eventSlug}` : '#';

  const templateProps = {
    event: mockEventData,
    registrationLink: registrationLink
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'template2':
        return <Template2 {...templateProps} />;
      case 'template4':
        return <Template4 {...templateProps} />;
      case 'template3':
        return <Template3 {...templateProps} />;
      case 'template1':
        return <Template1 {...templateProps} />;
      default:
        return <Template1 {...templateProps} />;
    }
  };

  const handleOpenLivePreview = () => {
    if (eventSlug) {
      const url = `${window.location.origin}/e/${eventSlug}?template=${templateId}&preview=true`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleStartLiveDemo = () => {
    setShowLiveDemo(true);
    setIsInteractive(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Template Preview</h3>
              <p className="text-sm text-gray-500">
                Previewing: {templateId}
                {isInteractive && <span className="ml-2 text-green-600">• Interactive Demo</span>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Demo Controls */}
              {!showLiveDemo && (
                <button
                  onClick={handleStartLiveDemo}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                >
                  <FiPlay className="w-4 h-4" />
                  Interactive Demo
                </button>
              )}

              {/* Device Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 ${
                    deviceView === 'desktop' ? 'bg-white shadow' : 'text-gray-600'
                  }`}
                >
                  <FiMonitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 ${
                    deviceView === 'mobile' ? 'bg-white shadow' : 'text-gray-600'
                  }`}
                >
                  <FiSmartphone className="w-4 h-4" />
                  Mobile
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            {showLiveDemo ? (
              // Live Interactive Demo
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Interactive Demo</h4>
                  <p className="text-blue-700">
                    Click around the template to see how it works. Try clicking buttons and links.
                  </p>
                </div>
                
                <div className={`mx-auto border-4 border-blue-300 rounded-xl overflow-hidden shadow-xl ${
                  deviceView === 'mobile' ? 'max-w-md' : 'max-w-full'
                }`}>
                  <div className="bg-white">
                    {renderTemplate()}
                  </div>
                </div>
              </div>
            ) : (
              // Static Preview
              <div className={`mx-auto ${deviceView === 'mobile' ? 'max-w-md' : 'max-w-full'}`}>
                <div className={`bg-white rounded-xl border shadow-lg overflow-hidden ${
                  deviceView === 'mobile' ? 'max-h-[600px] overflow-y-auto' : ''
                }`}>
                  {renderTemplate()}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {showLiveDemo 
                    ? 'Interactive demo mode. Click to explore the template.' 
                    : 'This is a live preview. Your actual event data will be displayed.'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close Preview
                </button>
                
                {!showLiveDemo && eventSlug && (
                  <button
                    onClick={handleOpenLiveWebsite}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Open Live Website
                  </button>
                )}
                
                {onSelectTemplate && (
                  <button
                    onClick={onSelectTemplate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Use This Template
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;