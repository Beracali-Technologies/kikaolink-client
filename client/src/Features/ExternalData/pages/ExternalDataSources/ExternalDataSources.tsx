import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalDataSource } from '@/types';
import { externalDataApi } from '@/services/externalData/externalDataApi';
import { DataSourceCard } from '../../components/DataSourceCard';
import { GoogleFormsConnect } from '../../components/GoogleFormsConnect/GoogleFormsConnect';
import { RealTimeSyncIndicator } from '../../components/RealTimeSyncIndicator';
import { FiPlus, FiDownloadCloud, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';


export const ExternalDataSources: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [dataSources, setDataSources] = useState<ExternalDataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [syncStatus, setSyncStatus] = useState<Record<number, 'idle' | 'syncing'>>({});
  const [activeTab, setActiveTab] = useState<'connected' | 'available'>('connected');

  const loadDataSources = async () => {
    if (!eventId) return;
    
    try {
      setLoading(true);
      const response = await externalDataApi.getDataSources(parseInt(eventId));
      setDataSources(response.data.data);
    } catch (error) {
      console.error('Failed to load data sources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataSources();
  }, [eventId]);

  const handleDataSourceCreated = () => {
    setShowConnectForm(false);
    loadDataSources();
    setActiveTab('connected');
  };

  const handleSync = async (sourceId: number) => {
    setSyncStatus(prev => ({ ...prev, [sourceId]: 'syncing' }));
    try {
      await externalDataApi.syncDataSource(sourceId);
      await loadDataSources();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncStatus(prev => ({ ...prev, [sourceId]: 'idle' }));
    }
  };

  const handleDelete = async (sourceId: number) => {
    if (!window.confirm('Are you sure you want to delete this data source?')) return;
    
    try {
      await externalDataApi.deleteDataSource(sourceId);
      await loadDataSources();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const availableIntegrations = [
    {
      id: 'google-forms',
      title: 'Google Forms',
      description: 'Connect Google Forms to automatically import attendees from form responses',
      icon: FcGoogle,
      status: 'available',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      onConnect: () => setShowConnectForm(true)
    },
    {
      id: 'typeform',
      title: 'Typeform',
      description: 'Connect Typeform to sync responses automatically (Coming Soon)',
      icon: FiDownloadCloud,
      status: 'coming-soon',
      color: 'from-gray-400 to-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      onConnect: () => {}
    },
    {
      id: 'webhook',
      title: 'Webhook',
      description: 'Set up webhooks to receive data from any system (Coming Soon)',
      icon: FiDownloadCloud,
      status: 'coming-soon',
      color: 'from-gray-400 to-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      onConnect: () => {}
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">External Data Sources</h1>
          <p className="text-gray-600 mt-1">
            Connect external platforms to automatically import attendees into your event
          </p>
        </div>
        
        {dataSources.length > 0 && (
          <button
            onClick={() => setShowConnectForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <FiPlus className="w-5 h-5" />
            Connect New Source
          </button>
        )}
      </div>

      {/* Real-time Sync Indicator */}
      <RealTimeSyncIndicator 
        dataSources={dataSources}
        onSync={handleSync}
      />

      {/* Tabs */}
      {dataSources.length > 0 && (
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('connected')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'connected'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Connected Sources ({dataSources.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'available'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Available Integrations
            </button>
          </nav>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'connected' && (
        <div className="space-y-6">
          {/* Connected Data Sources */}
          {dataSources.length > 0 ? (
            <div className="grid gap-6">
              {dataSources.map(source => (
                <DataSourceCard 
                  key={source.id} 
                  dataSource={source}
                  onUpdate={loadDataSources}
                  onSync={() => handleSync(source.id)}
                  onDelete={() => handleDelete(source.id)}
                  isSyncing={syncStatus[source.id] === 'syncing'}
                />
              ))}
            </div>
          ) : (
            /* Empty State - Show Available Integrations */
            <div className="text-center py-12">
              <div className="max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiDownloadCloud className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Connect Your First Data Source
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Automatically import attendees from external platforms. Choose from available integrations below.
                </p>
                
                {/* Available Integrations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {availableIntegrations.map((integration) => {
                    const Icon = integration.icon;
                    return (
                      <div
                        key={integration.id}
                        onClick={integration.status === 'available' ? integration.onConnect : undefined}
                        className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                          integration.status === 'available' 
                            ? `${integration.bgColor} ${integration.borderColor} hover:shadow-lg hover:scale-105` 
                            : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${integration.color} text-white`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{integration.title}</h4>
                              {integration.status === 'coming-soon' && (
                                <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>
                          {integration.status === 'available' && (
                            <FiArrowRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${
                            integration.status === 'available' ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {integration.status === 'available' ? 'Available' : 'Coming Soon'}
                          </span>
                          {integration.status === 'available' && (
                            <span className="text-blue-600 font-medium text-sm">Connect →</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* How it works section */}
                <div className="bg-gray-50 rounded-xl p-8">
                  <h4 className="font-semibold text-gray-900 text-center mb-6">How It Works</h4>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Connect</h5>
                      <p className="text-gray-600">Authenticate with your platform</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Map Fields</h5>
                      <p className="text-gray-600">Match external fields to Kikaolink</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Sync Automatically</h5>
                      <p className="text-gray-600">Data imports on your schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'available' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div
                key={integration.id}
                onClick={integration.status === 'available' ? integration.onConnect : undefined}
                className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                  integration.status === 'available' 
                    ? `${integration.bgColor} ${integration.borderColor} hover:shadow-lg hover:scale-105` 
                    : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${integration.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{integration.title}</h4>
                      {integration.status === 'coming-soon' && (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                  {integration.status === 'available' && (
                    <FiArrowRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    integration.status === 'available' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {integration.status === 'available' ? 'Available' : 'Coming Soon'}
                  </span>
                  {integration.status === 'available' && (
                    <span className="text-blue-600 font-medium text-sm">Connect →</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Google Forms Connect Modal */}
      {showConnectForm && (
        <GoogleFormsConnect 
          eventId={parseInt(eventId!)}
          onSuccess={handleDataSourceCreated}
          onCancel={() => setShowConnectForm(false)}
        />
      )}
    </div>
  );
};

export default ExternalDataSources;