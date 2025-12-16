import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const GoogleOAuthError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const errorMessage = searchParams.get('message') || 'Authentication failed';

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({
        type: 'GOOGLE_OAUTH_ERROR',
        error: errorMessage
      }, window.location.origin);
      window.close();
    }
  }, [errorMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md p-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <button
          onClick={() => navigate('/external-data')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default GoogleOAuthError;