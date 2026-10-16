import { useCallback, useEffect, useState } from "react";

import DriverPaymentDetailsModal from "./DriverPaymentDetailsModal";
import { MOCK_DRIVER_PAYMENT_PROFILES } from "../driverPaymentProfile.mock";
import type { PaymentRecord } from "../payments.types";
import DataTable from "../../../components/ui/DataTable";
import EmptyTableState from "../../../components/ui/EmptyTableState";

interface PaymentsTableProps {
  payments: PaymentRecord[];
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const tableHeadings = [
  "Txn ID",
  "Driver Name",
  "Vehicle Type",
  "Vehicle Info",
  "Total Earnings",
  "Commission",
  "Payouts",
  "Bank/UPI",
  "Last Payout",
];

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(
    null,
  );

  const closeProfile = useCallback(() => {
    setSelectedPayment(null);
  }, []);

  // Close the profile with Escape.
  useEffect(() => {
    if (!selectedPayment) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProfile();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPayment, closeProfile]);

  // Find the profile belonging to the selected payment's driver.
  const selectedProfile = selectedPayment
    ? MOCK_DRIVER_PAYMENT_PROFILES[selectedPayment.driverId]
    : undefined;

  if (payments.length === 0) {
    return (
      <EmptyTableState title="No payments found" description="Try changing or resetting your filters." />
    );
  }

  return (
    <>
      <div className="w-full min-w-0 overflow-hidden bg-white">
        <DataTable minWidthClassName="min-w-[1120px]">
            <thead className="bg-[#F3F4F6]">
              <tr>
                {tableHeadings.map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="whitespace-nowrap border-b border-[#E5E7EB] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-[#666666] sm:px-5"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  tabIndex={0}
                  aria-label={`Open payment profile for ${payment.driverName}, transaction ${payment.transactionId}`}
                  onClick={() => setSelectedPayment(payment)}
                  onKeyDown={(event) => {
                    if (
                      event.target === event.currentTarget &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      setSelectedPayment(payment);
                    }
                  }}
                  className="cursor-pointer border-b border-[#EEEEEE] transition-colors duration-150 last:border-b-0 hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary"
                >
                  {/* Transaction ID */}
                  <td className="whitespace-nowrap px-4 py-4 text-[#999999] sm:px-5">
                    {payment.transactionId}
                  </td>

                  {/* Driver profile */}
                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      {payment.avatarUrl ? (
                        <img
                          src={payment.avatarUrl}
                          alt={`${payment.driverName} profile`}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          className="h-9 w-9 shrink-0 rounded-full border border-[#E5E7EB] object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCEEF5] text-xs font-semibold text-[#28657A]"
                        >
                          {payment.driverInitials}
                        </span>
                      )}

                      <span className="font-semibold text-text-primary">
                        {payment.driverName}
                      </span>
                    </div>
                  </td>

                  {/* Vehicle type */}
                  <td className="whitespace-nowrap px-4 py-4 text-text-secondary sm:px-5">
                    {payment.vehicleType}
                  </td>

                  {/* Vehicle information */}
                  <td className="whitespace-nowrap px-4 py-4 text-text-secondary sm:px-5">
                    {payment.vehicleInfo}
                  </td>

                  {/* Total earnings */}
                  <td className="whitespace-nowrap px-4 py-4 text-text-primary sm:px-5">
                    {currency.format(payment.totalEarnings)}
                  </td>

                  {/* Commission */}
                  <td className="whitespace-nowrap px-4 py-4 text-text-secondary sm:px-5">
                    {currency.format(payment.commission)}
                  </td>

                  {/* Payout amount */}
                  <td className="whitespace-nowrap px-4 py-4 text-text-primary sm:px-5">
                    {currency.format(payment.payoutAmount)}
                  </td>

                  {/* Bank verification */}
                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <span
                      className={`inline-flex min-w-24 items-center justify-center rounded-md px-3 py-2 text-xs font-semibold ${
                        payment.bankStatus === "verified"
                          ? "bg-[#E1F7E8] text-[#16A34A]"
                          : "bg-[#FFF1DC] text-[#D97706]"
                      }`}
                    >
                      {payment.bankStatus === "verified"
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </td>

                  {/* Last payout */}
                  <td className="whitespace-nowrap px-4 py-4 text-text-primary sm:px-5">
                    {payment.lastPayout}
                  </td>
                </tr>
              ))}
            </tbody>
        </DataTable>
      </div>

      {selectedPayment && selectedProfile && (
        <DriverPaymentDetailsModal
          key={selectedProfile.driverId}
          isOpen
          onClose={closeProfile}
          profile={selectedProfile}
        />
      )}

      {/* Gracefully handle missing mock profile data. */}
      {selectedPayment && !selectedProfile && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px]"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="missing-profile-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xl">
            <h2
              id="missing-profile-title"
              className="text-lg font-semibold text-text-primary"
            >
              Driver profile unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              No profile was found for {selectedPayment.driverName} (
              {selectedPayment.driverId || "missing driver ID"}). Please check
              the driver ID in your payment data and profile records.
            </p>

            <button
              type="button"
              onClick={closeProfile}
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
