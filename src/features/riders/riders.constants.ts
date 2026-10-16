import type { RiderAccountStatus, RiderFilters, RiderStatus } from "./riders.types";

export const RIDERS_PAGE_SIZE = 8;

export const DEFAULT_RIDER_FILTERS: RiderFilters = {
  fromDate: "",
  toDate: "",
  location: "all",
  status: "all",
  accountStatus: "all",
  minWalletBalance: "",
  maxWalletBalance: "",
  search: "",
};

export const RIDER_STATUS_OPTIONS: { label: string; value: RiderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const RIDER_ACCOUNT_STATUS_OPTIONS: {
  label: string;
  value: RiderAccountStatus | "all";
}[] = [
  { label: "All accounts", value: "all" },
  { label: "Blocked", value: "blocked" },
  { label: "Unblocked", value: "unblocked" },
  { label: "Suspended", value: "suspended" },
];

export const RIDER_STATUS_LABELS: Record<RiderStatus, string> = {
  pending: "Pending",
  active: "Active",
  inactive: "Inactive",
};

export const RIDER_ACCOUNT_STATUS_LABELS: Record<RiderAccountStatus, string> = {
  blocked: "Blocked",
  unblocked: "Unblocked",
  suspended: "Suspended",
};

export const RIDER_LOCATIONS = ["Ahmedabad", "Bengaluru", "Delhi", "Pune"] as const;
