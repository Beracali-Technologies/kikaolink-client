import api from '@/lib/axios';


export const googleOAuthApi = {
  getAuthUrl: () => 
    api.get<{
      error: string; success: boolean; auth_url: string 
}>('/api/google-oauth/auth-url'),

  handleCallback: (code: string) => 
    api.post<{ success: boolean; access_token: string; refresh_token?: string; expires_in: number }>(
      '/api/google-oauth/callback',
      { code }
    ),
};