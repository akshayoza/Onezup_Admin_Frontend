import { useCallback, useMemo, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { DEFAULT_TICKET_FILTERS, TICKETS_PAGE_SIZE } from "../tickets.constants";
import { MOCK_TICKETS } from "../tickets.mock";
import type { SupportTicket, TicketFilters, TicketStatus } from "../tickets.types";

export function useTickets() {
  const [filters, setFilters] = useState<TicketFilters>(() => ({ ...DEFAULT_TICKET_FILTERS }));
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const filteredTickets = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesSearch = !query || [ticket.id, ticket.rideId, ticket.userName, ticket.driverName].some((value) => value.toLowerCase().includes(query));
      return matchesSearch && (filters.raisedBy === "all" || ticket.raisedBy === filters.raisedBy) && (filters.issueType === "all" || ticket.issueType === filters.issueType) && (filters.status === "all" || ticket.status === filters.status) && (!filters.fromDate || ticket.createdAt >= filters.fromDate) && (!filters.toDate || ticket.createdAt <= filters.toDate);
    });
  }, [filters, tickets]);
  const { page, totalPages, setPage, resetPage } = usePagination({ totalItems: filteredTickets.length, pageSize: TICKETS_PAGE_SIZE });
  const visibleTickets = useMemo(() => filteredTickets.slice((page - 1) * TICKETS_PAGE_SIZE, page * TICKETS_PAGE_SIZE), [filteredTickets, page]);
  const updateFilters = useCallback((updates: Partial<TicketFilters>) => { setFilters((current) => ({ ...current, ...updates })); resetPage(); }, [resetPage]);
  const resetFilters = useCallback(() => { setFilters({ ...DEFAULT_TICKET_FILTERS }); resetPage(); }, [resetPage]);
  const updateTicketStatus = useCallback((id: string, status: TicketStatus) => { setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, status } : ticket)); }, []);
  return { tickets: visibleTickets, filters, updateFilters, resetFilters, page, setPage, pageSize: TICKETS_PAGE_SIZE, totalItems: filteredTickets.length, totalPages, updateTicketStatus };
}
