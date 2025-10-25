import React, { useState, useEffect } from 'react';
import StatCard from './components/StatCard';
import RealCharts from './components/RealCharts/RealCharts';

import CustomMetricsPanel from './components/CustomMetricsPanel';
import {
  FiUsers,
  FiClipboard,
  FiDollarSign,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
  FiPercent,
  FiMessageSquare,
  FiRefreshCw
} from 'react-icons/fi';
import { dashboardService } from '@/services/dashboard/dashboardService';
import { getEvents } from '@/services/eventService';
import { DashboardData, TEvent } from '@/types';

const EventDashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [events, setEvents] = useState<TEvent[]>([]);
    const [refreshing, setRefreshing] = useState(false);

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
            setRefreshing(false);
        }
    };

    const loadEvents = async () => {
        try {
            const response = await getEvents();
            console.log('Events data:', response);

            // Filter for LIVE events only, or use all events
              const allEvents = response.data;
              const liveEvents = allEvents.filter(event => event.status === 'LIVE');

              setEvents(liveEvents.length > 0 ? liveEvents : allEvents);
        } catch (error) {
            console.error('Events load error:', error);
            setEvents([]);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadDashboard();
        await loadEvents();
    };

    const handleCustomUpdate = () => {
        loadDashboard();
    };

    const handleEventSelect = (eventId: number) => {
        setSelectedEventId(eventId);
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0E2344] mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading dashboard...</p>
                    <p className="text-sm text-gray-500 mt-2">Fetching real-time analytics</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Dashboard</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="bg-[#0E2344] text-white px-6 py-2 rounded-lg hover:bg-[#1a3358] transition-colors flex items-center gap-2 mx-auto"
                    >
                        <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Default stats if no data
    const stats = data?.stats || {
        active_events: 0,
        total_registrations: 0,
        total_revenue: 0,
        checked_in_attendees: 0,
        attendance_rate: 0,
        average_revenue_per_event: 0,
        sms_sent: 0,
        sms_pending: 0
    };

    const upcomingEvents = data?.upcoming_events || [];
    const trends = data?.trends || {
        revenue: [],
        registrations: [],
        sms_activity: {}
    };

    const statCards = [
        {
            icon: FiClipboard,
            title: "Active Events",
            value: stats.active_events.toString(),
            color: "blue" as const,
            description: "Live events"
        },
        {
            icon: FiUsers,
            title: "Total Registrations",
            value: stats.total_registrations.toLocaleString(),
            color: "green" as const,
            description: "All registrtions"
        },
        {
            icon: FiDollarSign,
            title: "Total Revenue",
            value: `$${stats.total_revenue.toLocaleString()}`,
            color: "yellow" as const,
            description: "Total revenue"
        },
        {
            icon: FiCheckCircle,
            title: "Checked In",
            value: stats.checked_in_attendees.toLocaleString(),
            color: "purple" as const,
            description: "Attendees checked in"
        },
        {
            icon: FiPercent,
            title: "Attendance Rate",
            value: `${stats.attendance_rate.toFixed(1)}%`,
            color: "teal" as const,
            description: "Check-in success rate"
        },
        {
            icon: FiTrendingUp,
            title: "Avg Revenue/Event",
            value: `$${stats.average_revenue_per_event.toLocaleString()}`,
            color: "orange" as const,
            description: "Per event average"
        },
        {
            icon: FiMessageSquare,
            title: "SMS Sent",
            value: stats.sms_sent.toLocaleString(),
            color: "indigo" as const,
            description: "Messages delivered"
        },
        {
            icon: FiCalendar,
            title: "SMS Pending",
            value: stats.sms_pending.toString(),
            color: "red" as const,
            description: "Messages in queue"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Event Dashboard</h1>
                        <p className="text-gray-600 mt-2">
                            Real-time analytics and insights for your events
                        </p>
                        {data?.real_time_updated && (
                            <p className="text-sm text-gray-500 mt-1">
                                Last updated: {new Date(data.real_time_updated).toLocaleString()}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card, index) => (
                        <StatCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            value={card.value}
                            color={card.color}
                            description={card.description}
                        />
                    ))}
                </div>

                {/* Analytics Charts */}
                <div className="mb-12">
                    <RealCharts
                        revenueData={trends.revenue}
                        registrationData={trends.registrations}
                        smsData={trends.sms_activity}
                    />
                </div>

                {/* Event Selection for Custom Metrics */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Event Custom Metrics
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Event for Custom Metrics
                            </label>
                            <select
                                value={selectedEventId || ''}
                                onChange={(e) => handleEventSelect(Number(e.target.value))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Choose an event...</option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {event.title} - {new Date(event.start_date).toLocaleDateString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {events.length === 0 && (
                            <p className="text-sm text-gray-500">
                                No events available. Create events to see custom metrics.
                            </p>
                        )}
                    </div>
                </div>

                {/* Custom Metrics Panel */}
                {selectedEventId && (
                    <div className="mb-8">
                        <CustomMetricsPanel
                            eventId={selectedEventId}
                            onUpdate={handleCustomUpdate}
                        />
                    </div>
                )}


            </div>
        </div>
    );
};

export default EventDashboard;
