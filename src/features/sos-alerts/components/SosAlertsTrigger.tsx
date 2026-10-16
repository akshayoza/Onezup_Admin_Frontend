import { useState } from "react";
import { Siren } from "lucide-react";
import SosAlertsModal from "./SosAlertsModal";

// Temporary standalone trigger to test the popup before wiring your header button.
const SosAlertsTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} aria-label="Open SOS alerts" title="SOS Alerts (test)"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
        <Siren size={21} />
      </button>
      <SosAlertsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SosAlertsTrigger;
