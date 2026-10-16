import type { ReactNode } from "react";

interface FilterPanelProps {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Shared accessible shell for feature-owned filter controls. */
export default function FilterPanel({
  title = "Filters",
  actions,
  children,
  className = "",
}: FilterPanelProps) {
  return (
    <section aria-label={title} className={`min-w-0 space-y-5 rounded-xl border border-border bg-surface p-4 sm:p-5 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
