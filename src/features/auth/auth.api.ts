import { api } from "../../services/api/axios";
import type { LoginRequest, LoginResponse } from "./auth.types";

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);

  return response.data;
};
