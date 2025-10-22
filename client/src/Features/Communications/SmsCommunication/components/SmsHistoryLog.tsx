// SmsHistoryLog.tsx
import React, { useState } from 'react';
import { SmsLog } from '../SmsTypes';

interface Props {
  logs: SmsLog[];
  isLoading: boolean;
}

const getBadge = (status: SmsLog['status']) => {
  switch (status) {
    case 'Sent': return 'bg-green-100 text-green-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Processing':
    case 'Pending':
    default: return 'bg-yellow-100 text-yellow-800';
  }
};

const SmsHistoryLog: React.FC<Props> = ({ logs, isLoading }) => {
  const [open, setOpen] = useState<SmsLog | null>(null);

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading history...</div>;
  }

  if (!logs.length) {
    return <div className="p-6 text-sm text-gray-500">No SMS history yet.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.map(l => (
          <div key={l.id} className="bg-white border rounded-md p-4 hover:shadow-md cursor-pointer" onClick={() => setOpen(l)}>
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500">{new Date(l.created_at).toLocaleString()}</div>
              <div className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadge(l.status)}`}>{l.status}</div>
            </div>
            <div className="mt-2">
              <div className="font-semibold text-gray-800">{l.timing_label}</div>
              <div className="text-sm text-gray-600 mt-1 truncate">{l.message}</div>
              <div className="text-xs text-gray-400 mt-2">Recipients: {l.recipient_count}</div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-md max-w-2xl w-full p-6 relative">
            <button className="absolute top-3 right-3 text-gray-500" onClick={() => setOpen(null)}>✕</button>
            <h3 className="text-lg font-semibold text-gray-800">{open.timing_label} — {open.status}</h3>
            <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">{open.message}</div>
            <div className="mt-4 text-xs text-gray-400">Recipients: {open.recipient_count} • Sent: {new Date(open.created_at).toLocaleString()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmsHistoryLog;
