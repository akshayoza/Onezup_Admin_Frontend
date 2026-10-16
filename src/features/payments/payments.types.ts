export type PaymentTab =
  | "driver-payouts"
  | "passenger-transactions"
  | "payment-analytics";

export type PaymentDriverStatus = "active" | "inactive" | "suspended";
export type PaymentPayoutStatus =
  | "pending"
  | "processed"
  | "failed"
  | "on_hold";
export type BankVerificationStatus = "verified" | "pending";

export interface PaymentRecord {
  id: string;
  driverId: string;
  transactionId: string;
  driverName: string;
  driverInitials: string;
  avatarUrl?: string;
  vehicleType: string;
  vehicleInfo: string;
  totalEarnings: number;
  commission: number;
  payoutAmount: number;
  bankStatus: BankVerificationStatus;
  lastPayout: string;
  location: string;
  driverStatus: PaymentDriverStatus;
  payoutStatus: PaymentPayoutStatus;
  transactionType: "driver" | "passenger";
  createdAt: string;
}

export interface DriverPaymentProfile {
  driverId: string;
  name: string;
  avatarUrl?: string;
  phone: string;
  email: string;
  city: string;
  vehicle: string;
  status: PaymentDriverStatus;
  joinedAt: string;
  primaryZone: string;
  vehicleRegistration: string;
  licenseNumber: string;
  insuranceValidity: string;
  documents: string[];
  bankAccounts: BankAccount[];
  payoutHistory: DriverPayoutHistoryItem[];
  earningHistory: DriverEarningHistoryItem[];
}

export interface BankAccount {
  id: string;
  bankName: string;
  ifsc: string;
  accountNumber: string;
  accountHolderName: string;
  upiId?: string;
  isPrimary: boolean;
  status: BankVerificationStatus;
}

export interface DriverPayoutHistoryItem {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "failed" | "pending";
  transactionId: string;
}

export interface DriverEarningHistoryItem {
  id: string;
  date: string;
  rideId: string;
  fare: number;
  promo: number;
  toDriver: number;
  method: "UPI" | "WALLET" | "CASH";
  transactionId: string;
}

export interface PaymentFilters {
  fromDate: string;
  toDate: string;
  location: string;
  driverStatus: PaymentDriverStatus | "all";
  payoutStatus: PaymentPayoutStatus | "all";
  search: string;
}
