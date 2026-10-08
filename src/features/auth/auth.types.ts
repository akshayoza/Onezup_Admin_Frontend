export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}
