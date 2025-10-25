import React from 'react';
import AnalyticsChart from './AnalyticsChart';
import RevenueTrendChart from './RevenueTrendChart';
import CustomMetricsPanel from './CustomMetricsPanel';
import { DashboardStats } from '@/types';

interface AnalyticsSectionProps {
    stats: DashboardStats;
    selectedEventId: number | null;
    onCustomUpdate: () => void;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
    stats,
    selectedEventId,
    onCustomUpdate
}) => {
    const hasData = stats.active_events > 0 || stats.total_registrations > 0;

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-gray-900">Analytics Overview</h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Last 7 days
                    </button>
                    <button className="px-4 py-2 text-sm bg-[#0E2344] text-white rounded-lg hover:bg-[#1a3358] transition-colors">
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AnalyticsChart stats={stats} />
                    <RevenueTrendChart hasData={hasData} />
                </div>

                <div className="space-y-6">
                    {selectedEventId ? (
                        <CustomMetricsPanel
                            eventId={selectedEventId}
                            onUpdate={onCustomUpdate}
                        />
                    ) : (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-xl">🎯</span>
                                </div>
                                <h3 className="font-medium text-gray-900 mb-2">Select an Event</h3>
                                <p className="text-sm text-gray-500">
                                    Choose an event from the dropdown below to view custom metrics and detailed analytics.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-4">Performance</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Conversion Rate</span>
                                <span className="text-sm font-medium text-green-600">
                                    {hasData ? '24.5%' : '--'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Avg. Ticket Price</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {hasData ? '$89.99' : '--'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Peak Attendance</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {hasData ? '1,247' : '--'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;
