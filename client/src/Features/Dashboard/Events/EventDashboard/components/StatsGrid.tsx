import React from 'react';
import StatCard from './StatCard';
import {
  FiUsers,
  FiClipboard,
  FiDollarSign,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
  FiPercent,
  FiMessageSquare
} from 'react-icons/fi';
import { DashboardData } from '@/types';

interface StatsGridProps {
    stats: DashboardData['stats'];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {


    const statCards = [
        {
            icon: FiClipboard,
            title: "Active Events",
            value: stats.active_events.toString(),
            color: "blue" as const,
            description: "Currently running events"
        },
        {
            icon: FiUsers,
            title: "Total Registrations",
            value: stats.total_registrations.toLocaleString(),
            color: "green" as const,
            description: "All-time registrations"
        },
        {
            icon: FiDollarSign,
            title: "Total Revenue",
            value: `$${stats.total_revenue.toLocaleString()}`,
            color: "yellow" as const,
            description: "Gross revenue"
        },
        {
            icon: FiCheckCircle,
            title: "Checked-In",
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
    );
};

export default StatsGrid;
