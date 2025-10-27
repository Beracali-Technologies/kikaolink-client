// Features/Communications/SmsCommunication/components/SmsHistoryLog.tsx
import React, { useState } from 'react';
import { SmsLog } from '../SmsTypes';

interface SmsHistoryLogProps {
  logs: SmsLog[];
  selectedLog?: SmsLog | null;
  onLogSelect?: (log: SmsLog) => void;
  isLoading?: boolean;
}

// Helper function to safely get status with fallback
const getLogStatus = (log: SmsLog): string => {
  return (log as any).status || 'Pending'; // Use type assertion as fallback
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Sent':
    case 'Delivered':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'Failed':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'Processing':
    case 'Pending':
    default:
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
  }
};

const getTimingBadge = (timing: string) => {
  switch (timing) {
    case 'Pre-Event':
      return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'At-Event':
      return 'bg-red-50 text-red-700 border border-red-200';
    case 'Post-Event':
      return 'bg-purple-50 text-purple-700 border border-purple-200';
    default:
      return 'bg-gray-50 text-gray-700 border border-gray-200';
  }
};

const SmsHistoryLog: React.FC<SmsHistoryLogProps> = ({ logs, isLoading = false }) => {
  const [selectedLog, setSelectedLog] = useState<SmsLog | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading SMS history...</span>
      </div>
    );
  }

  if (!logs.length) {
    return (
      <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-1">No SMS History</h3>
        <p className="text-gray-500 text-sm">SMS messages you send will appear here</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {logs.map((log) => {
          const logStatus = getLogStatus(log);
          return (
            <div
              key={log.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              onClick={() => setSelectedLog(log)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getTimingBadge(log.timing)}`}>
                      {log.timing}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(logStatus)}`}>
                      {logStatus}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">
                      {log.recipient_count} {log.recipient_count === 1 ? 'recipient' : 'recipients'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(log.sent_at).toLocaleDateString()} • {new Date(log.sent_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="mb-4">
                  <p className="text-gray-800 line-clamp-2 leading-relaxed">
                    {log.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{new Date(log.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLog(log);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">SMS Details</h2>
                  <p className="text-blue-100 mt-1">
                    Sent on {new Date(selectedLog.sent_at).toLocaleDateString()} at {new Date(selectedLog.sent_at).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  className="text-white hover:text-blue-200 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
                  onClick={() => setSelectedLog(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <div className={`px-4 py-2 rounded-full text-sm font-semibold bg-white bg-opacity-20 backdrop-blur-sm ${getTimingBadge(selectedLog.timing).replace('bg-', 'text-')}`}>
                  {selectedLog.timing}
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold bg-white bg-opacity-20 backdrop-blur-sm ${getStatusBadge(getLogStatus(selectedLog)).replace('bg-', 'text-')}`}>
                  {getLogStatus(selectedLog)}
                </div>
                <div className="text-white text-sm font-semibold bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {selectedLog.recipient_count} {selectedLog.recipient_count === 1 ? 'Recipient' : 'Recipients'}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Message Content</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                    {selectedLog.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Campaign Info</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Timing:</span>
                      <span className="font-medium">{selectedLog.timing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${getLogStatus(selectedLog) === 'Sent' ? 'text-green-600' : getLogStatus(selectedLog) === 'Failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {getLogStatus(selectedLog)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Delivery Info</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Recipients:</span>
                      <span className="font-medium">{selectedLog.recipient_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sent Date:</span>
                      <span className="font-medium">{new Date(selectedLog.sent_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sent Time:</span>
                      <span className="font-medium">{new Date(selectedLog.sent_at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setSelectedLog(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmsHistoryLog;
