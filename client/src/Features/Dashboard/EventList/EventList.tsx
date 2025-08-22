import React, { useEffect, useState, useMemo } from 'react';
import { useEventStore } from '../../../lib/stores/eventStore';

// --- IMPORT THE NEW SUBCOMPONENTS ---
import EventListHeader from './components/EventListHeader';
import EventTable from './components/EventTable';
import NoEventState from '../Components/NoEventState/NoEventState';
import { FiLoader } from 'react-icons/fi';

const EventList: React.FC = () => {
    // --- 1. STATE MANAGEMENT ---
    // Get the master list of events and loading state from the global store
    const { events, isLoading, error, fetchEvents } = useEventStore();
    // Create local state to hold the user's search input
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch the full event list only once when the page loads
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // --- 2. REAL-TIME FILTERING LOGIC ---
    // This `useMemo` hook will re-filter the events ONLY when the master list or the search term changes.
    // This is highly performant.
    const filteredEvents = useMemo(() => {
        // If there's no search term, return the full list.
        if (!searchTerm.trim()) {
            return events;
        }
        // Otherwise, filter the list based on the event title (case-insensitive)
        return events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]); // Dependencies array


    // --- 3. RENDER LOGIC ---
    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-12"><FiLoader className="animate-spin text-4xl mx-auto text-blue-500" /></div>;
        }
        if (error) {
            return <div className="text-center p-12 bg-red-100 text-red-700 rounded-lg">{error}</div>;
        }
        if (events.length === 0) {
            return <NoEventState />;
        }
        if (filteredEvents.length === 0) {
             return <div className="text-center p-12 bg-gray-50 rounded-lg">
                        <h3 className="font-bold">No events found for "{searchTerm}"</h3>
                        <p className="text-gray-500">Try a different search term.</p>
                    </div>;
        }
        // Pass the *filtered* list to the table component
        return <EventTable events={filteredEvents} />;
    };

    return (
        <div className="space-y-8">
            {/* The Header component receives the state and the function to update it */}
            <EventListHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* The main content area renders based on our logic */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default EventList;
