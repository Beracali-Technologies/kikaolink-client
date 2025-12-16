import api from '@/lib/axios';

export const googleOAuthApi = {
  getAuthUrl: () => 
    api.get<{ success: boolean; auth_url: string }>('/api/google-oauth/auth-url'),
    
  getTokens: (tokenId: string) => 
    api.get<{ 
      success: boolean;
      access_token: string;
      refresh_token?: string;
      expires_in: number;
      token_type: string;
      error?: string;
    }>(`/api/google-oauth/tokens/${tokenId}`),
    
  refreshToken: (refreshToken: string) => 
    api.post<{
      success: boolean;
      access_token: string;
      expires_in: number;
    }>('/api/google-oauth/refresh', { refresh_token: refreshToken }),
};