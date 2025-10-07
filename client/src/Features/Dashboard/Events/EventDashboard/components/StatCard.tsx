import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
            <div className={`bg-${color}-100 text-${color}-600 p-3 rounded-full`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);

export default StatCard;
