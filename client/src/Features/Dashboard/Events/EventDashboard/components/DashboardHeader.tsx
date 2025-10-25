import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

interface DashboardHeaderProps {
    lastUpdated?: string;
    onRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ lastUpdated, onRefresh }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Event Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Real-time analytics and insights for your events
                </p>
                {lastUpdated && (
                    <p className="text-sm text-gray-500 mt-1">
                        Last updated: {new Date(lastUpdated).toLocaleString()}
                    </p>
                )}
            </div>
            <button
                onClick={onRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <FiRefreshCw className="w-4 h-4" />
                Refresh
            </button>
        </div>
    );
};

export default DashboardHeader;
