import React from 'react';

const DashboardHeader: React.FC = () => {
    return (
        <header className="mb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-gray-900 tracking-tight mb-2">
                        Event Dashboard
                    </h1>
                    <p className="text-lg text-gray-600 font-light">
                        Real-time insights and analytics for your events
                    </p>
                </div>
                <div className="hidden lg:block">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Last updated: Just now</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
