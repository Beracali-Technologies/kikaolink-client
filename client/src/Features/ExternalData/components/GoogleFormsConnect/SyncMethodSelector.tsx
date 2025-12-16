import React, { useState } from 'react';
import { GoogleFormDetails, SyncPreviewData } from '@/types';
import { googleFormsApi } from '@/services/google/googleFormsApi';

interface Props {
  tokens: { access_token: string; refresh_token?: string };
  formDetails: GoogleFormDetails;
  onMethodSelect: (method: 'forms_api' | 'spreadsheet', preview: SyncPreviewData) => void;
  onBack: () => void;
}


// Lets user choose between Forms API or Spreadsheet sync.


export const SyncMethodSelector: React.FC<Props> = ({ 
  tokens, 
  formDetails, 
  onMethodSelect, 
  onBack 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'forms_api' | 'spreadsheet' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [previewData, setPreviewData] = useState<SyncPreviewData | null>(null);

  const handleMethodSelect = async (method: 'forms_api' | 'spreadsheet') => {
    setSelectedMethod(method);
    setLoading(true);
    setError('');

    try {
      const response = await googleFormsApi.getFormPreview(tokens, formDetails.form_id, 
        method === 'forms_api' ? 'responses' : 'spreadsheet'
      );

      if (response.data.success) {
        const data = response.data.data;
        
        let preview: SyncPreviewData;
        
        if (method === 'forms_api') {
          const responses = data as any[];
          const sampleData = responses.slice(0, 3).map(r => Object.values(r.answers));
          const headers = formDetails.questions.map(q => q.title);
          
          preview = {
            type: 'forms_api',
            headers,
            sampleData,
            totalRecords: responses.length
          };
        } else {
          const sheetData = data as any;
          preview = {
            type: 'spreadsheet',
            headers: sheetData.headers,
            sampleData: sheetData.preview_rows,
            totalRecords: sheetData.total_responses
          };
        }
        
        setPreviewData(preview);
        onMethodSelect(method, preview);
      }
    } catch (error: any) {
      setError(error.response?.data?.error || `Failed to load ${method} preview`);
      console.error('Preview load error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Sync Method</h3>
          <p className="text-gray-600 text-sm">Choose how to import data from "{formDetails.title}"</p>
        </div>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Forms API Method */}
        <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
          selectedMethod === 'forms_api' 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Google Forms API</h4>
              <p className="text-sm text-gray-600 mb-3">
                Direct integration with Google Forms API. Best for real-time sync.
              </p>
            </div>
            <input
              type="radio"
              name="sync-method"
              checked={selectedMethod === 'forms_api'}
              onChange={() => handleMethodSelect('forms_api')}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Real-time response capture
            </div>
            <div className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Direct form structure access
            </div>
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Limited to form responses only
            </div>
          </div>
        </div>

        {/* Spreadsheet Method */}
        <div className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
          selectedMethod === 'spreadsheet' 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Linked Spreadsheet</h4>
              <p className="text-sm text-gray-600 mb-3">
                Sync from the Google Sheets where form responses are stored.
              </p>
            </div>
            <input
              type="radio"
              name="sync-method"
              checked={selectedMethod === 'spreadsheet'}
              onChange={() => handleMethodSelect('spreadsheet')}
              className="mt-1 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Full spreadsheet data access
            </div>
            <div className="flex items-center text-green-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Historical data included
            </div>
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Requires linked spreadsheet
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading preview data...</span>
        </div>
      )}

      {previewData && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Preview Data</h4>
          <div className="text-sm text-gray-600 mb-3">
            Found {previewData.totalRecords} responses • {previewData.headers.length} fields
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {previewData.headers.slice(0, 4).map((header, index) => (
                    <th key={index} className="text-left p-2 bg-white border-b font-medium">
                      {header}
                    </th>
                  ))}
                  {previewData.headers.length > 4 && (
                    <th className="text-left p-2 bg-white border-b font-medium text-gray-500">
                      +{previewData.headers.length - 4} more
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {previewData.sampleData.slice(0, 3).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                        {row.slice(0, 4).map((cell: string | number, cellIndex: number) => (

                      <td key={cellIndex} className="p-2 border-b bg-white">
                        {String(cell).substring(0, 30)}{String(cell).length > 30 ? '...' : ''}
                      </td>
                    ))}
                    {row.length > 4 && (
                      <td className="p-2 border-b bg-white text-gray-500">...</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {previewData.sampleData.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No sample data available
            </div>
          )}
        </div>
      )}
    </div>
  );
};