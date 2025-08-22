import React from 'react';
import { FiUsers, FiClipboard, FiDollarSign } from 'react-icons/fi';

// Example subcomponent to show scalability
const StatCard: React.FC<{ title: string; value: string; icon: React.FC<{className?:string}> }> = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <Icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    </div>
);

const EventDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">A high-level overview of all your events.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={FiClipboard} title="Active Events" value="3" />
                <StatCard icon={FiUsers} title="Total Registrations" value="2,849" />
                <StatCard icon={FiDollarSign} title="Total Revenue" value="$48,950" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                 <h3 className="font-bold text-lg">Upcoming Events</h3>
                 <p className="text-center text-gray-400 py-12">A list of upcoming events will be shown here.</p>
            </div>
        </div>
    );
};

export default EventDashboard;
