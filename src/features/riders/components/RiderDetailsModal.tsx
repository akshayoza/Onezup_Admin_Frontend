import { useEffect } from "react";
import { X } from "lucide-react";
import type { Rider } from "../riders.types";
import { RiderAccountStatusBadge, RiderStatusBadge } from "./RiderStatusBadge";

interface RiderDetailsModalProps {
  rider: Rider | null;
  onClose: () => void;
}

const formatCurrency = (amount: number) => amount.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const formatDate = (value: string) => new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const RiderDetailsModal = ({ rider, onClose }: RiderDetailsModalProps) => {
  useEffect(() => {
    if (!rider) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rider, onClose]);

  if (!rider) return null;

  const fields = [
    ["Rider ID", rider.riderCode],
    ["Phone number", rider.phoneNumber],
    ["Wallet balance", formatCurrency(rider.walletBalance)],
    ["Registration date", formatDate(rider.registrationDate)],
    ["Rides taken", String(rider.ridesTaken)],
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3 backdrop-blur-[2px] sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="rider-details-title" className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-surface shadow-2xl">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border p-5">
          <div className="flex items-center gap-3">
            {rider.avatarUrl ? <img src={rider.avatarUrl} alt="" className="h-12 w-12 rounded-full object-cover" /> : null}
            <div>
              <h2 id="rider-details-title" className="text-lg font-bold text-text-primary">{rider.name}</h2>
              <p className="text-sm text-text-secondary">Rider account details</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close rider details" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-secondary hover:bg-surface-muted">
            <X size={21} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="mb-5 flex flex-wrap gap-2">
            <RiderStatusBadge status={rider.status} />
            <RiderAccountStatusBadge status={rider.accountStatus} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label} className="space-y-1">
                <p className="text-sm text-text-secondary">{label}</p>
                <p className="break-words font-medium text-text-primary">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiderDetailsModal;
