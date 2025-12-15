import React, { useState } from 'react';
import { googleOAuthApi } from '@/services/google/googleOAuthApi'; // You'll need to create this service

export const GoogleAuthButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleAuth = async () => {
        try {
              setLoading(true);
              setError('');
              
              const response = await googleOAuthApi.getAuthUrl();
              
          if (response.data.success) {
                 window.location.href = response.data.auth_url;
          } else {
                // No 'error' property in the response type
                throw new Error('Failed to get authorization URL from server');
          }
        } catch (err: any) {
             setError(err.message || 'Failed to start Google OAuth');
              console.error('OAuth error:', err);
        } finally {
               setLoading(false);
        }
  };

  return (
    <>
      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            Connecting...
          </>
        ) : (
          <>
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Connect Google Account
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}
    </>
  );
};