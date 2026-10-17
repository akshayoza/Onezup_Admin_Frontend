import type { Rider, RiderAccountStatus, RiderStatus } from "../riders.types";
import { RiderAccountStatusBadge } from "./RiderStatusBadge";
import RiderStatusSelect from "./RiderStatusSelect";
import RiderActionsMenu from "./RiderActionsMenu";
import DataTable from "../../../components/ui/DataTable";
import EmptyTableState from "../../../components/ui/EmptyTableState";

interface RidersTableProps {
  riders: Rider[];
  onViewDetails: (rider: Rider) => void;
  onStatusChange: (id: string, status: RiderStatus) => void;
  onAccountStatusChange: (id: string, status: RiderAccountStatus) => void;
}

const formatCurrency = (amount: number) => amount.toLocaleString("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
});

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const RidersTable = ({ riders, onViewDetails, onStatusChange, onAccountStatusChange }: RidersTableProps) => {
  if (riders.length === 0) {
    return <EmptyTableState title="No riders found" description="No riders match your filters." />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <DataTable minWidthClassName="min-w-[1050px]">
        <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-wide text-text-secondary">
          <tr>
            <th scope="col" className="px-4 py-4">ID</th>
            <th scope="col" className="px-4 py-4">User name</th>
            <th scope="col" className="px-4 py-4">Phone number</th>
            <th scope="col" className="px-4 py-4">Wallet balance</th>
            <th scope="col" className="px-4 py-4">Registration date</th>
            <th scope="col" className="px-4 py-4">Rides taken</th>
            <th scope="col" className="px-4 py-4">Status</th>
            <th scope="col" className="px-4 py-4">Account status</th>
            <th scope="col" className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {riders.map((rider) => (
            <tr key={rider.id} tabIndex={0} onClick={() => onViewDetails(rider)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onViewDetails(rider);
                }
              }}
              className="cursor-pointer transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary"
            >
              <td className="relative whitespace-nowrap px-4 py-4 text-text-muted">
                <div className="group relative inline-flex items-center">
                  <span className="cursor-pointer font-mono transition-colors group-hover:text-text-primary">
                    #{rider.riderCode.slice(0, 8)}
                  </span>
                  {rider.riderCode.length > 8 && (
                    <div
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden whitespace-nowrap rounded-md bg-[#18181b] px-2.5 py-1 font-mono text-xs font-normal text-white shadow-xl ring-1 ring-white/10 group-hover:inline-block"
                    >
                      #{rider.riderCode}
                      <span className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-[#18181b]" />
                    </div>
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <div className="inline-flex items-center gap-3">
                  {rider.avatarUrl ? (
                    <img
                      src={rider.avatarUrl}
                      alt=""
                      loading="lazy"
                      className="h-9 w-9 shrink-0 rounded-full border border-border bg-surface-muted object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-primary/10 font-semibold text-brand-primary transition-colors">
                      {rider.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="font-semibold text-text-primary">{rider.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-text-secondary">{rider.phoneNumber}</td>
              <td className="whitespace-nowrap px-4 py-4 text-text-secondary">{formatCurrency(rider.walletBalance)}</td>
              <td className="whitespace-nowrap px-4 py-4 text-text-primary">{formatDate(rider.registrationDate)}</td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-brand-primary">{rider.ridesTaken}</td>
              <td className="whitespace-nowrap px-4 py-4" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                <RiderStatusSelect rider={rider} onChange={onStatusChange} />
              </td>
              <td className="whitespace-nowrap px-4 py-4"><RiderAccountStatusBadge status={rider.accountStatus} /></td>
              <td className="relative whitespace-nowrap px-4 py-4 text-center" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                <RiderActionsMenu rider={rider} onViewDetails={onViewDetails} onAccountStatusChange={onAccountStatusChange} />
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default RidersTable;
