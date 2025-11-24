import React, { useState } from 'react';
import { ExternalDataSource } from '@/types';
import { SyncLogsModal } from './SyncLogsModal';

interface Props {
  dataSource: ExternalDataSource;
  onSync: () => void;
  onDelete: () => void;
  isSyncing?: boolean;
  onUpdate?: () => void;
}

export const DataSourceCard: React.FC<Props> = ({
  dataSource,
  onSync,
  onDelete,
  isSyncing = false
}) => {
  const [showSyncLogs, setShowSyncLogs] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'partial': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSyncScheduleText = (schedule: string) => {
    switch (schedule) {
      case 'realtime': return 'Real-time';
      case '5min': return 'Every 5 minutes';
      case '15min': return 'Every 15 minutes';
      case '30min': return 'Every 30 minutes';
      case '1hour': return 'Every hour';
      case 'manual': return 'Manual only';
      default: return schedule;
    }
  };

  const lastSync = dataSource.latest_sync_log;
  const mappedFields = Object.values(dataSource.field_mapping).filter(Boolean).length;
  const totalFields = Object.keys(dataSource.field_mapping).length;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{dataSource.name}</h3>
                <p className="text-sm text-gray-600">Google Forms • {getSyncScheduleText(dataSource.config.sync_schedule)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isSyncing ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  Syncing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Sync Now
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowSyncLogs(true)}
              className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Logs
            </button>
            
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <div className="text-gray-500">Mapped Fields</div>
            <div className="font-medium">{mappedFields}/{totalFields}</div>
          </div>
          <div>
            <div className="text-gray-500">Last Sync</div>
            <div className="font-medium">
              {dataSource.last_synced_at 
                ? new Date(dataSource.last_synced_at).toLocaleDateString()
                : 'Never'
              }
            </div>
          </div>
          <div>
            <div className="text-gray-500">Sync Method</div>
            <div className="font-medium capitalize">
              {dataSource.config.sync_method.replace('_', ' ')}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Status</div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lastSync?.status || '')}`}>
              {lastSync?.status ? lastSync.status.charAt(0).toUpperCase() + lastSync.status.slice(1) : 'Never synced'}
            </div>
          </div>
        </div>

        {lastSync && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-600">
                Last sync: {new Date(lastSync.created_at).toLocaleString()}
              </div>
              <div className="flex items-center gap-4">
                {lastSync.records_created > 0 && (
                  <span className="text-green-600">+{lastSync.records_created} new</span>
                )}
                {lastSync.records_updated > 0 && (
                  <span className="text-blue-600">{lastSync.records_updated} updated</span>
                )}
                {lastSync.records_processed > 0 && (
                  <span className="text-gray-600">{lastSync.records_processed} processed</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showSyncLogs && (
        <SyncLogsModal
          dataSource={dataSource}
          onClose={() => setShowSyncLogs(false)}
        />
      )}
    </>
  );
};