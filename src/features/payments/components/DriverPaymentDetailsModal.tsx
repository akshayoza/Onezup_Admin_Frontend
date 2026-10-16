import { useEffect, useMemo, useState } from "react";

import { createPortal } from "react-dom";

import { Check, ChevronDown, Plus, X } from "lucide-react";

import type {
  BankAccount,
  DriverPaymentProfile,
  DriverPayoutHistoryItem,
  DriverEarningHistoryItem,
} from "../payments.types";

type ProfileTab = "profile" | "payout-history" | "earning-history";

interface DriverPaymentDetailsModalProps {
  isOpen: boolean;

  onClose: () => void;

  profile: DriverPaymentProfile;

  onAddBankAccount?: (
    account: Omit<BankAccount, "id" | "isPrimary" | "status">,
  ) => void;
}

const ROWS_PER_PAGE = 8;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",

    currency: "INR",

    maximumFractionDigits: 0,
  }).format(amount);

function ModalPagination({
  page,

  totalItems,

  onChange,
}: {
  page: number;

  totalItems: number;

  onChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / ROWS_PER_PAGE));

  return (
    <nav
      aria-label="Modal table pagination"
      className="flex flex-wrap items-center justify-center gap-2 px-2 py-3 sm:gap-3"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="rounded-md px-2 py-2 text-sm text-text-secondary hover:bg-white disabled:opacity-40"
      >
        « Previous Page
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1)

        .filter(
          (number) =>
            number <= 3 ||
            number === totalPages ||
            Math.abs(number - page) <= 1,
        )

        .map((number, index, visible) => (
          <span key={number} className="contents">
            {index > 0 && number - visible[index - 1] > 1 && (
              <span className="text-text-secondary" aria-hidden="true">
                …
              </span>
            )}

            <button
              type="button"
              aria-current={page === number ? "page" : undefined}
              onClick={() => onChange(number)}
              className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold ${
                page === number
                  ? "bg-[#202124] text-white"
                  : "bg-[#8C8C93] text-white hover:bg-[#6F6F76]"
              }`}
            >
              {number}
            </button>
          </span>
        ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-md px-2 py-2 text-sm text-text-secondary hover:bg-white disabled:opacity-40"
      >
        Next Page »
      </button>
    </nav>
  );
}

function ProfileTabContent({
  profile,

  onAddBankAccount,
}: {
  profile: DriverPaymentProfile;

  onAddBankAccount?: DriverPaymentDetailsModalProps["onAddBankAccount"];
}) {
  const [expandedBankId, setExpandedBankId] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);

  const [bankName, setBankName] = useState("");

  const [ifsc, setIfsc] = useState("");

  const [accountNumber, setAccountNumber] = useState("");

  const [accountHolderName, setAccountHolderName] = useState("");

  const [upiId, setUpiId] = useState("");

  const submitBankAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddBankAccount?.({
      bankName: bankName.trim(),

      ifsc: ifsc.trim().toUpperCase(),

      accountNumber: accountNumber.trim(),

      accountHolderName: accountHolderName.trim(),

      ...(upiId.trim() ? { upiId: upiId.trim() } : {}),
    });

    setShowAddForm(false);

    setBankName("");

    setIfsc("");

    setAccountNumber("");

    setAccountHolderName("");

    setUpiId("");
  };

  return (
    <div
      className="grid min-w-0 grid-cols-1 gap-6 rounded-xl border border-[#A3A3A3] bg-white p-4 sm:p-5 lg:grid-cols-2 lg:gap-7"
      style={{ backgroundColor: "#ffffff", opacity: 1 }}
    >
      <section className="min-w-0 lg:border-r lg:border-border lg:pr-6">
        <h3 className="mb-5 text-base font-bold text-text-primary">
          Personal Information
        </h3>

        <dl className="space-y-4">
          <InfoItem label="Joined" value={profile.joinedAt} />

          <InfoItem label="Primary Zone" value={profile.primaryZone} />

          <InfoItem
            label="Vehicle Registration"
            value={profile.vehicleRegistration}
          />

          <InfoItem label="License Number" value={profile.licenseNumber} />

          <InfoItem
            label="Insurance Validity"
            value={profile.insuranceValidity}
          />

          <div>
            <dt className="text-xs text-text-secondary">Document</dt>

            <dd className="mt-2 flex flex-wrap gap-2">
              {profile.documents.map((document) => (
                <span
                  key={document}
                  className="rounded-sm bg-[#D7F1D9] px-3 py-1 text-sm font-medium text-[#20A84A]"
                >
                  {document}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-text-primary">
            Payment Settings
          </h3>

          <button
            type="button"
            onClick={() => setShowAddForm((visible) => !visible)}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-text-primary px-3 py-2 text-sm hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-brand-primary"
          >
            <Plus size={17} aria-hidden="true" />
            Add Bank Account
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={submitBankAccount}
            className="mb-5 grid grid-cols-1 gap-3 rounded-lg border border-border bg-surface-muted p-3 sm:grid-cols-2"
          >
            <label className="space-y-1 text-xs text-text-secondary">
              <span>Bank name *</span>

              <input
                required
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              />
            </label>

            <label className="space-y-1 text-xs text-text-secondary">
              <span>IFSC *</span>

              <input
                required
                value={ifsc}
                onChange={(event) => setIfsc(event.target.value)}
                pattern="[A-Za-z]{4}0[A-Za-z0-9]{6}"
                title="Enter a valid IFSC code"
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm uppercase text-text-primary"
              />
            </label>

            <label className="space-y-1 text-xs text-text-secondary">
              <span>Account number *</span>

              <input
                required
                minLength={6}
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              />
            </label>

            <label className="space-y-1 text-xs text-text-secondary">
              <span>Account holder *</span>

              <input
                required
                value={accountHolderName}
                onChange={(event) => setAccountHolderName(event.target.value)}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              />
            </label>

            <label className="space-y-1 text-xs text-text-secondary sm:col-span-2">
              <span>UPI ID (optional)</span>

              <input
                value={upiId}
                onChange={(event) => setUpiId(event.target.value)}
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              />
            </label>

            <div className="flex justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-md border border-border px-3 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-brand-primary px-3 py-2 text-sm font-medium text-white"
              >
                Save account
              </button>
            </div>

            {!onAddBankAccount && (
              <p className="text-xs text-text-secondary sm:col-span-2">
                Demo form: a parent callback is needed to persist the new
                account.
              </p>
            )}
          </form>
        )}

        {profile.bankAccounts.map((account, index) => {
          const isExpanded = expandedBankId === account.id;

          const isPrimary = account.isPrimary;

          return (
            <div
              key={account.id}
              className="border-b border-border py-4 last:border-b-0"
            >
              {index === 0 && (
                <>
                  <p className="text-xs text-text-secondary">
                    Primary Bank Account
                  </p>

                  <p className="mt-2 text-base text-text-primary">
                    {account.bankName}
                  </p>

                  <p className="mt-3 text-xs text-text-secondary">IFSC</p>

                  <p className="mt-2 text-base text-text-primary">
                    {account.ifsc}
                  </p>

                  <p className="mt-3 text-xs text-text-secondary">
                    Account Number
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-base text-text-primary">
                      {account.accountNumber}
                    </span>

                    <VerificationBadge status={account.status} />
                  </div>

                  <p className="mt-3 text-xs text-text-secondary">
                    Account Holder Name
                  </p>

                  <p className="mt-2 text-base text-text-primary">
                    {account.accountHolderName}
                  </p>

                  {account.upiId && (
                    <>
                      <p className="mt-3 text-xs text-text-secondary">UPI ID</p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="break-all text-base text-text-primary">
                          {account.upiId}
                        </span>

                        {isPrimary && (
                          <span className="rounded-sm bg-[#D7F1D9] px-2 py-0.5 text-sm text-[#20A84A]">
                            Primary
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}

              {index > 0 && (
                <>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedBankId(isExpanded ? null : account.id)
                    }
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span>
                      <span className="block text-xs text-text-secondary">
                        {index === 1
                          ? "Secondary Bank Account"
                          : `Bank Account - ${index + 1}`}
                      </span>

                      <span className="mt-2 block text-base text-text-primary">
                        {account.bankName}
                      </span>
                    </span>

                    <ChevronDown
                      size={17}
                      className={`shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded && (
                    <dl className="mt-4 space-y-3 rounded-lg bg-surface-muted p-3">
                      <InfoItem label="IFSC" value={account.ifsc} />

                      <InfoItem
                        label="Account Number"
                        value={account.accountNumber}
                      />

                      <InfoItem
                        label="Account Holder Name"
                        value={account.accountHolderName}
                      />

                      {account.upiId && (
                        <InfoItem label="UPI ID" value={account.upiId} />
                      )}

                      <div>
                        <dt className="text-xs text-text-secondary">
                          Verification
                        </dt>

                        <dd className="mt-1">
                          <VerificationBadge status={account.status} />
                        </dd>
                      </div>
                    </dl>
                  )}
                </>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-text-secondary">{label}</dt>

      <dd className="mt-1.5 break-words text-base text-text-primary">
        {value}
      </dd>
    </div>
  );
}

function VerificationBadge({ status }: { status: "verified" | "pending" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-sm font-medium ${
        status === "verified"
          ? "bg-[#D7F1D9] text-[#20A84A]"
          : "bg-[#FFF0D3] text-[#B76B00]"
      }`}
    >
      {status === "verified" && <Check size={13} aria-hidden="true" />}

      {status === "verified" ? "Verified" : "Pending"}
    </span>
  );
}

function PayoutHistoryTable({ rows }: { rows: DriverPayoutHistoryItem[] }) {
  const [page, setPage] = useState(1);

  const pageRows = useMemo(
    () => rows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),

    [rows, page],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-[#C9C8DE] bg-[#F3F2FF] p-2 sm:p-3">
      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="border-b border-dashed border-[#D4D3E6] text-[#3934B8]">
            <tr>
              {["Date", "Amount", "Status", "TRX ID", "Action"].map((title) => (
                <th
                  key={title}
                  scope="col"
                  className="whitespace-nowrap px-3 py-4 font-semibold uppercase"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-dashed divide-border">
            {pageRows.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap px-3 py-3.5 text-text-primary">
                  {row.date}
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {formatCurrency(row.amount)}
                </td>

                <td className="px-3 py-3.5">
                  <PayoutStatusBadge status={row.status} />
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {row.transactionId}
                </td>

                <td className="px-3 py-3.5">
                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `Invoice for ${row.transactionId} is a demo action.`,
                      )
                    }
                    className="rounded-md p-1.5 text-text-primary hover:bg-surface-muted"
                    aria-label={`Invoice for ${row.transactionId}`}
                  >
                    <span className="text-lg leading-none">⋮</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalPagination
        page={page}
        totalItems={rows.length}
        onChange={setPage}
      />
    </div>
  );
}

function EarningHistoryTable({ rows }: { rows: DriverEarningHistoryItem[] }) {
  const [page, setPage] = useState(1);

  const pageRows = useMemo(
    () => rows.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE),

    [rows, page],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-[#C9C8DE] bg-[#F3F2FF] p-2 sm:p-3">
      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b border-dashed border-[#D4D3E6] text-[#3934B8]">
            <tr>
              {[
                "Date",

                "Ride ID",

                "Fare",

                "Promo",

                "To Driver",

                "Method",

                "Txn ID",
              ].map((title) => (
                <th
                  key={title}
                  scope="col"
                  className="whitespace-nowrap px-3 py-4 font-semibold uppercase"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-dashed divide-border">
            {pageRows.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap px-3 py-3.5 text-text-primary">
                  {row.date}
                </td>

                <td className="whitespace-nowrap px-3 py-3.5">
                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `Ride ${row.rideId} details will be connected to the backend.`,
                      )
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {row.rideId}
                  </button>
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {formatCurrency(row.fare)}
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {formatCurrency(row.promo)}
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {formatCurrency(row.toDriver)}
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {row.method}
                </td>

                <td className="whitespace-nowrap px-3 py-3.5 text-text-secondary">
                  {row.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalPagination
        page={page}
        totalItems={rows.length}
        onChange={setPage}
      />
    </div>
  );
}

function PayoutStatusBadge({
  status,
}: {
  status: DriverPayoutHistoryItem["status"];
}) {
  const label =
    status === "paid" ? "PAID" : status === "failed" ? "Failed" : "Pending";

  const className =
    status === "paid"
      ? "bg-[#D7F1D9] text-[#20C65A]"
      : status === "failed"
        ? "bg-[#FFE1E3] text-[#FF3344]"
        : "bg-[#FFF0D3] text-[#B76B00]";

  return (
    <span
      className={`inline-flex min-w-20 items-center justify-center rounded-md px-3 py-2 font-medium ${className}`}
    >
      {label}
    </span>
  );
}

export default function DriverPaymentDetailsModal({
  isOpen,

  onClose,

  profile,

  onAddBankAccount,
}: DriverPaymentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const tabs: { label: string; value: ProfileTab }[] = [
    { label: "Profile", value: "profile" },

    { label: "Payout History", value: "payout-history" },

    { label: "Earning & History", value: "earning-history" },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[2px] sm:p-6"
      style={{ isolation: "isolate" }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="driver-payment-profile-title"
        className="relative z-[10000] my-auto max-h-[94dvh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/60 bg-white p-4 shadow-2xl sm:p-6 lg:p-7"
        style={{ backgroundColor: "#ffffff", opacity: 1 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close driver payment profile"
          className="absolute right-4 top-4 z-10 rounded-md p-1.5 text-text-primary hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-brand-primary sm:right-6 sm:top-5"
        >
          <X size={25} strokeWidth={1.7} aria-hidden="true" />
        </button>

        <header className="border-b border-[#BFBFBF] pb-4 pr-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#DCEEF5]">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.name} profile`}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-sm font-bold text-[#28657A]"
                  aria-label={`${profile.name} initials`}
                >
                  {profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h2
                id="driver-payment-profile-title"
                className="text-base font-bold text-[#171923] sm:text-lg"
              >
                {profile.name} (Driver ID {profile.driverId})
              </h2>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  profile.status === "active"
                    ? "bg-[#D7F1D9] text-[#20A84A]"
                    : "bg-[#FFF0D3] text-[#B76B00]"
                }`}
              >
                {profile.status.charAt(0).toUpperCase() +
                  profile.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 pl-0 text-xs text-text-primary sm:pl-[3.5rem] sm:text-sm">
            <span>{profile.phone}</span>

            <span className="text-text-muted">|</span>

            <span className="break-all">{profile.email}</span>

            <span className="text-text-muted">|</span>

            <span>
              {profile.city} - {profile.vehicle}
            </span>
          </div>
        </header>

        <div
          className="mt-3 flex gap-5 overflow-x-auto border-b border-border"
          role="tablist"
          aria-label="Driver profile sections"
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.value)}
                className={`-mb-px shrink-0 border-b-2 px-2 py-3 text-sm transition-colors ${
                  selected
                    ? "border-[#3934B8] font-medium text-[#3934B8]"
                    : "border-transparent text-text-primary hover:text-[#3934B8]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="pt-4">
          {activeTab === "profile" && (
            <ProfileTabContent
              profile={profile}
              onAddBankAccount={onAddBankAccount}
            />
          )}

          {activeTab === "payout-history" && (
            <PayoutHistoryTable rows={profile.payoutHistory} />
          )}

          {activeTab === "earning-history" && (
            <EarningHistoryTable rows={profile.earningHistory} />
          )}
        </div>
      </section>
    </div>,

    document.body,
  );
}
