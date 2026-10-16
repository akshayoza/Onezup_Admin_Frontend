import type { ReportTab } from "../reports.types";

interface ReportTabsProps {
  activeTab: ReportTab;
  onChange: (tab: ReportTab) => void;
}

export default function ReportTabs({ activeTab, onChange }: ReportTabsProps) {
  const tabs: { id: ReportTab; label: string }[] = [
    { id: "operational", label: "Operational Report" },
    { id: "financial", label: "Financial Reports" },
  ];

  return (
    <div
      className="flex min-h-10 items-end gap-7 border-b border-[#E5E7EB] px-1"
      role="tablist"
      aria-label="Report type"
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`-mb-px border-b-2 px-1 pb-2 text-sm font-medium transition-colors cursor-pointer ${active ? "border-[#2925A5] text-[#2925A5]" : "border-transparent text-[#555B66] hover:text-[#2925A5]"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
