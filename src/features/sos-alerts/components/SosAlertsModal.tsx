import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useSosAlerts } from "../hooks/useSosAlerts";
import SosAlertCard from "./SosAlertCard";

interface SosAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SosAlertsModal = ({ isOpen, onClose }: SosAlertsModalProps) => {
  const { alerts, isLoading, error } = useSosAlerts();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/45 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="sos-alerts-title"
        className="flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-surface shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-error/10 text-error">
              <AlertTriangle size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 id="sos-alerts-title" className="text-lg font-bold text-text-primary sm:text-xl">SOS Alerts</h2>
              <p className="text-xs text-text-secondary">{alerts.length} test {alerts.length === 1 ? "alert" : "alerts"}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close SOS alerts"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
            <X size={26} />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-7">
          {isLoading && <p className="text-sm text-text-secondary">Loading SOS alerts...</p>}
          {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
          {!isLoading && !error && alerts.length === 0 && (
            <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
              <AlertTriangle size={30} className="text-text-muted" />
              <p className="font-semibold text-text-primary">No SOS alerts</p>
              <p className="text-sm text-text-secondary">New SOS alerts will appear here.</p>
            </div>
          )}
          {!isLoading && !error && alerts.map((alert) => <SosAlertCard key={alert.id} alert={alert} />)}
        </div>
      </section>
    </div>
  );
};

export default SosAlertsModal;
