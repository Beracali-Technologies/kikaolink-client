import api from "@/lib/axios";
import { ExternalDataSource, ExternalDataSyncLog, GoogleSheet, SheetPreview } from '@/types';

export const externalDataApi = {
  // Data Sources
  getDataSources: (eventId?: number) =>
    api.get<{ data: ExternalDataSource[] }>('/external-data-sources', { params: { event_id: eventId } }),

  createDataSource: (data: Partial<ExternalDataSource>) =>
    api.post<{ data: ExternalDataSource }>('/external-data-sources', data),

  updateDataSource: (id: number, data: Partial<ExternalDataSource>) =>
    api.put<{ data: ExternalDataSource }>(`/external-data-sources/${id}`, data),

  deleteDataSource: (id: number) =>
    api.delete(`/external-data-sources/${id}`),

  // Google Forms
  getGoogleSheets: (accessToken: string) =>
    api.get<{ data: GoogleSheet[] }>('/google-forms/sheets', { params: { access_token: accessToken } }),

  getSheetPreview: (accessToken: string, spreadsheetId: string, range?: string) =>
    api.get<SheetPreview>('/google-forms/sheet-preview', {
      params: { access_token: accessToken, spreadsheet_id: spreadsheetId, range }
    }),

  // Sync
  syncDataSource: (id: number) =>
    api.post<{ data: ExternalDataSyncLog }>(`/external-data-sources/${id}/sync`),

  getSyncLogs: (id: number) =>
    api.get<{ data: ExternalDataSyncLog[] }>(`/external-data-sources/${id}/sync-logs`),
};
