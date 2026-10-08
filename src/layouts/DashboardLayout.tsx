import { useState, type ReactNode } from "react";

import Sidebar from "../features/dashboard/components/Sidebar";
import Topbar from "../features/dashboard/components/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((current) => !current);
  };

  return (
    <div className="min-h-screen bg-page-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />

      <div
        className={`min-h-screen transition-[padding] duration-300 ${
          isSidebarCollapsed ? "md:pl-[88px]" : "md:pl-[280px]"
        }`}
      >
        <Topbar />

        <main className="p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
