// Features/Dashboard/Events/EventList/EventList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '@/services/eventService';
import { TEvent } from '@/types';
import EventListHeader from './components/EventListHeader';
import EventTable from './components/EventTable';
import { LoadingSpinner } from '@/components/ui/loading';

const EventList: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<TEvent[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<TEvent[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [events, searchTerm]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getEvents();
            console.log('Events loaded:', response.data);
            setEvents(response.data);
        } catch (error: any) {
            console.error('Failed to load events:', error);
            setError('Failed to load events. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        if (!searchTerm.trim()) {
            setFilteredEvents(events);
            return;
        }

        const filtered = events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleEventSelect = (eventId: number) => {
        // Navigate to event-specific dashboard
        navigate(`/dashboard/events/${eventId}/dashboard`);
    };

    const handleEventManage = (eventId: number) => {
        // Navigate to event settings/info
        navigate(`/dashboard/events/${eventId}/info`);
    };

    if (loading) {
        return (
            <LoadingSpinner
                type="fan"
                size="lg"
                text="Loading Events"
                subText="Fetching your events..."
                fullScreen={true}
            />
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Events</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={loadEvents}
                        className="bg-[#0E2344] text-white px-6 py-2 rounded-lg hover:bg-[#1a3358] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <EventListHeader
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />

                <div className="mt-8">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {events.length === 0 ? 'No Events Yet' : 'No Events Found'}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {events.length === 0
                                    ? 'Get started by creating your first event.'
                                    : 'Try adjusting your search terms.'
                                }
                            </p>
                            {events.length === 0 && (
                                <button
                                    onClick={() => navigate('/dashboard/events/create')}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Your First Event
                                </button>
                            )}
                        </div>
                    ) : (
                        <EventTable
                            events={filteredEvents}
                            onEventSelect={handleEventSelect}
                            onEventManage={handleEventManage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventList;
