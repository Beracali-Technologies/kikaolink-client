import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEventStore } from '../../../lib/stores/eventStore';
import { TEvent } from '../../../types';

import NoEventState from '../Components/NoEventState/NoEventState';
import { FiSearch, FiPlus, FiLoader } from 'react-icons/fi';

const EventList: React.FC = () => {
  // Selecting each value individually to avoid circular dependancy
  const events = useEventStore((state) => state.events);
  const isLoading = useEventStore((state) => state.isLoading);
  const error = useEventStore((state) => state.error);
  const fetchEvents = useEventStore((state) => state.fetchEvents);

    // This hook is correct. It fetches data once when the component mounts.
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // A helper function to guarantee something always renders
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <FiLoader className="animate-spin text-4xl text-blue-600" />
                </div>
            );
        }
        if (error) {
            return (
                <div className="p-8 text-center bg-red-100 text-red-700 rounded-lg">{error}</div>
            );
        }
        if (events.length === 0) {
            return <NoEventState />;
        }
        return (
            <div className="bg-white rounded-lg shadow-sm border">
                <ul className="divide-y divide-gray-200">
                    {events.map((event: TEvent) => (
                        <li key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                            <span className="font-semibold text-gray-800">{event.title}</span>
                            <Link to={`/dashboard/events/${event.id}/info`} className="text-sm font-medium text-blue-600 hover:underline">
                                Manage
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0">
                        <input type="text" placeholder="Search events..." className="w-full border rounded-md pl-10 pr-4 py-2 text-sm" />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <Link to="/dashboard/events/create" className="flex-shrink-0 flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 shadow-sm">
                        <FiPlus />
                        <span>Create Event</span>
                    </Link>
                </div>
            </div>

            <div>{renderContent()}</div>
        </div>
    );
};

export default EventList;
