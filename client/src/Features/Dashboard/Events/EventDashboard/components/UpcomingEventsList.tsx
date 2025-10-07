import React from 'react';
import { UpcomingEvent } from '@/types'; // Adjusted import path

interface UpcomingEventsListProps {
    events: UpcomingEvent[];
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({ events }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
        {events.length === 0 ? (
            <p className="text-gray-400">No upcoming events.</p>
        ) : (
            <ul className="space-y-4">
                {events.map(event => (
                    <li key={event.id} className="border-b pb-4">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-500">Start: {event.start_date}</p>
                        <p className="text-sm">Registrations: {event.registrations}</p>
                        <p className="text-sm text-green-600">Revenue: ${event.revenue}</p>
                        <p className="text-sm text-purple-600">Checked-In: {event.checked_in}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default UpcomingEventsList;
