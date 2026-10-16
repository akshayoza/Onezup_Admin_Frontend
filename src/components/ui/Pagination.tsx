import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  /** Current one-based page number. */
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  /** Human-readable noun used in the accessible label and item count. */
  itemLabel: string;
  onPageChange: (page: number) => void;
  className?: string;
}

const getVisiblePages = (page: number, totalPages: number): (number | "…")[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) return [1, 2, 3, 4, "…", totalPages];
  if (page >= totalPages - 2) {
    return [1, "…", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "…", page - 1, page, page + 1, "…", totalPages];
};

/**
 * Shared pagination control for every server- or client-paginated list.
 * Keep page state and data fetching in the feature hook; this component only renders it.
 */
export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  itemLabel,
  onPageChange,
  className = "",
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotalPages);
  const safePageSize = Math.max(1, pageSize);
  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * safePageSize + 1;
  const lastItem = Math.min(safePage * safePageSize, totalItems);

  return (
    <nav
      aria-label={`${itemLabel} pagination`}
      className={`flex flex-col gap-4 border-t border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${className}`}
    >
      <p aria-live="polite" className="text-center text-sm text-text-secondary sm:text-left">
        Showing <span className="font-medium text-text-primary">{firstItem}–{lastItem}</span> of{" "}
        <span className="font-medium text-text-primary">{totalItems}</span> {itemLabel}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1">
        <button type="button" disabled={safePage <= 1} onClick={() => onPageChange(safePage - 1)} className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm text-text-secondary transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 sm:px-3">
          <ChevronLeft size={16} aria-hidden="true" /> <span>Previous</span>
        </button>

        {getVisiblePages(safePage, safeTotalPages).map((pageNumber, index) =>
          pageNumber === "…" ? (
            <span key={`ellipsis-${index}`} aria-hidden="true" className="px-1 text-text-muted">…</span>
          ) : (
            <button key={pageNumber} type="button" aria-label={`Go to page ${pageNumber}`} aria-current={pageNumber === safePage ? "page" : undefined} onClick={() => onPageChange(pageNumber)} className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition-colors ${pageNumber === safePage ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-surface-muted"}`}>
              {pageNumber}
            </button>
          ),
        )}

        <button type="button" disabled={safePage >= safeTotalPages} onClick={() => onPageChange(safePage + 1)} className="inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm text-text-secondary transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40 sm:px-3">
          <span>Next</span> <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
