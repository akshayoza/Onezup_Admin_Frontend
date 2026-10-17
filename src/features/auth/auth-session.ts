const AUTHENTICATED_KEY = "onezup_admin_authenticated";
const ACCESS_TOKEN_KEY = "onezup_admin_access_token";
const PENDING_TOKEN_KEY = "onezup_admin_pending_2fa_token";
const PENDING_PURPOSE_KEY = "onezup_admin_pending_2fa_purpose";
const PENDING_SECRET_KEY = "onezup_admin_pending_2fa_secret";
const PENDING_QR_KEY = "onezup_admin_pending_2fa_qr";
const ADMIN_EMAIL_KEY = "onezup_admin_email";

export function isAdminAuthenticated(): boolean {
  return (
    sessionStorage.getItem(AUTHENTICATED_KEY) === "true" &&
    Boolean(sessionStorage.getItem(ACCESS_TOKEN_KEY))
  );
}

export function getAdminAccessToken(): string | null {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAdminEmail(): string | null {
  return sessionStorage.getItem(ADMIN_EMAIL_KEY);
}

export function getPendingTwoFactorToken(): string | null {
  return sessionStorage.getItem(PENDING_TOKEN_KEY);
}

export type PendingAuthenticationPurpose = "login" | "setup";

export function getPendingAuthenticationPurpose(): PendingAuthenticationPurpose | null {
  const purpose = sessionStorage.getItem(PENDING_PURPOSE_KEY);
  return purpose === "login" || purpose === "setup" ? purpose : null;
}

export function setPendingTwoFactor(
  accessToken: string,
  email: string,
  purpose: PendingAuthenticationPurpose,
): void {
  sessionStorage.removeItem(AUTHENTICATED_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(PENDING_SECRET_KEY);
  sessionStorage.removeItem(PENDING_QR_KEY);

  sessionStorage.setItem(PENDING_TOKEN_KEY, accessToken);
  sessionStorage.setItem(PENDING_PURPOSE_KEY, purpose);
  sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
}

export function setPendingTwoFactorSetupData(
  secret: string,
  qrImageUrl: string,
): void {
  sessionStorage.setItem(PENDING_SECRET_KEY, secret);
  sessionStorage.setItem(PENDING_QR_KEY, qrImageUrl);
}

export function getPendingTwoFactorSecret(): string | null {
  return sessionStorage.getItem(PENDING_SECRET_KEY);
}

export function getPendingTwoFactorQr(): string | null {
  return sessionStorage.getItem(PENDING_QR_KEY);
}

export function setAdminAuthenticated(
  accessToken: string,
  email: string,
): void {
  sessionStorage.removeItem(PENDING_TOKEN_KEY);
  sessionStorage.removeItem(PENDING_PURPOSE_KEY);
  sessionStorage.removeItem(PENDING_SECRET_KEY);
  sessionStorage.removeItem(PENDING_QR_KEY);

  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(AUTHENTICATED_KEY, "true");
  sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
}

export function completeAdminAuthentication(replacementToken?: string): void {
  const pendingToken = getPendingTwoFactorToken();
  const currentToken = getAdminAccessToken();
  const email = getAdminEmail();

  const tokenToUse = replacementToken || pendingToken || currentToken;

  if (!tokenToUse || !email) {
    throw new Error("The pending authentication session is incomplete.");
  }

  setAdminAuthenticated(tokenToUse, email);
}

export function clearAdminAuthentication(): void {
  sessionStorage.removeItem(AUTHENTICATED_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(PENDING_TOKEN_KEY);
  sessionStorage.removeItem(PENDING_PURPOSE_KEY);
  sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  sessionStorage.removeItem(PENDING_SECRET_KEY);
  sessionStorage.removeItem(PENDING_QR_KEY);
}
