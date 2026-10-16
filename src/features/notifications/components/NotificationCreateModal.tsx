import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { CreateNotificationInput, NotificationAudience, NotificationChannel, NotificationTemplate } from "../notifications.types";

interface Props { isOpen: boolean; onClose: () => void; onSubmit: (input: CreateNotificationInput) => void; initialValue?: NotificationTemplate | null; }
const channels: { label: string; value: NotificationChannel }[] = [
  { label: "In-app", value: "in-app" }, { label: "Push", value: "push" }, { label: "SMS", value: "sms" }, { label: "Email", value: "email" },
];
const inputClass = "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-[#2921A8] focus:ring-2 focus:ring-[#2921A8]/15";

export default function NotificationCreateModal({ isOpen, onClose, onSubmit, initialValue }: Props) {
  // The parent remounts this modal for each create/edit action, making the
  // initial form state explicit and avoiding a state-reset effect.
  const [eventName, setEventName] = useState(() => initialValue?.event ?? "");
  const [description, setDescription] = useState(() => initialValue?.linkedDescription ?? "");
  const [audience, setAudience] = useState<NotificationAudience>(() => initialValue?.audience ?? "all-users");
  const [selectedChannels, setSelectedChannels] = useState<NotificationChannel[]>(() => initialValue ? [...initialValue.channels] : ["in-app"]);
  const [message, setMessage] = useState(() => initialValue?.message ?? "");
  const [status, setStatus] = useState<"active" | "draft">(() => initialValue?.status === "active" ? "active" : "draft");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const oldOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener("keydown", onKey); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const toggleChannel = (channel: NotificationChannel) => setSelectedChannels((current) => current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!eventName.trim() || !description.trim() || !message.trim()) { setError("Complete the event, linked description and message fields."); return; }
    if (!selectedChannels.length) { setError("Select at least one delivery channel."); return; }
    onSubmit({ event: eventName.trim(), linkedDescription: description.trim(), audience, channels: selectedChannels, message: message.trim(), status });
    onClose();
  };

  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="notification-modal-title" className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6"><div><h2 id="notification-modal-title" className="text-lg font-semibold text-text-primary">{initialValue ? "Edit notification" : "Create notification"}</h2><p className="mt-1 text-sm text-text-secondary">Configure the template and delivery channels.</p></div><button type="button" onClick={onClose} aria-label="Close modal" className="rounded-lg p-2 text-text-secondary hover:bg-surface-muted"><X size={20} /></button></header>
      <form onSubmit={submit} className="space-y-4 p-5 sm:p-6">
        <label className="block text-sm font-medium text-text-primary">Event name<input value={eventName} onChange={(e) => setEventName(e.target.value)} maxLength={80} className={inputClass} placeholder="e.g. Ride booked" /></label>
        <label className="block text-sm font-medium text-text-primary">Linked description<input value={description} onChange={(e) => setDescription(e.target.value)} maxLength={160} className={inputClass} placeholder="When should this notification trigger?" /></label>
        <label className="block text-sm font-medium text-text-primary">Audience<select value={audience} onChange={(e) => setAudience(e.target.value as NotificationAudience)} className={inputClass}><option value="all-users">All users</option><option value="passengers">Passengers</option><option value="drivers">Drivers</option></select></label>
        <fieldset><legend className="text-sm font-medium text-text-primary">Delivery channels</legend><div className="mt-2 flex flex-wrap gap-4">{channels.map((item) => <label key={item.value} className="inline-flex items-center gap-2 text-sm text-text-secondary"><input type="checkbox" checked={selectedChannels.includes(item.value)} onChange={() => toggleChannel(item.value)} className="accent-[#2921A8]" />{item.label}</label>)}</div></fieldset>
        <label className="block text-sm font-medium text-text-primary">Message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} maxLength={500} className={inputClass} placeholder="Write the notification message..." /></label>
        <label className="block text-sm font-medium text-text-primary">Status<select value={status} onChange={(e) => setStatus(e.target.value as "active" | "draft")} className={inputClass}><option value="draft">Draft</option><option value="active">Active</option></select></label>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <footer className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-muted">Cancel</button><button type="submit" className="rounded-lg bg-[#2921A8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#211A8C]">{initialValue ? "Save changes" : "Create template"}</button></footer>
      </form>
    </section>
  </div>;
}
