import { MoreVertical } from "lucide-react";
import DataTable from "../../../components/ui/DataTable";
import EmptyTableState from "../../../components/ui/EmptyTableState";
import { TICKET_ISSUE_LABELS, TICKET_RAISED_BY_LABELS, TICKET_STATUS_LABELS } from "../tickets.constants";
import type { SupportTicket, TicketStatus } from "../tickets.types";

interface Props { tickets: SupportTicket[]; onOpen: (ticket: SupportTicket) => void; onStatusChange: (id: string, status: TicketStatus) => void; }
const headings = ["Ticket ID", "Ride ID", "Raised by", "User", "Driver", "Issue type", "Status", "Created", "Action"];

export default function TicketsTable({ tickets, onOpen, onStatusChange }: Props) {
  if (!tickets.length) return <EmptyTableState title="No tickets found" description="Try changing or resetting your filters." />;
  return <DataTable minWidthClassName="min-w-[1120px]"><thead className="bg-surface-muted text-xs font-semibold uppercase tracking-wide text-text-secondary"><tr>{headings.map((heading) => <th key={heading} scope="col" className="whitespace-nowrap border-b border-border px-4 py-4 sm:px-5">{heading}</th>)}</tr></thead>
    <tbody>{tickets.map((ticket) => <tr key={ticket.id} tabIndex={0} onClick={() => onOpen(ticket)} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onOpen(ticket); } }} className="cursor-pointer border-b border-border last:border-b-0 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary">
      <td className="whitespace-nowrap px-4 py-4 text-text-muted sm:px-5">#{ticket.id}</td><td className="whitespace-nowrap px-4 py-4 text-text-muted sm:px-5">#{ticket.rideId}</td>
      <td className="px-4 py-4 sm:px-5"><span className={`rounded-md px-3 py-1.5 text-xs font-semibold ${ticket.raisedBy === "user" ? "bg-dashboard-purple/10 text-dashboard-purple" : "bg-dashboard-cyan/15 text-dashboard-cyan"}`}>{TICKET_RAISED_BY_LABELS[ticket.raisedBy]}</span></td>
      <td className="whitespace-nowrap px-4 py-4 font-medium text-text-primary sm:px-5">{ticket.userName}</td><td className="whitespace-nowrap px-4 py-4 font-medium text-text-primary sm:px-5">{ticket.driverName}</td>
      <td className="whitespace-nowrap px-4 py-4 text-text-secondary sm:px-5"><span className={`mr-2 inline-block h-2 w-2 rounded-full ${ticket.issueType === "driver-behavior" ? "bg-warning" : "bg-error"}`} />{TICKET_ISSUE_LABELS[ticket.issueType]}</td>
      <td className="px-4 py-4 sm:px-5" onClick={(event) => event.stopPropagation()}><select aria-label={`Status for ${ticket.id}`} value={ticket.status} onChange={(event) => onStatusChange(ticket.id, event.target.value as TicketStatus)} className={`h-9 min-w-28 rounded-md border-0 px-2 text-sm font-medium outline-none ${statusClass(ticket.status)}`}>{Object.entries(TICKET_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></td>
      <td className="whitespace-nowrap px-4 py-4 text-text-primary sm:px-5">{formatDate(ticket.createdAt)}</td><td className="px-4 py-4 text-center sm:px-5" onClick={(event) => event.stopPropagation()}><button type="button" aria-label={`Open ${ticket.id}`} onClick={() => onOpen(ticket)} className="rounded-md p-2 text-text-primary hover:bg-surface-muted"><MoreVertical size={19} /></button></td>
    </tr>)}</tbody></DataTable>;
}
function formatDate(value: string) { return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
function statusClass(status: TicketStatus) { return status === "closed" ? "bg-success/15 text-success" : status === "in-progress" ? "bg-warning/15 text-warning" : "bg-error/10 text-error"; }
