
import api from '@/lib/axios';
import { ExternalDataSource, ExternalDataSyncLog } from '@/types';

export const externalDataApi = {
  // Data Sources
  getDataSources: (eventId: number) => 
    api.get<{ success: boolean; data: ExternalDataSource[] }>('/api/external-data-sources', {
      params: { event_id: eventId }
    }),
  
  createDataSource: (data: {
    event_id: number;
    name: string;
    type: 'google_forms';
    config: any;
    field_mapping: Record<string, string>;
    sync_method: 'forms_api' | 'spreadsheet';
    sync_schedule: 'realtime' | '5min' | '15min' | '30min' | '1hour' | 'manual';
  }) => 
    api.post<{ success: boolean; data: ExternalDataSource }>('/api/external-data-sources', data),
  
  updateDataSource: (id: number, data: Partial<ExternalDataSource>) => 
    api.put<{ success: boolean; data: ExternalDataSource }>(`/api/external-data-sources/${id}`, data),
  
  deleteDataSource: (id: number) => 
    api.delete<{ success: boolean; message: string }>(`/api/external-data-sources/${id}`),

  getDataSource: (id: number) => 
    api.get<{ success: boolean; data: ExternalDataSource }>(`/api/external-data-sources/${id}`),

  // Sync
  syncDataSource: (id: number) => 
    api.post<{ success: boolean; data: ExternalDataSyncLog; message: string }>(
      `/api/external-data-sources/${id}/sync`
    ),
  
  getSyncLogs: (id: number, page = 1) => 
    api.get<{ success: boolean; data: ExternalDataSyncLog[] }>(
      `/api/external-data-sources/${id}/sync-logs`,
      { params: { page } }
    ),
};