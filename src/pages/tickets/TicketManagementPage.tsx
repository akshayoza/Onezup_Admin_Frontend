import { useState } from "react";
import Pagination from "../../components/ui/Pagination";
import TicketDetailsModal from "../../features/tickets/components/TicketDetailsModal";
import TicketFilters from "../../features/tickets/components/TicketFilters";
import TicketsTable from "../../features/tickets/components/TicketsTable";
import { useTickets } from "../../features/tickets/hooks/useTickets";
import type { SupportTicket } from "../../features/tickets/tickets.types";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function TicketManagementPage() {
  const { tickets, filters, updateFilters, resetFilters, page, setPage, pageSize, totalItems, totalPages, updateTicketStatus } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  return <DashboardLayout><div className="min-w-0 space-y-5"><TicketFilters filters={filters} onChange={updateFilters} onReset={resetFilters} /><section aria-label="Support tickets" className="overflow-hidden rounded-xl border border-border bg-surface"><TicketsTable tickets={tickets} onOpen={setSelectedTicket} onStatusChange={updateTicketStatus} /><Pagination page={page} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} itemLabel="tickets" onPageChange={setPage} /></section>{selectedTicket && <TicketDetailsModal key={selectedTicket.id} ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onStatusChange={(status) => { updateTicketStatus(selectedTicket.id, status); setSelectedTicket((current) => current ? { ...current, status } : null); }} />}</div></DashboardLayout>;
}
