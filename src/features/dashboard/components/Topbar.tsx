import { Bell, Search, Siren } from "lucide-react";

const Topbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-7">
      <div className="relative w-full max-w-125">
        <Search
          size={20}
          strokeWidth={1.8}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />

        <input
          type="search"
          placeholder="Search drivers, passengers, rides..."
          className="h-11 w-full rounded-xl bg-page-background pl-11 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary/20"
        />
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Emergency SOS"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-error text-surface transition-transform duration-200 hover:scale-105"
        >
          <Siren size={21} strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-dashboard-purple text-surface transition-transform duration-200 hover:scale-105"
        >
          <Bell size={21} strokeWidth={2} />
        </button>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-page-background">
            <span className="text-sm font-semibold text-text-secondary">
              AU
            </span>
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-medium text-text-primary">Lorem Ipsum</p>
            <p className="text-xs text-text-secondary">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
