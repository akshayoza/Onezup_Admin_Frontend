export type DriverStatus = "online" | "offline";

export type PayoutStatus = "pending" | "processed" | "failed" | "on_hold";

export type VerificationStatus = "verified" | "pending";

export type DriverAction = "block" | "suspend";

export interface Driver {
  id: string;
  driverCode: string;
  name: string;
  avatarUrl?: string;
  email?: string;
  vehicle: string;
  rating: number;
  contact: string;
  ridesTaken: number;
  walletBalance: number;
  lifetimeEarnings?: number;
  cancellationCount?: number;
  totalBookings?: number;
  driverStatus: DriverStatus;
  verificationStatus: VerificationStatus;
  payoutStatus: PayoutStatus;
  city: string;
  joinedAt: string;
}

export interface DriverFilters {
  fromDate: string;
  toDate: string;
  location: string;
  driverStatus: DriverStatus | "all";
  payoutStatus: PayoutStatus | "all";
  search: string;
}

export interface DriversQuery {
  page: number;
  pageSize: number;
  filters: DriverFilters;
}

export interface PaginatedDrivers {
  items: Driver[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface DriverProfileDetails {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  registrationDate: string;
  currentDevice: string;
  lastActive: string;
  recentDevices: string[];
  pushNotificationsEnabled: boolean;
}

export interface DriverVehicleDetails {
  type: string;
  model: string;
  vehicleNumber: string;
  registrationNumber: string;
  permitNumber: string;
  insuranceNumber: string;
  yearOfManufacture: string;
  insuranceDocumentUrl: string;
  insuranceVerified: boolean;
  insuranceRemarks: string;
}

export interface DriverDocument {
  id: string;
  title: string;
  documentNumber: string;
  frontImageUrl: string;
  backImageUrl?: string;
  expiryDate?: string;
  status: VerificationStatus | "rejected";
  remarks?: string;
}

export interface DriverPayment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: PayoutStatus;
  reference: string;
}

export type RideStatus = "completed" | "cancelled";

export interface DriverRide {
  id: string;
  passengerName: string;
  passengerId: string;
  date: string;
  time: string;
  distanceKm: number;
  durationMinutes: number;
  fare: number;
  status: RideStatus;
  pickupLocation: string;
  dropoffLocation: string;
}

export interface DriverComplaint {
  id: string;
  passengerName: string;
  date: string;
  category: string;
  description: string;
  status: "open" | "in_review" | "resolved";
}

export interface DriverDetails {
  driverId: string;
  profile: DriverProfileDetails;
  vehicle: DriverVehicleDetails;
  documents: DriverDocument[];
  payments: DriverPayment[];
  rides: DriverRide[];
  complaints: DriverComplaint[];
}
