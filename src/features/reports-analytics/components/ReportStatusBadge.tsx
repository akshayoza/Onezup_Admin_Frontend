import type { RideLog, TransactionLog } from "../reports.types";

export function RideStatusBadge({ status }: { status: RideLog["status"] }) {
  const styles: Record<RideLog["status"], string> = {
    Verified: "bg-[#D8F3DD] text-[#16A34A]",
    Ongoing: "bg-[#FFF1D7] text-[#B77942]",
    Cancelled: "bg-[#FFE0E0] text-[#EF4444]",
  };
  return (
    <span
      className={`inline-flex min-w-[84px] justify-center rounded-md px-2.5 py-1.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export function TransactionStatusBadge({
  status,
}: {
  status: TransactionLog["status"];
}) {
  const styles: Record<TransactionLog["status"], string> = {
    Completed: "bg-[#D8F3DD] text-[#16A34A]",
    Processing: "bg-[#FFF1D7] text-[#B77942]",
    Failed: "bg-[#FFE0E0] text-[#EF4444]",
  };
  return (
    <span
      className={`inline-flex min-w-[86px] justify-center rounded-md px-2.5 py-1.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
