import React, { useState, useEffect } from 'react';
import { GoogleForm, GoogleFormDetails } from '@/types';
import { googleFormsApi } from '@/services/google/googleFormsApi';


interface Props {
  tokens: { access_token: string; refresh_token?: string };
  onFormSelect: (form: GoogleForm, details: GoogleFormDetails) => void;
  onBack: () => void;
}

export const FormSelector: React.FC<Props> = ({ tokens, onFormSelect, onBack }) => {
  const [forms, setForms] = useState<GoogleForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await googleFormsApi.getFormsList(tokens);
      setForms(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to load Google Forms');
      console.error('Forms load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSelect = async (formId: string) => {
    setSelectedForm(formId);
    setLoadingDetails(true);
    
    try {
      const response = await googleFormsApi.getFormDetails(tokens, formId);
      const form = forms.find(f => f.id === formId);
      if (form) {
        onFormSelect(form, response.data.data);
      }
    } catch (error: any) {
      setError('Failed to load form details');
      console.error('Form details error:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Google Form</h3>
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Select Google Form</h3>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
          <button
            onClick={loadForms}
            className="mt-2 text-red-700 hover:text-red-800 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Google Forms
        </label>
        <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
          {forms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No Google Forms found in your account
            </div>
          ) : (
            forms.map(form => (
              <button
                key={form.id}
                onClick={() => handleFormSelect(form.id)}
                disabled={loadingDetails}
                className={`w-full text-left p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                  selectedForm === form.id ? 'bg-blue-50 border-blue-200' : ''
                } ${loadingDetails ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{form.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Modified: {new Date(form.modified_time).toLocaleDateString()}
                    </p>
                  </div>
                  {loadingDetails && selectedForm === form.id && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 ml-2"></div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <p>Only showing Google Forms from your account. If you don't see your form, make sure it's created in the same Google account.</p>
      </div>
    </div>
  );
};