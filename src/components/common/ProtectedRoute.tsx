import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isAdminAuthenticated } from "../../features/auth/auth-session";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
