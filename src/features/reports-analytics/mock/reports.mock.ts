import type { RideLog, TransactionLog } from "../reports.types";

export const RIDE_LOGS: RideLog[] = [
  { id: "#RID2345", time: "Today, 23:03", driverName: "John Doe", driverInitials: "JD", passengerName: "John Doe", passengerInitials: "JD", type: "Mini", fare: 600, status: "Verified" },
  { id: "#RID2346", time: "Today, 23:03", driverName: "John Doe", driverInitials: "JD", passengerName: "John Doe", passengerInitials: "JD", type: "Sedan", fare: 500, status: "Ongoing" },
  { id: "#RID2347", time: "Today, 23:03", driverName: "John Doe", driverInitials: "JD", passengerName: "John Doe", passengerInitials: "JD", type: "Bike", fare: 800, status: "Cancelled" },
  { id: "#RID2348", time: "Yesterday, 18:42", driverName: "Priya Shah", driverInitials: "PS", passengerName: "Aarav Patel", passengerInitials: "AP", type: "Mini", fare: 420, status: "Verified" },
  { id: "#RID2349", time: "Yesterday, 17:15", driverName: "Rohan Mehta", driverInitials: "RM", passengerName: "Mira Joshi", passengerInitials: "MJ", type: "Sedan", fare: 720, status: "Ongoing" },
];

export const TRANSACTION_LOGS: TransactionLog[] = [
  { id: "#TXID12345", description: "Weekly Payout - Batch #402", dateTime: "04 Oct 2025, 2:03 PM", type: "Payout", amount: -845200, status: "Completed" },
  { id: "#TXID12346", description: "Commission Credit - Ride #8392", dateTime: "04 Oct 2025, 2:03 PM", type: "Credit", amount: 500, status: "Processing" },
  { id: "#TXID12347", description: "Refund - User Complaint", dateTime: "04 Oct 2025, 2:03 PM", type: "Refund", amount: 800, status: "Completed" },
  { id: "#TXID12348", description: "Weekly Payout - Batch #401", dateTime: "03 Oct 2025, 11:20 AM", type: "Payout", amount: -12500, status: "Failed" },
  { id: "#TXID12349", description: "Commission Credit - Ride #8374", dateTime: "03 Oct 2025, 10:10 AM", type: "Credit", amount: 640, status: "Completed" },
];
