import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="min-h-screen w-full bg-page-background">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((current) => !current)}
      />

      {isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(82vw,280px)] overflow-hidden transition-transform duration-300 md:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isMobile onNavigate={closeMobileSidebar} />
      </div>

      <div
        className={`min-h-screen min-w-0 transition-[margin] duration-300 ${
          isCollapsed ? "md:ml-[88px]" : "md:ml-[280px]"
        }`}
      >
        <header className="flex min-h-[72px] items-center gap-2 border-b border-border bg-surface px-3 sm:px-6">
          <button
            type="button"
            aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileSidebarOpen}
            onClick={() => setIsMobileSidebarOpen((current) => !current)}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-text-primary hover:bg-page-background md:hidden"
          >
            {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="min-w-0 flex-1">
            <Topbar />
          </div>
        </header>

        <main className="min-w-0 p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
