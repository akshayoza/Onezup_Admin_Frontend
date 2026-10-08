import type { DashboardPerformance } from "../dashboard.types";

interface PerformanceCardProps {
  performance: DashboardPerformance;
}

const PerformanceCard = ({ performance }: PerformanceCardProps) => {
  return (
    <section className="rounded-xl bg-surface-muted p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-text-primary">
          Today's Performance
        </h2>

        <span className="text-sm font-medium text-info">Overall</span>
      </div>

      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-text-primary">Completed Rides</span>

          <span className="text-base font-bold text-text-primary">
            {performance.completedRides}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-text-primary">Cancelled Rides</span>

          <span className="text-base font-bold text-text-primary">
            {performance.cancelledRides}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-text-primary">Average Rating</span>

          <span className="text-base font-bold text-text-primary">
            {performance.averageRating}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-text-primary">Peak Hours</span>

          <span className="text-base font-bold text-text-primary">
            {performance.peakHours}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PerformanceCard;
