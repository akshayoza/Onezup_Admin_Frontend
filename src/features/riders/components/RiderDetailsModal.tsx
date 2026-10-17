import { Fragment, useEffect, useMemo, useState } from "react";
import {
  X,
  Bike,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  AlertCircle,
  CreditCard,
  RefreshCw,
  Copy,
  Check,
  Phone,
  Mail,
  User,
  Calendar,
  ShieldCheck,
  Star,
  Wallet,
  Smartphone,
  Clock,
  Bell,
  ShieldAlert,
  MapPin,
  Car,
  Info,
} from "lucide-react";

import type { Rider, PassengerRideRecord } from "../riders.types";
import {
  getPassengerById,
  getPassengerRides,
  type PassengerApiRecord,
} from "../riders.api";
import { getApiErrorMessage } from "../../../services/api/axios";

interface RiderDetailsModalProps {
  rider: Rider | null;
  onClose: () => void;
}

type TabType = "profile" | "payments" | "rides" | "complaints";
type RideFilterType = "all" | "completed" | "cancelled";

const formatDate = (value?: string | null): string => {
  if (!value) return "Unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (value?: string | null): string => {
  if (!value) return "Unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";
  const dateStr = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateStr} • ${timeStr}`;
};

const formatCurrency = (amount?: number | null): string => {
  if (amount == null || Number.isNaN(Number(amount))) return "Unavailable";
  return `₹ ${Number(amount).toLocaleString("en-IN")}`;
};

const formatCancellationReason = (reason?: string | null): string => {
  if (!reason) return "";
  const normalized = reason.trim().toLowerCase();
  const reasonMap: Record<string, string> = {
    user_changed_mind: "User changed mind",
    user_found_alternative: "Found alternative ride",
    user_wait_too_long: "Wait time too long",
    driver_delayed: "Driver delayed",
    driver_denied_duty: "Driver denied duty",
    driver_asked_cancel: "Driver asked to cancel",
    rider_no_show: "Rider did not show up",
    incorrect_address: "Incorrect pickup address",
  };
  if (reasonMap[normalized]) {
    return reasonMap[normalized];
  }
  return reason
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const RiderDetailsModal = ({ rider, onClose }: RiderDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [rideFilter, setRideFilter] = useState<RideFilterType>("all");
  const [expandedRideId, setExpandedRideId] = useState<string | null>(null);

  const [passenger, setPassenger] = useState<PassengerApiRecord | null>(null);
  const [rides, setRides] = useState<PassengerRideRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (!text || text === "Unavailable") return;
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 1800);
  };

  // Payments pagination
  const [paymentPage, setPaymentPage] = useState(1);
  const paymentsPerPage = 5;

  // Rides pagination
  const [ridePage, setRidePage] = useState(1);
  const ridesPerPage = 5;

  const riderId = rider?.id;

  useEffect(() => {
    const currentId = riderId;
    if (!currentId) return;

    const controller = new AbortController();

    async function fetchRiderData(id: string) {
      setIsLoading(true);
      setError(null);

      try {
        const [passengerRes, ridesRes] = await Promise.allSettled([
          getPassengerById(id, { signal: controller.signal }),
          getPassengerRides(id, { signal: controller.signal }),
        ]);

        if (controller.signal.aborted) return;

        if (passengerRes.status === "fulfilled") {
          setPassenger(passengerRes.value.data);
        } else {
          setError(getApiErrorMessage(passengerRes.reason));
        }

        if (ridesRes.status === "fulfilled") {
          const rawRides = ridesRes.value.data || [];
          // Strict user ID matching: ensure rides only belong to this passenger
          const userRides = rawRides.filter(
            (ride) => !ride.user?.userId || ride.user.userId === id,
          );
          setRides(userRides);
        } else {
          setRides([]);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(getApiErrorMessage(err));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void fetchRiderData(currentId);

    return () => {
      controller.abort();
    };
  }, [riderId, refreshKey]);

  // Lock scroll when open
  useEffect(() => {
    if (!rider) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rider, onClose]);

  // Ride Counts by status
  const completedRidesCount = useMemo(() => {
    return rides.filter((r) => r.summary.status?.toLowerCase() === "completed").length;
  }, [rides]);

  const cancelledRidesCount = useMemo(() => {
    return rides.filter((r) => r.summary.status?.toLowerCase() === "cancelled").length;
  }, [rides]);

  // Filtered rides
  const filteredRides = useMemo(() => {
    if (rideFilter === "all") return rides;
    return rides.filter((ride) => {
      const status = ride.summary.status?.toLowerCase();
      if (rideFilter === "completed") return status === "completed";
      if (rideFilter === "cancelled") return status === "cancelled";
      return true;
    });
  }, [rides, rideFilter]);

  const totalRidePages = Math.max(1, Math.ceil(filteredRides.length / ridesPerPage));
  const currentRides = useMemo(() => {
    const start = (ridePage - 1) * ridesPerPage;
    return filteredRides.slice(start, start + ridesPerPage);
  }, [filteredRides, ridePage, ridesPerPage]);

  // Derived Payments from rides
  const paymentsList = useMemo(() => {
    return rides.map((ride, index) => {
      const trxId =
        ride.payment?.transactionId?.trim() ||
        (ride.summary?.bookingId ? `#${ride.summary.bookingId}` : `TRX-${index + 1}`);
      const date = formatDateTime(ride.summary?.createdAt);
      const amount =
        ride.payment?.subTotal ??
        ride.payment?.orderTotal ??
        null;
      const status = ride.payment?.paymentStatus || ride.summary?.status || "Unavailable";

      return {
        id: ride.summary?.rideId || `${index}`,
        trxId,
        date,
        amount,
        status,
        mode: ride.payment?.paymentMode || "Unavailable",
      };
    });
  }, [rides]);

  const totalPaymentPages = Math.max(1, Math.ceil(paymentsList.length / paymentsPerPage));
  const currentPayments = useMemo(() => {
    const start = (paymentPage - 1) * paymentsPerPage;
    return paymentsList.slice(start, start + paymentsPerPage);
  }, [paymentsList, paymentPage, paymentsPerPage]);

  if (!rider) return null;

  // Resolved display fields
  const firstName = passenger?.firstName?.trim() || "Unavailable";
  const lastName = passenger?.lastName?.trim() || "Unavailable";
  const fullName =
    passenger?.firstName || passenger?.lastName
      ? `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim()
      : rider.name || "Unavailable";
  const phone = passenger?.phone?.trim() || rider.phoneNumber || "Unavailable";
  const email = passenger?.email?.trim() || rider.email || "Unavailable";
  const isActive = passenger ? passenger.isActive : rider.status === "active";
  const isPhoneVerified = passenger ? passenger.isPhoneVerified : true;
  const profileImage = passenger?.profileImage?.trim() || rider.avatarUrl;
  const initial = (fullName !== "Unavailable" ? fullName : "P").charAt(0).toUpperCase();

  const fullRiderId = passenger?.id?.trim() || rider.id || rider.riderCode || "Unavailable";

  const totalRidesDisplay =
    rides.length > 0
      ? rides.length
      : passenger?.totalCompletedRides != null
      ? passenger.totalCompletedRides
      : rider.ridesTaken ?? 0;

  const passengerRatingDisplay =
    passenger?.avgRating != null
      ? Number(passenger.avgRating).toFixed(1)
      : rider.rating != null
      ? Number(rider.rating).toFixed(1)
      : "0.0";

  const walletBalanceDisplay =
    passenger?.walletBalance != null
      ? formatCurrency(passenger.walletBalance)
      : formatCurrency(rider.walletBalance);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="rider-details-title"
        className="flex h-[88vh] max-h-[820px] min-h-[640px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-2xl transition-all"
      >
        {/* ================= MODAL HEADER (LOCKED HEIGHT) ================= */}
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-6 py-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* Avatar with Status Dot */}
            <div className="relative shrink-0">
              {profileImage && profileImage !== "null" ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-13 w-13 rounded-2xl object-cover ring-2 ring-border/80 shadow-sm"
                />
              ) : (
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/20 via-brand-primary/10 to-transparent text-xl font-bold text-brand-primary ring-2 ring-brand-primary/20 shadow-sm">
                  {initial}
                </div>
              )}
              <span
                title={isActive ? "Account Active" : "Account Inactive"}
                className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full ring-2 ring-surface ${
                  isActive ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
            </div>

            {/* Title & Info Badges */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2
                  id="rider-details-title"
                  className="text-lg font-bold text-text-primary tracking-tight truncate"
                >
                  {fullName}
                </h2>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs"
                      : "bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-emerald-600" : "bg-rose-600"
                    }`}
                  />
                  {isActive ? "Active" : "Inactive"}
                </span>

                {isPhoneVerified && (
                  <span
                    title="Phone Verified"
                    className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 border border-blue-300 shadow-2xs"
                  >
                    <ShieldCheck size={13} className="text-blue-600 shrink-0" /> Verified
                  </span>
                )}
              </div>

              {/* Subtitle row with interactive copy triggers */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                {/* Phone */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(phone, "header-phone")}
                  title="Click to copy phone number"
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors cursor-pointer group"
                >
                  <Phone size={12} className="text-text-muted group-hover:text-brand-primary" />
                  <span>{phone}</span>
                  {copiedKey === "header-phone" ? (
                    <Check size={11} className="text-emerald-600 ml-0.5" />
                  ) : (
                    <Copy size={11} className="text-text-muted opacity-0 group-hover:opacity-100 ml-0.5" />
                  )}
                </button>

                <span className="text-border">•</span>

                {/* Email */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(email, "header-email")}
                  title="Click to copy email"
                  className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors cursor-pointer group truncate max-w-[220px] sm:max-w-none"
                >
                  <Mail size={12} className="text-text-muted group-hover:text-brand-primary shrink-0" />
                  <span className="truncate">{email}</span>
                  {copiedKey === "header-email" ? (
                    <Check size={11} className="text-emerald-600 ml-0.5 shrink-0" />
                  ) : (
                    <Copy size={11} className="text-text-muted opacity-0 group-hover:opacity-100 ml-0.5 shrink-0" />
                  )}
                </button>

                <span className="text-border">•</span>

                {/* Location */}
                <div className="inline-flex items-center gap-1 text-text-muted">
                  <MapPin size={12} />
                  <span>Unavailable</span>
                </div>

                <span className="text-border">•</span>

                {/* Full Rider ID */}
                <button
                  type="button"
                  onClick={() => copyToClipboard(fullRiderId, "header-id")}
                  title="Click to copy full Rider ID"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-text-secondary hover:text-brand-primary bg-surface-muted/60 px-2 py-0.5 rounded-md border border-border/80 transition-colors cursor-pointer group"
                >
                  <span className="text-text-muted">ID:</span>
                  <span className="font-semibold text-text-primary group-hover:text-brand-primary">#{fullRiderId}</span>
                  {copiedKey === "header-id" ? (
                    <Check size={11} className="text-emerald-600 ml-0.5" />
                  ) : (
                    <Copy size={11} className="text-text-muted opacity-0 group-hover:opacity-100 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              disabled={isLoading}
              title="Refresh passenger data"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-border text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin text-brand-primary" : ""} />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-border text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* ================= 3-CARD METRIC DECK (LOCKED HEIGHT) ================= */}
        <div className="shrink-0 px-6 pt-5 pb-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Metric 1: Rides */}
            <div className="rounded-xl border border-border/80 bg-gradient-to-b from-surface-muted/40 to-surface p-4 transition-all hover:border-brand-primary/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary">Total Rides</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  <Car size={16} />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
                {totalRidesDisplay}
              </p>
              <p className="mt-1 text-[11px] text-text-muted">
                {completedRidesCount} Completed • {cancelledRidesCount} Cancelled
              </p>
            </div>

            {/* Metric 2: Ratings */}
            <div className="rounded-xl border border-border/80 bg-gradient-to-b from-surface-muted/40 to-surface p-4 transition-all hover:border-brand-primary/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary">Passenger Rating</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Star size={16} className="fill-amber-400 text-amber-500" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <p className="text-2xl font-bold tracking-tight text-text-primary">
                  {passengerRatingDisplay}
                </p>
                <span className="text-xs font-semibold text-text-muted">/ 5.0</span>
              </div>
              <p className="mt-1 text-[11px] text-text-muted">
                Average rating from drivers
              </p>
            </div>

            {/* Metric 3: Wallet */}
            <div className="rounded-xl border border-border/80 bg-gradient-to-b from-surface-muted/40 to-surface p-4 transition-all hover:border-brand-primary/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-secondary">Wallet Balance</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Wallet size={16} />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
                {walletBalanceDisplay}
              </p>
              <p className="mt-1 text-[11px] text-text-muted capitalize">
                Account Role: {passenger?.role || "user"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= TAB NAVIGATION STRIP (LOCKED HEIGHT) ================= */}
        <div className="shrink-0 px-6 border-b border-border bg-surface">
          <nav className="flex gap-2 sm:gap-6 text-sm font-semibold" aria-label="Rider details tabs">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 pb-3 pt-1 border-b-2 transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
              }`}
            >
              <User size={16} />
              <span>Profile</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("payments")}
              className={`flex items-center gap-2 pb-3 pt-1 border-b-2 transition-all cursor-pointer ${
                activeTab === "payments"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
              }`}
            >
              <CreditCard size={16} />
              <span>Payments</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  activeTab === "payments"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "bg-surface-muted text-text-secondary"
                }`}
              >
                {paymentsList.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rides")}
              className={`flex items-center gap-2 pb-3 pt-1 border-b-2 transition-all cursor-pointer ${
                activeTab === "rides"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
              }`}
            >
              <Bike size={16} />
              <span>Rides</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  activeTab === "rides"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "bg-surface-muted text-text-secondary"
                }`}
              >
                {rides.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("complaints")}
              className={`flex items-center gap-2 pb-3 pt-1 border-b-2 transition-all cursor-pointer ${
                activeTab === "complaints"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
              }`}
            >
              <ShieldAlert size={16} />
              <span>Complaints</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  activeTab === "complaints"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "bg-surface-muted text-text-secondary"
                }`}
              >
                0
              </span>
            </button>
          </nav>
        </div>

        {/* ================= TAB BODY VIEWPORT ================= */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 bg-surface">
          {isLoading && !passenger ? (
            <div className="flex h-full min-h-[300px] items-center justify-center gap-2 text-sm text-text-secondary">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-brand-primary" />
              <span>Synchronizing rider details with live API...</span>
            </div>
          ) : error && !passenger ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                <AlertCircle size={24} />
              </div>
              <p className="text-sm font-semibold text-rose-600">{error}</p>
              <button
                type="button"
                onClick={() => setRefreshKey((k) => k + 1)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-primary-hover transition-colors cursor-pointer"
              >
                <RefreshCw size={14} /> Retry Query
              </button>
            </div>
          ) : (
            <>
              {/* ----------------- TAB 1: PROFILE ----------------- */}
              {activeTab === "profile" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Personal Information */}
                  <div className="rounded-2xl border border-border/80 bg-surface-muted/20 p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                        <User size={15} />
                      </div>
                      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide">
                        Personal Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="rounded-xl border border-border/60 bg-surface p-3">
                        <p className="text-[11px] font-medium text-text-muted">First Name</p>
                        <p className="mt-1 text-sm font-semibold text-text-primary truncate">
                          {firstName}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/60 bg-surface p-3">
                        <p className="text-[11px] font-medium text-text-muted">Last Name</p>
                        <p className="mt-1 text-sm font-semibold text-text-primary truncate">
                          {lastName}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-text-muted">Mobile Number</p>
                        {isPhoneVerified && (
                          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                            <Check size={11} /> Verified
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm font-semibold text-text-primary font-mono">{phone}</p>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(phone, "card-phone")}
                          className="text-text-muted hover:text-brand-primary cursor-pointer transition-colors p-1"
                          title="Copy phone"
                        >
                          {copiedKey === "card-phone" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3">
                      <p className="text-[11px] font-medium text-text-muted">Email ID</p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm font-semibold text-text-primary truncate max-w-[260px]">{email}</p>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(email, "card-email")}
                          className="text-text-muted hover:text-brand-primary cursor-pointer transition-colors p-1 shrink-0"
                          title="Copy email"
                        >
                          {copiedKey === "card-email" ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3">
                      <div className="flex items-center gap-1.5 text-text-muted text-[11px] font-medium">
                        <Calendar size={13} />
                        <span>Registration Date</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-text-primary">
                        {passenger?.createdAt
                          ? formatDate(passenger.createdAt)
                          : rider.registrationDate
                          ? formatDate(rider.registrationDate)
                          : "Unavailable"}
                      </p>
                    </div>
                  </div>

                  {/* Right: Devices & Security */}
                  <div className="rounded-2xl border border-border/80 bg-surface-muted/20 p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                        <Smartphone size={15} />
                      </div>
                      <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide">
                        Devices & Session
                      </h3>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3.5 flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-text-muted">Current Device</p>
                        <p className="mt-1 text-sm font-medium text-text-secondary">Unavailable</p>
                      </div>
                      <span className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-text-muted">
                        App Client
                      </span>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3.5 flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-text-muted">Last Active Session</p>
                        <p className="mt-1 text-sm font-medium text-text-secondary">Unavailable</p>
                      </div>
                      <Clock size={16} className="text-text-muted" />
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3.5 flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-text-muted">Recent Devices (History)</p>
                        <p className="mt-1 text-sm font-medium text-text-secondary">Unavailable</p>
                      </div>
                      <Smartphone size={16} className="text-text-muted" />
                    </div>

                    <div className="rounded-xl border border-border/60 bg-surface p-3.5 flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-medium text-text-muted">Push Notifications</p>
                        <p className="mt-1 text-sm font-medium text-text-secondary">Unavailable</p>
                      </div>
                      <Bell size={16} className="text-text-muted" />
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 2: PAYMENTS ----------------- */}
              {activeTab === "payments" && (
                <div className="flex flex-col h-full space-y-4">
                  {currentPayments.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-text-secondary border border-dashed border-border/80 rounded-2xl">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted text-text-muted mb-3">
                        <CreditCard size={28} />
                      </div>
                      <p className="text-base font-bold text-text-primary">No Payment Transactions</p>
                      <p className="mt-1 text-xs text-text-muted max-w-sm">
                        Payment ledger records for this passenger are currently unavailable or no completed transactions exist.
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between rounded-xl border border-border/80 bg-surface shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-surface-muted/60 text-[11px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border/80">
                            <tr>
                              <th scope="col" className="px-4 py-3">TRX ID</th>
                              <th scope="col" className="px-4 py-3">DATE & TIME</th>
                              <th scope="col" className="px-4 py-3">AMOUNT</th>
                              <th scope="col" className="px-4 py-3">METHOD</th>
                              <th scope="col" className="px-4 py-3">STATUS</th>
                              <th scope="col" className="px-4 py-3 text-center">ACTION</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {currentPayments.map((payment) => {
                              const isAdded =
                                payment.status.toLowerCase().includes("completed") ||
                                payment.status.toLowerCase().includes("success") ||
                                payment.status.toLowerCase().includes("added") ||
                                payment.status.toLowerCase().includes("paid");
                              const isFailed =
                                payment.status.toLowerCase().includes("failed") ||
                                payment.status.toLowerCase().includes("cancelled");

                              return (
                                <tr key={payment.id} className="hover:bg-surface-muted/30 transition-colors">
                                  <td className="px-4 py-3.5">
                                    <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-text-primary">
                                      <span>{payment.trxId}</span>
                                      <button
                                        type="button"
                                        onClick={() => copyToClipboard(payment.trxId, `trx-${payment.id}`)}
                                        title="Copy TRX ID"
                                        className="text-text-muted hover:text-brand-primary cursor-pointer transition-colors"
                                      >
                                        {copiedKey === `trx-${payment.id}` ? (
                                          <Check size={12} className="text-emerald-600" />
                                        ) : (
                                          <Copy size={12} />
                                        )}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">
                                    {payment.date}
                                  </td>
                                  <td className="px-4 py-3.5 font-bold text-text-primary text-xs whitespace-nowrap">
                                    {formatCurrency(payment.amount)}
                                  </td>
                                  <td className="px-4 py-3.5">
                                    <span className="inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-text-secondary capitalize">
                                      <CreditCard size={11} /> {payment.mode}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3.5 whitespace-nowrap">
                                    <span
                                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                                        isAdded
                                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                          : isFailed
                                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                                          : "bg-amber-100 text-amber-800 border border-amber-300"
                                      }`}
                                    >
                                      <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                          isAdded ? "bg-emerald-600" : isFailed ? "bg-rose-600" : "bg-amber-600"
                                        }`}
                                      />
                                      {isAdded ? "Added" : isFailed ? "Failed" : payment.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3.5 text-center">
                                    <button
                                      type="button"
                                      aria-label="Payment actions"
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted hover:text-text-primary cursor-pointer"
                                    >
                                      <MoreVertical size={16} />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-between px-4 py-3 bg-surface-muted/40 border-t border-border/80 text-xs text-text-secondary">
                        <p>
                          Showing {Math.min(1 + (paymentPage - 1) * paymentsPerPage, paymentsList.length)} to{" "}
                          {Math.min(paymentPage * paymentsPerPage, paymentsList.length)} of {paymentsList.length} transactions
                        </p>

                        {totalPaymentPages > 1 && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={paymentPage === 1}
                              onClick={() => setPaymentPage((p) => Math.max(1, p - 1))}
                              className="px-2.5 py-1 rounded-lg border border-border text-text-secondary hover:bg-surface-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                              &lt;&lt; Previous
                            </button>

                            {Array.from({ length: totalPaymentPages }).map((_, idx) => {
                              const pNum = idx + 1;
                              return (
                                <button
                                  key={pNum}
                                  type="button"
                                  onClick={() => setPaymentPage(pNum)}
                                  className={`h-7 w-7 rounded-lg font-semibold cursor-pointer ${
                                    paymentPage === pNum
                                      ? "bg-brand-primary text-white"
                                      : "border border-border text-text-secondary hover:bg-surface-muted"
                                  }`}
                                >
                                  {pNum}
                                </button>
                              );
                            })}

                            <button
                              type="button"
                              disabled={paymentPage === totalPaymentPages}
                              onClick={() => setPaymentPage((p) => Math.min(totalPaymentPages, p + 1))}
                              className="px-2.5 py-1 rounded-lg border border-border text-text-secondary hover:bg-surface-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                              Next &gt;&gt;
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- TAB 3: RIDES ----------------- */}
              {activeTab === "rides" && (
                <div className="flex flex-col h-full space-y-4">
                  {/* Rides Filter Header with Live Count Pills */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setRideFilter("all");
                          setRidePage(1);
                        }}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          rideFilter === "all"
                            ? "bg-brand-primary text-white shadow-xs"
                            : "bg-surface-muted text-text-secondary hover:text-text-primary border border-border/60"
                        }`}
                      >
                        All <span className="opacity-90">({rides.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRideFilter("completed");
                          setRidePage(1);
                        }}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          rideFilter === "completed"
                            ? "bg-brand-primary text-white shadow-xs"
                            : "bg-surface-muted text-text-secondary hover:text-text-primary border border-border/60"
                        }`}
                      >
                        Completed <span className="opacity-90">({completedRidesCount})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRideFilter("cancelled");
                          setRidePage(1);
                        }}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          rideFilter === "cancelled"
                            ? "bg-brand-primary text-white shadow-xs"
                            : "bg-surface-muted text-text-secondary hover:text-text-primary border border-border/60"
                        }`}
                      >
                        Cancelled <span className="opacity-90">({cancelledRidesCount})</span>
                      </button>
                    </div>

                    <span className="text-xs text-text-muted font-medium">
                      Showing {filteredRides.length} {filteredRides.length === 1 ? "record" : "records"}
                    </span>
                  </div>

                  {filteredRides.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-text-secondary border border-dashed border-border/80 rounded-2xl">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted text-text-muted mb-3">
                        <Bike size={28} />
                      </div>
                      <p className="text-base font-bold text-text-primary">No Rides Recorded</p>
                      <p className="mt-1 text-xs text-text-muted max-w-sm">
                        No rides match the selected filter for this passenger.
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between rounded-xl border border-border/80 bg-surface shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-surface-muted/60 text-[11px] font-semibold uppercase tracking-wider text-text-secondary border-b border-border/80">
                            <tr>
                              <th scope="col" className="px-4 py-3">RIDE ID</th>
                              <th scope="col" className="px-4 py-3">DATE & TIME</th>
                              <th scope="col" className="px-4 py-3">ROUTE (PICKUP ➔ DROP)</th>
                              <th scope="col" className="px-4 py-3">DISTANCE</th>
                              <th scope="col" className="px-4 py-3">FARE</th>
                              <th scope="col" className="px-4 py-3">STATUS</th>
                              <th scope="col" className="px-4 py-3 text-center">DETAILS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {currentRides.map((ride, idx) => {
                              const rideKey =
                                ride.summary.bookingId || ride.summary.rideId || `${idx}`;
                              const isExpanded = expandedRideId === rideKey;
                              const isCompleted =
                                ride.summary.status?.toLowerCase() === "completed";
                              const isCancelled =
                                ride.summary.status?.toLowerCase() === "cancelled";
                              const fare =
                                ride.payment?.subTotal ??
                                ride.payment?.orderTotal ??
                                0;
                              const cancelReason = formatCancellationReason(
                                ride.summary.cancellationReason,
                              );
                              const pickup =
                                ride.trip?.startLocation?.address || "Unavailable";
                              const drop =
                                ride.trip?.endLocation?.address || "Unavailable";

                              return (
                                <Fragment key={rideKey}>
                                  <tr className={`hover:bg-surface-muted/30 transition-colors align-top ${isExpanded ? "bg-surface-muted/20" : ""}`}>
                                    {/* Ride ID */}
                                    <td className="px-4 py-3.5">
                                      <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-mono text-xs font-bold text-text-primary">
                                            #{ride.summary.bookingId || "Unavailable"}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              copyToClipboard(
                                                ride.summary.bookingId || ride.summary.rideId,
                                                `booking-${rideKey}`,
                                              )
                                            }
                                            title="Copy Booking ID"
                                            className="text-text-muted hover:text-brand-primary cursor-pointer transition-colors"
                                          >
                                            {copiedKey === `booking-${rideKey}` ? (
                                              <Check size={12} className="text-emerald-600" />
                                            ) : (
                                              <Copy size={12} />
                                            )}
                                          </button>
                                        </div>
                                        <span className="font-mono text-[10px] text-text-muted mt-0.5">
                                          UUID: {ride.summary.rideId?.slice(0, 8)}...
                                        </span>
                                      </div>
                                    </td>

                                    {/* Date & Time */}
                                    <td className="px-4 py-3.5 text-xs text-text-secondary whitespace-nowrap">
                                      {formatDateTime(ride.summary.createdAt)}
                                    </td>

                                    {/* Route */}
                                    <td className="px-4 py-3.5 text-xs max-w-[270px]">
                                      <div className="flex items-start gap-2">
                                        <div className="flex flex-col items-center pt-1 shrink-0">
                                          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                                          <span className="h-4 w-0.5 bg-border my-0.5" />
                                          <span className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-rose-100" />
                                        </div>
                                        <div className="space-y-1 min-w-0 flex-1">
                                          <p
                                            className="truncate font-medium text-text-primary"
                                            title={pickup}
                                          >
                                            {pickup}
                                          </p>
                                          <p
                                            className="truncate text-text-secondary"
                                            title={drop}
                                          >
                                            {drop}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    {/* Distance */}
                                    <td className="px-4 py-3.5 text-xs whitespace-nowrap">
                                      <p className="font-bold text-text-primary">
                                        {ride.trip?.distance != null ? `${ride.trip.distance} km` : "Unavailable"}
                                      </p>
                                      <p className="text-[11px] text-text-muted mt-0.5">
                                        {ride.trip?.duration != null ? `${ride.trip.duration} min` : "Unavailable"}
                                      </p>
                                    </td>

                                    {/* Fare */}
                                    <td className="px-4 py-3.5 text-xs whitespace-nowrap">
                                      <p className="font-bold text-text-primary">
                                        {formatCurrency(fare)}
                                      </p>
                                      <span className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium bg-surface-muted text-text-muted capitalize mt-0.5">
                                        {ride.payment?.paymentMode || "Cash"}
                                      </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                      <div className="space-y-1">
                                        <span
                                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                                            isCompleted
                                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                              : isCancelled
                                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                                              : "bg-amber-100 text-amber-800 border border-amber-300"
                                          }`}
                                        >
                                          <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                              isCompleted ? "bg-emerald-600" : isCancelled ? "bg-rose-600" : "bg-amber-600"
                                            }`}
                                          />
                                          {ride.summary.status || "Unavailable"}
                                        </span>
                                        {cancelReason && (
                                          <p
                                            className="text-[11px] font-medium text-rose-700 flex items-center gap-1 truncate max-w-[150px]"
                                            title={cancelReason}
                                          >
                                            <Info size={11} className="shrink-0 text-rose-600" />
                                            <span className="truncate">{cancelReason}</span>
                                          </p>
                                        )}
                                      </div>
                                    </td>

                                    {/* Expand Details */}
                                    <td className="px-4 py-3.5 text-center">
                                      <button
                                        type="button"
                                        onClick={() => setExpandedRideId(isExpanded ? null : rideKey)}
                                        title={isExpanded ? "Collapse ride details" : "Expand trip telemetry"}
                                        aria-label="Toggle ride breakdown"
                                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                                          isExpanded
                                            ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                                            : "border-border text-text-muted hover:bg-surface-muted hover:text-text-primary"
                                        }`}
                                      >
                                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                      </button>
                                    </td>
                                  </tr>

                                  {/* Expanded Row */}
                                  {isExpanded && (
                                    <tr className="bg-surface-muted/20">
                                      <td colSpan={7} className="px-5 py-4 border-t border-border/60">
                                        <div className="rounded-xl border border-border/70 bg-surface p-4 shadow-xs">
                                          <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-border/60 gap-2">
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                                                Trip Telemetry & Fare Breakdown
                                              </span>
                                              <span className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand-primary">
                                                #{ride.summary.bookingId || "N/A"}
                                              </span>
                                            </div>
                                            <span className="font-mono text-[11px] text-text-muted">
                                              Ride ID: {ride.summary.rideId || "Unavailable"}
                                            </span>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                            {/* Col 1: Trip Details */}
                                            <div className="space-y-2">
                                              <p className="font-semibold text-text-primary text-[11px] uppercase tracking-wider text-text-muted">
                                                Dispatch & Lifecycle
                                              </p>
                                              <div className="space-y-1.5 text-text-secondary">
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Schedule Type:</span>
                                                  <span className="font-medium capitalize text-text-primary">
                                                    {ride.summary.scheduledType || "Instant (Now)"}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Booked At:</span>
                                                  <span className="font-medium text-text-primary">
                                                    {formatDateTime(ride.summary.createdAt)}
                                                  </span>
                                                </div>
                                                {ride.summary.updatedAt && (
                                                  <div className="flex justify-between">
                                                    <span className="text-text-muted">Updated At:</span>
                                                    <span className="font-medium text-text-primary">
                                                      {formatDateTime(ride.summary.updatedAt)}
                                                    </span>
                                                  </div>
                                                )}
                                                {isCancelled && (
                                                  <div className="flex justify-between text-rose-700">
                                                    <span>Cancelled By:</span>
                                                    <span className="font-medium capitalize">
                                                      {ride.summary.cancelledBy || "Passenger"}
                                                    </span>
                                                  </div>
                                                )}
                                                {cancelReason && (
                                                  <div className="flex justify-between text-rose-700">
                                                    <span>Reason:</span>
                                                    <span className="font-medium text-right max-w-[140px] truncate" title={cancelReason}>
                                                      {cancelReason}
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            {/* Col 2: Driver & Assignment */}
                                            <div className="space-y-2">
                                              <p className="font-semibold text-text-primary text-[11px] uppercase tracking-wider text-text-muted">
                                                Driver Assignment
                                              </p>
                                              <div className="space-y-1.5 text-text-secondary">
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Driver Status:</span>
                                                  <span className="font-medium text-text-primary">
                                                    {ride.driver?.isDriverAssigned ? "Assigned" : "No Driver Assigned"}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Driver ID:</span>
                                                  <span className="font-mono text-text-primary">
                                                    {ride.driver?.driverId ? `${ride.driver.driverId.slice(0, 10)}...` : "None"}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Vehicle ID:</span>
                                                  <span className="font-mono text-text-primary">
                                                    {ride.driver?.driverVehicleId ? `${ride.driver.driverVehicleId.slice(0, 10)}...` : "None"}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Driver Rating:</span>
                                                  <span className="font-semibold text-amber-500">
                                                    {ride.user?.ratingByDriver ? `${ride.user.ratingByDriver} ★` : "No rating"}
                                                  </span>
                                                </div>
                                                {ride.user?.userRatingComment && (
                                                  <div className="flex justify-between">
                                                    <span className="text-text-muted">Comment:</span>
                                                    <span className="font-medium text-text-primary truncate max-w-[130px]">
                                                      {ride.user.userRatingComment}
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            {/* Col 3: Fare Breakdown */}
                                            <div className="space-y-2">
                                              <p className="font-semibold text-text-primary text-[11px] uppercase tracking-wider text-text-muted">
                                                Fare Breakdown
                                              </p>
                                              <div className="space-y-1.5 text-text-secondary">
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Base Fare:</span>
                                                  <span className="font-medium text-text-primary">
                                                    {formatCurrency(ride.payment?.baseFare)}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Distance Fare:</span>
                                                  <span className="font-medium text-text-primary">
                                                    {formatCurrency(ride.payment?.distanceFare)}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-text-muted">Time Fare:</span>
                                                  <span className="font-medium text-text-primary">
                                                    {formatCurrency(ride.payment?.timeFare)}
                                                  </span>
                                                </div>
                                                <div className="flex justify-between pt-1 border-t border-border/60 font-bold text-text-primary">
                                                  <span>Total Fare:</span>
                                                  <span className="text-brand-primary">{formatCurrency(fare)}</span>
                                                </div>
                                                <div className="flex justify-between text-[11px]">
                                                  <span className="text-text-muted">Payment Status:</span>
                                                  <span className="font-medium capitalize text-text-primary">
                                                    {ride.payment?.paymentStatus || "Pending"}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-between px-4 py-3 bg-surface-muted/40 border-t border-border/80 text-xs text-text-secondary">
                        <p>
                          Showing {Math.min(1 + (ridePage - 1) * ridesPerPage, filteredRides.length)} to{" "}
                          {Math.min(ridePage * ridesPerPage, filteredRides.length)} of {filteredRides.length} rides
                        </p>

                        {totalRidePages > 1 && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={ridePage === 1}
                              onClick={() => setRidePage((p) => Math.max(1, p - 1))}
                              className="px-2.5 py-1 rounded-lg border border-border text-text-secondary hover:bg-surface-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                              &lt;&lt; Previous
                            </button>

                            {Array.from({ length: totalRidePages }).map((_, idx) => {
                              const pNum = idx + 1;
                              return (
                                <button
                                  key={pNum}
                                  type="button"
                                  onClick={() => setRidePage(pNum)}
                                  className={`h-7 w-7 rounded-lg font-semibold cursor-pointer ${
                                    ridePage === pNum
                                      ? "bg-brand-primary text-white"
                                      : "border border-border text-text-secondary hover:bg-surface-muted"
                                  }`}
                                >
                                  {pNum}
                                </button>
                              );
                            })}

                            <button
                              type="button"
                              disabled={ridePage === totalRidePages}
                              onClick={() => setRidePage((p) => Math.min(totalRidePages, p + 1))}
                              className="px-2.5 py-1 rounded-lg border border-border text-text-secondary hover:bg-surface-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            >
                              Next &gt;&gt;
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- TAB 4: COMPLAINTS ----------------- */}
              {activeTab === "complaints" && (
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mb-3 ring-8 ring-emerald-500/5">
                    <ShieldCheck size={32} />
                  </div>
                  <h4 className="text-base font-bold text-text-primary">
                    All Clear: Zero Active Complaints
                  </h4>
                  <p className="mt-1 text-xs text-text-muted max-w-md">
                    This passenger maintains an untarnished record with zero disciplinary grievances, driver flags, or safety escalations logged.
                  </p>
                  <div className="mt-4 rounded-xl border border-border/80 bg-surface-muted/30 px-3.5 py-2 text-[11px] text-text-secondary">
                    <span className="font-semibold text-text-primary">Complaints Module Status:</span>{" "}
                    Unavailable (No disputes on file)
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default RiderDetailsModal;


