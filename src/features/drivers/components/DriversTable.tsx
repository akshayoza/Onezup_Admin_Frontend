import { useState } from "react";
import { MoreVertical, Star } from "lucide-react";
import DataTable from "../../../components/ui/DataTable";
import EmptyTableState from "../../../components/ui/EmptyTableState";

import DriverDetailsModal from "./DriverDetailsModal";
import { useDriverDetailsModal } from "../hooks/useDriverDetailsModal";
import { getDriverDetails } from "../drivers.mock";
import type { Driver } from "../drivers.types";

interface DriversTableProps {
  drivers: Driver[];
}

const formatCurrency = (amount: number): string =>
  amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

const DriversTable = ({ drivers }: DriversTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { selectedDriver, openDriver, closeDriver } = useDriverDetailsModal();

  const handleViewDetails = (driver: Driver) => {
    setOpenMenuId(null);
    openDriver(driver);
  };

  const handleRowKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    driver: Driver,
  ) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleViewDetails(driver);
    }
  };

  const selectedDriverDetails = selectedDriver
    ? getDriverDetails(selectedDriver.id)
    : undefined;

  if (drivers.length === 0) {
    return (
      <EmptyTableState title="No drivers found" description="Try changing your search or filter criteria." />
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <DataTable minWidthClassName="min-w-[1100px]">
          <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-wide text-text-secondary">
            <tr>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                ID
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Driver name
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Vehicle
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Ratings
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Contact
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Rides taken
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Wallet
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Driver status
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                Verification
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-4">
                City
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-4 py-4 text-center"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {drivers.map((driver) => (
              <tr
                key={driver.id}
                onClick={() => handleViewDetails(driver)}
                onKeyDown={(event) => handleRowKeyDown(event, driver)}
                tabIndex={0}
                aria-label={`View details for ${driver.name}`}
                className="cursor-pointer transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary"
              >
                <td className="whitespace-nowrap px-4 py-4 text-text-muted">
                  #{driver.driverCode}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <div className="inline-flex items-center gap-3">
                    {driver.avatarUrl ? (
                      <img
                        src={driver.avatarUrl}
                        alt=""
                        loading="lazy"
                        className="h-9 w-9 shrink-0 rounded-full bg-surface-muted object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted font-semibold text-text-secondary">
                        {driver.name.charAt(0).toUpperCase()}
                      </span>
                    )}

                    <span className="font-semibold text-text-primary">
                      {driver.name}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                  {driver.vehicle}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <span className="inline-flex items-center gap-1 text-text-secondary">
                    <Star
                      size={14}
                      className="fill-warning text-warning"
                      aria-hidden="true"
                    />
                    {driver.rating.toFixed(1)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                  {driver.contact}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-text-primary">
                  {driver.ridesTaken.toLocaleString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-text-secondary">
                  {formatCurrency(driver.walletBalance)}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${
                      driver.driverStatus === "online"
                        ? "bg-success/15 text-success"
                        : "bg-surface-muted text-text-secondary"
                    }`}
                  >
                    {driver.driverStatus === "online" ? "Online" : "Offline"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1.5 text-xs font-semibold ${
                      driver.verificationStatus === "verified"
                        ? "bg-success/15 text-success"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {driver.verificationStatus === "verified"
                      ? "Verified"
                      : "Pending"}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-text-primary">
                  {driver.city}
                </td>

                <td
                  className="relative px-4 py-4 text-center"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label={`Actions for ${driver.name}`}
                    aria-expanded={openMenuId === driver.id}
                    aria-haspopup="menu"
                    onClick={() =>
                      setOpenMenuId((current) =>
                        current === driver.id ? null : driver.id,
                      )
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  >
                    <MoreVertical size={20} aria-hidden="true" />
                  </button>

                  {openMenuId === driver.id && (
                    <div
                      role="menu"
                      aria-label={`Actions for ${driver.name}`}
                      className="absolute right-8 top-12 z-30 w-36 rounded-lg border border-border bg-surface p-1 text-left shadow-lg"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleViewDetails(driver)}
                        className="w-full rounded-md px-3 py-2 text-sm text-text-primary hover:bg-surface-muted"
                      >
                        View details
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => setOpenMenuId(null)}
                        className="w-full rounded-md px-3 py-2 text-sm text-error hover:bg-surface-muted"
                      >
                        Block
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => setOpenMenuId(null)}
                        className="w-full rounded-md px-3 py-2 text-sm text-text-primary hover:bg-surface-muted"
                      >
                        Suspend
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>

      {selectedDriver && selectedDriverDetails && (
        <DriverDetailsModal
          key={selectedDriver.id}
          driver={selectedDriver}
          details={selectedDriverDetails}
          onClose={closeDriver}
        />
      )}
    </>
  );
};

export default DriversTable;
