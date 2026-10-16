import { useCallback, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import NotificationCreateModal from "../../features/notifications/components/NotificationCreateModal";
import NotificationFilters from "../../features/notifications/components/NotificationFilters";
import Pagination from "../../components/ui/Pagination";
import NotificationStats from "../../features/notifications/components/NotificationStats";
import NotificationsTable from "../../features/notifications/components/NotificationsTable";

import { useNotifications } from "../../features/notifications/hooks/useNotifications";

import type {
  CreateNotificationInput,
  NotificationTemplate,
} from "../../features/notifications/notifications.types";

export default function NotificationManagementPage() {
  const {
    items,
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    pageSize,
    totalItems,
    totalPages,
    createNotification,
    updateNotification,
    toggleStatus,
    deleteNotification,
  } = useNotifications();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<NotificationTemplate | null>(null);

  const openCreate = useCallback(() => {
    setEditing(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((item: NotificationTemplate) => {
    setEditing(item);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditing(null);
  }, []);

  const handleSubmit = useCallback(
    (input: CreateNotificationInput) => {
      if (editing) {
        updateNotification({
          ...editing,
          ...input,
        });
      } else {
        createNotification(input);
      }

      closeModal();
    },
    [editing, updateNotification, createNotification, closeModal],
  );

  return (
    <DashboardLayout>
      <main className="min-w-0 space-y-4 px-4 pb-6 pt-4 sm:px-5 sm:pb-6 lg:px-6">
        <NotificationStats />

        <NotificationFilters
          filters={filters}
          onChange={updateFilters}
          onReset={resetFilters}
          onCreate={openCreate}
        />

        <section
          aria-label="Notification templates"
          className="overflow-hidden rounded-xl border border-border bg-surface"
        >
          <NotificationsTable
            notifications={items}
            onToggleStatus={toggleStatus}
            onDelete={deleteNotification}
            onEdit={openEdit}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            itemLabel="notifications"
            onPageChange={setPage}
          />
        </section>

        {modalOpen && (
          <NotificationCreateModal
            key={editing?.id ?? "new"}
            isOpen
            onClose={closeModal}
            onSubmit={handleSubmit}
            initialValue={editing}
          />
        )}
      </main>
    </DashboardLayout>
  );
}
