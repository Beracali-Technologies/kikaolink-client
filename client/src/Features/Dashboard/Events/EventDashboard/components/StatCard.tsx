import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: 'blue' | 'green' | 'yellow' | 'purple' | 'teal' | 'indigo' | 'orange' | 'red';
    trend: string;
    description: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    color,
    trend,
    description
}) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
        teal: 'bg-teal-50 text-teal-600',
        indigo: 'bg-indigo-50 text-indigo-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600'
    };

    const trendColor = trend.startsWith('+') ? 'text-green-600' :
                      trend.startsWith('-') ? 'text-red-600' : 'text-gray-600';

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${trendColor}`}>
                    {trend}
                </span>
            </div>

            <div className="space-y-2">
                <h3 className="text-2xl font-light text-gray-900 tracking-tight">
                    {value}
                </h3>
                <p className="text-sm font-medium text-gray-700">
                    {title}
                </p>
                <p className="text-xs text-gray-500 font-light">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default StatCard;
