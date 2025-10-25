
import { RevenueTrend, RegistrationTrend } from '@/types';

export const formatRevenueChartData = (revenueTrends: RevenueTrend[]) => {
  return {
    labels: revenueTrends.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue',
        data: revenueTrends.map(item => item.revenue),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
      },
      {
        label: 'Tickets Sold',
        data: revenueTrends.map(item => item.tickets_sold),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y1',
      },
    ],
  };
};

export const formatRegistrationChartData = (registrationTrends: RegistrationTrend[]) => {
  return {
    labels: registrationTrends.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Registrations',
        data: registrationTrends.map(item => item.registrations),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
      },
      {
        label: 'Check-ins',
        data: registrationTrends.map(item => item.checkins),
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
      },
    ],
  };
};
