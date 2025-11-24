// components/external-data/GoogleFormsConnect/GoogleFormsConnect.tsx
import React, { useState } from 'react';
import { GoogleOAuthTokens, GoogleForm, GoogleFormDetails, SyncPreviewData } from '@/types';
import { externalDataApi } from '@/services/externalData/externalDataApi';
import { GoogleOAuthFlow } from './GoogleOAuthFlow';
import { FormSelector } from './FormSelector';
import { SyncMethodSelector } from './SyncMethodSelector';
import { FieldMapper } from './FieldMapper';
import { DataSourceConfig } from './DataSourceConfig';

interface Props {
  eventId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

type Step = 'oauth' | 'select-form' | 'select-method' | 'map-fields' | 'config';

export const GoogleFormsConnect: React.FC<Props> = ({ eventId, onSuccess, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<Step>('oauth');
  const [tokens, setTokens] = useState<GoogleOAuthTokens | null>(null);
  const [selectedForm, setSelectedForm] = useState<GoogleForm | null>(null);
  const [formDetails, setFormDetails] = useState<GoogleFormDetails | null>(null);
  const [syncMethod, setSyncMethod] = useState<'forms_api' | 'spreadsheet' | null>(null);
  const [previewData, setPreviewData] = useState<SyncPreviewData | null>(null);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Kikaolink attendee fields
  const kikaFields = ['name', 'email', 'phone', 'ticket_type', 'company', 'position', 'notes'];

  const handleOAuthSuccess = (authTokens: GoogleOAuthTokens) => {
    setTokens(authTokens);
    setCurrentStep('select-form');
  };

  const handleFormSelect = (form: GoogleForm, details: GoogleFormDetails) => {
    setSelectedForm(form);
    setFormDetails(details);
    setCurrentStep('select-method');
  };

  const handleMethodSelect = (method: 'forms_api' | 'spreadsheet', preview: SyncPreviewData) => {
    setSyncMethod(method);
    setPreviewData(preview);
    setCurrentStep('map-fields');
    
    // Initialize field mapping with empty values
    const initialMapping: Record<string, string> = {};
    kikaFields.forEach(field => {
      initialMapping[field] = '';
    });
    setFieldMapping(initialMapping);
  };

  const handleFieldMappingChange = (mapping: Record<string, string>) => {
    setFieldMapping(mapping);
  };

  const handleSaveConfig = async (config: any) => {
    if (!tokens) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Add OAuth tokens to config
      const fullConfig = {
        ...config,
        config: {
          ...config.config,
          access_tokens: tokens,
          form_id: selectedForm?.id,
          ...(previewData?.type === 'spreadsheet' && previewData 
            ? { spreadsheet_id: (previewData as any).spreadsheet_id } 
            : {})
        }
      };

      const response = await externalDataApi.createDataSource(fullConfig);
      
      if (response.data.success) {
        onSuccess();
      } else {
        setError('Failed to create data source');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to connect Google Form');
      console.error('Data source creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    switch (currentStep) {
      case 'select-form':
        setCurrentStep('oauth');
        break;
      case 'select-method':
        setCurrentStep('select-form');
        break;
      case 'map-fields':
        setCurrentStep('select-method');
        break;
      case 'config':
        setCurrentStep('map-fields');
        break;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'oauth': return 'Connect Google Account';
      case 'select-form': return 'Select Google Form';
      case 'select-method': return 'Choose Sync Method';
      case 'map-fields': return 'Map Fields';
      case 'config': return 'Configuration';
      default: return 'Connect Google Form';
    }
  };

  const getProgress = () => {
    const steps: Step[] = ['oauth', 'select-form', 'select-method', 'map-fields', 'config'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Connect Account</span>
              <span>Select Form</span>
              <span>Sync Method</span>
              <span>Map Fields</span>
              <span>Configure</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {currentStep === 'oauth' && (
            <GoogleOAuthFlow 
              onAuthSuccess={handleOAuthSuccess}
              onBack={onCancel}
            />
          )}

          {currentStep === 'select-form' && tokens && (
            <FormSelector
              tokens={tokens}
              onFormSelect={handleFormSelect}
              onBack={goBack}
            />
          )}

          {currentStep === 'select-method' && tokens && formDetails && (
            <SyncMethodSelector
              tokens={tokens}
              formDetails={formDetails}
              onMethodSelect={handleMethodSelect}
              onBack={goBack}
            />
          )}

          {currentStep === 'map-fields' && previewData && (
            <FieldMapper
              sourceFields={previewData.headers}
              kikaFields={kikaFields}
              initialMapping={fieldMapping}
              onMappingChange={handleFieldMappingChange}
              onBack={goBack}
              onNext={() => setCurrentStep('config')}
            />
          )}

          {currentStep === 'config' && selectedForm && (
            <DataSourceConfig
              formName={selectedForm.name}
              eventId={eventId}
              fieldMapping={fieldMapping}
              syncMethod={syncMethod!}
              onSave={handleSaveConfig}
              onBack={goBack}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};