import React from 'react';
import StatCard from './StatCard';
import { FiUsers, FiClipboard, FiDollarSign, FiCheckCircle, FiClock, FiTrendingUp, FiPercent, FiCalendar } from 'react-icons/fi';
import { DashboardStats } from '@/types';

interface StatsGridProps {
    stats: DashboardStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
    const hasData = stats.active_events > 0 || stats.total_registrations > 0;

    const totalAttendees = stats.total_registrations;
    const averageRevenuePerEvent = stats.active_events > 0 ? stats.total_revenue / stats.active_events : 0;
    const checkInPercentage = stats.total_registrations > 0 ? (stats.checked_in_attendees / stats.total_registrations) * 100 : 0;

    const statCards = [
        {
            icon: FiClipboard,
            title: "Active Events",
            value: hasData ? stats.active_events.toString() : "0",
            color: "blue" as const,
            trend: hasData ? "+12%" : "0%",
            description: hasData ? "Currently running events" : "No active events"
        },
        {
            icon: FiUsers,
            title: "Total Registrations",
            value: hasData ? stats.total_registrations.toLocaleString() : "0",
            color: "green" as const,
            trend: hasData ? "+8%" : "0%",
            description: hasData ? "All-time registrations" : "No registrations yet"
        },
        {
            icon: FiDollarSign,
            title: "Total Revenue",
            value: hasData ? `$${stats.total_revenue.toLocaleString()}` : "$0",
            color: "yellow" as const,
            trend: hasData ? "+15%" : "0%",
            description: hasData ? "Gross revenue" : "No revenue data"
        },
        {
            icon: FiCheckCircle,
            title: "Checked-In",
            value: hasData ? stats.checked_in_attendees.toLocaleString() : "0",
            color: "purple" as const,
            trend: hasData ? "+5%" : "0%",
            description: hasData ? "Attendees checked in" : "No check-ins yet"
        },
        {
            icon: FiCalendar,
            title: "Total Attendees",
            value: hasData ? totalAttendees.toLocaleString() : "0",
            color: "teal" as const,
            trend: hasData ? "+10%" : "0%",
            description: hasData ? "All attendees" : "No attendees yet"
        },
        {
            icon: FiClock,
            title: "Avg. Duration",
            value: hasData ? "2.5 days" : "--",
            color: "indigo" as const,
            trend: hasData ? "±0%" : "--",
            description: hasData ? "Average event length" : "No duration data"
        },
        {
            icon: FiTrendingUp,
            title: "Avg. Revenue",
            value: hasData ? `$${averageRevenuePerEvent.toFixed(0)}` : "$0",
            color: "orange" as const,
            trend: hasData ? "+7%" : "0%",
            description: hasData ? "Per event" : "No revenue data"
        },
        {
            icon: FiPercent,
            title: "Check-In Rate",
            value: hasData ? `${checkInPercentage.toFixed(1)}%` : "0%",
            color: "red" as const,
            trend: hasData ? "+3%" : "0%",
            description: hasData ? "Registration conversion" : "No check-ins yet"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((card, index) => (
                <StatCard
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    value={card.value}
                    color={card.color}
                    trend={card.trend}
                    description={card.description}
                />
            ))}
        </div>
    );
};

export default StatsGrid;
