import React, { useState, useEffect } from 'react';
import { ExternalDataSource } from '@/types';
import { externalDataApi } from '@/services/externalData/externalDataApi';

interface Props {
  dataSource: ExternalDataSource;
  onClose: () => void;
}

interface FormField {
  id: string;
  title: string;
  question_id: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface SourceInfo {
  name: string;
  type: string;
  last_synced: string | null;
}

export const FieldsModal: React.FC<Props> = ({ dataSource, onClose }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<FormField[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [sourceInfo, setSourceInfo] = useState<SourceInfo | null>(null);

  useEffect(() => {
    loadFields();
  }, [dataSource.id]);

  const loadFields = async () => {
    try {
      const response = await externalDataApi.getDataSourceFields(dataSource.id);
      setFields(response.data.data.available_fields || []);
      setMapping(response.data.data.current_mapping || {});
      setSourceInfo(response.data.data.source_info || null);
    } catch (error) {
      console.error('Failed to load form fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'text': 'Text',
      'choice': 'Multiple Choice',
      'scale': 'Scale',
      'date': 'Date',
      'time': 'Time',
      'file_upload': 'File Upload',
    };
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Form Fields</h2>
              <p className="text-gray-600 text-sm">{dataSource.name}</p>
              {sourceInfo && (
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span>Type: {sourceInfo.type}</span>
                  {sourceInfo.last_synced && (
                    <span>Last synced: {new Date(sourceInfo.last_synced).toLocaleString()}</span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : fields.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No fields found or unable to connect to form
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Available Fields ({fields.length})</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">
                  These are the actual fields from your Google Form. Use this to map fields to your event.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {field.title || `Field ${index + 1}`}
                          {field.required && (
                            <span className="ml-2 text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Required</span>
                          )}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Type: {getQuestionTypeLabel(field.type)}
                        </p>
                      </div>
                      {mapping[field.question_id] && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Mapped
                        </span>
                      )}
                    </div>
                    
                    {field.options && field.options.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">Options:</p>
                        <div className="flex flex-wrap gap-1">
                          {field.options.slice(0, 3).map((option: string, i: number) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {option}
                            </span>
                          ))}
                          {field.options.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{field.options.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        <div>ID: <code className="text-gray-600">{field.question_id}</code></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {fields.length > 0 && (
                <>
                  Showing {fields.length} field{fields.length !== 1 ? 's' : ''}
                  {Object.keys(mapping).length > 0 && (
                    <span className="ml-2">
                      • {Object.keys(mapping).length} mapped
                    </span>
                  )}
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};