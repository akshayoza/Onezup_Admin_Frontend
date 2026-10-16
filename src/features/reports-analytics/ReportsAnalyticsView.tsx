import { useState } from "react";
import { FINANCIAL_METRICS, OPERATIONAL_METRICS } from "./reports.constants";
import type { ReportTab } from "./reports.types";
import BreakdownDonut from "./components/BreakdownDonut";
import MetricCard from "./components/MetricCard";
import RecentRideLogs from "./components/RecentRideLogs";
import RecentTransactions from "./components/RecentTransactions";
import ReportTabs from "./components/ReportTabs";
import ReportTrendChart from "./components/ReportTrendChart";

export default function ReportsAnalyticsView() {
  const [activeTab, setActiveTab] = useState<ReportTab>("operational");
  const metrics =
    activeTab === "operational" ? OPERATIONAL_METRICS : FINANCIAL_METRICS;
  return (
    <div className="min-w-0 space-y-4">
      <ReportTabs activeTab={activeTab} onChange={setActiveTab} />
      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 "
        aria-label="Report summary metrics"
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>
      <section className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.75fr)]">
        <ReportTrendChart activeTab={activeTab} />
        <BreakdownDonut activeTab={activeTab} />
      </section>
      {activeTab === "operational" ? (
        <RecentRideLogs />
      ) : (
        <RecentTransactions />
      )}
    </div>
  );
}
