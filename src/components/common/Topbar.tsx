import { useState } from "react";
import { Bell, LogOut, Search, Siren } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import SosAlertsModal from "../../features/sos-alerts/components/SosAlertsModal";
import { clearAdminAuthentication, getAdminAccessToken } from "../../features/auth/auth-session";
import { logoutAdmin } from "../../features/auth/auth.api";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/drivers": "Driver",
  "/riders": "Riders",
  "/rides": "Rides",
  "/payments": "Payments",
  "/tickets": "Ticket Management",
  "/reports-analytics": "Reports & Analytics",
  "/notifications": "Notification Management",
  "/settings": "Settings",
  "/admin-management": "Admin Management",
};

const Topbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isDashboard = pathname === "/dashboard";
  const pageTitle = PAGE_TITLES[pathname] ?? "Onezup Admin";

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    let loginError: string | undefined;
    try {
      const token = getAdminAccessToken();
      if (token) await logoutAdmin(token);
    } catch {
      loginError = "You have been signed out locally, but the server could not confirm logout.";
    } finally {
      clearAdminAuthentication();
      navigate("/login", { replace: true, state: loginError ? { loginError } : undefined });
    }
  };

  return (
    <>
      <header className="flex min-h-[72px] w-full items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6">
        {isDashboard ? (
          <label className="flex h-11 w-full max-w-[535px] items-center gap-3 rounded-xl bg-page-background px-4">
            <Search size={19} className="shrink-0 text-text-muted" />
            <input
              type="search"
              placeholder="Search drivers, passengers, rides..."
              aria-label="Search drivers, passengers, and rides"
              className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>
        ) : (
          <h1 className="min-w-0 truncate text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {pageTitle}
          </h1>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Open SOS alerts"
            title="SOS Alerts"
            onClick={() => setIsSosOpen(true)}
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full bg-error text-surface transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
          >
            <Siren size={20} />
            <span className="text-[9px] font-bold leading-none">SOS</span>
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-dashboard-purple text-surface transition-opacity hover:opacity-90"
          >
            <Bell size={21} />
          </button>

          <button
            type="button"
            aria-label="Admin profile"
            className="flex cursor-pointer items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-text-secondary">
              AU
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-text-primary">
                Lorem Ipsum
              </span>
              <span className="block text-xs text-text-secondary">
                Super Admin
              </span>
            </span>
          </button>

          <button type="button" aria-label="Logout" onClick={handleLogout} disabled={isLoggingOut} className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary disabled:opacity-60 sm:px-3">
            <LogOut size={18} aria-hidden="true" />
            <span className="hidden sm:inline">{isLoggingOut ? "Signing out..." : "Logout"}</span>
          </button>
        </div>
      </header>

      <SosAlertsModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </>
  );
};

export default Topbar;
