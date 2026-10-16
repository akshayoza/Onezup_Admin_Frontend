import type { RiderStatus, RiderAccountStatus } from "../riders.types";
import { RIDER_ACCOUNT_STATUS_LABELS, RIDER_STATUS_LABELS } from "../riders.constants";

export function RiderStatusBadge({ status }: { status: RiderStatus }) {
  const styles: Record<RiderStatus, string> = {
    active: "bg-success/15 text-success",
    pending: "bg-warning/15 text-warning",
    inactive: "bg-error/15 text-error",
  };

  return <span className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${styles[status]}`}>{RIDER_STATUS_LABELS[status]}</span>;
}

export function RiderAccountStatusBadge({ status }: { status: RiderAccountStatus }) {
  const styles: Record<RiderAccountStatus, string> = {
    blocked: "bg-error/15 text-error",
    unblocked: "bg-success/15 text-success",
    suspended: "bg-surface-muted text-text-secondary",
  };

  return <span className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${styles[status]}`}>{RIDER_ACCOUNT_STATUS_LABELS[status]}</span>;
}
