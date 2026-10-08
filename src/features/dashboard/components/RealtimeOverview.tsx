import type { DashboardStats } from "../dashboard.types";

interface RealtimeOverviewProps {
  stats: DashboardStats;
}

const RealtimeOverview = ({ stats }: RealtimeOverviewProps) => {
  return (
    <section className="rounded-xl border border-text-primary bg-surface p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-dashboard-green" />

        <span className="text-sm text-text-secondary">Real-time updates</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-info bg-surface p-5">
          <p className="text-base font-medium text-text-primary">
            Available Driver
          </p>

          <p className="mt-1 text-3xl font-bold text-text-primary">
            {stats.availableDrivers}
          </p>
        </div>

        <div className="rounded-xl border border-text-primary bg-surface p-5">
          <p className="text-base font-medium text-text-primary">
            Not Available Driver
          </p>

          <p className="mt-1 text-3xl font-bold text-text-primary">
            {stats.unavailableDrivers}
          </p>
        </div>

        <div className="rounded-xl border border-text-primary bg-surface p-5">
          <p className="text-base font-medium text-text-primary">
            Active Rides
          </p>

          <p className="mt-1 text-3xl font-bold text-text-primary">
            {stats.activeRides}
          </p>
        </div>
      </div>

      <div className="mt-4 min-h-[520px] overflow-hidden rounded-xl bg-page-background">
        <div className="flex h-full min-h-[520px] items-center justify-center">
          <div className="text-center">
            <p className="text-base font-semibold text-text-primary">
              Live Map
            </p>

            <p className="mt-2 text-sm text-text-muted">
              Map integration will be connected here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealtimeOverview;
