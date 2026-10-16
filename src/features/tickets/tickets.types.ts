export type TicketRaisedBy = "user" | "driver";
export type TicketStatus = "open" | "in-progress" | "closed";
export type TicketIssueType = "ride-issue" | "payment-issue" | "driver-behavior";

export interface SupportTicket {
  id: string;
  rideId: string;
  raisedBy: TicketRaisedBy;
  userName: string;
  driverName: string;
  issueType: TicketIssueType;
  status: TicketStatus;
  createdAt: string;
  description: string;
}

export interface TicketFilters {
  fromDate: string;
  toDate: string;
  raisedBy: TicketRaisedBy | "all";
  issueType: TicketIssueType | "all";
  status: TicketStatus | "all";
  search: string;
}
