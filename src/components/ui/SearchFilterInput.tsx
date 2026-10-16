import { Search } from "lucide-react";

interface SearchFilterInputProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchFilterInput = ({
  id,
  label,
  value,
  placeholder,
  onChange,
}: SearchFilterInputProps) => (
  <label htmlFor={id} className="block min-w-0 space-y-2">
    <span className="block text-sm font-medium text-text-primary">{label}</span>
    <span className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-border px-3 transition-colors focus-within:border-brand-primary">
      <Search size={18} className="shrink-0 text-text-muted" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
      />
    </span>
  </label>
);

export default SearchFilterInput;
