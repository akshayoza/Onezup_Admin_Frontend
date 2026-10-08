import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../features/dashboard/components/DashboardHeader";
import RealtimeOverview from "../../features/dashboard/components/RealtimeOverview";
import SummaryStats from "../../features/dashboard/components/SummaryStats";
import PerformanceCard from "../../features/dashboard/components/PerformanceCard";
import { useDashboard } from "../../features/dashboard/hooks/useDashboard";

const DashboardPage = () => {
  const { data, isLoading, error, refetch } = useDashboard();

  return (
    <DashboardLayout>
      <DashboardHeader />

      {isLoading && (
        <div className="rounded-xl bg-surface p-6">
          <p className="text-sm text-text-secondary">Loading dashboard...</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-surface p-6">
          <p className="text-sm text-error">{error}</p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 cursor-pointer text-sm font-semibold text-brand-primary hover:text-brand-primary-hover"
          >
            Try Again
          </button>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(360px,1fr)]">
          <RealtimeOverview stats={data.stats} />

          <div className="flex flex-col gap-6">
            <SummaryStats stats={data.stats} />

            <PerformanceCard performance={data.performance} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
