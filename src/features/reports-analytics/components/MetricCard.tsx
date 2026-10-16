import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReportMetric } from "../reports.types";

interface MetricCardProps {
  metric: ReportMetric;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu when clicking outside the card's menu.
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <article className="group relative min-w-0 rounded-xl border border-transparent bg-white p-4 transition-colors duration-200 ease-in-out hover:bg-[#1F96861A] sm:p-5 cursor-pointer">
      {/* Card heading and options menu */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-sm font-medium text-[#17191F] sm:text-base">
          {metric.title}
        </h3>

        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            aria-label={`Options for ${metric.title}`}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="
              rounded-md p-1 text-[#15171B]
              transition-colors duration-150
              hover:bg-black/5
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1F9686]
              focus-visible:ring-offset-2
            "
          >
            <MoreVertical size={19} strokeWidth={2} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              aria-label={`${metric.title} options`}
              className="
                absolute right-0 top-full z-30 mt-1 w-48
                rounded-lg border border-gray-200
                bg-white p-1 shadow-lg
              "
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="
                  w-full rounded-md px-3 py-2
                  text-left text-sm text-gray-700
                  transition-colors hover:bg-gray-50
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#1F9686]
                "
              >
                Close menu
              </button>

              <p className="px-3 pb-2 pt-1 text-xs leading-relaxed text-gray-500">
                More metric actions can be connected when reporting
                functionality is available.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Metric value */}
      <p className="mt-2 break-words text-2xl font-bold leading-tight tracking-tight text-[#219B8D] sm:text-[30px]">
        {metric.value}
      </p>

      {/* Comparison with the previous period */}
      <p className="mt-2 text-xs leading-relaxed text-[#22252B] sm:text-sm">
        {metric.comparison}
      </p>
    </article>
  );
}
