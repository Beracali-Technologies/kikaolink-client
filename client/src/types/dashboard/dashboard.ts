export interface DashboardStats {
    active_events: number;
    total_registrations: number;
    total_revenue: number;
    checked_in_attendees: number;
    custom: Record<string, number>;
}

export interface UpcomingEvent {
    id: number;
    title: string;
    start_date: string;
    registrations: number;
    revenue: number;
    checked_in: number;
}

export interface DashboardData {
    stats: DashboardStats;
    upcoming_events: UpcomingEvent[];
}
