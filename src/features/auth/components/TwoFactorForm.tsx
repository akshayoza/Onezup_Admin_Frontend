import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import OtpInput from "./OtpInput";
import { completeAdminAuthentication, isAdminAuthenticated } from "../auth-session";

export type TwoFactorMode = "setup" | "login";

interface TwoFactorFormProps {
  mode: TwoFactorMode;
  email?: string;
  onVerify: (otp: string) => Promise<void>;
  onVerificationError?: (message: string) => void;
}

const TwoFactorForm = ({
  mode,
  email,
  onVerify,
  onVerificationError,
}: TwoFactorFormProps) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSetupMode = mode === "setup";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the complete 6-digit authenticator code.");
      return;
    }

    setIsSubmitting(true);

    try {
      // The callback must call the correct backend verification API.
      // It must reject if the backend reports an invalid OTP.
      await onVerify(otp);

      // Both modes require explicit backend confirmation before the pending
      // password session becomes an authenticated administrator session.
      if (!isAdminAuthenticated()) {
        completeAdminAuthentication();
      }

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Verification failed. Please check your authenticator code and try again.";
      if (onVerificationError) onVerificationError(message);
      else setError(message);
      setOtp("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-primary">
          {isSetupMode
            ? "Verify and Enable Two-Factor Authentication"
            : "Two-Factor Authentication"}
        </h2>

        <p className="mt-3 text-sm text-text-muted">
          {isSetupMode
            ? "Enter the six-digit code from your authenticator app to finish setup."
            : email
              ? `Enter the six-digit code from your authenticator app for ${email}.`
              : "Enter the six-digit code currently shown in your authenticator app."}
        </p>
      </div>

      <div className="pt-1">
        <OtpInput value={otp} onChange={setOtp} />
      </div>

      {error && (
        <p role="alert" className="text-center text-sm font-medium text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center rounded-md bg-text-primary px-6 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "VERIFYING..."
          : isSetupMode
            ? "VERIFY & ENABLE 2FA"
            : "VERIFY & LOGIN"}
      </button>
    </form>
  );
};

export default TwoFactorForm;
