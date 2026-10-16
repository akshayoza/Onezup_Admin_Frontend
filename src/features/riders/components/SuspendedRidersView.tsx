import { ArrowLeft } from "lucide-react";
import type { Rider, RiderAccountStatus, RiderStatus } from "../riders.types";
import RidersTable from "./RidersTable";

interface SuspendedRidersViewProps {
  riders: Rider[];
  onBack: () => void;
  onViewDetails: (rider: Rider) => void;
  onStatusChange: (id: string, status: RiderStatus) => void;
  onAccountStatusChange: (id: string, status: RiderAccountStatus) => void;
}

const SuspendedRidersView = (props: SuspendedRidersViewProps) => (
  <section className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-text-primary">Suspended Accounts</h2>
        <p className="text-sm text-text-secondary">Riders whose accounts are currently suspended.</p>
      </div>
      <button type="button" onClick={props.onBack} className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-muted">
        <ArrowLeft size={16} /> Back to riders
      </button>
    </div>
    <RidersTable {...props} />
  </section>
);

export default SuspendedRidersView;
