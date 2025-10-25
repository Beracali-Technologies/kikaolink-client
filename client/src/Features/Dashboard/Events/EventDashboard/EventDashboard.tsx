
import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatsGrid from './components/StatsGrid';
import AnalyticsSection from './components/AnalyticsSection';
import EventSelector from './components/EventSelector';
import { dashboardService } from '@/services/dashboardService';
import { getEvents } from '@/services/eventService';
import { DashboardData, TEvent } from '@/types';

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
            const eventData = response.data.data || response.data;
            if (Array.isArray(eventData)) {
                setEvents(eventData);
            } else {
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

    if (loading) return <DashboardLoading />;
    if (error) return <DashboardError error={error} />;

    const stats = data?.stats || {
        active_events: 0,
        total_registrations: 0,
        total_revenue: 0,
        checked_in_attendees: 0,
        custom: {}
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <DashboardHeader />

                <StatsGrid stats={stats} />

                <AnalyticsSection
                    stats={stats}
                    selectedEventId={selectedEventId}
                    onCustomUpdate={handleCustomUpdate}
                />

                <EventSelector
                    events={events}
                    selectedEventId={selectedEventId}
                    onEventSelect={handleEventSelect}
                />

            </div>
        </div>
    );
};

// Loading Component
const DashboardLoading: React.FC = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0E2344] mx-auto"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700">Loading dashboard...</p>
        </div>
    </div>
);

// Error Component
const DashboardError: React.FC<{ error: string }> = ({ error }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Dashboard</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="bg-[#0E2344] text-white px-6 py-2 rounded-lg hover:bg-[#1a3358] transition-colors"
            >
                Try Again
            </button>
        </div>
    </div>
);

export default EventDashboard;
