// SmsPreview.tsx
import React from 'react';

interface Props {
  message: string;
  timing: string;
  recipientsCount: number;
}

const SmsPreview: React.FC<Props> = ({ message, timing, recipientsCount }) => {
  // Highlight placeholders visually in preview
  const html = message.replace(/\{\{(.*?)\}\}/g, (_m, p1) => `<span class="bg-red-100 text-red-700 px-1 rounded-sm text-xs">[[${p1}]]</span>`);

  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">Preview — {timing}</div>
        <div className="text-sm text-gray-500">{recipientsCount} recipient{recipientsCount !== 1 ? 's' : ''}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: html || '<i class="text-gray-400">Message preview will appear here</i>' }} />
    </div>
  );
};

export default SmsPreview;
