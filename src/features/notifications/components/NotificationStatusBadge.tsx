import type { NotificationStatus } from "../notifications.types";

const styles: Record<NotificationStatus, string> = {
  active: "bg-[#D7F1D9] text-[#20A84A]",
  draft: "bg-[#FFF0D3] text-[#B76B00]",
  inactive: "bg-[#EDEDED] text-[#666666]",
};
export default function NotificationStatusBadge({ status }: { status: NotificationStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`inline-flex rounded-md px-3 py-1.5 text-xs font-semibold ${styles[status]}`}>{label}</span>;
}
