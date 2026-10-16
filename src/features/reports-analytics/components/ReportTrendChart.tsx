import { useMemo, useState } from "react";
import type { ReportPeriod, ReportTab } from "../reports.types";

interface ReportTrendChartProps {
  activeTab: ReportTab;
}
const weeklyValues = [
  220, 230, 220, 250, 270, 230, 190, 190, 210, 205, 215, 207, 225, 202, 215,
  195, 205, 200, 195,
];
const monthlyValues = [
  165, 180, 172, 195, 215, 205, 230, 245, 225, 250, 242, 265, 255, 275, 260,
  280, 268, 290, 282,
];
const weekLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

export default function ReportTrendChart({ activeTab }: ReportTrendChartProps) {
  const [period, setPeriod] = useState<ReportPeriod>("weekly");
  const values = period === "weekly" ? weeklyValues : monthlyValues;
  const title =
    activeTab === "operational"
      ? "Ride Volume Overview"
      : "Revenue & Payout Trends";
  const { line, area } = useMemo(() => {
    const left = 42;
    const top = 14;
    const width = 610;
    const height = 232;
    const min = 120;
    const max = 350;
    const points = values.map((value, index) => ({
      x: left + (index / (values.length - 1)) * width,
      y: top + ((max - value) / (max - min)) * height,
    }));
    return {
      line: points.map((point) => `${point.x},${point.y}`).join(" "),
      area: `${left},${top + height} ${points.map((point) => `${point.x},${point.y}`).join(" ")} ${left + width},${top + height}`,
    };
  }, [values]);
  const labels = period === "weekly" ? weekLabels : monthLabels;

  return (
    <section
      className="min-w-0 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6"
      aria-label={title}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-[#22252B] sm:text-base">
          {title}
        </h2>
        <label className="sr-only" htmlFor={`report-period-${activeTab}`}>
          Chart period
        </label>
        <select
          id={`report-period-${activeTab}`}
          value={period}
          onChange={(event) => setPeriod(event.target.value as ReportPeriod)}
          className="rounded-md border border-[#C7C7C7] bg-transparent px-2.5 py-1.5 text-xs text-[#555] outline-none focus:ring-2 focus:ring-[#1F9686]"
        >
          <option value="weekly">Weekly View</option>
          <option value="monthly">Monthly View</option>
        </select>
      </div>
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 680 285"
          role="img"
          aria-label={`${title} line chart`}
          className="h-auto w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id={`trend-fill-${activeTab}`}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#219B8D" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#219B8D" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[350, 280, 210, 160, 120].map((tick) => {
            const y = 14 + ((350 - tick) / (350 - 120)) * 232;
            return (
              <g key={tick}>
                <line
                  x1="42"
                  x2="652"
                  y1={y}
                  y2={y}
                  stroke="#D2D4D8"
                  strokeWidth="1.2"
                />
                <text
                  x="35"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#667080"
                >
                  {tick}
                </text>
              </g>
            );
          })}
          <polygon points={area} fill={`url(#trend-fill-${activeTab})`} />
          <polyline
            points={line}
            fill="none"
            stroke="#159E91"
            strokeWidth="1.7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {labels.map((label, index) => (
            <text
              key={label}
              x={42 + (index / Math.max(labels.length - 1, 1)) * 610}
              y="278"
              textAnchor={
                index === 0
                  ? "start"
                  : index === labels.length - 1
                    ? "end"
                    : "middle"
              }
              fontSize="10"
              fill="#667080"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}
