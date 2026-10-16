import { MapPin } from "lucide-react";
import type { SosAlert } from "../sos-alerts.types";

interface SosAlertCardProps {
  alert: SosAlert;
}

const SosAlertCard = ({ alert }: SosAlertCardProps) => (
  <article className="rounded-xl border border-error bg-error/10 p-3 sm:p-4">
    <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-error sm:text-base">
      <span className="font-semibold">{alert.vehicleNumber}</span>
      <span>({alert.riderName})</span>
    </div>
    <div className="grid gap-4 rounded-lg bg-surface/80 p-3 sm:grid-cols-2 sm:gap-5 sm:p-4">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-primary text-white">
          <MapPin size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-text-secondary">Pickup Location</p>
          <p className="mt-1 break-words text-sm font-medium leading-5 text-text-primary sm:text-base">{alert.pickupLocation}</p>
        </div>
      </div>
      <div className="flex min-w-0 items-start gap-3 border-t border-dashed border-border pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-700 text-white">
          <MapPin size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-text-secondary">Drop-off Location</p>
          <p className="mt-1 break-words text-sm font-medium leading-5 text-text-primary sm:text-base">{alert.dropoffLocation}</p>
        </div>
      </div>
    </div>
  </article>
);

export default SosAlertCard;
