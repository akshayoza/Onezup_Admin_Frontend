import type { TicketFilters, TicketIssueType, TicketRaisedBy, TicketStatus } from "./tickets.types";

export const TICKETS_PAGE_SIZE = 8;
export const DEFAULT_TICKET_FILTERS: TicketFilters = { fromDate: "", toDate: "", raisedBy: "all", issueType: "all", status: "all", search: "" };

export const TICKET_ISSUE_LABELS: Record<TicketIssueType, string> = {
  "ride-issue": "Ride issue", "payment-issue": "Payment issue", "driver-behavior": "Driver behavior",
};
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = { open: "Open", "in-progress": "In progress", closed: "Closed" };
export const TICKET_RAISED_BY_LABELS: Record<TicketRaisedBy, string> = { user: "User", driver: "Driver" };
