import { useEffect, useState } from "react";
import type { Driver, DriverDetails } from "../drivers.types";
import DriverDetailsHeader from "./details/DriverDetailsHeader";
import DriverDetailsTabs, { type DriverDetailsTab } from "./details/DriverDetailsTabs";
import DriverProfileTab from "./details/DriverProfileTab";
import DriverVehicleTab from "./details/DriverVehicleTab";
import DriverDocumentsTab from "./details/DriverDocumentsTab";
import DriverPaymentsTab from "./details/DriverPaymentsTab";
import DriverRidesTab from "./details/DriverRidesTab";
import DriverComplaintsTab from "./details/DriverComplaintsTab";

interface DriverDetailsModalProps {
  driver: Driver;
  details: DriverDetails;
  onClose: () => void;
}

const DriverDetailsModal = ({ driver, details, onClose }: DriverDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<DriverDetailsTab>("profile");

  useEffect(() => {
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
  }, [onClose]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <DriverProfileTab details={details} />;
      case "vehicle":
        return <DriverVehicleTab driver={driver} details={details} />;
      case "documents":
        return <DriverDocumentsTab details={details} />;
      case "payments":
        return <DriverPaymentsTab driver={driver} details={details} />;
      case "rides":
        return <DriverRidesTab details={details} />;
      case "complaints":
        return <DriverComplaintsTab details={details} />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:p-5 lg:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="driver-details-title"
        className="flex h-[90dvh] max-h-[900px] min-h-0 w-full flex-col overflow-hidden bg-surface shadow-2xl sm:h-[85vh] sm:max-h-[800px] sm:max-w-6xl sm:rounded-xl"
      >
        <DriverDetailsHeader driver={driver} details={details} onClose={onClose} />

        <div className="shrink-0 px-4 sm:px-7">
          <DriverDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5">
          <div className="min-h-full rounded-xl border border-border">
            {renderActiveTab()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverDetailsModal;
