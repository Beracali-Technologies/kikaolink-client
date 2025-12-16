import { useState, useEffect } from 'react';
import { googleFormsApi } from '@/services/google/googleFormsApi';

interface GoogleToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

interface GoogleForm {
  id: string;
  name: string;
  modified_time: string;
  created_time: string;
  web_view_link?: string;
}

interface GoogleFormDetails {
  form_id: string;
  title: string;
  questions: Array<{
    question_id: string;
    title: string;
    type: string;
  }>;
  responder_uri: string;
}

interface GoogleFormSelectorProps {
  tokens: GoogleToken;
  eventId: number;
  onFormSelected: (data: {
    formId: string;
    formDetails: GoogleFormDetails;
    tokens: GoogleToken;
  }) => void;
}

const GoogleFormSelector: React.FC<GoogleFormSelectorProps> = ({ 
  tokens, 
  onFormSelected 
}) => {
  const [forms, setForms] = useState<GoogleForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await googleFormsApi.getFormsList({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || ''
        });
        
        if (response.data.success) {
          setForms(response.data.data);
        } else {
          setError('Failed to load Google Forms');
        }
      } catch (error: any) {
        console.error('Failed to fetch forms:', error);
        setError(error.message || 'Failed to connect to Google');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [tokens]);

  const handleFormSelect = async (formId: string) => {
    try {
      const detailsResponse = await googleFormsApi.getFormDetails(
        { 
          access_token: tokens.access_token, 
          refresh_token: tokens.refresh_token || '' 
        }, 
        formId
      );

      if (detailsResponse.data.success) {
        onFormSelected({
          formId,
          formDetails: detailsResponse.data.data,
          tokens
        });
      }
    } catch (error) {
      console.error('Failed to get form details:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading Google Forms...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Try again
        </button>
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No Google Forms found in your account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Select a Google Form</h3>
        <span className="text-sm text-gray-500">{forms.length} forms found</span>
      </div>
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {forms.map(form => (
          <div
            key={form.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => handleFormSelect(form.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{form.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Modified: {new Date(form.modified_time).toLocaleDateString()}
                </p>
                {form.web_view_link && (
                  <a 
                    href={form.web_view_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 mt-2 inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Preview form →
                  </a>
                )}
              </div>
              <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                {form.id.substring(0, 8)}...
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleFormSelector;