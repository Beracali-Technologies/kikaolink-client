
import React, { useState } from 'react';


interface Props {
  formName: string;
  eventId: number;
  fieldMapping: Record<string, string>;
  syncMethod: 'forms_api' | 'spreadsheet';
  onSave: (config: {
    event_id: number;
    name: string;
    type: 'google_forms';
    config: any;
    field_mapping: Record<string, string>;
    sync_method: 'forms_api' | 'spreadsheet';
    sync_schedule: 'realtime' | '5min' | '15min' | '30min' | '1hour' | 'manual';
  }) => void;
  onBack: () => void;
  loading?: boolean;
  autoMappedFields?: Record<string, string>; //auto mapped fields
}

export const DataSourceConfig: React.FC<Props> = ({
  formName,
  eventId,
  fieldMapping,
  syncMethod,
  onSave,
  onBack,
  loading = false,
  autoMappedFields = {}
}) => {
  const [name, setName] = useState(formName);
  const [syncSchedule, setSyncSchedule] = useState<'realtime' | '5min' | '15min' | '30min' | '1hour' | 'manual'>('realtime');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      event_id: eventId,
      name,
      type: 'google_forms',
      config: {
        sync_method: syncMethod,
        sync_schedule: syncSchedule,
      },
      field_mapping: autoMappedFields,
      sync_method: syncMethod,
      sync_schedule: syncSchedule,
    });
  };

      //getting mapped field count
  const mappedFieldCount = Object.keys(autoMappedFields).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Configuration</h3>
          <p className="text-gray-600 text-sm">Finalize your Google Forms integration settings</p>
        </div>
        <button 
          onClick={onBack}
          disabled={loading}
          className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Data Source Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a name for this data source"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sync Schedule
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { value: 'realtime', label: 'Real-time', description: 'Sync immediately' },
              { value: '5min', label: 'Every 5 min', description: 'Frequent updates' },
              { value: '15min', label: 'Every 15 min', description: 'Balanced' },
              { value: '30min', label: 'Every 30 min', description: 'Standard' },
              { value: '1hour', label: 'Every hour', description: 'Less frequent' },
              { value: 'manual', label: 'Manual only', description: 'On-demand' },
            ].map(option => (
              <label
                key={option.value}
                className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  syncSchedule === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="sync-schedule"
                  value={option.value}
                  checked={syncSchedule === option.value}
                  onChange={(e) => setSyncSchedule(e.target.value as any)}
                  className="sr-only"
                />
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {option.description}
                    </span>
                  </div>
                  {syncSchedule === option.value && (
                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>



            {/* Auto-mapped fields preview */}
        {mappedFieldCount > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Auto-Mapped Fields ({mappedFieldCount} fields)
            </h4>
            <p className="text-blue-700 text-sm mb-3">
              Fields from your Google Form have been automatically mapped to Kikaolink attendee fields.
            </p>
            <div className="bg-white rounded border border-blue-200 max-h-40 overflow-y-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-blue-900">Google Form Field</th>
                    <th className="px-3 py-2 text-left font-medium text-blue-900">→</th>
                    <th className="px-3 py-2 text-left font-medium text-blue-900">Kikaolink Field</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(autoMappedFields).map(([kikaField, googleField], index) => (
                    <tr key={index} className="border-t border-blue-100">
                      <td className="px-3 py-2 text-gray-700">{googleField}</td>
                      <td className="px-3 py-2 text-blue-500 text-center">→</td>
                      <td className="px-3 py-2">
                        <span className="font-medium text-gray-900 capitalize">{kikaField}</span>
                        {['name', 'email'].includes(kikaField) && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Required
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Configuration Summary</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Form Name</dt>
              <dd className="font-medium">{formName}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Sync Method</dt>
              <dd className="font-medium capitalize">{syncMethod.replace('_', ' ')}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Mapped Fields</dt>
              <dd className="font-medium">{Object.values(fieldMapping).filter(Boolean).length} of {Object.keys(fieldMapping).length}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Sync Frequency</dt>
              <dd className="font-medium">
                {syncSchedule === 'realtime' ? 'Real-time' :
                 syncSchedule === 'manual' ? 'Manual only' :
                 `Every ${syncSchedule}`}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              'Connect Google Form'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};