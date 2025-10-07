import api from '@/lib/axios';
import { DashboardData } from '@/types';



export class DashboardService {
    async fetchDashboard(): Promise<DashboardData> {
        const response = await api.get<DashboardData>(`api/dashboard`);
        return response.data;
    }

    async updateCustomMetrics(eventId: number, metrics: Record<string, any>): Promise<void> {
        await api.post(`api/events/${eventId}/custom-metrics`, { custom_analytics: metrics });
    }
}

export const dashboardService = new DashboardService();
