import { ChevronDown } from "lucide-react";

interface LocationFilterSelectProps {
  id: string;
  label?: string;
  value: string;
  options: readonly (string | { label: string; value: string })[];
  allValue?: string;
  allLabel?: string;
  onChange: (value: string) => void;
}

const LocationFilterSelect = ({
  id,
  label = "Location",
  value,
  options,
  allValue = "all",
  allLabel = "All zones",
  onChange,
}: LocationFilterSelectProps) => (
  <label htmlFor={id} className="block min-w-0 space-y-2">
    <span className="block text-sm font-medium text-text-primary">{label}</span>

    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full min-w-0 appearance-none cursor-pointer rounded-lg border border-border bg-surface pl-3 pr-12 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
      >
        <option value={allValue}>{allLabel}</option>

        {options
          .map((option) =>
            typeof option === "string" ? { label: option, value: option } : option,
          )
          .filter((option) => option.value !== allValue)
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      <ChevronDown
        size={20}
        strokeWidth={1.8}
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-primary"
      />
    </div>
  </label>
);

export default LocationFilterSelect;
