export interface DashboardStats {
  availableDrivers: number;
  unavailableDrivers: number;
  activeRides: number;
  totalPassengers: number;
  totalRevenue: number;
  totalRides: number;
  totalDrivers: number;
}

export interface DashboardPerformance {
  completedRides: number;
  cancelledRides: number;
  averageRating: number;
  peakHours: string;
}

export interface DashboardTrend {
  value: number;
  label: string;
  direction: "up" | "down";
}

export interface DashboardSummaryCard {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  trend?: DashboardTrend;
}

export interface DashboardData {
  stats: DashboardStats;
  performance: DashboardPerformance;
}
