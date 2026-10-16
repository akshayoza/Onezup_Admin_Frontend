import type { NotificationAudience, NotificationChannel, NotificationStatus } from "./notifications.types";

export const NOTIFICATION_PAGE_SIZE = 9;
export const DEFAULT_NOTIFICATION_FILTERS: NotificationFiltersDefault = {
  channel: "all", audience: "all", status: "active", search: "",
};
type NotificationFiltersDefault = {
  channel: NotificationChannel | "all";
  audience: NotificationAudience | "all";
  status: NotificationStatus | "all";
  search: string;
};

export const CHANNEL_OPTIONS: { label: string; value: NotificationChannel | "all" }[] = [
  { label: "All", value: "all" }, { label: "In-app", value: "in-app" },
  { label: "Push", value: "push" }, { label: "SMS", value: "sms" }, { label: "Email", value: "email" },
];
export const AUDIENCE_OPTIONS: { label: string; value: NotificationAudience | "all" }[] = [
  { label: "All", value: "all" }, { label: "All users", value: "all-users" },
  { label: "Passengers", value: "passengers" }, { label: "Drivers", value: "drivers" },
];
export const STATUS_OPTIONS: { label: string; value: NotificationStatus | "all" }[] = [
  { label: "All", value: "all" }, { label: "Active", value: "active" },
  { label: "Draft", value: "draft" }, { label: "Inactive", value: "inactive" },
];
export const CHANNEL_LABELS: Record<NotificationChannel, string> = {
  "in-app": "In app", push: "Push", sms: "SMS", email: "Email",
};
