import { useCallback, useMemo, useState } from "react";

interface UsePaginationOptions {
  totalItems: number;
  pageSize: number;
}

/**
 * Owns only pagination state. It deliberately does not know about filters or
 * data sources, so it works for local arrays and future server-side APIs.
 */
export function usePagination({ totalItems, pageSize }: UsePaginationOptions) {
  const [requestedPage, setRequestedPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
  const page = Math.min(requestedPage, totalPages);

  const setPage = useCallback(
    (nextPage: number) => {
      if (!Number.isInteger(nextPage)) return;
      setRequestedPage(Math.max(1, Math.min(nextPage, totalPages)));
    },
    [totalPages],
  );

  const resetPage = useCallback(() => setRequestedPage(1), []);

  return useMemo(
    () => ({ page, totalPages, setPage, resetPage }),
    [page, resetPage, setPage, totalPages],
  );
}
