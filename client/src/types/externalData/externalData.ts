export interface ExternalDataSource {
  id: number;
  event_id: number;
  name: string;
  type: 'google_forms' | 'typeform' | 'custom_api';
  config: {
    access_token?: string;
    spreadsheet_id?: string;
    range?: string;
  };
  field_mapping: Record<string, string>;
  is_active: boolean;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExternalDataSyncLog {
  id: number;
  external_data_source_id: number;
  status: 'success' | 'failed' | 'partial';
  records_processed: number;
  error_message: string | null;
  sync_details: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface GoogleSheet {
  id: string;
  name: string;
}

export interface SheetPreview {
  headers: string[];
  preview: any[][];
  total_rows: number;
}
