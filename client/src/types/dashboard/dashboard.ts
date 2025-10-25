export interface DashboardData {
  stats: {
    active_events: number;
    total_registrations: number;
    total_revenue: number;
    checked_in_attendees: number;
    attendance_rate: number;
    average_revenue_per_event: number;
    sms_sent: number;
    sms_pending: number;
  };
  trends: {
    revenue: RevenueTrend[];
    registrations: RegistrationTrend[];
    sms_activity: Record<string, number>;
  };
  upcoming_events: UpcomingEvent[];
  real_time_updated: string;
}

export interface RevenueTrend {
  date: string;
  revenue: number;
  tickets_sold: number;
}

export interface RegistrationTrend {
  date: string;
  registrations: number;
  checkins: number;
}

export interface UpcomingEvent {
  id: number;
  title: string;
  start_date: string;
  registrations: number;
  revenue: number;
  checked_in: number;
  attendance_rate: number;
}

export interface ComprehensiveAnalytics {
  overview: {
    total_events: number;
    upcoming_events: number;
    ongoing_events: number;
    completed_events: number;
  };
  performance_metrics: {
    total_attendees: number;
    checked_in_attendees: number;
    overall_attendance_rate: number;
    average_attendance_per_event: number;
    average_revenue_per_event: number;
    most_popular_event: string;
  };
  attendee_insights: {
    attendees_with_company_info: number;
    top_companies: TopCompany[];
    registration_trends: RegistrationSource[];
    unique_companies: number;
  };
  revenue_analytics: {
    total_revenue: number;
    total_tickets_sold: number;
    average_ticket_price: number;
    revenue_trend: RevenueTrend[];
    timeframe: string;
  };
  timeframe: string;
  generated_at: string;
}

export interface TopCompany {
  company_name: string;
  attendee_count: number;
}

export interface RegistrationSource {
  date: string;
  registrations: number;
}

export interface EventAnalytics {
  event: UpcomingEvent;
  analytics: {
    total_registrations: number;
    checked_in_attendees: number;
    total_revenue: number;
    attendance_rate: number;
    average_revenue_per_event: number;
  };
  revenue_breakdown: RevenueBreakdown[];
  registration_timeline: RegistrationTimeline[];
  last_updated: string;
}

export interface RevenueBreakdown {
  ticket_type: string;
  revenue: number;
  tickets_sold: number;
}

export interface RegistrationTimeline {
  date: string;
  registrations: number;
}
