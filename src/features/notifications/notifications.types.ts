export type NotificationChannel = "in-app" | "push" | "sms" | "email";
export type NotificationAudience = "all-users" | "passengers" | "drivers";
export type NotificationStatus = "active" | "draft" | "inactive";

export interface NotificationTemplate {
  id: string;
  event: string;
  linkedDescription: string;
  channels: NotificationChannel[];
  status: NotificationStatus;
  createdAt: string;
  audience: NotificationAudience;
  message: string;
}

export interface NotificationFilters {
  channel: NotificationChannel | "all";
  audience: NotificationAudience | "all";
  status: NotificationStatus | "all";
  search: string;
}

export interface CreateNotificationInput {
  event: string;
  linkedDescription: string;
  channels: NotificationChannel[];
  audience: NotificationAudience;
  message: string;
  status: "active" | "draft";
}
