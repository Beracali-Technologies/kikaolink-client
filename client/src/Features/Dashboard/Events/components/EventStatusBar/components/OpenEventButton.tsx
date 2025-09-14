import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface OpenEventButtonProps {
  url: string;
  eventId: string;
  isLive: boolean;
  onToggleLive: (eventId: string) => Promise<any>; // More flexible type
  isLoading?: boolean;
}

const OpenEventButton: React.FC<OpenEventButtonProps> = ({
  url,
  eventId,
  isLive,
  onToggleLive,
  isLoading = false
}) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleOpenEvent = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleToggleLive = async () => {
    setIsToggling(true);
    try {
      const result = await onToggleLive(eventId);

      // Handle different response formats
      let success = false;
      let message = '';

      if (typeof result === 'object') {
        // Handle { success: boolean, message?: string } format
        if ('success' in result) {
          success = result.success;
          message = result.message || '';
        }
        // Handle Laravel API response format
        else if ('message' in result) {
          success = true; // Assume success if there's a message
          message = result.message;
        }
        // Handle other object formats
        else {
          success = true; // Assume success for any other object
        }
      }
      // Handle primitive responses
      else if (result !== null && result !== undefined) {
        success = true;
      }

      if (success) {
        toast.success(message || 'Event is now live!');
        setTimeout(() => {
          if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        }, 500);
      } else {
        toast.error(message || 'Failed to make event live');
      }
    } catch (error) {
      console.error('Toggle live error:', error);
      toast.error('Failed to toggle live status');
    } finally {
      setIsToggling(false);
    }
  };

  const handleButtonClick = () => {
    if (isLive) {
      handleOpenEvent();
    } else {
      handleToggleLive();
    }
  };

  const isProcessing = isLoading || isToggling;

  return (
    <button
      onClick={handleButtonClick}
      disabled={isProcessing}
      className={`
        bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium
        transition-colors duration-200 flex items-center justify-center whitespace-nowrap
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isProcessing ? (
        <>
          <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {isLive ? 'Open Event' : 'Make Live & Open'}
        </>
      )}
    </button>
  );
};

export default OpenEventButton;
