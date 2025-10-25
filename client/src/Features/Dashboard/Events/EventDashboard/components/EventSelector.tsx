// Features/Dashboard/Events/EventDashboard/components/EventSelector.tsx
import React from 'react';
import { TEvent } from '@/types';

interface EventSelectorProps {
    events: TEvent[];
    selectedEventId: number | null;
    onEventSelect: (eventId: number) => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({
    events,
    selectedEventId,
    onEventSelect
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-4">Event Management</h3>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Event for Detailed Analytics
                </label>
                {events.length > 0 ? (
                    <select
                        value={selectedEventId || ''}
                        onChange={(e) => onEventSelect(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2344] focus:border-transparent"
                    >
                        <option value="" disabled>Choose an event...</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title} • {new Date(event.start_date).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <p className="text-gray-500">No events available</p>
                        <p className="text-sm text-gray-400 mt-1">Create your first event to see analytics</p>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3">
                <button className="flex-1 bg-[#0E2344] text-white py-2 px-4 rounded-lg hover:bg-[#1a3358] transition-colors text-sm font-medium">
                    Create New Event
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    View All Events
                </button>
            </div>
        </div>
    );
};

export default EventSelector;
