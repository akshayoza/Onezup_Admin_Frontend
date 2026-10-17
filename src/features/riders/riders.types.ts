export type RiderStatus = "pending" | "active" | "inactive";
export type RiderAccountStatus = "blocked" | "unblocked" | "suspended";

export interface Rider {
  id: string;
  riderCode: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phoneNumber: string;
  walletBalance: number;
  registrationDate: string;
  ridesTaken: number;
  rating?: number;
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

export interface RideSummary {
  bookingId: string;
  status: string;
  scheduledType?: string;
  cancelledBy?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt?: string;
  retryCount?: number;
  rideId: string;
}

export interface RideUser {
  userId: string;
  cancelCount?: number;
  ratingByDriver?: number;
  userRatingComment?: string;
}

export interface RideDriver {
  driverId?: string;
  driverVehicleId?: string;
  isDriverAssigned?: boolean;
  rideAcceptedAt?: string;
  driverArrivedAt?: string;
  ratingByUser?: number;
  driverRatingComment?: string;
}

export interface RideLocation {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface RideTrip {
  locationHistory?: unknown[];
  startLocation: RideLocation;
  endLocation: RideLocation;
  distance: number;
  duration: number;
}

export interface RidePayment {
  paymentMode: string;
  paymentStatus: string;
  isPaymentProcessed?: boolean;
  transactionId?: string;
  subTotal: number;
  baseFare?: number;
  distanceFare?: number;
  timeFare?: number;
  discountTotal?: number;
  discount?: number;
  taxAmount?: number;
  tax?: number;
  orderTotal?: number;
  adminCommissionAmount?: number;
  driverEarning?: number;
  paymentCompletedAt?: string;
}

export interface RideTimeline {
  requestStartTime?: string;
  rideAcceptedAt?: string;
  driverArrivedAt?: string;
  rideStartedAt?: string;
  rideCompletedAt?: string;
  cancelledAt?: string;
}

export interface PassengerRideRecord {
  summary: RideSummary;
  user?: RideUser;
  driver?: RideDriver;
  trip: RideTrip;
  payment: RidePayment;
  timeline?: RideTimeline;
}

export interface PassengerRidesPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PassengerRidesResponse {
  message: string;
  statusCode: number;
  error: boolean;
  data: PassengerRideRecord[];
  pagination?: PassengerRidesPagination;
}

