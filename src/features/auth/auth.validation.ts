import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must contain at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must contain at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
