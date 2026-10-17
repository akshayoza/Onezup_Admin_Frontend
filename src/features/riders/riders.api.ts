import { api } from "../../services/api/axios";
import { getAdminAccessToken } from "../auth/auth-session";
import type { PassengerRidesResponse } from "./riders.types";

export interface PassengerApiRecord {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avgRating: number;
  role: string;
  walletBalance: number;
  profileImage: string | null;
  isPhoneVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  totalCompletedRides: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type PassengerApi = PassengerApiRecord;

export interface PassengersResponse {
  message: string;
  statusCode: number;
  error: boolean;
  data: PassengerApiRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetPassengersOptions {
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}

export async function getPassengers(
  options?: GetPassengersOptions,
): Promise<PassengersResponse> {
  const token = getAdminAccessToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  // Only attach pagination query parameters if explicitly provided.
  // When no query parameters are passed, the request executes without query strings,
  // matching the proven working Postman behavior.
  const params: Record<string, number> = {};
  if (typeof options?.page === "number") {
    params.page = options.page;
  }
  if (typeof options?.limit === "number") {
    params.limit = options.limit;
  }

  const response = await api.get<PassengersResponse>(
    "/admin/api/v1/user/passengers",
    {
      params: Object.keys(params).length > 0 ? params : undefined,
      signal: options?.signal,
    },
  );

  return response.data;
}

export interface PassengerDetailsResponse {
  message: string;
  statusCode: number;
  error: boolean;
  data: PassengerApiRecord;
}

export async function getPassengerById(
  id: string,
  options?: { signal?: AbortSignal },
): Promise<PassengerDetailsResponse> {
  const token = getAdminAccessToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await api.get<PassengerDetailsResponse>(
    `/admin/api/v1/user/passengers/${encodeURIComponent(id)}`,
    {
      signal: options?.signal,
    },
  );

  return response.data;
}

export interface GetPassengerRidesOptions {
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}

export async function getPassengerRides(
  id: string,
  options?: GetPassengerRidesOptions,
): Promise<PassengerRidesResponse> {
  const token = getAdminAccessToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const params: Record<string, number> = {};
  if (typeof options?.page === "number") {
    params.page = options.page;
  }
  if (typeof options?.limit === "number") {
    params.limit = options.limit;
  }

  const response = await api.get<PassengerRidesResponse>(
    `/admin/api/v1/user/passenger/${encodeURIComponent(id)}/rides`,
    {
      params: Object.keys(params).length > 0 ? params : undefined,
      signal: options?.signal,
    },
  );

  return response.data;
}

