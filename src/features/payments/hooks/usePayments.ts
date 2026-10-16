import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PAYMENT_FILTERS, PAYMENTS_PAGE_SIZE } from "../payments.constants";
import { MOCK_PAYMENT_RECORDS } from "../payments.mock";
import type { PaymentFilters, PaymentTab } from "../payments.types";
import { usePagination } from "../../../hooks/usePagination";

export function usePayments() {
  const [filters, setFilters] = useState<PaymentFilters>({ ...DEFAULT_PAYMENT_FILTERS });
  const [activeTab, setActiveTab] = useState<PaymentTab>("driver-payouts");

  const tabRecords = useMemo(() => activeTab === "passenger-transactions"
    ? MOCK_PAYMENT_RECORDS.filter((record) => record.transactionType === "passenger")
    : MOCK_PAYMENT_RECORDS.filter((record) => record.transactionType === "driver"), [activeTab]);

  const filteredPayments = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return tabRecords.filter((record) => {
      const matchesSearch = !search || [record.transactionId, record.driverName, record.vehicleType, record.vehicleInfo, record.location].some((value) => value.toLowerCase().includes(search));
      const matchesLocation = filters.location === "all" || record.location === filters.location;
      const matchesDriver = filters.driverStatus === "all" || record.driverStatus === filters.driverStatus;
      const matchesPayout = filters.payoutStatus === "all" || record.payoutStatus === filters.payoutStatus;
      const matchesFrom = !filters.fromDate || record.createdAt >= filters.fromDate;
      const matchesTo = !filters.toDate || record.createdAt <= filters.toDate;
      return matchesSearch && matchesLocation && matchesDriver && matchesPayout && matchesFrom && matchesTo;
    });
  }, [filters, tabRecords]);

  const { page, totalPages, setPage, resetPage } = usePagination({ totalItems: filteredPayments.length, pageSize: PAYMENTS_PAGE_SIZE });
  const payments = useMemo(() => filteredPayments.slice((page - 1) * PAYMENTS_PAGE_SIZE, page * PAYMENTS_PAGE_SIZE), [filteredPayments, page]);
  const updateFilters = useCallback((updates: Partial<PaymentFilters>) => { setFilters((current) => ({ ...current, ...updates })); resetPage(); }, [resetPage]);
  const resetFilters = useCallback(() => { setFilters({ ...DEFAULT_PAYMENT_FILTERS }); resetPage(); }, [resetPage]);
  const changeTab = useCallback((tab: PaymentTab) => { setActiveTab(tab); resetPage(); }, [resetPage]);

  return { activeTab, changeTab, filters, updateFilters, resetFilters, payments, page, setPage, pageSize: PAYMENTS_PAGE_SIZE, totalItems: filteredPayments.length, totalPages };
}
