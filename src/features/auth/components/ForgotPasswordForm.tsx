import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { forgotPasswordSchema } from "../auth.validation";
import type { ForgotPasswordFormValues } from "../auth.types";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log("Forgot password request:", values);
    navigate("/reset-password");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="forgot-password-email"
          className="block text-md font-medium text-text-primary"
        >
          Email Address
        </label>

        <div
          className={`flex h-14 items-center rounded-md border bg-surface px-4 transition-colors ${errors.email ? "border-error" : "border-transparent focus-within:border-brand-primary"}`}
        >
          <Mail
            size={20}
            strokeWidth={1.8}
            className="mr-3 shrink-0 text-text-muted"
          />

          <input
            id="forgot-password-email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            {...register("email")}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>

        {errors.email && (
          <p className="text-xs text-error">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-md bg-text-primary px-6 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        Send Link
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
