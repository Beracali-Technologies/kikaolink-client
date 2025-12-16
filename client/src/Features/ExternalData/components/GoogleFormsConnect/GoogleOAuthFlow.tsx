import React, { useState, useEffect } from 'react';
import { GoogleOAuthTokens } from '@/types';
import { googleOAuthApi } from '@/services/google/googleOAuthApi';

interface Props {
  onAuthSuccess: (tokens: GoogleOAuthTokens) => void;
  onBack: () => void;
}

// Handles the OAuth authentication with Google.
export const GoogleOAuthFlow: React.FC<Props> = ({ onAuthSuccess, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [authWindow, setAuthWindow] = useState<Window | null>(null);

  const initiateOAuth = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await googleOAuthApi.getAuthUrl();
      
      // Open OAuth window
      const width = 600;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      const win = window.open(
        response.data.auth_url,
        'google-oauth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      setAuthWindow(win);
    } catch (error) {
      setError('Failed to start authentication');
      console.error('OAuth initiation error:', error);
    } finally {
      setLoading(false);
    }
  };



// In GoogleOAuthFlow.tsx - update the useEffect
useEffect(() => {
  const handleMessage = async (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'GOOGLE_OAUTH_SUCCESS' && event.data.tokenId) {
      try {
        setLoading(true);
        // Call your API to get tokens using tokenId
        const response = await fetch(`/api/google-oauth/tokens/${event.data.tokenId}`);
        const data = await response.json();
        
        if (data.success) {
          onAuthSuccess({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
            token_type: 'Bearer'
          });
        } else {
          setError('Failed to retrieve tokens');
        }
      } catch (error) {
        setError('Failed to complete authentication');
        console.error('Token retrieval error:', error);
      } finally {
        setLoading(false);
        authWindow?.close();
      }
    } else if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
      setError(event.data.error || 'Authentication failed');
      authWindow?.close();
    }
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, [authWindow, onAuthSuccess]);





  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Connect Google Account</h3>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
      </div>

      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Connect to Google
          </h4>
          <p className="text-gray-600 max-w-md mx-auto">
            Connect your Google account to access Google Forms. We'll only request access to read your forms and responses.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={initiateOAuth}
          disabled={loading}
          className="bg-white border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-3 mx-auto"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="mt-6 text-xs text-gray-500 max-w-md mx-auto">
          <p>By continuing, you allow Kikaolink to access your Google Forms and responses. We respect your privacy and only access data you explicitly authorize.</p>
        </div>
      </div>
    </div>
  );
};