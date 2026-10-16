import { CalendarDays } from "lucide-react";

interface DateFilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  id: string;
}

const DateFilterInput = ({
  label,
  value,
  onChange,
  min,
  max,
  id,
}: DateFilterInputProps) => (
  <label htmlFor={id} className="block min-w-0 space-y-2">
    <span className="block text-sm font-medium text-text-primary">{label}</span>
    <span className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-border px-3 transition-colors focus-within:border-brand-primary">
      <CalendarDays size={17} className="shrink-0 text-text-muted" aria-hidden="true" />
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 w-full cursor-pointer bg-transparent text-sm text-text-primary outline-none"
      />
    </span>
  </label>
);

export default DateFilterInput;
