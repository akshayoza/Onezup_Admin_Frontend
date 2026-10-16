import type {
  DriverFilters,
  DriverStatus,
  PayoutStatus,
} from "./drivers.types";

export const DEFAULT_PAGE_SIZE = 9;

export const DEFAULT_DRIVER_FILTERS: DriverFilters = {
  fromDate: "",
  toDate: "",
  location: "all",
  driverStatus: "all",
  payoutStatus: "all",
  search: "",
};

export const DRIVER_LOCATIONS = [
  "all",
  "Bengaluru",
  "Pune",
  "Delhi",
  "Ahmedabad",
] as const;

export const DRIVER_STATUS_OPTIONS: {
  label: string;
  value: DriverStatus | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
];

export const PAYOUT_STATUS_OPTIONS: {
  label: string;
  value: PayoutStatus | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processed", value: "processed" },
  { label: "Failed", value: "failed" },
  { label: "On Hold", value: "on_hold" },
];

export const PAYOUT_STATUS_LABELS: Record<PayoutStatus, string> = {
  pending: "Pending",
  processed: "Processed",
  failed: "Failed",
  on_hold: "On Hold",
};

export const DRIVER_STATUS_LABELS: Record<DriverStatus, string> = {
  online: "Online",
  offline: "Offline",
};
