
export interface SheetPreviewData {
    spreadsheet_id: string;
    headers: string[];
    preview_rows: any[][];
    total_responses: number;
  }
  
  export interface SyncPreviewData {
    type: 'forms_api' | 'spreadsheet';
    headers: string[];
    sampleData: any[];
    totalRecords: number;
  }
  