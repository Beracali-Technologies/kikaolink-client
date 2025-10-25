// components/RealCharts.tsx
import React from 'react';
import { RevenueTrend, RegistrationTrend } from '@/types';

interface RealChartsProps {
    revenueData: RevenueTrend[];
    registrationData: RegistrationTrend[];
    smsData: Record<string, number>;
}

const RealCharts: React.FC<RealChartsProps> = ({ revenueData, registrationData, smsData }) => {
    const hasRevenueData = revenueData.length > 0;
    const hasRegistrationData = registrationData.length > 0;
    const hasSmsData = Object.keys(smsData).length > 0;

    // Get last 7 days of data for display
    const recentRevenue = revenueData.slice(-7);
    const recentRegistrations = registrationData.slice(-7);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Trends</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                    {hasRevenueData ? (
                        <div className="h-64">
                            <div className="flex items-end justify-between h-48 gap-2 mt-4">
                                {recentRevenue.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div
                                            className="bg-green-500 rounded-t w-full max-w-12 transition-all duration-300 hover:bg-green-600"
                                            style={{
                                                height: `${Math.max(10, (item.revenue / Math.max(...recentRevenue.map(r => r.revenue || 1))) * 100)}%`,
                                                minHeight: '20px'
                                            }}
                                            title={`$${item.revenue} on ${new Date(item.date).toLocaleDateString()}`}
                                        ></div>
                                        <div className="text-xs text-gray-500 mt-2 text-center">
                                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                        <div className="text-xs font-medium text-gray-700 mt-1">
                                            ${(item.revenue / 1000).toFixed(0)}K
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center text-sm text-gray-500">
                                Last 7 days revenue trend
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            No revenue data available
                        </div>
                    )}
                </div>

                {/* Registration Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4">Registration Trend</h3>
                    {hasRegistrationData ? (
                        <div className="h-64">
                            <div className="flex items-end justify-between h-48 gap-2 mt-4">
                                {recentRegistrations.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="flex gap-1 h-full items-end w-full justify-center">
                                            <div
                                                className="bg-blue-500 rounded-t w-6 transition-all duration-300 hover:bg-blue-600"
                                                style={{
                                                    height: `${Math.max(10, (item.registrations / Math.max(...recentRegistrations.map(r => r.registrations || 1))) * 100)}%`,
                                                    minHeight: '20px'
                                                }}
                                                title={`Registrations: ${item.registrations}`}
                                            ></div>
                                            <div
                                                className="bg-purple-500 rounded-t w-6 transition-all duration-300 hover:bg-purple-600"
                                                style={{
                                                    height: `${Math.max(10, (item.checkins / Math.max(...recentRegistrations.map(r => r.checkins || 1))) * 100)}%`,
                                                    minHeight: '20px'
                                                }}
                                                title={`Check-ins: ${item.checkins}`}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2 text-center">
                                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-6 mt-4 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                    <span>Registrations</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                    <span>Check-ins</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            No registration data available
                        </div>
                    )}
                </div>
            </div>

            {/* SMS Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">SMS Activity</h3>
                {hasSmsData ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(smsData).map(([timing, count]) => (
                            <div key={timing} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="text-2xl font-bold text-indigo-600">{count}</div>
                                <div className="text-sm text-gray-600 capitalize mt-1">
                                    {timing.replace(/_/g, ' ')}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">SMS Sent</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-20 flex items-center justify-center text-gray-500">
                        No SMS activity data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealCharts;
