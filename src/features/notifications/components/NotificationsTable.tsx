import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

import { CHANNEL_LABELS } from "../notifications.constants";
import type { NotificationTemplate } from "../notifications.types";
import NotificationStatusBadge from "./NotificationStatusBadge";
import NotificationDetailsModal from "./NotificationDetailsModal";
import DataTable from "../../../components/ui/DataTable";
import EmptyTableState from "../../../components/ui/EmptyTableState";

interface NotificationsTableProps {
  notifications: NotificationTemplate[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: NotificationTemplate) => void;
  onDuplicate?: (item: NotificationTemplate) => void;
}

const channelStyles: Record<string, string> = {
  "in-app": "bg-[#C8E8FF] text-[#1689E9]",
  push: "bg-[#C8E8FF] text-[#1689E9]",
  sms: "bg-[#FBF0D7] text-[#C47B3D]",
  email: "bg-[#E9E1FF] text-[#6D4BC3]",
};

const headings = ["Event", "Linked", "Channel", "Status", "Created", "Action"];

export default function NotificationsTable({
  notifications,
  onToggleStatus,
  onDelete,
  onEdit,
  onDuplicate,
}: NotificationsTableProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationTemplate | null>(null);

  useEffect(() => {
    if (!openId) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openId]);

  const openDetails = (item: NotificationTemplate) => {
    setOpenId(null);
    setSelectedNotification(item);
  };

  if (notifications.length === 0) {
    return (
      <EmptyTableState title="No notifications found" description="Try changing the filters or create a notification." />
    );
  }

  return (
    <>
      <div className="w-full min-w-0 overflow-hidden bg-white">
        <DataTable minWidthClassName="min-w-[1050px]">
            <thead className="bg-[#F3F4F6]">
              <tr>
                {headings.map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="whitespace-nowrap border-b border-[#E5E7EB] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-[#666666] sm:px-5"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {notifications.map((item) => {
                const isMenuOpen = openId === item.id;

                return (
                  <tr
                    key={item.id}
                    tabIndex={0}
                    aria-label={`Open details for ${item.event}`}
                    onClick={() => openDetails(item)}
                    onKeyDown={(event) => {
                      if (
                        event.target === event.currentTarget &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        openDetails(item);
                      }
                    }}
                    className="cursor-pointer border-b border-[#EEEEEE] last:border-b-0 transition-colors hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary"
                  >
                    <td className="max-w-[240px] px-4 py-4 font-medium text-text-primary sm:px-5">
                      <span className="block truncate" title={item.event}>
                        {item.event}
                      </span>
                    </td>

                    <td className="max-w-[320px] px-4 py-4 text-sm text-[#777777] sm:px-5">
                      <span
                        className="block truncate"
                        title={item.linkedDescription}
                      >
                        {item.linkedDescription}
                      </span>
                    </td>

                    <td className="px-4 py-4 sm:px-5">
                      <div className="flex min-w-[170px] flex-wrap items-center gap-1.5">
                        {item.channels.map((channel) => (
                          <span
                            key={channel}
                            className={`inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold ${
                              channelStyles[channel] ??
                              "bg-[#EEEEF2] text-[#555566]"
                            }`}
                          >
                            {CHANNEL_LABELS[channel]}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                      <NotificationStatusBadge status={item.status} />
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm text-text-primary sm:px-5">
                      {item.createdAt}
                    </td>

                    <td className="relative px-4 py-4 sm:px-5">
                      <div className="relative flex justify-center">
                        <button
                          type="button"
                          aria-label={`Actions for ${item.event}`}
                          aria-haspopup="menu"
                          aria-expanded={isMenuOpen}
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenId((current) =>
                              current === item.id ? null : item.id,
                            );
                          }}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-[#EEEEEE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                        >
                          <MoreVertical size={19} aria-hidden="true" />
                        </button>

                        {isMenuOpen && (
                          <>
                            <button
                              type="button"
                              tabIndex={-1}
                              aria-label="Close actions menu"
                              className="fixed inset-0 z-20 cursor-default"
                              onClick={(event) => {
                                event.stopPropagation();
                                setOpenId(null);
                              }}
                            />

                            <div
                              role="menu"
                              className="absolute right-0 top-10 z-30 w-48 rounded-lg border border-[#E5E7EB] bg-white p-1.5 shadow-lg"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => openDetails(item)}
                                className="w-full rounded-md px-3 py-2.5 text-left text-sm text-text-primary hover:bg-[#F3F4F6]"
                              >
                                View details
                              </button>
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                  setOpenId(null);
                                  onEdit(item);
                                }}
                                className="w-full rounded-md px-3 py-2.5 text-left text-sm text-text-primary hover:bg-[#F3F4F6]"
                              >
                                Edit template
                              </button>
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                  setOpenId(null);
                                  onToggleStatus(item.id);
                                }}
                                className="w-full rounded-md px-3 py-2.5 text-left text-sm text-text-primary hover:bg-[#F3F4F6]"
                              >
                                {item.status === "active" ? "Deactivate" : "Activate"}
                              </button>
                              {onDuplicate && (
                                <button
                                  type="button"
                                  role="menuitem"
                                  onClick={() => {
                                    setOpenId(null);
                                    onDuplicate(item);
                                  }}
                                  className="w-full rounded-md px-3 py-2.5 text-left text-sm text-text-primary hover:bg-[#F3F4F6]"
                                >
                                  Duplicate template
                                </button>
                              )}
                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                  setOpenId(null);
                                  onDelete(item.id);
                                }}
                                className="w-full rounded-md px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                              >
                                Delete template
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </DataTable>
      </div>

      {selectedNotification && (
        <NotificationDetailsModal
          key={selectedNotification.id}
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onDuplicate={onDuplicate}
        />
      )}
    </>
  );
}
