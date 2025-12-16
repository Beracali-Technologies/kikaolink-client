import React, { useState, useEffect } from 'react';
import { ExternalDataSource } from '@/types';
import { externalDataApi } from '@/services/externalData/externalDataApi';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

interface FormResponse {
  response_id: string;
  create_time: string;
  last_submitted_time: string;
  answers: Record<string, string>;
}

interface ChartData {
  question_id: string;
  title: string;
  type: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }>;
  };
}

interface SourceInfo {
  name: string;
  type: string;
  last_synced: string | null;
}

type TabType = 'fields' | 'responses' | 'charts';

export const FieldsModal: React.FC<Props> = ({ dataSource, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('fields');
  const [loading, setLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<FormField[]>([]);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [sourceInfo, setSourceInfo] = useState<SourceInfo | null>(null);
  const [totalResponses, setTotalResponses] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, [dataSource.id, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'fields':
          const fieldsResponse = await externalDataApi.getDataSourceFields(dataSource.id);
          setFields(fieldsResponse.data.data.available_fields || []);
          setMapping(fieldsResponse.data.data.current_mapping || {});
          setSourceInfo(fieldsResponse.data.data.source_info || null);
          break;
        
        case 'responses':
          const responsesResponse = await externalDataApi.getDataSourceResponses(dataSource.id);
          setResponses(responsesResponse.data.data.responses || []);
          setTotalResponses(responsesResponse.data.data.total_responses || 0);
          break;
        
        case 'charts':
          const chartsResponse = await externalDataApi.getDataSourceChartData(dataSource.id);
          setCharts(chartsResponse.data.data.charts || []);
          setTotalResponses(chartsResponse.data.data.total_responses || 0);
          break;
      }
    } catch (error) {
      console.error(`Failed to load ${activeTab}:`, error);
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

  const renderFieldsTab = () => {
    if (fields.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No fields found or unable to connect to form
        </div>
      );
    }

    return (
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
    );
  };

  const renderResponsesTab = () => {
    if (responses.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No responses found or unable to connect to form
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Responses ({totalResponses})</span>
            </div>
            <span className="text-sm text-green-600">
              Last response: {new Date(responses[0]?.create_time).toLocaleString()}
            </span>
          </div>
          <p className="text-green-600 text-sm mt-1">
            View individual responses submitted to your Google Form.
          </p>
        </div>

        <div className="space-y-4">
          {responses.map((response, index) => (
            <div key={response.response_id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4 pb-3 border-b">
                <div>
                  <span className="font-medium text-gray-900">Response #{index + 1}</span>
                  <div className="text-xs text-gray-500 mt-1">
                    Submitted: {new Date(response.create_time).toLocaleString()}
                  </div>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  ID: {response.response_id.substring(0, 8)}...
                </span>
              </div>
              
              <div className="space-y-3">
                {Object.entries(response.answers).map(([questionId, answer]) => {
                  const field = fields.find(f => f.question_id === questionId);
                  return (
                    <div key={questionId} className="grid grid-cols-3 gap-4 text-sm">
                      <div className="col-span-1">
                        <span className="text-gray-500">
                          {field?.title || `Question ${questionId.substring(0, 8)}...`}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium text-gray-900">{answer}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChartsTab = () => {
    if (charts.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          No chart data available. Charts are only available for choice-based questions.
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-purple-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span className="font-medium">Response Analytics</span>
          </div>
          <p className="text-purple-600 text-sm mt-1">
            Visualize response patterns for choice-based questions. Based on {totalResponses} total responses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {charts.map((chart) => (
            <div key={chart.question_id} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">{chart.title}</h3>
              
              <div className="h-64">
                {chart.data.labels.length <= 5 ? (
                  <Doughnut 
                    data={chart.data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context: TooltipItem<'doughnut'>) => {
                              const rawValue = context.raw as number;
                              const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
                              const percentage = Math.round((rawValue / total) * 100);
                              return `${context.label}: ${rawValue} (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }}
                  />
                ) : (
                  <Bar 
                    data={chart.data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Total responses: {chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)}</span>
                    <span>Question type: {getQuestionTypeLabel(chart.type)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'fields':
        return renderFieldsTab();
      case 'responses':
        return renderResponsesTab();
      case 'charts':
        return renderChartsTab();
      default:
        return renderFieldsTab();
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'fields',
      label: 'Fields',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'responses',
      label: 'Responses',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: 'charts',
      label: 'Analytics',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Google Form Details</h2>
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

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {activeTab === 'fields' && fields.length > 0 && (
                <>
                  Showing {fields.length} field{fields.length !== 1 ? 's' : ''}
                  {Object.keys(mapping).length > 0 && (
                    <span className="ml-2">
                      • {Object.keys(mapping).length} mapped
                    </span>
                  )}
                </>
              )}
              {activeTab === 'responses' && responses.length > 0 && (
                <>Showing {responses.length} of {totalResponses} response{totalResponses !== 1 ? 's' : ''}</>
              )}
              {activeTab === 'charts' && charts.length > 0 && (
                <>Showing {charts.length} chart{charts.length !== 1 ? 's' : ''} • {totalResponses} total responses</>
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