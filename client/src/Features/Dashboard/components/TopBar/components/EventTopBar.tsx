import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiCopy, FiCheck } from 'react-icons/fi';
import { useEventStore } from '@/lib/stores/eventStore';

interface EventTopBarProps {
  onMenuClick: () => void;
}

const EventTopBar: React.FC<EventTopBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { currentEvent } = useEventStore();
  const [copied, setCopied] = useState(false);

  const eventUrl = `${window.location.origin}/events/${currentEvent?.id || eventId}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  const handleOpenEvent = () => {
    window.open(eventUrl, '_blank');
  };

  return (
    <header className="w-full bg-[#0E2344] border-b border-gray-700 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* LEFT SECTION */}
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Simple Back Button (Circle) */}
          <button
            onClick={() => navigate('/dashboard/events')}
            className="flex items-center justify-center w-8 h-8 text-white hover:text-gray-200 hover:bg-white/10 rounded-full transition-colors duration-200"
            title="Back to Events"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>

          {/* Event Name */}
          <h2 className="text-white text-base sm:text-lg font-semibold truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px]">
            {currentEvent?.title || 'Event'}
          </h2>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Copy URL Button with Enhanced Notification */}
          <div className="relative">
            <button
              onClick={handleCopyUrl}
              className={`flex items-center space-x-2 font-medium text-sm transition-all duration-200 px-3 py-2 rounded-lg ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-white hover:text-gray-200 hover:bg-white/10'
              }`}
            >
              {copied ? (
                <>
                  <FiCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <FiCopy className="h-4 w-4" />
                  <span className="hidden sm:inline">Copy URL</span>
                </>
              )}
            </button>

            {/* Floating Notification at Bottom */}
            {copied && (
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg z-50 animate-bounce">
                ✓ URL Copied!
                {/* Arrow pointing up */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"></div>
              </div>
            )}
          </div>

          {/* Open Event Button - Green */}
          <button
            onClick={handleOpenEvent}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors duration-200 px-3 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            <FiExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Open Event</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default EventTopBar;
