import { useState } from "react";
import { useNavigate } from "react-router-dom";

import OtpInput from "./OtpInput";

const TEST_OTP = "123456";

const TwoFactorForm = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    if (otp !== TEST_OTP) {
      setError("The OTP you entered is incorrect. Please try again.");
      setOtp("");
      return;
    }

    navigate("/dashboard");
  };

  const handleResend = () => {
    setOtp("");
    setError(null);

    console.log("Test OTP: 123456");
  };

  const handleDevBypass = () => {
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-text-primary">
          Two-Factor Authentication
        </h2>

        <p className="mt-3 text-sm text-text-muted">
          Scan Via Scanner or Enter Otp sent on your Phone.
        </p>
      </div>

      <div className="pt-1">
        <OtpInput value={otp} onChange={setOtp} />
      </div>

      {error && (
        <p className="text-center text-xs font-medium text-error">{error}</p>
      )}

      <button
        type="submit"
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-text-primary px-6 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        LOGIN TO DASHBOARD
      </button>

      <button
        type="button"
        onClick={handleResend}
        className="mx-auto block cursor-pointer text-sm font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
      >
        Resend Code
      </button>

      {import.meta.env.DEV && (
        <button
          type="button"
          onClick={handleDevBypass}
          className="mx-auto block cursor-pointer text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          Skip OTP (Testing)
        </button>
      )}
    </form>
  );
};

export default TwoFactorForm;
