import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
}

const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <header className="flex min-h-14 items-center justify-between gap-4">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
        {title}
      </h1>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
};

export default PageHeader;
