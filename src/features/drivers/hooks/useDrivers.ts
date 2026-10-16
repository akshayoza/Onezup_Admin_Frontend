import { useCallback, useMemo, useState } from "react";

import {
  DEFAULT_DRIVER_FILTERS,
  DEFAULT_PAGE_SIZE,
} from "../drivers.constants";
import { MOCK_DRIVERS } from "../drivers.mock";
import type { DriverFilters } from "../drivers.types";
import { usePagination } from "../../../hooks/usePagination";

export function useDrivers() {
  const [filters, setFilters] = useState<DriverFilters>(() => ({
    ...DEFAULT_DRIVER_FILTERS,
  }));

  const filteredDrivers = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return MOCK_DRIVERS.filter((driver) => {
      const searchableValues = [
        driver.name,
        driver.driverCode,
        driver.contact,
        driver.city,
        driver.vehicle,
        driver.email ?? "",
      ];

      const matchesSearch =
        !search ||
        searchableValues.some((value) => value.toLowerCase().includes(search));

      const matchesLocation =
        filters.location === "all" ||
        driver.city.toLowerCase() === filters.location.toLowerCase();

      const matchesDriverStatus =
        filters.driverStatus === "all" ||
        driver.driverStatus === filters.driverStatus;

      const matchesPayoutStatus =
        filters.payoutStatus === "all" ||
        driver.payoutStatus === filters.payoutStatus;

      const matchesFromDate =
        !filters.fromDate || driver.joinedAt >= filters.fromDate;

      const matchesToDate =
        !filters.toDate || driver.joinedAt <= filters.toDate;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesDriverStatus &&
        matchesPayoutStatus &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }, [filters]);

  const { page, totalPages, setPage, resetPage } = usePagination({
    totalItems: filteredDrivers.length,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const drivers = useMemo(() => {
    const startIndex = (page - 1) * DEFAULT_PAGE_SIZE;

    return filteredDrivers.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);
  }, [filteredDrivers, page]);

  const updateFilters = useCallback(
    (updates: Partial<DriverFilters>) => {
      setFilters((currentFilters) => ({
        ...currentFilters,
        ...updates,
      }));

      resetPage();
    },
    [resetPage],
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_DRIVER_FILTERS });
    resetPage();
  }, [resetPage]);

  return {
    drivers,
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    pageSize: DEFAULT_PAGE_SIZE,
    totalPages,
    totalItems: filteredDrivers.length,
  };
}
