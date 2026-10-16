import { RotateCcw } from "lucide-react";

import DateFilterInput from "../../../components/ui/DateFilterInput";
import LocationFilterSelect from "../../../components/ui/LocationFilterSelect";
import SearchFilterInput from "../../../components/ui/SearchFilterInput";
import FilterChipGroup from "../../../components/ui/FilterChipGroup";
import FilterPanel from "../../../components/ui/FilterPanel";

import { DRIVER_LOCATIONS } from "../drivers.constants";

import type {
  DriverFilters,
  DriverStatus,
  PayoutStatus,
} from "../drivers.types";

interface DriversFilterPanelProps {
  filters: DriverFilters;
  onFiltersChange: (updates: Partial<DriverFilters>) => void;
  onReset: () => void;
}

const DRIVER_STATUS_OPTIONS: {
  label: string;
  value: DriverStatus | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
];

const PAYOUT_FILTER_OPTIONS: {
  label: string;
  value: PayoutStatus | "all";
}[] = [
  { label: "Pending", value: "pending" },
  { label: "Processed", value: "processed" },
  { label: "Failed", value: "failed" },
  { label: "On Hold", value: "on_hold" },
];

const DriversFilterPanel = ({
  filters,
  onFiltersChange,
  onReset,
}: DriversFilterPanelProps) => {
  const hasActiveFilters =
    filters.fromDate !== "" ||
    filters.toDate !== "" ||
    filters.location !== "all" ||
    filters.driverStatus !== "all" ||
    filters.payoutStatus !== "all" ||
    filters.search.trim() !== "";

  return (
    <FilterPanel
      actions={
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-brand-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Reset filters
        </button>
      }
    >

      {/* Shared date, location and search controls */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DateFilterInput
          id="drivers-from-date"
          label="From date"
          value={filters.fromDate}
          max={filters.toDate || undefined}
          onChange={(value) => onFiltersChange({ fromDate: value })}
        />

        <DateFilterInput
          id="drivers-to-date"
          label="To date"
          value={filters.toDate}
          min={filters.fromDate || undefined}
          onChange={(value) => onFiltersChange({ toDate: value })}
        />

        <LocationFilterSelect
          id="drivers-location"
          value={filters.location}
          options={DRIVER_LOCATIONS}
          onChange={(value) => onFiltersChange({ location: value })}
        />

        <SearchFilterInput
          id="drivers-search"
          label="Search drivers"
          value={filters.search}
          placeholder="Name, ID, phone, city..."
          onChange={(value) => onFiltersChange({ search: value })}
        />
      </div>

      {/* Drivers-specific status controls */}
      <div className="grid min-w-0 grid-cols-1 gap-5 border-t border-border pt-4 xl:grid-cols-2">
        <FilterChipGroup
          label="Driver status"
          options={DRIVER_STATUS_OPTIONS}
          value={filters.driverStatus}
          onChange={(value) => onFiltersChange({ driverStatus: value })}
        />

        <FilterChipGroup
          label="Payout status"
          options={PAYOUT_FILTER_OPTIONS}
          value={filters.payoutStatus}
          toggleOffValue="all"
          onChange={(value) => onFiltersChange({ payoutStatus: value })}
        />
      </div>
    </FilterPanel>
  );
};

export default DriversFilterPanel;
