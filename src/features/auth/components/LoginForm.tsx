import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import EmailField from "./fields/EmailField";
import PasswordField from "./fields/PasswordField";

import type { LoginFormValues } from "../auth.types";
import { loginSchema } from "../auth.validation";
import { loginAdmin } from "../auth.api";
import { setPendingTwoFactor } from "../auth-session";
import { getApiErrorMessage } from "../../../services/api/axios";

interface LoginFormProps {
  onLoginError: (message: string) => void;
}

export default function LoginForm({ onLoginError }: LoginFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      onLoginError("");

      const result = await loginAdmin({
        email: values.email.trim(),
        password: values.password,
      });

      if (result.data.error) {
        onLoginError(result.data.message || "Login failed. Please try again.");
        return;
      }

      const rawData = result.data as unknown as
        | Record<string, unknown>
        | undefined;
      const admin =
        rawData?.data && typeof rawData.data === "object"
          ? (rawData.data as Record<string, unknown>)
          : rawData;

      const email =
        (typeof admin?.email === "string" && admin.email) ||
        (typeof rawData?.email === "string" && rawData.email) ||
        values.email.trim();

      const is2faEnabled = Boolean(
        admin?.is2faEnabled === true ||
        admin?.is2faEnabled === 1 ||
        admin?.is2faEnabled === "true" ||
        rawData?.is2faEnabled === true ||
        rawData?.is2faEnabled === 1 ||
        rawData?.is2faEnabled === "true" ||
        admin?.authStatus === 1 ||
        rawData?.authStatus === 1 ||
        admin?.twoFactorEnabled === true ||
        rawData?.twoFactorEnabled === true ||
        admin?.isTwoFactorEnabled === true ||
        rawData?.isTwoFactorEnabled === true
      );

      if (is2faEnabled) {
        // Authenticator-based 2FA is enabled. Navigate directly to verification screen.
        setPendingTwoFactor(result.accessToken || "", email, "login");

        navigate("/two-factor-authentication", {
          replace: true,
          state: {
            mode: "login",
            email,
          },
        });

        return;
      }

      // Password authentication succeeded, but 2FA is not enabled yet.
      // Ask user if they want to enable 2FA or skip to dashboard.
      setPendingTwoFactor(result.accessToken || "", email, "setup");

      navigate("/two-factor-setup-prompt", {
        replace: true,
      });
    } catch (error: unknown) {
      console.error("Admin login error:", error);
      onLoginError(getApiErrorMessage(error));

      reset({
        email: values.email,
        password: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <EmailField register={register} error={errors.email?.message} />

      <PasswordField register={register} error={errors.password?.message} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center rounded-md bg-text-primary px-6 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "PLEASE WAIT..." : "LOGIN"}
      </button>
    </form>
  );
}
