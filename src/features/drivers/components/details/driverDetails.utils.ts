export const formatCurrency = (amount: number): string =>
  amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

export const formatDate = (value: string): string => {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatStatus = (status: string): string =>
  status.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
