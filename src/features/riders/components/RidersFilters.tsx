import { RotateCcw } from "lucide-react";

import DateFilterInput from "../../../components/ui/DateFilterInput";
import LocationFilterSelect from "../../../components/ui/LocationFilterSelect";
import SearchFilterInput from "../../../components/ui/SearchFilterInput";
import FilterChipGroup from "../../../components/ui/FilterChipGroup";
import FilterPanel from "../../../components/ui/FilterPanel";

import {
  RIDER_LOCATIONS,
  RIDER_STATUS_OPTIONS,
  RIDER_ACCOUNT_STATUS_OPTIONS,
} from "../riders.constants";

import type { RiderFilters } from "../riders.types";

interface RidersFiltersProps {
  filters: RiderFilters;
  onChange: (updates: Partial<RiderFilters>) => void;
  onReset: () => void;
  onShowSuspended: () => void;
  suspendedCount: number;
}

const RidersFilters = ({
  filters,
  onChange,
  onReset,
  onShowSuspended,
  suspendedCount,
}: RidersFiltersProps) => {
  const riderStatusOptions = RIDER_STATUS_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  const accountStatusOptions = RIDER_ACCOUNT_STATUS_OPTIONS.filter(
    (option) => option.value !== "all",
  ).map((option) => ({
    label: option.label,
    value: option.value,
  }));

  const hasActiveFilters =
    filters.fromDate !== "" ||
    filters.toDate !== "" ||
    filters.location !== "all" ||
    filters.status !== "all" ||
    filters.accountStatus !== "all" ||
    filters.search.trim() !== "" ||
    filters.minWalletBalance !== "" ||
    filters.maxWalletBalance !== "";

  return (
    <FilterPanel
      actions={
        <>
          <button
            type="button"
            onClick={onShowSuspended}
            className="cursor-pointer rounded-md px-2 py-1.5 text-sm font-medium text-brand-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            View Suspended Accounts ({suspendedCount})
          </button>
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-brand-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Reset filters
          </button>
        </>
      }
    >

      {/* Shared date, location and search controls */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DateFilterInput
          id="riders-from-date"
          label="From date"
          value={filters.fromDate}
          max={filters.toDate || undefined}
          onChange={(value) => onChange({ fromDate: value })}
        />

        <DateFilterInput
          id="riders-to-date"
          label="To date"
          value={filters.toDate}
          min={filters.fromDate || undefined}
          onChange={(value) => onChange({ toDate: value })}
        />

        <LocationFilterSelect
          id="riders-location"
          value={filters.location}
          options={RIDER_LOCATIONS}
          onChange={(value) => onChange({ location: value })}
        />

        <SearchFilterInput
          id="riders-search"
          label="Search riders"
          value={filters.search}
          placeholder="Name, ID, phone..."
          onChange={(value) => onChange({ search: value })}
        />
      </div>

      {/* Rider-specific status filters */}
      <div className="grid min-w-0 grid-cols-1 gap-5 border-t border-border pt-4 lg:grid-cols-2">
        <FilterChipGroup
          label="Status"
          options={riderStatusOptions}
          value={filters.status}
          onChange={(value) => onChange({ status: value })}
        />

        <FilterChipGroup
          label="Account Status"
          options={accountStatusOptions}
          value={filters.accountStatus}
          toggleOffValue={"all" as typeof filters.accountStatus}
          onChange={(value) => onChange({ accountStatus: value })}
        />
      </div>
    </FilterPanel>
  );
};

export default RidersFilters;
