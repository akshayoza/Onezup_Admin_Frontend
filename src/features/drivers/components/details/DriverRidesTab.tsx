import type { DriverDetails } from "../../drivers.types";
import { Field, SectionTitle, Stat, StatusBadge } from "./DriverDetailsShared";
import { formatCurrency, formatDate } from "./driverDetails.utils";

const DriverRidesTab = ({ details }: { details: DriverDetails }) => {
  const completedRides = details.rides.filter((ride) => ride.status === "completed").length;
  const cancelledRides = details.rides.filter((ride) => ride.status === "cancelled").length;

  return (
    <div className="space-y-5 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total Rides" value={String(details.rides.length)} />
        <Stat label="Completed Rides" value={String(completedRides)} />
        <Stat label="Cancelled Rides" value={String(cancelledRides)} />
      </div>

      <SectionTitle>Ride History</SectionTitle>

      {details.rides.length === 0 ? (
        <p className="text-sm text-text-secondary">No rides available.</p>
      ) : (
        <div className="space-y-4">
          {details.rides.map((ride) => (
            <article key={ride.id} className="space-y-4 rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-text-primary">{ride.passengerName}</h4>
                  <p className="break-all text-xs text-text-secondary">{ride.passengerId}</p>
                </div>
                <StatusBadge status={ride.status} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Date" value={formatDate(ride.date)} />
                <Field label="Time" value={ride.time} />
                <Field label="Distance" value={`${ride.distanceKm} km`} />
                <Field label="Duration" value={`${ride.durationMinutes} min`} />
                <Field label="Fare" value={formatCurrency(ride.fare)} />
                <Field label="Pickup" value={ride.pickupLocation} />
                <Field label="Drop-off" value={ride.dropoffLocation} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverRidesTab;
