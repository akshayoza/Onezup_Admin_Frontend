import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import { DASHBOARD_NAVIGATION } from "../dashboard.constants";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col bg-dashboard-sidebar transition-[width] duration-300 md:flex ${isCollapsed ? "w-[88px]" : "w-[280px]"}`}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-5">
        {!isCollapsed && (
          <span className="whitespace-nowrap bg-linear-to-r from-dashboard-logo-start to-dashboard-logo-end bg-clip-text text-[20px] font-bold leading-7 text-transparent">
            OnezupAdmin
          </span>
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-dashboard-sidebar-text transition-colors hover:bg-dashboard-sidebar-active hover:text-surface ${isCollapsed ? "mx-auto" : ""}`}
        >
          {isCollapsed ? (
            <ChevronRight size={20} strokeWidth={2} />
          ) : (
            <ChevronLeft size={20} strokeWidth={2} />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {DASHBOARD_NAVIGATION.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-xl py-3 text-sm font-medium transition-colors ${isCollapsed ? "justify-center px-0" : "gap-4 px-4"} ${isActive ? "bg-dashboard-sidebar-active text-dashboard-logo-start" : "text-dashboard-sidebar-text hover:bg-dashboard-sidebar-active hover:text-surface"}`
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-4">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-dashboard-logo-start to-dashboard-logo-end">
            <span className="text-sm font-semibold text-surface">AU</span>
          </div>

          {!isCollapsed && (
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
