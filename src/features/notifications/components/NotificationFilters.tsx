import { ChevronDown, RotateCcw, Search } from "lucide-react";

import {
  AUDIENCE_OPTIONS,
  CHANNEL_OPTIONS,
  STATUS_OPTIONS,
} from "../notifications.constants";
import type { NotificationFilters as Filters } from "../notifications.types";

interface Props {
  filters: Filters;
  onChange: (updates: Partial<Filters>) => void;
  onReset: () => void;
  onCreate: () => void;
}

const selectClassName = [
  "h-[46px] w-full min-w-0 appearance-none",
  "rounded-lg border border-[#D9D9D9] bg-white",
  "py-2 pl-3 pr-10",
  "text-sm font-medium text-text-primary",
  "outline-none transition-colors duration-200",
  "hover:border-[#1F9686]/50",
  "focus:border-brand-primary",
  "focus:ring-2 focus:ring-brand-primary/15",
].join(" ");

const inputClassName = [
  "h-[46px] w-full min-w-0",
  "rounded-lg border border-[#D9D9D9] bg-white",
  "py-2 pl-10 pr-3",
  "text-sm text-text-primary placeholder:text-text-muted",
  "outline-none transition-colors duration-200",
  "hover:border-[#1F9686]/50",
  "focus:border-brand-primary",
  "focus:ring-2 focus:ring-brand-primary/15",
].join(" ");

function SelectArrow() {
  return (
    <ChevronDown
      size={18}
      strokeWidth={1.8}
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
    />
  );
}

export default function NotificationFilters({
  filters,
  onChange,
  onReset,
  onCreate,
}: Props) {
  const hasActiveFilters =
    filters.channel !== "all" ||
    filters.audience !== "all" ||
    filters.status !== "active" ||
    filters.search.trim() !== "";

  return (
    <section
      aria-label="Filter notification templates"
      className="min-w-0 rounded-xl border border-border bg-white p-4 sm:p-5"
    >
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1.2fr_1fr_1.8fr_auto] xl:items-end">
        {/* Channel */}
        <label className="block min-w-0">
          <span className="mb-1.5 block text-sm font-medium text-text-secondary">
            Channel
          </span>

          <span className="relative block min-w-0">
            <select
              name="channel"
              value={filters.channel}
              onChange={(event) =>
                onChange({
                  channel: event.target.value as Filters["channel"],
                })
              }
              className={selectClassName}
            >
              {CHANNEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <SelectArrow />
          </span>
        </label>

        {/* Audience */}
        <label className="block min-w-0">
          <span className="mb-1.5 block text-sm font-medium text-text-secondary">
            Audience
          </span>

          <span className="relative block min-w-0">
            <select
              name="audience"
              value={filters.audience}
              onChange={(event) =>
                onChange({
                  audience: event.target.value as Filters["audience"],
                })
              }
              className={selectClassName}
            >
              {AUDIENCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <SelectArrow />
          </span>
        </label>

        {/* Status */}
        <label className="block min-w-0">
          <span className="mb-1.5 block text-sm font-medium text-text-secondary">
            Status
          </span>

          <span className="relative block min-w-0">
            <select
              name="status"
              value={filters.status}
              onChange={(event) =>
                onChange({
                  status: event.target.value as Filters["status"],
                })
              }
              className={selectClassName}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <SelectArrow />
          </span>
        </label>

        {/* Search */}
        <label className="block min-w-0">
          <span className="mb-1.5 block text-sm font-medium text-text-secondary">
            Search notifications
          </span>

          <span className="relative block min-w-0">
            <Search
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
            />

            <input
              type="search"
              name="search"
              value={filters.search}
              onChange={(event) => onChange({ search: event.target.value })}
              placeholder="Search users, email ID or mobile no."
              className={inputClassName}
            />
          </span>
        </label>

        {/* Actions */}
        <div className="flex min-w-0 items-center justify-between gap-3 sm:col-span-2 xl:col-span-1 xl:justify-end">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="inline-flex h-[46px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-brand-primary transition-colors hover:bg-[#1F9686]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={16} strokeWidth={1.8} aria-hidden="true" />
            Reset
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="inline-flex h-[46px] min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#2921A8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#211A8C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2921A8] active:scale-[0.99]"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              +
            </span>
            Create Notification
          </button>
        </div>
      </div>
    </section>
  );
}
