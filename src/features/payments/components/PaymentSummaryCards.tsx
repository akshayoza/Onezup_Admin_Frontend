import { MoreVertical } from "lucide-react";

const summaryItems = [
  {
    label: "Total Drivers",
    value: "₹1,247",
    description: "Active today: 235",
  },
  {
    label: "Pending Payouts",
    value: "₹4,56,230",
    description: "Risk Bucket- High",
  },
  {
    label: "This week Earnings",
    value: "₹12.4 L",
    description: "Top cohort: Airport runs",
  },
  {
    label: "Avg. Payout Time",
    value: "24 hours",
    description: "SLA Target: 12 hours",
  },
];

export default function PaymentSummaryCards() {
  return (
    <section
      aria-label="Payment summary"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4"
    >
      {summaryItems.map((item) => (
        <article
          key={item.label}
          className="group min-w-0 rounded-xl bg-[#FFFFFF] p-5 transition-colors duration-200 hover:bg-[#E1F1F0] cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold text-text-primary sm:text-base">
              {item.label}
            </h2>

            <button
              type="button"
              aria-label={`More options for ${item.label}`}
              className="rounded-md p-1 text-text-primary transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-brand-primary"
            >
              <MoreVertical size={19} aria-hidden="true" />
            </button>
          </div>

          <p className="mt-4 break-words text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl">
            {item.value}
          </p>

          <p className="mt-4 text-sm text-text-primary">{item.description}</p>
        </article>
      ))}
    </section>
  );
}
