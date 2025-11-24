import React, { useState, useEffect, useCallback } from 'react';
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
  const [activeTab, setActiveTab] = useState<'connected' | 'available'>('connected');

  const [syncStatus, setSyncStatus] = useState<Record<number, 'idle' | 'syncing'>>({});

  // -----------------------------
  // LOAD DATA SOURCES
  // -----------------------------
  const loadDataSources = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      const res = await externalDataApi.getDataSources(Number(eventId));
      setDataSources(res.data.data);
    } catch (err) {
      console.error('Failed to load data sources:', err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadDataSources();
  }, [loadDataSources]);

  // -----------------------------
  // SYNC HANDLER
  // -----------------------------
  const handleSync = async (sourceId: number) => {
    setSyncStatus(prev => ({ ...prev, [sourceId]: 'syncing' }));

    try {
      await externalDataApi.syncDataSource(sourceId);
      await loadDataSources();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setSyncStatus(prev => ({ ...prev, [sourceId]: 'idle' }));
    }
  };

  // -----------------------------
  // DELETE HANDLER
  // -----------------------------
  const handleDelete = async (sourceId: number) => {
    if (!window.confirm('Are you sure you want to delete this data source?')) return;

    try {
      await externalDataApi.deleteDataSource(sourceId);
      await loadDataSources();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // -----------------------------
  // SUCCESS WHEN CONNECTING
  // -----------------------------
  const handleDataSourceCreated = () => {
    setShowConnectForm(false);
    loadDataSources();
    setActiveTab('connected');
  };

  // -----------------------------
  // AVAILABLE INTEGRATIONS LIST
  // -----------------------------
  const availableIntegrations = [
    {
      id: 'google-forms',
      title: 'Google Forms',
      description: 'Connect Google Forms to automatically import attendees from responses',
      icon: FcGoogle,
      status: 'available',
      bg: 'bg-blue-50 border-blue-200',
      gradient: 'from-blue-500 to-blue-600',
      onConnect: () => setShowConnectForm(true),
    },
    {
      id: 'typeform',
      title: 'Typeform',
      description: 'Sync Typeform responses automatically (Coming Soon)',
      icon: FiDownloadCloud,
      status: 'coming-soon',
      bg: 'bg-gray-50 border-gray-200',
      gradient: 'from-gray-400 to-gray-500',
    },
    {
      id: 'webhook',
      title: 'Webhook',
      description: 'Receive data from any system via webhooks (Coming Soon)',
      icon: FiDownloadCloud,
      status: 'coming-soon',
      bg: 'bg-gray-50 border-gray-200',
      gradient: 'from-gray-400 to-gray-500',
    }
  ];

  // -----------------------------
  // LOADING STATE
  // -----------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // -----------------------------
  // MAIN COMPONENT
  // -----------------------------
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
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Connect New Source
          </button>
        )}
      </div>

      {/* Real-time Sync */}
      <RealTimeSyncIndicator
        dataSources={dataSources}
        onSync={handleSync}
      />

      {/* Tabs */}
      {dataSources.length > 0 && (
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['connected', 'available'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'connected'
                  ? `Connected Sources (${dataSources.length})`
                  : 'Available Integrations'}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* CONNECTED TAB */}
      {activeTab === 'connected' && (
        <div className="space-y-6">
          {dataSources.length > 0 ? (
            <div className="grid gap-6">
              {dataSources.map(ds => (
                <DataSourceCard
                  key={ds.id}
                  dataSource={ds}
                  onUpdate={loadDataSources}
                  onSync={() => handleSync(ds.id)}
                  onDelete={() => handleDelete(ds.id)}
                  isSyncing={syncStatus[ds.id] === 'syncing'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-2xl mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiDownloadCloud className="w-10 h-10 text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Connect Your First Data Source
                </h3>

                <p className="text-gray-600 mb-8 text-lg">
                  Easily import attendees automatically from supported platforms.
                </p>

                {/* Available Integrations Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {availableIntegrations.map(x => {
                    const Icon = x.icon;
                    return (
                      <div
                        key={x.id}
                        className={`border-2 rounded-xl p-6 ${x.bg} ${
                          x.status === 'available'
                            ? 'cursor-pointer hover:shadow-lg hover:scale-105 transition-all'
                            : 'opacity-60 cursor-not-allowed'
                        }`}
                        onClick={x.status === 'available' ? x.onConnect : undefined}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${x.gradient} text-white`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{x.title}</h4>
                              {x.status === 'coming-soon' && (
                                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>
                          {x.status === 'available' && <FiArrowRight className="w-5 h-5 text-gray-400" />}
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{x.description}</p>

                        <div className="flex justify-between text-sm font-medium">
                          <span className={x.status === 'available' ? 'text-green-600' : 'text-gray-500'}>
                            {x.status === 'available' ? 'Available' : 'Coming Soon'}
                          </span>

                          {x.status === 'available' && (
                            <span className="text-blue-600">Connect →</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AVAILABLE TAB */}
      {activeTab === 'available' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableIntegrations.map(x => {
            const Icon = x.icon;
            return (
              <div
                key={x.id}
                className={`border-2 rounded-xl p-6 ${x.bg} ${
                  x.status === 'available'
                    ? 'cursor-pointer hover:shadow-lg hover:scale-105 transition-all'
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={x.status === 'available' ? x.onConnect : undefined}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${x.gradient} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{x.title}</h4>
                      {x.status === 'coming-soon' && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                  {x.status === 'available' && <FiArrowRight className="w-5 h-5 text-gray-400" />}
                </div>

                <p className="text-gray-600 text-sm mb-4">{x.description}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showConnectForm && (
        <GoogleFormsConnect
          eventId={Number(eventId)}
          onSuccess={handleDataSourceCreated}
          onCancel={() => setShowConnectForm(false)}
        />
      )}
    </div>
  );
};

export default ExternalDataSources;
