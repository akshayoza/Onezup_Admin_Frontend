import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import EmailField from "./fields/EmailField";
import PasswordField from "./fields/PasswordField";

import type { LoginFormValues } from "../auth.types";
import { loginSchema } from "../auth.validation";
import { MOCK_ADMIN_CREDENTIALS } from "../auth.mock";

interface LoginFormProps {
  onLoginError: (message: string) => void;
}

const LoginForm = ({ onLoginError }: LoginFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    const isValid =
      values.email === MOCK_ADMIN_CREDENTIALS.email &&
      values.password === MOCK_ADMIN_CREDENTIALS.password;

    if (!isValid) {
      reset();

      onLoginError(
        "The email or password you entered is incorrect. Please try again.",
      );

      return;
    }

    navigate("/two-factor-authentication");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <EmailField register={register} error={errors.email?.message} />

      <PasswordField register={register} error={errors.password?.message} />

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-md bg-text-primary px-6 text-sm font-semibold text-surface transition-colors duration-200 hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
      >
        VERIFY
      </button>
    </form>
  );
};

export default LoginForm;
