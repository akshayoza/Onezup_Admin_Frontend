import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import LoginBranding from "../../features/auth/components/LoginBranding";
import LoginForm from "../../features/auth/components/LoginForm";
import ForgotPasswordLink from "../../features/auth/components/ForgotPasswordLink";
import Toast from "../../components/ui/Toast";

const LoginPage = () => {
  const location = useLocation();

  const [successMessage, setSuccessMessage] = useState<string | null>(
    location.state?.successMessage ?? null,
  );

  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    if (!loginError) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLoginError(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [loginError]);

  const handleLoginError = (message: string) => {
    setLoginError(message);
  };

  return (
    <AuthLayout>
      {successMessage && (
        <Toast
          title="Password Updated"
          message={successMessage}
          variant="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {loginError && (
        <Toast
          title="Login Failed"
          message={loginError}
          variant="error"
          onClose={() => setLoginError(null)}
        />
      )}

      <div className="flex min-h-screen w-full">
        <LoginBranding />

        <section className="flex min-h-screen w-full items-center justify-center bg-surface px-6 py-10 sm:px-10 md:w-1/2 md:px-12 lg:px-20 xl:px-24">
          <div className="w-full max-w-[680px]">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Welcome To <span className="text-brand-primary">Onezup!</span>
              </h1>

              <p className="mt-3 text-sm text-text-primary sm:text-lg">
                ADMIN DASHBOARD LOGIN
              </p>
            </div>

            <div className="rounded-xl bg-page-background p-5 sm:p-6 lg:p-7">
              <LoginForm onLoginError={handleLoginError} />
            </div>

            <div className="flex justify-center">
              <ForgotPasswordLink />
            </div>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
