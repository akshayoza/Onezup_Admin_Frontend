import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { RIDE_LOGS } from "../mock/reports.mock";
import { RideStatusBadge } from "./ReportStatusBadge";
import DataTable from "../../../components/ui/DataTable";

export default function RecentRideLogs() {
  const [showAll, setShowAll] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const rows = showAll ? RIDE_LOGS : RIDE_LOGS.slice(0, 3);

  // Close the action menu when clicking outside or pressing Escape.
  useEffect(() => {
    if (!menuFor) return;

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuFor(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuFor(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuFor]);

  return (
    <section className="min-w-0">
      {/* Section heading */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-[#22252B] sm:text-lg">
          Recent Ride Logs
        </h2>

        <button
          type="button"
          onClick={() => {
            setShowAll((value) => !value);
            setMenuFor(null);
          }}
          aria-expanded={showAll}
          className="
            inline-flex min-h-9 items-center justify-center
            rounded-lg border border-[#D1D5DB] bg-white
            px-4 py-2 text-xs font-medium text-[#666666]
            transition-colors hover:bg-[#F9FAFB]
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#1F9686]
            focus-visible:ring-offset-2
          "
        >
          {showAll ? "Show Less" : "View All Logs"}
        </button>
      </div>

      {/* Table container matches Payments */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
        <DataTable minWidthClassName="min-w-[1000px]">
            <thead className="bg-[#F3F4F6]">
              <tr>
                {[
                  "Ride ID",
                  "Time",
                  "Driver Name",
                  "Passenger",
                  "Type",
                  "Fare",
                  "Status",
                  "Action",
                ].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className="
                      whitespace-nowrap border-b border-[#E5E7EB]
                      px-4 py-4 text-xs font-semibold uppercase
                      tracking-wide text-[#666666] sm:px-5
                    "
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((ride) => (
                <tr
                  key={ride.id}
                  className="
                    border-b border-[#EEEEEE] text-[#666666]
                    transition-colors duration-150 last:border-b-0
                    hover:bg-[#F9FAFB]
                  "
                >
                  <td className="whitespace-nowrap px-4 py-4 text-[#999999] sm:px-5">
                    {ride.id}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    {ride.time}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <Person
                      name={ride.driverName}
                      initials={ride.driverInitials}
                    />
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <Person
                      name={ride.passengerName}
                      initials={ride.passengerInitials}
                    />
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-[#666666] sm:px-5">
                    {ride.type}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-[#20232A] sm:px-5">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(ride.fare)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <RideStatusBadge status={ride.status} />
                  </td>

                  <td className="px-4 py-3 text-center sm:px-5">
                    <div
                      ref={menuFor === ride.id ? menuRef : null}
                      className="relative inline-flex"
                    >
                      <button
                        type="button"
                        aria-label={`Actions for ride ${ride.id}`}
                        aria-haspopup="menu"
                        aria-expanded={menuFor === ride.id}
                        onClick={() =>
                          setMenuFor((current) =>
                            current === ride.id ? null : ride.id,
                          )
                        }
                        className="
                          rounded-md p-1.5 text-[#333333]
                          transition-colors hover:bg-[#F3F4F6]
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#1F9686]
                        "
                      >
                        <MoreVertical size={18} />
                      </button>

                      {menuFor === ride.id && (
                        <div
                          role="menu"
                          className="
                            absolute right-0 top-full z-20 mt-1 w-44
                            rounded-lg border border-[#E5E7EB]
                            bg-white p-1 text-left shadow-lg
                          "
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => setMenuFor(null)}
                            className="
                              w-full rounded-md px-3 py-2.5
                              text-left text-sm text-[#333333]
                              transition-colors hover:bg-[#F3F4F6]
                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-[#1F9686]
                            "
                          >
                            View ride details
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-sm text-[#666666]"
                  >
                    No ride logs available.
                  </td>
                </tr>
              )}
            </tbody>
        </DataTable>
      </div>
    </section>
  );
}

function Person({ name, initials }: { name: string; initials: string }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-full border border-[#E5E7EB]
          bg-[#DCEEF5] text-xs font-semibold text-[#28657A]
        "
      >
        {initials}
      </span>

      <span className="whitespace-nowrap font-semibold text-[#20232A]">
        {name}
      </span>
    </span>
  );
}
