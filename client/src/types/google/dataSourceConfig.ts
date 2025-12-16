import { GoogleOAuthTokens } from "./googleOAuth";


export interface DataSourceConfigData {
    event_id: number;
    name: string;
    type: 'google_forms';
    config: {
      access_tokens: GoogleOAuthTokens;
      form_id: string;
      sync_method: 'forms_api' | 'spreadsheet';
      sync_schedule: 'realtime' | '5min' | '15min' | '30min' | '1hour' | 'manual';
      spreadsheet_id?: string;
    };
    field_mapping: Record<string, string>;
    sync_method: 'forms_api' | 'spreadsheet';
    sync_schedule: 'realtime' | '5min' | '15min' | '30min' | '1hour' | 'manual';
  }