import type { ReportMetric } from "./reports.types";

export const OPERATIONAL_METRICS: ReportMetric[] = [
  { id: "rides", title: "Total Rides", value: "24,592", comparison: "+12.5% from last month", featured: true },
  { id: "drivers", title: "Active Drivers", value: "1,248", comparison: "+4.2% new onboardings" },
  { id: "wait", title: "Avg. Wait Time", value: "3m 42s", comparison: "−0.5% faster pickups" },
  { id: "completion", title: "Completion Rate", value: "94.8%", comparison: "+1.2% reliability" },
];

export const FINANCIAL_METRICS: ReportMetric[] = [
  { id: "revenue", title: "Total Revenue", value: "₹ 48,24,590", comparison: "+12.5% Vs last month", featured: true },
  { id: "profit", title: "Platform Profit", value: "₹ 9,64,920", comparison: "+4.2% margin growth" },
  { id: "payouts", title: "Driver payouts", value: "₹ 34,10,200", comparison: "+12.1% disbursed" },
  { id: "refunds", title: "Refund Processed", value: "₹ 12,450", comparison: "−2.3% less disputes" },
];
