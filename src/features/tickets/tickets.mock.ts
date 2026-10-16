import type { SupportTicket } from "./tickets.types";

const descriptions = {
  "ride-issue": "The trip did not follow the expected route. Please review the ride details and contact the affected parties if needed.",
  "payment-issue": "The payment amount or payout status requires review. Verify the transaction details before resolving this ticket.",
  "driver-behavior": "A concern about driver conduct was reported. Review the incident notes and take action according to support policy.",
};
const issueTypes = ["ride-issue", "payment-issue", "driver-behavior"] as const;
const statuses = ["closed", "closed", "in-progress", "open"] as const;

export const MOCK_TICKETS: SupportTicket[] = Array.from({ length: 18 }, (_, index) => {
  const number = index + 1;
  const issueType = issueTypes[index % issueTypes.length];
  const raisedBy = number % 2 === 0 ? "driver" : "user";
  return {
    id: `TID-${String(12345 + number).padStart(5, "0")}`,
    rideId: `RID-${String(90210 + number).padStart(5, "0")}`,
    raisedBy,
    userName: ["Aarav Sharma", "Priya Patel", "John Doe"][index % 3],
    driverName: ["Rohan Kumar", "John Doe", "Karan Singh"][index % 3],
    issueType,
    status: statuses[index % statuses.length],
    createdAt: `2024-11-${String(26 - (index % 8)).padStart(2, "0")}`,
    description: descriptions[issueType],
  };
});
