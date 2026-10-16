import type { ReactNode } from "react";

interface DataTableProps {
  children: ReactNode;
  minWidthClassName?: string;
  className?: string;
}


export default function DataTable({
  children,
  minWidthClassName = "",
  className = "",
}: DataTableProps) {
  return (
    <div className={`w-full min-w-0 overflow-x-auto overscroll-x-contain ${className}`}>
      <table className={`w-full border-collapse text-left text-sm ${minWidthClassName}`}>
        {children}
      </table>
    </div>
  );
}
