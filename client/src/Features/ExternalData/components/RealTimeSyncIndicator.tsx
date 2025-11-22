import React, { useState, useEffect } from 'react';
import { ExternalDataSource } from '@/types';

interface Props {
  dataSources: ExternalDataSource[];
  onSync: (sourceId: number) => void;
}

export const RealTimeSyncIndicator: React.FC<Props> = ({ dataSources, onSync }) => {
  const [lastSyncCheck, setLastSyncCheck] = useState<Date>(new Date());

  // Auto-sync for real-time data sources
  useEffect(() => {
    const realTimeSources = dataSources.filter(
      source => source.config.sync_schedule === 'realtime' && source.is_active
    );

    if (realTimeSources.length === 0) return;

    const interval = setInterval(() => {
      setLastSyncCheck(new Date());
      realTimeSources.forEach(source => {
        // Only sync if last sync was more than 1 minute ago
        if (!source.last_synced_at || 
            new Date().getTime() - new Date(source.last_synced_at).getTime() > 60000) {
          onSync(source.id);
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [dataSources, onSync]);

  const activeRealTimeSources = dataSources.filter(
    source => source.config.sync_schedule === 'realtime' && source.is_active
  ).length;

  if (activeRealTimeSources === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-900">
              Real-time Sync Active
            </span>
          </div>
          <span className="text-sm text-blue-700">
            {activeRealTimeSources} form{activeRealTimeSources !== 1 ? 's' : ''} syncing automatically
          </span>
        </div>
        <div className="text-xs text-blue-600">
          Last check: {lastSyncCheck.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};