import type { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";

import type { Rider, RiderStatus } from "../riders.types";
import { RIDER_STATUS_LABELS } from "../riders.constants";

interface RiderStatusSelectProps {
  rider: Rider;
  onChange: (id: string, status: RiderStatus) => void;
}

const RiderStatusSelect = ({ rider, onChange }: RiderStatusSelectProps) => {
  const styles: Record<RiderStatus, string> = {
    active: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    inactive: "bg-error/10 text-error",
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(rider.id, event.target.value as RiderStatus);
  };

  return (
    <div className="relative inline-flex w-[108px] items-center">
      <select
        aria-label={`Change status for ${rider.name}`}
        value={rider.status}
        onChange={handleChange}
        className={`h-9 w-full cursor-pointer appearance-none rounded-md border-0 py-2 pl-3 pr-8 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${styles[rider.status]}`}
      >
        {Object.entries(RIDER_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        strokeWidth={2}
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default RiderStatusSelect;
