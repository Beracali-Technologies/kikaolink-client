import api from '@/lib/axios';
import { GoogleForm, GoogleFormDetails, FormResponse, SheetPreviewData } from '@/types';

export const googleFormsApi = {
  getFormsList: (tokens: { access_token: string; refresh_token?: string }) => 
    api.get<{ success: boolean; data: GoogleForm[] }>('/api/google-forms/list', {
      params: tokens
    }),

  getFormDetails: (tokens: { access_token: string; refresh_token?: string }, formId: string) => 
    api.get<{ success: boolean; data: GoogleFormDetails }>('/api/google-forms/details', {
      params: { ...tokens, form_id: formId }
    }),

  getFormPreview: (
    tokens: { access_token: string; refresh_token?: string }, 
    formId: string, 
    previewType: 'responses' | 'spreadsheet'
  ) => 
    api.get<{ success: boolean; data: FormResponse[] | SheetPreviewData }>('/api/google-forms/preview', {
      params: { ...tokens, form_id: formId, preview_type: previewType }
    }),
};