import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { formatStatus } from "./driverDetails.utils";

const getStatusClass = (status: string): string => {
  switch (status) {
    case "verified":
    case "processed":
    case "completed":
    case "resolved":
      return "bg-success/15 text-success";
    case "pending":
    case "in_review":
    case "on_hold":
      return "bg-warning/15 text-warning";
    case "rejected":
    case "failed":
    case "cancelled":
    case "open":
      return "bg-error/10 text-error";
    default:
      return "bg-surface-muted text-text-secondary";
  }
};

export const StatusBadge = ({ status }: { status: string }) => (
  <span className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${getStatusClass(status)}`}>
    {formatStatus(status)}
  </span>
);

export const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="min-w-0 space-y-1">
    <p className="text-sm text-text-secondary">{label}</p>
    <p className="break-words font-medium text-text-primary">
      {value === "" ? "Not provided" : value}
    </p>
  </div>
);

export const Stat = ({
  label,
  value,
  rating = false,
}: {
  label: string;
  value: string;
  rating?: boolean;
}) => (
  <div className="min-w-0 rounded-lg bg-surface-muted p-3 sm:p-4">
    <p className="text-xs text-text-secondary sm:text-sm">{label}</p>
    <p className="mt-2 flex items-center gap-1 break-words text-base font-bold text-text-primary sm:text-xl">
      {rating && <Star size={16} className="shrink-0 fill-warning text-warning" aria-hidden="true" />}
      {value}
    </p>
  </div>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="font-semibold text-text-primary">{children}</h3>
);
