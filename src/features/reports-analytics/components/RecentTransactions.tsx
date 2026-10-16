import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { TRANSACTION_LOGS } from "../mock/reports.mock";
import { TransactionStatusBadge } from "./ReportStatusBadge";

export default function RecentTransactions() {
  const [showAll, setShowAll] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const rows = showAll ? TRANSACTION_LOGS : TRANSACTION_LOGS.slice(0, 3);
  return (
    <section className="min-w-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-[#22252B] sm:text-base">
          Recent Transaction
        </h2>
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="rounded-md border border-[#C7C7C7] bg-transparent px-4 py-1.5 text-xs text-[#777] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F9686]"
        >
          {showAll ? "Show Less" : "View all Transaction"}
        </button>
      </div>
      <div className="rounded-xl bg-[#F0F0FF] p-2 sm:p-2.5">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[850px] border-separate border-spacing-0 text-left text-xs">
            <thead>
              <tr className="text-[#2925A5]">
                {[
                  "TXN ID",
                  "DESCRIPTION",
                  "DATE AND TIME",
                  "TYPE",
                  "AMOUNT",
                  "STATUS",
                  "ACTION",
                ].map((label) => (
                  <th
                    key={label}
                    className="border-b border-dashed border-[#D5D5E8] px-2.5 py-3 font-medium"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-white text-[#8A8A8A] [&>td]:border-r [&>td]:border-dashed [&>td]:border-[#E1E1E1] [&>td:last-child]:border-r-0"
                >
                  <td className="border-b border-white px-2.5 py-3">
                    {transaction.id}
                  </td>
                  <td className="border-b border-white px-2.5 py-3">
                    {transaction.description}
                  </td>
                  <td className="whitespace-nowrap border-b border-white px-2.5 py-3">
                    {transaction.dateTime}
                  </td>
                  <td className="border-b border-white px-2.5 py-3">
                    {transaction.type}
                  </td>
                  <td
                    className={`whitespace-nowrap border-b border-white px-2.5 py-3 font-medium ${transaction.amount < 0 ? "text-[#EF4444]" : "text-[#16A34A]"}`}
                  >
                    {transaction.amount < 0 ? "−" : ""}₹{" "}
                    {Math.abs(transaction.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="border-b border-white px-2.5 py-3">
                    <TransactionStatusBadge status={transaction.status} />
                  </td>
                  <td className="relative border-b border-white px-2.5 py-2 text-center">
                    <button
                      type="button"
                      aria-label={`Actions for ${transaction.id}`}
                      aria-expanded={menuFor === transaction.id}
                      onClick={() =>
                        setMenuFor((current) =>
                          current === transaction.id ? null : transaction.id,
                        )
                      }
                      className="rounded p-1 text-black hover:bg-gray-100"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {menuFor === transaction.id && (
                      <div className="absolute right-2 top-9 z-20 w-32 rounded-lg border border-gray-200 bg-white p-1 text-left shadow-lg">
                        <button
                          type="button"
                          onClick={() => setMenuFor(null)}
                          className="w-full rounded px-3 py-2 text-xs hover:bg-gray-50"
                        >
                          View transaction
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
