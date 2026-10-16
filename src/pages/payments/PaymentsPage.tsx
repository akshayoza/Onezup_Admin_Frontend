import DashboardLayout from "../../layouts/DashboardLayout";
import PaymentSummaryCards from "../../features/payments/components/PaymentSummaryCards";
import PaymentTabs from "../../features/payments/components/PaymentTabs";
import PaymentsFilters from "../../features/payments/components/PaymentsFilters";
import Pagination from "../../components/ui/Pagination";
import PaymentsTable from "../../features/payments/components/PaymentsTable";
import { usePayments } from "../../features/payments/hooks/usePayments";

export default function PaymentsPage() {
  const {
    activeTab,
    changeTab,
    filters,
    updateFilters,
    resetFilters,
    payments,
    page,
    setPage,
    pageSize,
    totalItems,
    totalPages,
  } = usePayments();

  return (
    <DashboardLayout>
      <main className="min-w-0 space-y-3 px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6">
        <PaymentTabs activeTab={activeTab} onChange={changeTab} />

        {activeTab === "payment-analytics" ? (
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold text-text-primary">
              Payment Analytics
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Analytics charts will be added when payment metrics and backend
              endpoints are available.
            </p>
          </section>
        ) : (
          <>
            <PaymentSummaryCards />

            <PaymentsFilters
              filters={filters}
              onChange={updateFilters}
              onReset={resetFilters}
            />

            {/* Shared container connects the table and pagination. */}
            <section
              aria-label="Payments table"
              className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface"
            >
              <PaymentsTable payments={payments} />

              <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                itemLabel="payments"
                onPageChange={setPage}
              />
            </section>
          </>
        )}
      </main>
    </DashboardLayout>
  );
}
