import { ExternalDataSyncLog } from './externalDataSyncLog';
import { GoogleOAuthTokens } from '@/types';


export interface ExternalDataSource {
  id: number;
  user_id: number;
  event_id: number;
  name: string;
  type: 'google_forms';
  config: {
    access_tokens: GoogleOAuthTokens;
    form_id?: string;
    spreadsheet_id?: string;
    sync_method: 'forms_api' | 'spreadsheet';
    sync_schedule: 'realtime' | '5min' | '15min' | '30min' | '1hour' | 'manual';
  };
  field_mapping: Record<string, string>;
  is_active: boolean;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
  latest_sync_log?: ExternalDataSyncLog;
}


