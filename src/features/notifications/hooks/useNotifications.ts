import { useCallback, useMemo, useState } from "react";
import { DEFAULT_NOTIFICATION_FILTERS, NOTIFICATION_PAGE_SIZE } from "../notifications.constants";
import { MOCK_NOTIFICATION_TEMPLATES } from "../notifications.mock";
import type { CreateNotificationInput, NotificationFilters, NotificationTemplate } from "../notifications.types";
import { usePagination } from "../../../hooks/usePagination";

export function useNotifications() {
  const [records, setRecords] = useState<NotificationTemplate[]>(() =>
    MOCK_NOTIFICATION_TEMPLATES.map((record) => ({ ...record, channels: [...record.channels] })),
  );
  const [filters, setFilters] = useState<NotificationFilters>({ ...DEFAULT_NOTIFICATION_FILTERS });

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return records.filter((record) =>
      (filters.channel === "all" || record.channels.includes(filters.channel)) &&
      (filters.audience === "all" || record.audience === filters.audience) &&
      (filters.status === "all" || record.status === filters.status) &&
      (!query || [record.event, record.linkedDescription, record.message, record.id].some((v) => v.toLowerCase().includes(query))),
    );
  }, [records, filters]);

  const { page, totalPages, setPage, resetPage } = usePagination({ totalItems: filtered.length, pageSize: NOTIFICATION_PAGE_SIZE });
  const items = filtered.slice((page - 1) * NOTIFICATION_PAGE_SIZE, page * NOTIFICATION_PAGE_SIZE);

  const updateFilters = useCallback((updates: Partial<NotificationFilters>) => {
    setFilters((current) => ({ ...current, ...updates }));
    resetPage();
  }, [resetPage]);
  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_NOTIFICATION_FILTERS });
    resetPage();
  }, [resetPage]);
  const createNotification = (input: CreateNotificationInput) => {
    const newRecord: NotificationTemplate = {
      ...input,
      id: `ntf-${Date.now()}`,
      createdAt: new Date().toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }),
    };
    setRecords((current) => [newRecord, ...current]);
    resetPage();
  };
  const updateNotification = (record: NotificationTemplate) =>
    setRecords((current) => current.map((item) => item.id === record.id ? record : item));
  const toggleStatus = (id: string) =>
    setRecords((current) => current.map((item) => item.id === id ? { ...item, status: item.status === "active" ? "inactive" : "active" } : item));
  const deleteNotification = (id: string) => {
    setRecords((current) => current.filter((item) => item.id !== id));
    resetPage();
  };

  return { items, filters, updateFilters, resetFilters, page, setPage, pageSize: NOTIFICATION_PAGE_SIZE, totalItems: filtered.length, totalPages, createNotification, updateNotification, toggleStatus, deleteNotification };
}
