import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_RIDER_FILTERS, RIDERS_PAGE_SIZE } from "../riders.constants";

import { getPassengers } from "../riders.api";
import type { PassengerApi } from "../riders.api";

import type {
  Rider,
  RiderFilters,
  RiderStatus,
  RiderAccountStatus,
} from "../riders.types";

import { usePagination } from "../../../hooks/usePagination";
import { getApiErrorMessage } from "../../../services/api/axios";

function mapPassengerToRider(passenger: PassengerApi): Rider {
  const firstName = passenger.firstName?.trim() || "";
  const lastName = passenger.lastName?.trim() || "";
  const name = `${firstName} ${lastName}`.trim() || passenger.email || "Passenger";

  const profileImg = passenger.profileImage?.trim();
  const avatarUrl =
    profileImg && profileImg !== "null" && profileImg !== "undefined"
      ? profileImg
      : undefined;

  return {
    id: passenger.id,
    riderCode: passenger.id,
    name,
    email: passenger.email || "",
    avatarUrl,
    phoneNumber: passenger.phone || "",
    walletBalance: typeof passenger.walletBalance === "number" ? passenger.walletBalance : Number(passenger.walletBalance) || 0,
    registrationDate: passenger.createdAt || "",
    ridesTaken: typeof passenger.totalCompletedRides === "number" ? passenger.totalCompletedRides : Number(passenger.totalCompletedRides) || 0,
    status: passenger.isActive ? "active" : "inactive",
    accountStatus: "unblocked",
  };
}

export function useRiders() {
  const [filters, setFilters] = useState<RiderFilters>(() => ({
    ...DEFAULT_RIDER_FILTERS,
  }));

  const [riders, setRiders] = useState<Rider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPassengers() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPassengers({ signal: controller.signal });

        if (controller.signal.aborted) return;

        setRiders(response.data.map(mapPassengerToRider));
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        setError(getApiErrorMessage(err));
        setRiders([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPassengers();

    return () => {
      controller.abort();
    };
  }, [refreshKey]);

  const filteredRiders = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return riders.filter((rider) => {
      const date = rider.registrationDate.slice(0, 10);

      const matchesSearch =
        !search ||
        [rider.name, rider.riderCode, rider.phoneNumber, rider.email].some(
          (value) => value.toLowerCase().includes(search),
        );

      const matchesFromDate = !filters.fromDate || date >= filters.fromDate;

      const matchesToDate = !filters.toDate || date <= filters.toDate;


      const matchesLocation = filters.location === "all";

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
      setFilters((current) => ({
        ...current,
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
    setRiders((current) =>
      current.map((rider) => (rider.id === id ? { ...rider, status } : rider)),
    );
  }, []);

  const updateAccountStatus = useCallback(
    (id: string, accountStatus: RiderAccountStatus) => {
      setRiders((current) =>
        current.map((rider) =>
          rider.id === id ? { ...rider, accountStatus } : rider,
        ),
      );
    },
    [],
  );

  const refreshRiders = useCallback(() => {
    setRefreshKey((current) => current + 1);
  }, []);

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
    isLoading,
    error,
    refreshRiders,
  };
}
