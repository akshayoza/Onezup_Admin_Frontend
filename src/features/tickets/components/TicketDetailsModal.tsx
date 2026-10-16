import { X } from "lucide-react";
import { TICKET_ISSUE_LABELS, TICKET_RAISED_BY_LABELS, TICKET_STATUS_LABELS } from "../tickets.constants";
import type { SupportTicket, TicketStatus } from "../tickets.types";

interface Props { ticket: SupportTicket; onClose: () => void; onStatusChange: (status: TicketStatus) => void; }
export default function TicketDetailsModal({ ticket, onClose, onStatusChange }: Props) {
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="ticket-details-title" className="relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl">
      <button type="button" aria-label="Close ticket details" onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-text-secondary hover:bg-surface-muted"><X size={20} /></button>
      <h2 id="ticket-details-title" className="text-xl font-bold text-text-primary">Ticket details</h2>
      <dl className="mt-6 grid gap-4 text-sm"><Detail label="Ticket ID" value={`#${ticket.id}`} /><Detail label="Ride ID" value={`#${ticket.rideId}`} /><Detail label="Raised by" value={TICKET_RAISED_BY_LABELS[ticket.raisedBy]} /><Detail label="User" value={ticket.userName} /><Detail label="Driver" value={ticket.driverName} /><Detail label="Issue type" value={TICKET_ISSUE_LABELS[ticket.issueType]} /></dl>
      <label className="mt-5 block text-sm font-medium text-text-secondary">Status<select value={ticket.status} onChange={(event) => onStatusChange(event.target.value as TicketStatus)} className={`mt-1.5 h-11 w-full rounded-lg border-0 px-3 font-medium outline-none ${statusClass(ticket.status)}`}>{Object.entries(TICKET_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <p className="mt-5 text-sm text-text-secondary">Created</p><p className="mt-1 font-medium text-text-primary">{formatDate(ticket.createdAt)}</p>
      <section className="mt-5 rounded-lg bg-surface-muted p-4"><h3 className="font-semibold text-text-primary">Issue description</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{ticket.description}</p></section>
    </section>
  </div>;
}
function Detail({ label, value }: { label: string; value: string }) { return <div><dt className="text-text-muted">{label}</dt><dd className="mt-1 font-medium text-text-primary">{value}</dd></div>; }
function formatDate(value: string) { return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
function statusClass(status: TicketStatus) { return status === "closed" ? "bg-success/15 text-success" : status === "in-progress" ? "bg-warning/15 text-warning" : "bg-error/10 text-error"; }
