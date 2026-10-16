export type RiderStatus = "pending" | "active" | "inactive";
export type RiderAccountStatus = "blocked" | "unblocked" | "suspended";

export interface Rider {
  id: string;
  riderCode: string;
  name: string;
  avatarUrl?: string;
  phoneNumber: string;
  walletBalance: number;
  registrationDate: string;
  ridesTaken: number;
  status: RiderStatus;
  accountStatus: RiderAccountStatus;
}

export interface RiderFilters {
  fromDate: string;
  toDate: string;
  location: string;
  status: RiderStatus | "all";
  accountStatus: RiderAccountStatus | "all";
  minWalletBalance: number | "";
  maxWalletBalance: number | "";
  search: string;
}
