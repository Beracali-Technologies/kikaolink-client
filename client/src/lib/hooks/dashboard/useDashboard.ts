// hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard/dashboardService';
import { DashboardData, ComprehensiveAnalytics, EventAnalytics } from '@/types';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.fetchDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const refresh = () => {
    fetchDashboard();
  };

  return {
    dashboardData,
    loading,
    error,
    refresh
  };
};

export const useComprehensiveAnalytics = (timeframe: string = '30days') => {
  const [analytics, setAnalytics] = useState<ComprehensiveAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async (timeframeParam: string = timeframe) => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.fetchComprehensiveAnalytics(timeframeParam);
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  return {
    analytics,
    loading,
    error,
    refresh: fetchAnalytics
  };
};

export const useEventAnalytics = (eventId: number) => {
  const [analytics, setAnalytics] = useState<EventAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.fetchEventAnalytics(eventId);
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchAnalytics();
    }
  }, [eventId]);

  return {
    analytics,
    loading,
    error,
    refresh: fetchAnalytics
  };
};
