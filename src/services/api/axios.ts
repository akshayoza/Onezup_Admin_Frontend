import axios from "axios";
import { getAdminAccessToken } from "../../features/auth/auth-session";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAdminAccessToken();
  const hasAuth =
    (typeof config.headers?.has === "function" &&
      config.headers.has("Authorization")) ||
    Boolean(config.headers?.Authorization) ||
    Boolean(config.headers?.authorization);

  if (token && !hasAuth) {
    if (typeof config.headers?.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string; error?: unknown }>(error)) {
    const data = error.response?.data;

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (Array.isArray(data?.message) && data.message.length > 0) {
      return data.message.filter(Boolean).join(". ");
    }

    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }

    if (Array.isArray(data?.error) && data.error.length > 0) {
      return data.error.filter(Boolean).join(". ");
    }

    if (!error.response) {
      return "Unable to connect to the server. Check your connection.";
    }

    if (error.response.status === 401) {
      return "Your session has expired. Please sign in again.";
    }

    if (error.response.status === 403) {
      return "You do not have permission to perform this action.";
    }

    if (error.response.status >= 500) {
      return "The server encountered an error. Please try again later.";
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
