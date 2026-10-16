import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import type { Rider, RiderAccountStatus } from "../riders.types";

interface RiderActionsMenuProps {
  rider: Rider;
  onViewDetails: (rider: Rider) => void;
  onAccountStatusChange: (id: string, status: RiderAccountStatus) => void;
}

const RiderActionsMenu = ({ rider, onViewDetails, onAccountStatusChange }: RiderActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const toggleAccount = () => {
    const nextStatus: RiderAccountStatus = rider.accountStatus === "blocked" ? "unblocked" : "blocked";
    onAccountStatusChange(rider.id, nextStatus);
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left" onClick={(event) => event.stopPropagation()}>
      <button type="button" aria-label={`Actions for ${rider.name}`} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-primary hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-brand-primary">
        <MoreVertical size={20} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-10 z-30 w-40 rounded-lg border border-border bg-surface p-1 shadow-lg">
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onViewDetails(rider); }} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-surface-muted">
            View details
          </button>
          <button type="button" role="menuitem" onClick={toggleAccount} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-surface-muted">
            {rider.accountStatus === "blocked" ? "Unblock account" : "Block account"}
          </button>
          <button type="button" role="menuitem" onClick={() => { onAccountStatusChange(rider.id, "suspended"); setOpen(false); }} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-surface-muted">
            Suspend account
          </button>
          <button type="button" role="menuitem" onClick={() => { onAccountStatusChange(rider.id, "unblocked"); setOpen(false); }} className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-surface-muted">
            Restore account
          </button>
        </div>
      )}
    </div>
  );
};

export default RiderActionsMenu;
