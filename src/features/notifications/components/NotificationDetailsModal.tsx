import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { NotificationTemplate } from "../notifications.types";
import { CHANNEL_LABELS } from "../notifications.constants";

type DetailsTab = "template" | "delivery" | "compliance";

interface NotificationDetailsModalProps {
  notification: NotificationTemplate | null;
  onClose: () => void;
  onEdit: (item: NotificationTemplate) => void;
  onToggleStatus: (id: string) => void;
  onDuplicate?: (item: NotificationTemplate) => void;
}

const tabs: { id: DetailsTab; label: string }[] = [
  { id: "template", label: "Template" },
  { id: "delivery", label: "Deliver Settings" },
  { id: "compliance", label: "Compliances and Preferences" },
];

const fieldLabelClass = "mb-1.5 block text-sm font-medium text-[#777777]";
const selectClass =
  "h-11 w-full max-w-[740px] rounded-lg border border-[#BDBDBD] bg-white px-3 text-sm text-[#171717] outline-none transition focus:border-[#2921A8] focus:ring-2 focus:ring-[#2921A8]/15";

export default function NotificationDetailsModal({
  notification,
  onClose,
  onEdit,
  onToggleStatus,
  onDuplicate,
}: NotificationDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<DetailsTab>("template");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!notification) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [notification, onClose]);

  if (!notification) return null;

  const statusLabel =
    notification.status === "active" ? "Active" : "Inactive";
  const channels = notification.channels.map(
    (channel) => CHANNEL_LABELS[channel] ?? channel,
  );

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/30 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-details-title"
        className="relative my-auto flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
      >
        <header className="shrink-0 px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification details"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#222222] transition hover:bg-[#F3F4F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2921A8] sm:right-6 sm:top-6"
          >
            <X size={23} aria-hidden="true" />
          </button>

          <h2
            id="notification-details-title"
            className="max-w-[calc(100%-3rem)] text-lg font-bold text-[#171923] sm:text-xl"
          >
            {notification.event}
          </h2>
          <p className="mt-2 text-sm text-[#555555]">
            Status: <span className="font-medium">{statusLabel}</span>
            <span className="mx-2 text-[#B8B8B8]">|</span>
            Default for EN &amp; HI
          </p>
          <div className="mt-5 border-t border-[#BDBDBD]" />
        </header>

        <nav
          aria-label="Notification detail sections"
          className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#E5E7EB] px-5 sm:gap-7 sm:px-7"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px shrink-0 border-b-[3px] px-2 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-[#2921A8] font-semibold text-[#2921A8]"
                  : "border-transparent text-[#333333] hover:text-[#2921A8]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="min-h-[320px] flex-1 overflow-y-auto p-4 sm:min-h-[420px] sm:p-6">
          {activeTab === "template" && (
            <div className="flex min-h-[400px] flex-col rounded-xl border border-[#999999] p-3 sm:p-4">
              <div className="rounded-lg bg-[#F0F0FC] p-4 sm:p-5">
                <h3 className="text-base font-bold text-[#111111] sm:text-lg">
                  {notification.event}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#333333] sm:text-base">
                  {notification.linkedDescription ||
                    "Notification message content has not been configured yet."}
                </p>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className={fieldLabelClass}>Channel</p>
                  <p className="text-sm text-[#171717]">
                    {channels.length ? channels.join(", ") : "Not configured"}
                  </p>
                </div>
                <div>
                  <p className={fieldLabelClass}>Category</p>
                  <p className="text-sm text-[#171717]">
                    Transactional, critical updates
                  </p>
                </div>
                <div>
                  <p className={fieldLabelClass}>Throttle</p>
                  <p className="text-sm text-[#171717]">
                    Max 3 notifications / 10 min per user
                  </p>
                </div>
                <div>
                  <p className={fieldLabelClass}>Fallback</p>
                  <p className="text-sm text-[#171717]">
                    Send through an enabled secondary channel when configured
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-8 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEdit(notification);
                  }}
                  className="min-h-11 flex-1 rounded-lg border border-[#2921A8] px-4 py-2.5 text-sm font-semibold text-[#2921A8] transition hover:bg-[#F0F0FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2921A8]"
                >
                  Edit Template
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onDuplicate) {
                      onDuplicate(notification);
                      onClose();
                    } else {
                      setFeedback("Duplicate action is not connected yet.");
                    }
                  }}
                  className="min-h-11 flex-1 rounded-lg border border-[#2921A8] px-4 py-2.5 text-sm font-semibold text-[#2921A8] transition hover:bg-[#F0F0FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2921A8]"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onToggleStatus(notification.id);
                    setFeedback(
                      notification.status === "active"
                        ? "Notification template deactivated."
                        : "Notification template activated.",
                    );
                  }}
                  className="min-h-11 flex-1 rounded-lg border border-[#2921A8] px-4 py-2.5 text-sm font-semibold text-[#2921A8] transition hover:bg-[#F0F0FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2921A8]"
                >
                  {notification.status === "active" ? "Pause channel" : "Activate channel"}
                </button>
                <button
                  type="button"
                  onClick={() => setFeedback("Test send is a UI placeholder until the notification API is connected.")}
                  className="min-h-11 flex-1 rounded-lg bg-[#2921A8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#211A8C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2921A8]"
                >
                  Send Test
                </button>
              </div>
              {feedback && (
                <p role="status" className="mt-3 text-sm text-[#555555]">
                  {feedback}
                </p>
              )}
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="min-h-[400px] rounded-xl border border-[#999999] p-5 sm:p-8">
              <div className="grid gap-7">
                <label className="block text-sm text-[#171717]">
                  <span className="mb-1 block">
                    Quiet hours for SMS{" "}
                    <span className="text-[#888888]">
                      (Avoid waking users at night for non-critical events)
                    </span>
                  </span>
                  <select className={selectClass} defaultValue="22:00 – 07:00">
                    <option>22:00 – 07:00</option>
                    <option>23:00 – 06:00</option>
                    <option>No quiet hours</option>
                  </select>
                </label>

                <label className="block text-sm text-[#171717]">
                  <span className="mb-1 block">
                    Retry Policy{" "}
                    <span className="text-[#888888]">
                      (Define how many times and how often to retry failed sends)
                    </span>
                  </span>
                  <select className={selectClass} defaultValue="3 retries – exponential backoff">
                    <option>3 retries – exponential backoff</option>
                    <option>2 retries – fixed interval</option>
                    <option>No retries</option>
                  </select>
                </label>

                <label className="block text-sm text-[#171717]">
                  <span className="mb-1 block">
                    Failover rules{" "}
                    <span className="text-[#888888]">
                      (Switch channels when primary delivery fails)
                    </span>
                  </span>
                  <select className={selectClass} defaultValue="If push fails › send SMS (critical only)">
                    <option>If push fails › send SMS (critical only)</option>
                    <option>If in-app fails › send push</option>
                    <option>No failover</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="min-h-[400px] rounded-xl border border-[#999999] p-5 sm:p-8">
              <div className="grid gap-7">
                <label className="block text-sm text-[#171717]">
                  <span className="mb-1 block">
                    Respect user notification preferences{" "}
                    <span className="text-[#888888]">
                      (Honor per-channel opt-outs for non-transactional events)
                    </span>
                  </span>
                  <select className={selectClass} defaultValue="Respect user preferences">
                    <option>Respect user preferences</option>
                    <option>Required transactional notification</option>
                  </select>
                </label>

                <label className="block text-sm text-[#171717]">
                  <span className="mb-1 block">
                    Transactional vs promotional{" "}
                    <span className="text-[#888888]">
                      (Mark templates correctly for DLT / TRAI compliance)
                    </span>
                  </span>
                  <select className={selectClass} defaultValue="Transactional by default">
                    <option>Transactional by default</option>
                    <option>Promotional</option>
                  </select>
                </label>

                <label className="block text-sm text-[#171717]">
                  <span className="mb-1 block">
                    Unsubscribe &amp; opt-out rules{" "}
                    <span className="text-[#888888]">
                      (Manage how users stop receiving marketing messages)
                    </span>
                  </span>
                  <select className={selectClass} defaultValue="Enforced">
                    <option>Enforced</option>
                    <option>Disabled for critical transactional events</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
