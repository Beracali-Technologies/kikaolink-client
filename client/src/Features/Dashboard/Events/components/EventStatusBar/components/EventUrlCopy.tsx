import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface EventUrlCopyProps {
  url: string;
}

const EventUrlCopy: React.FC<EventUrlCopyProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    if (!url) return;

    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy URL');
      });
  };

  if (!url) return null;

  return (
    <div className="ml-4 flex items-center">
      <span className="text-sm text-gray-600 mr-2">Site URL:</span>
      <button
        onClick={copyUrl}
        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center max-w-xs truncate"
        title={url}
      >
        <span className="truncate">{url}</span>
        <svg className="w-4 h-4 ml-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      {copied && (
        <span className="text-xs text-green-600 ml-2">Copied!</span>
      )}
    </div>
  );
};

export default EventUrlCopy;
