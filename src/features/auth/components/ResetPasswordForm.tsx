import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { ResetPasswordFormValues } from "../auth.types";
import { resetPasswordSchema } from "../auth.validation";

const ResetPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    console.log("Reset password:", values);

    navigate("/login", {
      state: {
        successMessage: "Password changed successfully.",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
      <div className="space-y-2">
        <label
          htmlFor="new-password"
          className="block text-base font-medium text-text-primary"
        >
          New Password
        </label>

        <div
          className={`flex h-14 items-center rounded-md border bg-surface px-4 transition-colors ${errors.newPassword ? "border-error" : "border-transparent focus-within:border-brand-primary"}`}
        >
          <LockKeyhole
            size={20}
            strokeWidth={1.8}
            className="mr-3 shrink-0 text-text-muted"
          />

          <input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="new-password"
            {...register("newPassword")}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />

          <button
            type="button"
            onClick={() => setShowNewPassword((value) => !value)}
            aria-label={showNewPassword ? "Hide password" : "Show password"}
            className="ml-3 shrink-0 cursor-pointer text-text-muted transition-colors hover:text-text-primary"
          >
            {showNewPassword ? (
              <EyeOff size={20} strokeWidth={1.8} />
            ) : (
              <Eye size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {errors.newPassword && (
          <p className="text-xs text-error">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="block text-base font-medium text-text-primary"
        >
          Confirm Password
        </label>

        <div
          className={`flex h-14 items-center rounded-md border bg-surface px-4 transition-colors ${errors.confirmPassword ? "border-error" : "border-transparent focus-within:border-brand-primary"}`}
        >
          <LockKeyhole
            size={20}
            strokeWidth={1.8}
            className="mr-3 shrink-0 text-text-muted"
          />

          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((value) => !value)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="ml-3 shrink-0 cursor-pointer text-text-muted transition-colors hover:text-text-primary"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} strokeWidth={1.8} />
            ) : (
              <Eye size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-xs text-error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-text-primary px-6 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        Continue
      </button>
    </form>
  );
};

export default ResetPasswordForm;
