import { MOCK_DASHBOARD_DATA } from "./dashboard.mock";
import type { DashboardData } from "./dashboard.types";

export const getDashboardData = async (): Promise<DashboardData> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return MOCK_DASHBOARD_DATA;
};
