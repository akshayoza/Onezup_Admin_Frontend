import { useQuery } from "@tanstack/react-query";

import { getDashboardData } from "../dashboard.api";
import type { DashboardData } from "../dashboard.types";

interface UseDashboardResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDashboard = (): UseDashboardResult => {
  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  return {
    data: dashboardQuery.data ?? null,
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error ? "Unable to load dashboard data. Please try again." : null,
    refetch: async () => {
      await dashboardQuery.refetch();
    },
  };
};
