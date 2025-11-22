import React, { useState, useEffect } from 'react';
import { ExternalDataSource, ExternalDataSyncLog } from '@/types';
import { externalDataApi } from '@/services/externalData/externalDataApi';

interface Props {
  dataSource: ExternalDataSource;
  onClose: () => void;
}

export const SyncLogsModal: React.FC<Props> = ({ dataSource, onClose }) => {
  const [logs, setLogs] = useState<ExternalDataSyncLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, [dataSource.id]);

  const loadLogs = async () => {
    try {
      const response = await externalDataApi.getSyncLogs(dataSource.id);
      setLogs(response.data.data);
    } catch (error) {
      console.error('Failed to load sync logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'partial': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sync Logs</h2>
              <p className="text-gray-600 text-sm">{dataSource.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No sync logs available
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {log.records_processed} processed
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Created:</span>{' '}
                      <span className="font-medium text-green-600">{log.records_created}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Updated:</span>{' '}
                      <span className="font-medium text-blue-600">{log.records_updated}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total:</span>{' '}
                      <span className="font-medium">{log.records_processed}</span>
                    </div>
                  </div>

                  {log.error_message && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="text-sm text-red-800">{log.error_message}</div>
                    </div>
                  )}

                  {log.sync_details && (
                    <div className="text-xs text-gray-500 mt-2">
                      Sync method: {log.sync_details.sync_method} • 
                      Total records: {log.sync_details.total_records}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};