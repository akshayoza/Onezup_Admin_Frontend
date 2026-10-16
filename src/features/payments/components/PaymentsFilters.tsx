import { RotateCcw } from "lucide-react";

import DateFilterInput from "../../../components/ui/DateFilterInput";
import FilterChipGroup from "../../../components/ui/FilterChipGroup";
import LocationFilterSelect from "../../../components/ui/LocationFilterSelect";
import SearchFilterInput from "../../../components/ui/SearchFilterInput";
import FilterPanel from "../../../components/ui/FilterPanel";

import {
  PAYMENT_DRIVER_STATUS_OPTIONS,
  PAYMENT_LOCATIONS,
  PAYMENT_PAYOUT_STATUS_OPTIONS,
} from "../payments.constants";

import type { PaymentFilters } from "../payments.types";

interface PaymentsFiltersProps {
  filters: PaymentFilters;
  onChange: (updates: Partial<PaymentFilters>) => void;
  onReset: () => void;
}

export default function PaymentsFilters({
  filters,
  onChange,
  onReset,
}: PaymentsFiltersProps) {
  const hasActiveFilters =
    filters.fromDate !== "" ||
    filters.toDate !== "" ||
    filters.location !== "all" ||
    filters.driverStatus !== "all" ||
    filters.payoutStatus !== "all" ||
    filters.search.trim() !== "";

  return (
    <FilterPanel
      className="space-y-4"
      actions={
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex min-h-9 items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-brand-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset filters
        </button>
      }
    >

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DateFilterInput
          id="payments-from-date"
          label="From"
          value={filters.fromDate}
          max={filters.toDate || undefined}
          onChange={(value) => onChange({ fromDate: value })}
        />

        <DateFilterInput
          id="payments-to-date"
          label="To"
          value={filters.toDate}
          min={filters.fromDate || undefined}
          onChange={(value) => onChange({ toDate: value })}
        />

        <LocationFilterSelect
          id="payments-location"
          label="Location"
          value={filters.location}
          options={PAYMENT_LOCATIONS}
          onChange={(value) => onChange({ location: value })}
        />

        <SearchFilterInput
          id="payments-search"
          label="Search payments"
          value={filters.search}
          placeholder="Transaction ID, driver, vehicle..."
          onChange={(value) => onChange({ search: value })}
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 border-t border-border pt-4 xl:grid-cols-2">
        <FilterChipGroup
          label="Driver Status"
          options={PAYMENT_DRIVER_STATUS_OPTIONS}
          value={filters.driverStatus}
          toggleOffValue="all"
          onChange={(value) => onChange({ driverStatus: value })}
        />

        <FilterChipGroup
          label="Payout Status"
          options={PAYMENT_PAYOUT_STATUS_OPTIONS}
          value={filters.payoutStatus}
          toggleOffValue="all"
          onChange={(value) => onChange({ payoutStatus: value })}
        />
      </div>
    </FilterPanel>
  );
}
