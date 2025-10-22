// SmsEditor.tsx
import React from 'react';

interface Props {
  message: string;
  setMessage: (m: string) => void;
  isSending: boolean;
  onSend: () => void;
  selectedCount: number;
}

const SmsEditor: React.FC<Props> = ({ message, setMessage, isSending, onSend, selectedCount }) => {
  const len = message.length;
  const over = len > 160;

  return (
    <div className="bg-white border rounded-md p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-red-600">Compose SMS</h2>
        <div className="text-sm text-gray-500">{selectedCount} recipient{selectedCount !== 1 ? 's' : ''} selected</div>
      </div>

      <textarea
        className="mt-4 w-full h-40 p-4 border rounded-md resize-none focus:ring-red-400 focus:border-red-400"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Write your message... (use placeholders like {{FIRST_NAME}})"
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm">
          <span className={`${over ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>{len}</span>
          <span className="text-gray-400 ml-1">/ 160</span>
          {over && <span className="ml-3 text-xs text-red-600">Message exceeds 160 chars and may be split/cost more</span>}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSend}
            disabled={isSending || selectedCount === 0 || len === 0}
            className={`px-4 py-2 rounded-md text-white font-semibold ${isSending || selectedCount === 0 || len === 0 ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isSending ? 'Sending...' : 'Send SMS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsEditor;
