export interface FilterChipOption<Value extends string> {
  label: string;
  value: Value;
}

interface FilterChipGroupProps<Value extends string> {
  label: string;
  options: readonly FilterChipOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  toggleOffValue?: Value;
}

const FilterChipGroup = <Value extends string,>({
  label,
  options,
  value,
  onChange,
  toggleOffValue,
}: FilterChipGroupProps<Value>) => (
  <fieldset className="min-w-0">
    <legend className="mb-2 text-sm font-semibold text-text-primary">{label}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(selected && toggleOffValue !== undefined ? toggleOffValue : option.value)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
              selected
                ? "bg-brand-primary text-white"
                : "bg-surface-muted text-text-secondary hover:bg-border hover:text-text-primary"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  </fieldset>
);

export default FilterChipGroup;
