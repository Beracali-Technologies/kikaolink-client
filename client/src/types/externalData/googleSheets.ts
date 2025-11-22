
export interface GoogleSheet {
  id: string;
  name: string;
}

export interface SheetPreview {
  headers: string[];
  preview: any[][];
  total_rows: number;
}
