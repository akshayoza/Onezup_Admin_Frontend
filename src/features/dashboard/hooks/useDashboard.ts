import { useCallback, useEffect, useState } from "react";

import { getDashboardData } from "../dashboard.api";
import type { DashboardData } from "../dashboard.types";

interface UseDashboardResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardResult => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const dashboardData = await getDashboardData();

      setData(dashboardData);
    } catch {
      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
};