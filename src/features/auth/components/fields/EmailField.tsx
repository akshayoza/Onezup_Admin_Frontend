import { Mail } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";

import type { LoginFormValues } from "../../auth.types";

interface EmailFieldProps {
  register: UseFormRegister<LoginFormValues>;
  error?: string;
}

const EmailField = ({ register, error }: EmailFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-md text-text-primary">
        Email Address
      </label>

      <div
        className={`flex h-14 items-center rounded-md border bg-surface px-4 transition-colors ${error ? "border-error" : "border-transparent focus-within:border-brand-primary"}`}
      >
        <Mail
          size={20}
          strokeWidth={1.8}
          className="mr-3 shrink-0 text-text-muted"
        />

        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          {...register("email")}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
      </div>

      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
};

export default EmailField;
