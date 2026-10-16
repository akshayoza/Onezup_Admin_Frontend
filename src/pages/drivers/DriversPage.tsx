import DashboardLayout from "../../layouts/DashboardLayout";
import DriversFilterPanel from "../../features/drivers/components/DriversFilterPanel";
import DriversTable from "../../features/drivers/components/DriversTable";
import Pagination from "../../components/ui/Pagination";
import { useDrivers } from "../../features/drivers/hooks/useDrivers";

const DriversPage = () => {
  const {
    drivers,
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    pageSize,
    totalPages,
    totalItems,
  } = useDrivers();

  return (
    <DashboardLayout>
      <div className="min-w-0 space-y-5">
        <DriversFilterPanel
          filters={filters}
          onFiltersChange={updateFilters}
          onReset={resetFilters}
        />

        <section className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="overflow-x-auto">
            <DriversTable drivers={drivers} />
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            itemLabel="drivers"
            onPageChange={setPage}
          />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DriversPage;
