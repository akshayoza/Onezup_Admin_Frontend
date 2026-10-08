import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import type { UseFormRegister } from "react-hook-form";

import type { LoginFormValues } from "../../auth.types";

interface PasswordFieldProps {
  register: UseFormRegister<LoginFormValues>;
  error?: string;
}

const PasswordField = ({ register, error }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor="password" className="block text-md text-text-primary">
        Enter Password
      </label>

      <div
        className={`flex h-14 items-center rounded-md border bg-surface px-4 transition-colors ${error ? "border-error" : "border-transparent focus-within:border-brand-primary"}`}
      >
        <LockKeyhole
          size={20}
          strokeWidth={1.8}
          className="mr-3 shrink-0 text-text-muted"
        />

        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          autoComplete="current-password"
          {...register("password")}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="ml-3 shrink-0 cursor-pointer text-text-muted transition-colors hover:text-text-primary"
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
};

export default PasswordField;
