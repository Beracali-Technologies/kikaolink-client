import api from '@/lib/axios';
import { GoogleOAuthTokens } from '@/types';

export const googleOAuthApi = {
  getAuthUrl: () => 
    api.get<{ success: boolean; auth_url: string }>('/api/google-oauth/auth-url'),

  handleCallback: (code: string) => 
    api.post<{ success: boolean; access_token: string; refresh_token?: string; expires_in: number }>(
      '/api/google-oauth/callback',
      { code }
    ),
};