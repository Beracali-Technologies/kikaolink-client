
import { RevenueTrend, RegistrationTrend } from '@/types';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export interface RevenueChartProps {
  data: RevenueTrend[];
}

export interface RegistrationChartProps {
  data: RegistrationTrend[];
}

export interface SMSActivityProps {
  data: Record<string, number>;
}
