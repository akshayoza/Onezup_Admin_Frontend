import type {
  PaymentDriverStatus,
  PaymentFilters,
  PaymentPayoutStatus,
} from "./payments.types";

export const PAYMENTS_PAGE_SIZE = 9;
export const DEFAULT_PAYMENT_FILTERS: PaymentFilters = {
  fromDate: "",
  toDate: "",
  location: "all",
  driverStatus: "all",
  payoutStatus: "all",
  search: "",
};
export const PAYMENT_LOCATIONS = [
  "all",
  "Bengaluru",
  "Pune",
  "Delhi",
  "Ahmedabad",
] as const;
export const PAYMENT_DRIVER_STATUS_OPTIONS: {
  label: string;
  value: PaymentDriverStatus | "all";
}[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
];
export const PAYMENT_PAYOUT_STATUS_OPTIONS: {
  label: string;
  value: PaymentPayoutStatus | "all";
}[] = [
  { label: "Pending", value: "pending" },
  { label: "Processed", value: "processed" },
  { label: "Failed", value: "failed" },
  { label: "On Hold", value: "on_hold" },
];
