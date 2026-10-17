import { Navigate, Outlet } from "react-router-dom";

import {
  getAdminEmail,
  getPendingTwoFactorToken,
  getPendingAuthenticationPurpose,
  isAdminAuthenticated,
} from "../../features/auth/auth-session";

export default function PendingTwoFactorRoute() {
  if (isAdminAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  const pendingPurpose = getPendingAuthenticationPurpose();
  const email = getAdminEmail();
  const token = getPendingTwoFactorToken();
  const hasPendingLogin = Boolean(
    email && pendingPurpose && (pendingPurpose === "login" || token),
  );

  if (!hasPendingLogin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
