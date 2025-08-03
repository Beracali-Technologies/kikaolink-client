import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder Icons
const SearchIcon = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const PlusIcon = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;


const EventList: React.FC = () => {
    // Mock data to simulate events. In a real app, this comes from an API.
    const events = [
        { id: 1, title: '[Demo] Leadership Conference', status: 'DISABLED' },
        { id: 2, title: 'Sticker Label 62mm', status: 'LIVE' },
        { id: 3, title: 'Annual Tech Summit 2024', status: 'DRAFT' },
    ];
    // const events = []; // Uncomment this line to see the "No Events" state

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'LIVE':
                return <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">LIVE</span>;
            case 'DISABLED':
                return <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">DISABLED</span>;
            default:
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">DRAFT</span>;
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header section */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-dark-text">My Events</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input type="text" placeholder="Search event..."
                            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:ring-primary-blue focus:border-primary-blue" />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text">
                            <SearchIcon />
                        </span>
                    </div>
                    <Link to="/dashboard/events/create" className="flex items-center gap-2 bg-primary-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-blue-hover transition-colors">
                        <PlusIcon />
                        <span>Create Event</span>
                    </Link>
                </div>
            </div>

            {/* Event List or No Event State */}
            {events.length > 0 ? (
                <div className="bg-white rounded-lg shadow">
                    <ul className="divide-y divide-gray-200">
                        {events.map(event => (
                            <li key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    {getStatusChip(event.status)}
                                    <span className="font-semibold text-dark-text">{event.title}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link to={`/dashboard/events/${event.id}/details`} className="text-sm font-medium text-primary-blue hover:underline">Dashboard</Link>
                                    <Link to={`/checkin/${event.id}`} className="text-sm font-medium text-primary-blue hover:underline">Check-in</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow">
                     <h2 className="text-2xl font-semibold text-dark-text">You haven't created any events yet</h2>
                     <p className="mt-2 text-light-text">Click "Create Event" to get started.</p>
                </div>
            )}
        </div>
    );
}

export default EventList;
