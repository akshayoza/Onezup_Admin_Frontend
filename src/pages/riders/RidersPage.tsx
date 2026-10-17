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
    isLoading,
    error,
    refreshRiders,
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
        {!showSuspended && (
          <RidersFilters
            filters={filters}
            onChange={updateFilters}
            onReset={resetFilters}
            onShowSuspended={() => setShowSuspended(true)}
            suspendedCount={suspendedRiders.length}
          />
        )}

        {showSuspended ? (
          <SuspendedRidersView
            riders={suspendedRiders}
            onBack={() => setShowSuspended(false)}
            {...tableProps}
          />
        ) : (
          <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface">
            {isLoading ? (
              <div
                className="flex min-h-64 items-center justify-center gap-3 p-8 text-sm text-text-secondary"
                role="status"
              >
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-brand-primary" />
                Loading passengers...
              </div>
            ) : error ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="text-sm font-medium text-error" role="alert">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={refreshRiders}
                  className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <RidersTable riders={riders} {...tableProps} />
                </div>

                <div className="px-4">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    itemLabel="passengers"
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </section>
        )}

        <RiderDetailsModal
          key={selectedRider?.id ?? "none"}
          rider={selectedRider}
          onClose={() => setSelectedRider(null)}
        />
      </div>
    </DashboardLayout>
  );
};

export default RidersPage;
