import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEventStore } from '../../../lib/stores/eventStore'; // <-- New path
import NoEventState from '../Components/NoEventState/NoEventState';
import { FiSearch, FiPlus, FiLoader } from 'react-icons/fi';

const EventList: React.FC = () => {
    const { events, isLoading, fetchEvents, error } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, []); // Removed fetchEvents from dependency array

    return (
        <div className="p-4 sm:p-6 md:p-8"> {/* ADDED PADDING FOR COMFORT */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input type="text" placeholder="Search event..." className="border rounded-md pl-10 pr-4 py-2" />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <Link to="/dashboard/events/create" className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700">
                            <FiPlus /> <span>Create Event</span>
                        </Link>
                    </div>
                </div>

                {/* Render based on state */}
                {isLoading && <div className="text-center p-10"><FiLoader className="animate-spin text-4xl mx-auto" /></div>}
                {error && <div className="text-center p-10 bg-red-100 text-red-700 rounded-lg">{error}</div>}
                {!isLoading && !error && events.length === 0 && <NoEventState />}
                {!isLoading && !error && events.length > 0 && (
                     <div className="bg-white rounded-lg shadow-sm border">
                        <ul className="divide-y divide-gray-200">
                            {events.map((event: any) => ( // Use any for now, define TEvent later
                                <li key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                    <span className="font-semibold text-gray-800">{event.title}</span>
                                    <Link to={`/dashboard/events/${event.id}/info`} className="text-sm font-medium text-blue-600 hover:underline">Manage</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
export default EventList;
