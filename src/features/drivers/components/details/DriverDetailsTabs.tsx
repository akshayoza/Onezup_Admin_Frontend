export type DriverDetailsTab =
  | "profile"
  | "vehicle"
  | "documents"
  | "payments"
  | "rides"
  | "complaints";

const TABS: { id: DriverDetailsTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "vehicle", label: "Vehicle Details" },
  { id: "documents", label: "Documents" },
  { id: "payments", label: "Payments" },
  { id: "rides", label: "Rides" },
  { id: "complaints", label: "Complaints" },
];

interface DriverDetailsTabsProps {
  activeTab: DriverDetailsTab;
  onTabChange: (tab: DriverDetailsTab) => void;
}

const DriverDetailsTabs = ({
  activeTab,
  onTabChange,
}: DriverDetailsTabsProps) => (
  <nav
    aria-label="Driver detail sections"
    className="flex gap-5 overflow-x-auto border-b border-border sm:gap-8"
  >
    {TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onTabChange(tab.id)}
        aria-current={activeTab === tab.id ? "page" : undefined}
        className={`shrink-0 cursor-pointer border-b-2 px-1 py-3 text-sm font-medium transition-colors sm:text-base ${
          activeTab === tab.id
            ? "border-brand-primary text-brand-primary"
            : "border-transparent text-text-secondary hover:text-text-primary"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export default DriverDetailsTabs;
