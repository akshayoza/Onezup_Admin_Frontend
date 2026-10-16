interface EmptyTableStateProps {
  title: string;
  description?: string;
}

/** Consistent empty state for filtered or API-backed data tables. */
export default function EmptyTableState({ title, description }: EmptyTableStateProps) {
  return (
    <div className="rounded-xl border border-border bg-surface px-6 py-14 text-center">
      <p className="font-semibold text-text-primary">{title}</p>
      {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
    </div>
  );
}
