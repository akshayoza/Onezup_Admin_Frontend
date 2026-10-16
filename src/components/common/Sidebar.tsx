import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import { DASHBOARD_NAVIGATION } from "../../features/dashboard/dashboard.constants";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
  isMobile?: boolean;
}

const Sidebar = ({
  isCollapsed = false,
  onToggle,
  onNavigate,
  isMobile = false,
}: SidebarProps) => {
  const collapsed = isMobile ? false : isCollapsed;

  return (
    <aside
      className={`flex h-full flex-col overflow-hidden bg-dashboard-sidebar ${
        isMobile
          ? "relative w-full"
          : `fixed inset-y-0 left-0 z-40 hidden transition-[width] duration-300 md:flex ${
              collapsed ? "w-[88px]" : "w-[280px]"
            }`
      }`}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
        {!collapsed && (
          <span className="whitespace-nowrap bg-linear-to-r from-dashboard-logo-start to-dashboard-logo-end bg-clip-text text-[20px] font-bold leading-7 text-transparent">
            OnezupAdmin
          </span>
        )}

        {!isMobile && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-dashboard-sidebar-text transition-colors hover:bg-dashboard-sidebar-active hover:text-surface ${
              collapsed ? "mx-auto" : ""
            }`}
          >
            {collapsed ? (
              <ChevronRight size={20} strokeWidth={2} />
            ) : (
              <ChevronLeft size={20} strokeWidth={2} />
            )}
          </button>
        )}
      </div>

      <nav
        aria-label="Main navigation"
        className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
      >
        {DASHBOARD_NAVIGATION.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center rounded-xl py-3 text-sm font-medium transition-colors ${
                  collapsed ? "justify-center px-0" : "gap-4 px-4"
                } ${
                  isActive
                    ? "bg-dashboard-sidebar-active text-dashboard-logo-start"
                    : "text-dashboard-sidebar-text hover:bg-dashboard-sidebar-active hover:text-surface"
                }`
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-4">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-dashboard-logo-start to-dashboard-logo-end">
            <span className="text-sm font-semibold text-surface">AU</span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-surface">
                Admin User
              </p>
              <p className="truncate text-xs text-dashboard-sidebar-text">
                admin@rideadmin.com
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
