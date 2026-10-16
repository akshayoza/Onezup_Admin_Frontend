import type { ReportTab } from "../reports.types";

export default function BreakdownDonut({
  activeTab,
}: {
  activeTab: ReportTab;
}) {
  const operational = activeTab === "operational";
  const title = operational ? "Ride Status Breakdown" : "Payment Methods";
  const primaryLabel = operational ? "Completed" : "UPI / Wallet";
  const secondaryLabel = operational ? "Driver Cancelled" : "Credit/Debit Card";

  return (
    <section
      className="min-w-0 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6"
      aria-label={title}
    >
      <h2 className="text-sm font-medium text-[#22252B] sm:text-base">
        {title}
      </h2>

      <div className="mx-auto my-6 flex aspect-square w-full max-w-[230px] items-center justify-center">
        <div
          className="relative h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(#1F9686 0deg 220deg, #C9CDD3 220deg 288deg, #EEF1F5 288deg 360deg)",
          }}
          role="img"
          aria-label={`${primaryLabel} 94 percent, ${secondaryLabel} 4 percent`}
        >
          <div className="absolute inset-[18%] rounded-full bg-white" />
        </div>
      </div>

      <div className="space-y-2 px-1 sm:px-3">
        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-[#858585]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1F9686]" />
            {primaryLabel}
          </span>

          <strong className="font-medium text-black">94 %</strong>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-[#858585]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C9CDD3]" />
            {secondaryLabel}
          </span>

          <strong className="font-medium text-black">4 %</strong>
        </div>
      </div>
    </section>
  );
}
