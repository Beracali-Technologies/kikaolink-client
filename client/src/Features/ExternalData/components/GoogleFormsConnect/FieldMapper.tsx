// components/external-data/GoogleFormsConnect/FieldMapper.tsx
import React, { useState, useEffect } from 'react';

interface Props {
  sourceFields: string[];
  kikaFields: string[];
  initialMapping: Record<string, string>;
  onMappingChange: (mapping: Record<string, string>) => void;
  onBack: () => void;
  onNext: () => void;
}


// Maps Google Form fields to KikaoLink attendee fields.


export const FieldMapper: React.FC<Props> = ({
  sourceFields,
  kikaFields,
  initialMapping,
  onMappingChange,
  onBack,
  onNext
}) => {
  const [mapping, setMapping] = useState<Record<string, string>>(initialMapping);
  const [usedSourceFields, setUsedSourceFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Initialize used fields
    const used = new Set(Object.values(mapping).filter(Boolean));
    setUsedSourceFields(used);
  }, []);

  const handleFieldChange = (kikaField: string, sourceField: string) => {
    const newMapping = { ...mapping, [kikaField]: sourceField };
    setMapping(newMapping);
    
    // Update used fields
    const used = new Set(Object.values(newMapping).filter(Boolean));
    setUsedSourceFields(used);
    
    onMappingChange(newMapping);
  };

  const getAvailableSourceFields = (currentField: string) => {
    return sourceFields.filter(field => 
      field === mapping[currentField] || !usedSourceFields.has(field)
    );
  };

  const requiredFields = ['name', 'email'];
  const isMappingValid = requiredFields.every(field => mapping[field]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Map Fields</h3>
          <p className="text-gray-600 text-sm">Connect Google Form fields to Kikaolink attendee fields</p>
        </div>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">← Back</button>
      </div>

      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <strong>Required fields:</strong> Name and Email must be mapped to continue. These fields are essential for attendee management.
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kikaolink Field
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Google Form Field
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kikaFields.map(kikaField => {
              const isRequired = requiredFields.includes(kikaField);
              const isMapped = !!mapping[kikaField];
              const availableFields = getAvailableSourceFields(kikaField);

              return (
                <tr key={kikaField} className={isRequired && !isMapped ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {kikaField}
                      </span>
                      {isRequired && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={mapping[kikaField] || ''}
                      onChange={(e) => handleFieldChange(kikaField, e.target.value)}
                      className={`border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 ${
                        isRequired && !isMapped ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Not mapped</option>
                      {availableFields.map(field => (
                        <option 
                          key={field} 
                          value={field}
                          disabled={mapping[kikaField] !== field && usedSourceFields.has(field)}
                        >
                          {field}
                          {mapping[kikaField] !== field && usedSourceFields.has(field) ? ' (already used)' : ''}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {isMapped ? (
                      <span className="inline-flex items-center text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Mapped
                      </span>
                    ) : (
                      <span className="text-red-600">Not mapped</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          disabled={!isMappingValid}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Configuration
        </button>
      </div>
    </div>
  );
};