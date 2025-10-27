import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DashboardData } from '@/types';

const COLORS = ['#0E2344', '#FF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

interface AnalyticsChartProps {
    stats: DashboardData['stats'];  //accessing stats from dashboard
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ stats }) => {
    const data = [
        { name: 'Active Events', value: stats.active_events },
        { name: 'Registrations', value: stats.total_registrations },
        { name: 'Revenue', value: stats.total_revenue },
        { name: 'Checked-In', value: stats.checked_in_attendees },
    ].filter(item => item.value > 0);

    const hasData = data.length > 0 && data.some(item => item.value > 0);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{payload[0].name}</p>
                    <p className="text-sm text-gray-600">
                        Value: <span className="font-medium">{payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

  

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Event Distribution</h3>
                <span className="text-sm text-gray-500">
                    {hasData ? 'Real-time data' : 'Sample preview'}
                </span>
            </div>

            {hasData ? (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex flex-col items-center justify-center h-64">
                    {/* Animated Chart Placeholder */}
                    <div className="relative w-48 h-48 mb-4">
                        {/* Animated Pie Slices */}
                        <div className="absolute inset-0">
                            <div className="absolute w-24 h-24 bg-[#0E2344] rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute w-24 h-24 bg-[#FF4444] rounded-full opacity-20 animate-pulse"
                                 style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                            <div className="absolute w-24 h-24 bg-[#3B82F6] rounded-full opacity-20 animate-pulse"
                                 style={{ clipPath: 'polygon(50% 50%, 100% 0%, 50% 0%)' }}></div>
                        </div>

                        {/* Center Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <h4 className="font-medium text-gray-900 mb-2">No Analytics Data Yet</h4>
                        <p className="text-sm text-gray-500 max-w-sm">
                            Your event analytics will appear here once you start creating events and receiving registrations.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsChart;
