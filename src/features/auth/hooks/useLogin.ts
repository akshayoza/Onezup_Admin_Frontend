import { useMutation } from "@tanstack/react-query";

import { login } from "../auth.api";
import type { LoginRequest } from "../auth.types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
  });
};
