import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Check, Copy } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import LoginBranding from "../../features/auth/components/LoginBranding";
import TwoFactorForm from "../../features/auth/components/TwoFactorForm";
import Toast from "../../components/ui/Toast";
import { getApiErrorMessage } from "../../services/api/axios";
import {
  completeAdminAuthentication,
  getAdminEmail,
  getPendingAuthenticationPurpose,
  getPendingTwoFactorQr,
  getPendingTwoFactorSecret,
  getPendingTwoFactorToken,
  isAdminAuthenticated,
  setPendingTwoFactorSetupData,
} from "../../features/auth/auth-session";
import {
  enableAdminTwoFactor,
  generateAdminTwoFactor,
  verifyAdminTwoFactor,
} from "../../features/auth/auth.api";

interface TwoFactorPageState {
  mode?: "setup" | "login";
  qrImageUrl?: string;
  secret?: string;
  email?: string;
}

export default function TwoFactorAuthenticationPage() {
  const location = useLocation();
  const state = location.state as TwoFactorPageState | null;
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const pendingPurpose = getPendingAuthenticationPurpose();
  const token = getPendingTwoFactorToken();
  const isSetupMode = pendingPurpose === "setup";

  const initialQr = state?.qrImageUrl || getPendingTwoFactorQr();
  const initialSecret = state?.secret || getPendingTwoFactorSecret();

  const [setupData, setSetupData] = useState<{
    qrImageUrl: string;
    secret: string;
  } | null>(() => {
    if (initialQr && initialSecret) {
      return { qrImageUrl: initialQr, secret: initialSecret };
    }
    return null;
  });

  const [isLoadingSetup, setIsLoadingSetup] = useState(
    isSetupMode && !initialQr,
  );

  useEffect(() => {
    if (!isSetupMode || setupData || !token) return;

    let isMounted = true;
    const email = state?.email || getAdminEmail();
    if (!email) return;

    generateAdminTwoFactor(token, email)
      .then((result) => {
        if (!isMounted) return;
        if (!result.error && result.data.qrImageUrl && result.data.secret) {
          setPendingTwoFactorSetupData(
            result.data.secret,
            result.data.qrImageUrl,
          );
          setSetupData({
            qrImageUrl: result.data.qrImageUrl,
            secret: result.data.secret,
          });
        } else {
          setVerificationError(
            result.message || "Failed to generate 2FA setup QR code.",
          );
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setVerificationError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingSetup(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isSetupMode, setupData, token, state?.email]);

  if (isAdminAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  const email = state?.email || getAdminEmail();

  if (!pendingPurpose || !email) {
    return <Navigate to="/login" replace />;
  }

  if (isSetupMode && !token) {
    return <Navigate to="/login" replace />;
  }

  const qrImageUrl = setupData?.qrImageUrl;
  const secret = setupData?.secret;

  if (isSetupMode && !setupData && !isLoadingSetup) {
    return <Navigate to="/two-factor-setup-prompt" replace />;
  }

  const handleCopySecret = async () => {
    if (!secret) return;
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  if (isSetupMode && isLoadingSetup) {
    return (
      <AuthLayout>
        <div className="flex min-h-screen w-full items-center justify-center bg-surface">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
            <p className="text-sm font-medium text-text-secondary">
              Generating authenticator setup QR code…
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      {verificationError && (
        <Toast
          title="2FA verification failed"
          message={verificationError}
          variant="error"
          onClose={() => setVerificationError(null)}
        />
      )}
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <LoginBranding />

        <main className="flex min-h-screen w-full items-center justify-center bg-surface px-5 py-8 sm:px-8 md:w-1/2">
          <section className="w-full max-w-xl rounded-2xl bg-surface-muted p-5 sm:p-8">
            <header className="mb-7 text-center">
              <h1 className="text-3xl font-bold text-text-primary">
                Welcome To <span className="text-brand-primary">Onezup!</span>
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                ADMIN DASHBOARD LOGIN
              </p>
            </header>

            {isSetupMode && qrImageUrl && secret && (
              <div className="mb-7 text-center">
                <h2 className="text-xl font-bold text-text-primary">
                  Enable Two-Factor Authentication
                </h2>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Scan this QR code using your authenticator app. Then enter the
                  current six-digit code below.
                </p>

                <div className="mx-auto mt-5 flex w-fit items-center justify-center rounded-xl border border-border bg-white p-4">
                  <img
                    src={qrImageUrl}
                    alt="Two-factor authentication setup QR code"
                    className="h-48 w-48 object-contain sm:h-56 sm:w-56"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-white p-3 text-left">
                  <div className="min-w-0 flex-1 break-all">
                    <p className="text-xs font-semibold text-text-secondary">
                      Manual setup key
                    </p>
                    <p className="mt-1 font-mono text-xs text-text-primary">
                      {secret}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopySecret}
                    className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-page-background hover:text-text-primary"
                    aria-label="Copy manual setup key"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-success" />
                        <span className="text-success">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <TwoFactorForm
              mode={isSetupMode ? "setup" : "login"}
              email={email}
              onVerify={async (otp) => {
                const currentToken = getPendingTwoFactorToken() || "";

                if (isSetupMode) {
                  if (!currentToken) {
                    throw new Error(
                      "Your pending sign-in session has expired. Please sign in again.",
                    );
                  }

                  if (!secret) {
                    throw new Error(
                      "Missing 2FA setup secret. Please restart setup.",
                    );
                  }

                  let result;
                  try {
                    result = await enableAdminTwoFactor(
                      { secret, otp },
                      currentToken,
                    );
                  } catch (error) {
                    throw new Error(getApiErrorMessage(error), {
                      cause: error,
                    });
                  }

                  if (result.data.error) {
                    throw new Error(
                      result.data.message ||
                        "Failed to enable two-factor authentication.",
                    );
                  }

                  completeAdminAuthentication(result.accessToken);
                } else {
                  if (!email) {
                    throw new Error(
                      "Missing administrator email address. Please sign in again.",
                    );
                  }

                  let result;
                  try {
                    result = await verifyAdminTwoFactor(
                      { email, otp },
                      currentToken || undefined,
                    );
                  } catch (error) {
                    throw new Error(getApiErrorMessage(error), {
                      cause: error,
                    });
                  }

                  if (result.data.error) {
                    throw new Error(
                      result.data.message ||
                        "The authenticator code could not be verified.",
                    );
                  }

                  completeAdminAuthentication(result.accessToken);
                }
              }}
              onVerificationError={setVerificationError}
            />
          </section>
        </main>
      </div>
    </AuthLayout>
  );
}
