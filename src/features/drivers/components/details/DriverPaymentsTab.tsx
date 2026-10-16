import type { Driver, DriverDetails } from "../../drivers.types";
import { Field, SectionTitle, StatusBadge } from "./DriverDetailsShared";
import { formatCurrency, formatDate } from "./driverDetails.utils";

const DriverPaymentsTab = ({ driver, details }: { driver: Driver; details: DriverDetails }) => (
  <div className="space-y-5 p-5 sm:p-7">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Wallet Balance" value={formatCurrency(driver.walletBalance)} />
      <Field label="Lifetime Earnings" value={formatCurrency(driver.lifetimeEarnings ?? 0)} />
      <div>
        <p className="mb-2 text-sm text-text-secondary">Payout Status</p>
        <StatusBadge status={driver.payoutStatus} />
      </div>
    </div>

    <SectionTitle>Payment History</SectionTitle>

    {details.payments.length === 0 ? (
      <p className="text-sm text-text-secondary">No payment records available.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-surface-muted text-text-secondary">
            <tr>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Description</th>
              <th className="p-3 font-semibold">Reference</th>
              <th className="p-3 font-semibold">Amount</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {details.payments.map((payment) => (
              <tr key={payment.id}>
                <td className="whitespace-nowrap p-3">{formatDate(payment.date)}</td>
                <td className="p-3">{payment.description}</td>
                <td className="p-3">{payment.reference}</td>
                <td className="whitespace-nowrap p-3">{formatCurrency(payment.amount)}</td>
                <td className="p-3"><StatusBadge status={payment.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default DriverPaymentsTab;
