import { api } from "../../services/api/axios";

// -------------------- Login --------------------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  error: boolean;
  status: number;
  message: string;
  data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    is2faEnabled: boolean;
    isEmail2faEnabled: boolean;
  };
}

export interface LoginResult {
  data: AdminLoginResponse;
  accessToken: string;
}

// -------------------- Generate 2FA QR --------------------

export interface GenerateTwoFactorResponse {
  error: boolean;
  status: number;
  message: string;
  data: {
    secret: string;
    authStatus: number;
    qrImageUrl: string;
  };
}

// -------------------- Enable 2FA (First-Time Setup) --------------------

export interface EnableTwoFactorRequest {
  secret: string;
  otp: string;
}

export interface EnableTwoFactorResponse {
  error: boolean;
  status: number;
  message: string;
  data?: unknown;
}

export interface EnableTwoFactorResult {
  data: EnableTwoFactorResponse;
  accessToken?: string;
}

// -------------------- Verify 2FA OTP (Subsequent Logins) --------------------

export interface VerifyTwoFactorRequest {
  email: string;
  otp: string;
}

export interface VerifyTwoFactorResponse {
  error: boolean;
  status: number;
  message: string;
  data?: unknown;
}

export interface VerifyTwoFactorResult {
  data: VerifyTwoFactorResponse;
  accessToken?: string;
}

// -------------------- Token Extraction Helper --------------------

export function extractResponseToken(response: {
  headers?: Record<string, unknown> | { get?: (name: string) => unknown };
  data?: unknown;
}): string | undefined {
  if (!response) return undefined;

  // 1. Check response headers
  if (response.headers) {
    const getHeader = (name: string): string | undefined => {
      if (
        "get" in response.headers! &&
        typeof response.headers.get === "function"
      ) {
        const val = response.headers.get(name);
        if (typeof val === "string" && val.trim()) return val.trim();
      }
      const raw =
        (response.headers as Record<string, unknown>)[name] ??
        (response.headers as Record<string, unknown>)[name.toLowerCase()];
      if (typeof raw === "string" && raw.trim()) return raw.trim();
      return undefined;
    };

    const headerCandidates = [
      "x-access-token",
      "X-Access-Token",
      "authorization",
      "Authorization",
      "x-temp-token",
      "X-Temp-Token",
      "temp-token",
      "token",
      "Token",
    ];

    for (const name of headerCandidates) {
      const val = getHeader(name);
      if (val) {
        const clean = val.replace(/^Bearer\s+/i, "").trim();
        if (clean) return clean;
      }
    }
  }

  // 2. Check response body
  if (response.data) {
    if (
      typeof response.data === "string" &&
      response.data.trim().startsWith("ey")
    ) {
      return response.data.trim();
    }

    if (typeof response.data === "object") {
      const dataObj = response.data as Record<string, unknown>;

      if (
        typeof dataObj.data === "string" &&
        dataObj.data.trim().startsWith("ey")
      ) {
        return dataObj.data.trim();
      }

      const nestedData =
        dataObj.data && typeof dataObj.data === "object"
          ? (dataObj.data as Record<string, unknown>)
          : undefined;

      const bodyCandidates = [
        nestedData?.accessToken,
        nestedData?.token,
        nestedData?.tempToken,
        nestedData?.temporaryToken,
        nestedData?.jwt,
        nestedData?.access_token,
        dataObj.accessToken,
        dataObj.token,
        dataObj.tempToken,
        dataObj.temporaryToken,
        dataObj.jwt,
        dataObj.access_token,
      ];

      for (const candidate of bodyCandidates) {
        if (typeof candidate === "string" && candidate.trim()) {
          const clean = candidate.replace(/^Bearer\s+/i, "").trim();
          if (clean) return clean;
        }
      }
    }
  }

  return undefined;
}

// -------------------- Login API --------------------

export async function loginAdmin(
  credentials: LoginRequest,
): Promise<LoginResult> {
  const response = await api.post<AdminLoginResponse>(
    "/admin/api/v1/auth/login",
    credentials,
  );

  const accessToken = extractResponseToken(response);

  const rawData = response.data as unknown as
    | Record<string, unknown>
    | undefined;
  const nestedData =
    rawData?.data && typeof rawData.data === "object"
      ? (rawData.data as Record<string, unknown>)
      : undefined;

  const is2fa = Boolean(
    nestedData?.is2faEnabled ||
    rawData?.is2faEnabled ||
    nestedData?.isTwoFactorEnabled ||
    rawData?.isTwoFactorEnabled ||
    nestedData?.authStatus === 1 ||
    rawData?.authStatus === 1
  );

  // If 2FA is not enabled and no token was provided, throw an error.
  // When 2FA is enabled, the final access token is returned by verify2fa.
  if (!accessToken && !is2fa) {
    throw new Error(
      "Login succeeded, but the server did not provide an access token.",
    );
  }

  return {
    data: response.data,
    accessToken: accessToken || "",
  };
}

// -------------------- Generate 2FA QR API --------------------

export async function generateAdminTwoFactor(
  accessToken: string,
  email: string,
): Promise<GenerateTwoFactorResponse> {
  const response = await api.post<GenerateTwoFactorResponse>(
    "/admin/api/v1/auth/generate2fa",
    { email },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
}

// -------------------- Enable 2FA API (First-Time Setup) --------------------

export async function enableAdminTwoFactor(
  request: EnableTwoFactorRequest,
  accessToken: string,
): Promise<EnableTwoFactorResult> {
  const response = await api.post<EnableTwoFactorResponse>(
    "/admin/api/v1/auth/enable2fa",
    {
      secret: request.secret,
      otp: request.otp,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const replacementToken = extractResponseToken(response);

  return {
    data: response.data,
    accessToken: replacementToken ?? accessToken,
  };
}

// -------------------- Verify 2FA OTP API (Subsequent Logins) --------------------

export async function verifyAdminTwoFactor(
  request: VerifyTwoFactorRequest,
  accessToken?: string,
): Promise<VerifyTwoFactorResult> {
  const headers: Record<string, string> = {};
  if (accessToken && accessToken.trim()) {
    headers.Authorization = `Bearer ${accessToken.trim()}`;
  }

  const response = await api.post<VerifyTwoFactorResponse>(
    "/admin/api/v1/auth/verify2fa",
    {
      email: request.email.trim(),
      otp: request.otp.trim(),
    },
    {
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    },
  );

  const replacementToken = extractResponseToken(response);

  return {
    data: response.data,
    accessToken: replacementToken ?? (accessToken || undefined),
  };
}

export async function logoutAdmin(accessToken: string): Promise<void> {
  await api.delete("/admin/api/v1/auth/logout", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
