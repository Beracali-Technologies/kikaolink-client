import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const GoogleOAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenId = searchParams.get('token_id');
    
    if (tokenId) {
      // Send message back to parent window
      if (window.opener) {
        window.opener.postMessage({
          type: 'GOOGLE_OAUTH_SUCCESS',
          tokenId: tokenId
        }, window.location.origin);
        window.close();
      } else {
        // If no opener (e.g., opened directly), navigate back
        navigate('/external-data', { state: { tokenId } });
      }
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">Completing authentication...</h2>
        <p className="text-gray-600 mt-2">You can close this window once authentication is complete.</p>
      </div>
    </div>
  );
};


export default GoogleOAuthSuccess;