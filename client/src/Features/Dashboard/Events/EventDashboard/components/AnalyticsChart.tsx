import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DashboardStats } from '@/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

interface AnalyticsChartProps {
    stats: DashboardStats;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ stats }) => {
    const data = [
        { name: 'Active Events', value: stats.active_events },
        { name: 'Registrations', value: stats.total_registrations },
        { name: 'Revenue', value: stats.total_revenue },
        { name: 'Checked-In', value: stats.checked_in_attendees },
    ].filter(item => item.value > 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-4">Analytics Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent as number * 100).toFixed(0)}%`} // Type assertion for percent
                    >
                        {data.map((_, index) => ( // Removed unused 'entry'
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsChart;
