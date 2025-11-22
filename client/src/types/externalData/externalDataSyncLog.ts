
export interface ExternalDataSyncLog {
  id: number;
  external_data_source_id: number;
  status: 'success' | 'failed' | 'partial' | 'processing';
  records_processed: number;
  records_created: number;
  records_updated: number;
  error_message: string | null;
  sync_details: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}
