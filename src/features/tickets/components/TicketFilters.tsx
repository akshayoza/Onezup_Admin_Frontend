import { RotateCcw } from "lucide-react";
import DateFilterInput from "../../../components/ui/DateFilterInput";
import FilterChipGroup from "../../../components/ui/FilterChipGroup";
import FilterPanel from "../../../components/ui/FilterPanel";
import LocationFilterSelect from "../../../components/ui/LocationFilterSelect";
import SearchFilterInput from "../../../components/ui/SearchFilterInput";
import { TICKET_ISSUE_LABELS, TICKET_STATUS_LABELS } from "../tickets.constants";
import type { TicketFilters as TicketFiltersType } from "../tickets.types";

interface Props { filters: TicketFiltersType; onChange: (updates: Partial<TicketFiltersType>) => void; onReset: () => void; }
const issueOptions = [{ label: "All types", value: "all" }, ...Object.entries(TICKET_ISSUE_LABELS).map(([value, label]) => ({ value, label }))] as { label: string; value: TicketFiltersType["issueType"] }[];
const raisedByOptions = [{ label: "All", value: "all" }, { label: "User", value: "user" }, { label: "Driver", value: "driver" }] as const;
const statusOptions = [{ label: "All", value: "all" }, ...Object.entries(TICKET_STATUS_LABELS).map(([value, label]) => ({ value, label }))] as { label: string; value: TicketFiltersType["status"] }[];

export default function TicketFilters({ filters, onChange, onReset }: Props) {
  const active = Object.entries(filters).some(([key, value]) => (key === "raisedBy" || key === "issueType" || key === "status") ? value !== "all" : value !== "");
  return <FilterPanel actions={<button type="button" onClick={onReset} disabled={!active} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-brand-primary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"><RotateCcw size={16} />Reset filters</button>}>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DateFilterInput id="tickets-from-date" label="From date" value={filters.fromDate} max={filters.toDate || undefined} onChange={(fromDate) => onChange({ fromDate })} />
      <DateFilterInput id="tickets-to-date" label="To date" value={filters.toDate} min={filters.fromDate || undefined} onChange={(toDate) => onChange({ toDate })} />
      <LocationFilterSelect id="tickets-issue-type" label="Issue type" value={filters.issueType} options={issueOptions} allLabel="All types" onChange={(issueType) => onChange({ issueType: issueType as TicketFiltersType["issueType"] })} />
      <SearchFilterInput id="tickets-search" label="Search tickets" value={filters.search} placeholder="Ticket, ride, user or driver..." onChange={(search) => onChange({ search })} />
    </div>
    <div className="grid grid-cols-1 gap-5 border-t border-border pt-4 lg:grid-cols-2">
      <FilterChipGroup label="Raised by" options={raisedByOptions} value={filters.raisedBy} toggleOffValue="all" onChange={(raisedBy) => onChange({ raisedBy })} />
      <FilterChipGroup label="Status" options={statusOptions} value={filters.status} toggleOffValue="all" onChange={(status) => onChange({ status })} />
    </div>
  </FilterPanel>;
}
