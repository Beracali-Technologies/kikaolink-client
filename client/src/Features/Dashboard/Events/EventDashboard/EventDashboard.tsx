import React, { useState, useEffect } from 'react';
import StatCard from './components/StatCard';
import UpcomingEventsList from './components/UpcomingEventsList';
import AnalyticsChart from './components/AnalyticsChart';
import CustomMetricsPanel from './components/CustomMetricsPanel';
import { FiUsers, FiClipboard, FiDollarSign, FiCheckCircle, FiClock, FiTrendingUp, FiPercent } from 'react-icons/fi';
import { dashboardService } from '@/services/dashboardService';
import { getEvents } from '@/services/eventService';
import { DashboardData, TEvent } from '@/types'; // Removed unused UpcomingEvent

const EventDashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [events, setEvents] = useState<TEvent[]>([]);

    useEffect(() => {
        loadDashboard();
        loadEvents();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await dashboardService.fetchDashboard();
            console.log('Dashboard data:', response);
            setData(response);
        } catch (error: any) {
            console.error('Dashboard load error:', error);
            setError(error.response?.status === 401 ? 'Please log in to view the dashboard.' : 'Failed to load dashboard.');
        } finally {
            setLoading(false);
        }
    };

    const loadEvents = async () => {
        try {
            const response = await getEvents();
            console.log('Events data (raw response):', response);
            console.log('Events data (data property):', response.data);
            const eventData = response.data.data || response.data;
            if (Array.isArray(eventData)) {
                setEvents(eventData);
            } else {
                console.warn('Unexpected data format:', eventData);
                setEvents([]);
            }
        } catch (error) {
            console.error('Events load error:', error);
            setEvents([]);
        }
    };

    const handleCustomUpdate = () => {
        loadDashboard();
    };

    const handleEventSelect = (eventId: number) => {
        setSelectedEventId(eventId);
    };

    if (loading) return <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">Loading dashboard...</div>;
    if (error) return <div className="p-6 text-red-600 text-lg font-medium">{error}</div>;

    const stats = data?.stats || { active_events: 0, total_registrations: 0, total_revenue: 0, checked_in_attendees: 0, custom: {} };
    const upcomingEvents = data?.upcoming_events || [];

    const totalAttendees = stats.total_registrations;
    const eventDurationDays = (data?.upcoming_events?.reduce((total, event) => {
        if (event.start_date) {
            const diffDays = 1; // Default duration (adjust if end_date logic is added later)
            return total + diffDays;
        }
        return total;
    }, 0) || 0) / (upcomingEvents.length || 1) || 0; // Added fallback for reduce result
    const averageRevenuePerEvent = stats.active_events > 0 ? stats.total_revenue / stats.active_events : 0;
    const checkInPercentage = stats.total_registrations > 0 ? (stats.checked_in_attendees / stats.total_registrations) * 100 : 0;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Real-time insights for your events.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard icon={FiClipboard} title="Active Events" value={stats.active_events.toString()} color="blue" />
                    <StatCard icon={FiUsers} title="Total Registrations" value={stats.total_registrations.toString()} color="green" />
                    <StatCard icon={FiDollarSign} title="Total Revenue" value={`$${stats.total_revenue.toFixed(2)}`} color="yellow" />
                    <StatCard icon={FiCheckCircle} title="Checked-In Attendees" value={stats.checked_in_attendees.toString()} color="purple" />
                    <StatCard icon={FiUsers} title="Total Attendees" value={totalAttendees.toString()} color="teal" />
                    <StatCard icon={FiClock} title="Avg. Event Duration (Days)" value={eventDurationDays.toFixed(1)} color="indigo" />
                    <StatCard icon={FiTrendingUp} title="Avg. Revenue/Event" value={`$${averageRevenuePerEvent.toFixed(2)}`} color="orange" />
                    <StatCard icon={FiPercent} title="Check-In %" value={`${checkInPercentage.toFixed(1)}%`} color="pink" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    <AnalyticsChart stats={stats} />

                    {selectedEventId && (
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <CustomMetricsPanel eventId={selectedEventId} onUpdate={handleCustomUpdate} />
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-4">Select Event for Custom Metrics</h3>
                    {events.length > 0 ? (
                        <select
                            value={selectedEventId || ''}
                            onChange={(e) => handleEventSelect(Number(e.target.value))}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        >
                            <option value="" disabled>Select an event</option>
                            {events.map((event) => (
                                <option key={event.id} value={event.id} className="text-sm sm:text-base">
                                    {event.title} (Starts: {new Date(event.start_date).toLocaleDateString()})
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-gray-500 text-sm sm:text-base">No events available. Check data: {JSON.stringify(events)}</p>
                    )}
                    <UpcomingEventsList events={upcomingEvents} />
                </div>
            </div>
        </div>
    );
};

export default EventDashboard;
