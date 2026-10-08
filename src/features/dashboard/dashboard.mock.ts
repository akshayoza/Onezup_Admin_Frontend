import type { DashboardData } from "./dashboard.types";

export const MOCK_DASHBOARD_DATA: DashboardData = {
  stats: {
    availableDrivers: 5,
    unavailableDrivers: 6,
    activeRides: 6,
    totalPassengers: 1842,
    totalRevenue: 12483,
    totalRides: 47,
    totalDrivers: 234,
  },

  performance: {
    completedRides: 156,
    cancelledRides: 8,
    averageRating: 4.8,
    peakHours: "8-10 AM",
  },
};
