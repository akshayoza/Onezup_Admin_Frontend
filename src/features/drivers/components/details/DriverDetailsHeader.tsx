import { X } from "lucide-react";
import type { Driver, DriverDetails } from "../../drivers.types";
import { Stat } from "./DriverDetailsShared";
import { formatCurrency, formatStatus } from "./driverDetails.utils";

interface DriverDetailsHeaderProps {
  driver: Driver;
  details: DriverDetails;
  onClose: () => void;
}

const DriverDetailsHeader = ({
  driver,
  details,
  onClose,
}: DriverDetailsHeaderProps) => {
  const isOnline = driver.driverStatus === "online";

  return (
    <header className="shrink-0 px-4 pt-4 sm:px-7 sm:pt-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          {driver.avatarUrl ? (
            <img
              src={driver.avatarUrl}
              alt={`${driver.name}'s profile`}
              className="h-12 w-12 shrink-0 rounded-full bg-surface-muted object-cover sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-muted text-lg font-semibold text-text-secondary sm:h-16 sm:w-16">
              {driver.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                id="driver-details-title"
                className="text-lg font-bold text-text-primary sm:text-2xl"
              >
                {driver.name}
              </h2>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isOnline
                    ? "bg-success/15 text-success"
                    : "bg-surface-muted text-text-secondary"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-secondary sm:text-sm">
              <span>{driver.contact}</span>
              <span aria-hidden="true">•</span>
              <span className="break-all">
                {details.profile.email || "No email"}
              </span>
              <span aria-hidden="true">•</span>
              <span>{driver.city}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close driver details"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          <X size={22} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border py-3 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
        <Stat
          label="Total Rides"
          value={driver.ridesTaken.toLocaleString("en-IN")}
        />
        <Stat label="Wallet" value={formatCurrency(driver.walletBalance)} />
        <Stat
          label="Lifetime Earnings"
          value={formatCurrency(driver.lifetimeEarnings ?? 0)}
        />
        <Stat label="Average Rating" value={driver.rating.toFixed(1)} rating />
        <Stat label="Payout Status" value={formatStatus(driver.payoutStatus)} />
      </div>
    </header>
  );
};

export default DriverDetailsHeader;
