import DashboardLayout from "../../layouts/DashboardLayout";
import ReportsAnalyticsView from "../../features/reports-analytics/ReportsAnalyticsView";

export default function ReportsAnalyticsPage() {
  return (
    <DashboardLayout>
      <main className="min-w-0 px-4 pb-5 sm:px-5 lg:px-6">
        <ReportsAnalyticsView />
      </main>
    </DashboardLayout>
  );
}
