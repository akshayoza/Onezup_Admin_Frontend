import AuthLayout from "../../layouts/AuthLayout";
import LoginBranding from "../../features/auth/components/LoginBranding";
import ForgotPasswordForm from "../../features/auth/components/ForgotPasswordForm";
import BackToLoginLink from "../../features/auth/components/BackToLoginLink";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <div className="flex min-h-screen w-full">
        <LoginBranding />

        <section className="flex min-h-screen w-full items-center justify-center bg-surface px-6 py-10 sm:px-10 md:w-1/2 md:px-12 lg:px-20 xl:px-24">
          <div className="w-full max-w-[680px]">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Reset Password
              </h1>
            </div>

            <div className="rounded-xl bg-surface-muted p-5 sm:p-6 lg:p-7">
              <ForgotPasswordForm />
            </div>

            <div className="flex justify-center">
              <BackToLoginLink />
            </div>
          </div>
        </section>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
