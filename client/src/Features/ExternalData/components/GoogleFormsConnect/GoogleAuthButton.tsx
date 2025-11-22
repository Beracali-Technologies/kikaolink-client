import React from 'react';

interface Props {
  onAuthSuccess: (accessToken: string) => void;
}

export const GoogleAuthButton: React.FC<Props> = ({ onAuthSuccess }) => {
  const handleGoogleAuth = () => {
    // Implement Google OAuth flow
    // This would typically open a popup or redirect to Google OAuth
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/google-auth-callback`;
    const scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=token&` +
      `scope=${scope}&` +
      `include_granted_scopes=true`;

    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
    >
      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
      Connect Google Account
    </button>
  );
};
