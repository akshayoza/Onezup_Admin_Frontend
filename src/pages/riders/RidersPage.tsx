import { useMemo, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useRiders } from "../../features/riders/hooks/useRiders";
import RidersFilters from "../../features/riders/components/RidersFilters";
import RidersTable from "../../features/riders/components/RidersTable";
import Pagination from "../../components/ui/Pagination";
import RiderDetailsModal from "../../features/riders/components/RiderDetailsModal";
import SuspendedRidersView from "../../features/riders/components/SuspendedRidersView";
import type { Rider } from "../../features/riders/riders.types";

const RidersPage = () => {
  const {
    filters,
    updateFilters,
    resetFilters,
    riders,
    allFilteredRiders,
    page,
    setPage,
    pageSize,
    totalItems,
    totalPages,
    updateRiderStatus,
    updateAccountStatus,
  } = useRiders();

  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [showSuspended, setShowSuspended] = useState(false);

  const suspendedRiders = useMemo(
    () =>
      allFilteredRiders.filter((rider) => rider.accountStatus === "suspended"),
    [allFilteredRiders],
  );

  const tableProps = {
    onViewDetails: setSelectedRider,
    onStatusChange: updateRiderStatus,
    onAccountStatusChange: updateAccountStatus,
  };

  return (
    <DashboardLayout>
      <div className="min-w-0 space-y-5">
        {/* Filters */}
        {!showSuspended && (
          <RidersFilters
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            onShowSuspended={() => setShowSuspended(true)}
            suspendedCount={suspendedRiders.length}
          />
        )}

        {/* Riders table and suspended accounts */}
        {showSuspended ? (
          <SuspendedRidersView
            riders={suspendedRiders}
            onBack={() => setShowSuspended(false)}
            {...tableProps}
          />
        ) : (
          <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface">
            <div className="overflow-x-auto">
              <RidersTable riders={riders} {...tableProps} />
            </div>

            <div className="px-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                itemLabel="riders"
                onPageChange={setPage}
              />
            </div>
          </section>
        )}

        {/* Rider details modal */}
        <RiderDetailsModal
          rider={selectedRider}
          onClose={() => setSelectedRider(null)}
        />
      </div>
    </DashboardLayout>
  );
};

export default RidersPage;
