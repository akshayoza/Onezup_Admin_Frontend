import type { PaymentTab } from "../payments.types";

interface PaymentTabsProps {
  activeTab: PaymentTab;
  onChange: (tab: PaymentTab) => void;
}
const tabs: { label: string; value: PaymentTab }[] = [
  { label: "Driver Payouts", value: "driver-payouts" },
  { label: "Passenger Transactions", value: "passenger-transactions" },
  { label: "Payment Analytics", value: "payment-analytics" },
];
export default function PaymentTabs({ activeTab, onChange }: PaymentTabsProps) {
  return (
    <div
      className="flex min-w-0 gap-6 overflow-x-auto border-b border-border"
      role="tablist"
      aria-label="Payment sections"
    >
      {tabs.map((tab) => {
        const selected = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.value)}
            className={`-mb-px shrink-0 border-b-2 px-2 py-3 text-sm font-medium cursor-pointer ${selected ? "border-[#3934B8] text-[#3934B8]" : "border-transparent text-text-secondary hover:text-text-primary"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
