// services/dashboardService.ts
import api from '@/lib/axios';
import {
  DashboardData,
  ComprehensiveAnalytics,
  EventAnalytics
} from '@/types';

export class DashboardService {
  async fetchDashboard(): Promise<DashboardData> {
    const response = await api.get<DashboardData>('/api/dashboard');
    console.log('📊 Dashboard API Response:', response.data);
    return response.data;
  }

  async fetchComprehensiveAnalytics(timeframe: string = '30days'): Promise<ComprehensiveAnalytics> {
    const response = await api.get<ComprehensiveAnalytics>('/api/dashboard/analytics/comprehensive', {
      params: { timeframe }
    });
    console.log('📈 Comprehensive Analytics Response:', response.data);
    return response.data;
  }

  async fetchEventAnalytics(eventId: number): Promise<EventAnalytics> {
    const response = await api.get<EventAnalytics>(`/api/events/${eventId}/analytics`);
    return response.data;
  }

  async updateCustomMetrics(eventId: number, metrics: Record<string, any>): Promise<void> {
    await api.post(`/api/events/${eventId}/custom-metrics`, {
      custom_metrics: metrics
    });
  }
}

export const dashboardService = new DashboardService();
