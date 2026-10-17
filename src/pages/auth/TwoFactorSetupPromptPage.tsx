import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ShieldCheck, Clock, ArrowRight } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import LoginBranding from "../../features/auth/components/LoginBranding";
import { generateAdminTwoFactor } from "../../features/auth/auth.api";
import {
  getPendingAuthenticationPurpose,
  getAdminEmail,
  getPendingTwoFactorToken,
  completeAdminAuthentication,
  setPendingTwoFactorSetupData,
  isAdminAuthenticated,
} from "../../features/auth/auth-session";
import { getApiErrorMessage } from "../../services/api/axios";

export default function TwoFactorSetupPromptPage() {
  const navigate = useNavigate();
  const [isEnabling, setIsEnabling] = useState(false);
  const [error, setError] = useState("");

  if (isAdminAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  if (getPendingAuthenticationPurpose() !== "setup") {
    return <Navigate to="/login" replace />;
  }

  const handleEnable = async () => {
    setError("");

    const token = getPendingTwoFactorToken();
    const email = getAdminEmail();

    if (!token || !email) {
      navigate("/login", { replace: true });
      return;
    }

    setIsEnabling(true);

    try {
      const result = await generateAdminTwoFactor(token, email);

      if (result.error) {
        throw new Error(
          result.message || "Unable to generate the setup QR code.",
        );
      }

      const { qrImageUrl, secret } = result.data;

      if (!qrImageUrl || !secret) {
        throw new Error("The server did not return the QR code and setup key.");
      }

      setPendingTwoFactorSetupData(secret, qrImageUrl);

      navigate("/two-factor-authentication", {
        replace: true,
        state: {
          mode: "setup",
          qrImageUrl,
          secret,
          email,
        },
      });
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsEnabling(false);
    }
  };

  const handleSkip = () => {
    try {
      completeAdminAuthentication();
    } catch {
      navigate("/login", { replace: true });
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <LoginBranding />

        <main className="flex min-h-screen w-full items-center justify-center bg-surface px-5 py-10 sm:px-8 md:w-1/2">
          <section className="w-full max-w-lg rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-9">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
              <ShieldCheck size={30} />
            </div>

            <h1 className="text-center text-2xl font-bold text-text-primary">
              Secure your Onezup account
            </h1>

            <p className="mt-3 text-center text-sm leading-6 text-text-secondary">
              Two-factor authentication adds an extra layer of protection to
              your administrator account.
            </p>

            <div className="mt-7 rounded-xl border border-border p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-1 shrink-0 text-brand-primary"
                  size={22}
                />
                <div>
                  <h2 className="font-semibold text-text-primary">
                    Enable Two-Factor Authentication
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-text-secondary">
                    Scan a QR code with your authenticator app and verify its
                    six-digit code.
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-error">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleEnable}
              disabled={isEnabling}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-5 text-sm font-semibold text-white hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isEnabling ? "Preparing setup..." : "Enable 2FA"}
              {!isEnabling && <ArrowRight size={18} />}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              disabled={isEnabling}
              className="mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-text-secondary hover:text-text-primary disabled:opacity-60"
            >
              <Clock size={16} />
              Not now — continue to dashboard
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-text-muted">
              You can be asked to enable 2FA again on a future login if it
              remains disabled.
            </p>
          </section>
        </main>
      </div>
    </AuthLayout>
  );
}

