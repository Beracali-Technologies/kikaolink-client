// components/EventLiveToggle.tsx
import React, { useState } from 'react';
import { EyeIcon, LinkIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Event {
  id: string;
  title: string;
  is_live: boolean;
  live_url?: string;
  can_go_live: boolean;
}

interface EventLiveToggleProps {
  event: Event;
  onToggleLive: (eventId: string) => Promise<{ success: boolean; message?: string }>;
}

const EventLiveToggle: React.FC<EventLiveToggleProps> = ({ event, onToggleLive }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleEventLive = async () => {
    if (!event.can_go_live && !event.is_live) {
      setError('Event cannot be set to live at this time. Please ensure it is published and starts within 24 hours.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await onToggleLive(event.id);
      if (!result.success) {
        setError(result.message || 'Failed to update event status');
      }
    } catch (err) {
      setError('An error occurred while updating the event status');
    } finally {
      setLoading(false);
    }
  };

  const copyLiveUrl = async () => {
    if (!event.live_url) return;

    try {
      await navigator.clipboard.writeText(event.live_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = event.live_url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="event-live-toggle">
      {error && (
        <div className="error-message bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-800 hover:text-red-900 text-lg"
          >
            ×
          </button>
        </div>
      )}

      {event.is_live && (
        <div className="live-badge bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2 mb-4">
          <span className="live-dot w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
          Live Now
        </div>
      )}

      <button
        onClick={toggleEventLive}
        className={`make-live-btn px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          event.is_live
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
        } ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${
          !event.is_live && !event.can_go_live ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading || (!event.is_live && !event.can_go_live)}
      >
        {loading ? (
          <div className="btn-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span>
            {event.is_live ? 'Take Offline' : 'Make Event Live'}
          </span>
        )}
      </button>

      {event.is_live && event.live_url && (
        <div className="live-actions flex gap-3 mt-4">
          <a 
            href={event.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="view-live-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 text-sm"
          >
            <EyeIcon className="w-4 h-4" />
            View Live Event
          </a>
          <button
            onClick={copyLiveUrl}
            className={`copy-url-btn px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 text-sm ${
              copied
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventLiveToggle;
