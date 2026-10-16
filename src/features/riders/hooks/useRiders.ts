import { useCallback, useMemo, useState } from "react";

import { DEFAULT_RIDER_FILTERS, RIDERS_PAGE_SIZE } from "../riders.constants";
import { MOCK_RIDERS } from "../riders.mock";
import type {
  Rider,
  RiderFilters,
  RiderStatus,
  RiderAccountStatus,
} from "../riders.types";
import { usePagination } from "../../../hooks/usePagination";

export function useRiders() {
  const [filters, setFilters] = useState<RiderFilters>(() => ({
    ...DEFAULT_RIDER_FILTERS,
  }));
  const [riders, setRiders] = useState<Rider[]>(MOCK_RIDERS);

  const filteredRiders = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return riders.filter((rider) => {
      const date = rider.registrationDate.slice(0, 10);

      const matchesSearch =
        !search ||
        [rider.name, rider.riderCode, rider.phoneNumber].some((value) =>
          value.toLowerCase().includes(search),
        );

      const matchesFromDate = !filters.fromDate || date >= filters.fromDate;

      const matchesToDate = !filters.toDate || date <= filters.toDate;

      const matchesLocation =
        filters.location === "all" || riderLocation(rider) === filters.location;

      const matchesStatus =
        filters.status === "all" || rider.status === filters.status;

      const matchesAccount =
        filters.accountStatus === "all" ||
        rider.accountStatus === filters.accountStatus;

      const matchesMinWallet =
        filters.minWalletBalance === "" ||
        rider.walletBalance >= filters.minWalletBalance;

      const matchesMaxWallet =
        filters.maxWalletBalance === "" ||
        rider.walletBalance <= filters.maxWalletBalance;

      return (
        matchesSearch &&
        matchesFromDate &&
        matchesToDate &&
        matchesLocation &&
        matchesStatus &&
        matchesAccount &&
        matchesMinWallet &&
        matchesMaxWallet
      );
    });
  }, [filters, riders]);

  const { page, totalPages, setPage, resetPage } = usePagination({
    totalItems: filteredRiders.length,
    pageSize: RIDERS_PAGE_SIZE,
  });

  const pageItems = useMemo(() => {
    const startIndex = (page - 1) * RIDERS_PAGE_SIZE;

    return filteredRiders.slice(startIndex, startIndex + RIDERS_PAGE_SIZE);
  }, [filteredRiders, page]);

  const updateFilters = useCallback(
    (updates: Partial<RiderFilters>) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        ...updates,
      }));

      resetPage();
    },
    [resetPage],
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_RIDER_FILTERS });
    resetPage();
  }, [resetPage]);

  const updateRiderStatus = useCallback((id: string, status: RiderStatus) => {
    setRiders((currentRiders) =>
      currentRiders.map((rider) =>
        rider.id === id ? { ...rider, status } : rider,
      ),
    );
  }, []);

  const updateAccountStatus = useCallback(
    (id: string, accountStatus: RiderAccountStatus) => {
      setRiders((currentRiders) =>
        currentRiders.map((rider) =>
          rider.id === id ? { ...rider, accountStatus } : rider,
        ),
      );
    },
    [],
  );

  return {
    filters,
    updateFilters,
    resetFilters,
    riders: pageItems,
    allFilteredRiders: filteredRiders,
    page,
    setPage,
    pageSize: RIDERS_PAGE_SIZE,
    totalItems: filteredRiders.length,
    totalPages,
    updateRiderStatus,
    updateAccountStatus,
  };
}

// Mock location until the backend's rider schema provides a location field.
function riderLocation(rider: Rider): string {
  const locations = ["Bengaluru", "Pune", "Delhi", "Ahmedabad"];
  const number = Number(rider.id.match(/\d+$/)?.[0] ?? 1);

  return locations[(number - 1) % locations.length];
}
