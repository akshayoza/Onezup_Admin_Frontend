export type ReportTab = "operational" | "financial";
export type ReportPeriod = "weekly" | "monthly";

export interface ReportMetric {
  id: string;
  title: string;
  value: string;
  comparison: string;
  featured?: boolean;
}

export interface RideLog {
  id: string;
  time: string;
  driverName: string;
  driverInitials: string;
  driverAvatar?: string;
  passengerName: string;
  passengerInitials: string;
  passengerAvatar?: string;
  type: string;
  fare: number;
  status: "Verified" | "Ongoing" | "Cancelled";
}

export interface TransactionLog {
  id: string;
  description: string;
  dateTime: string;
  type: "Payout" | "Credit" | "Refund";
  amount: number;
  status: "Completed" | "Processing" | "Failed";
}
