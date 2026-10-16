import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router-dom";

const routeElement = (Page: ComponentType) => (
  <Suspense fallback={<main className="grid min-h-screen place-items-center text-text-secondary">Loading…</main>}>
    <Page />
  </Suspense>
);
export const router = createBrowserRouter([
  {
    path: "/login",
    element: routeElement(lazy(() => import("../pages/auth/LoginPage"))),
  },
  {
    path: "/two-factor-authentication",
    element: routeElement(lazy(() => import("../pages/auth/TwoFactorAuthenticationPage"))),
  },
  {
    path: "/forgot-password",
    element: routeElement(lazy(() => import("../pages/auth/ForgotPasswordPage"))),
  },
  {
    path: "/dashboard",
    element: routeElement(lazy(() => import("../pages/dashboard/DashboardPage"))),
  },
  {
    path: "/reset-password",
    element: routeElement(lazy(() => import("../pages/auth/ResetPasswordPage"))),
  },
  {
    path: "/drivers",
    element: routeElement(lazy(() => import("../pages/drivers/DriversPage"))),
  },
  {
    path: "/riders",
    element: routeElement(lazy(() => import("../pages/riders/RidersPage"))),
  },
  {
    path: "/payments",
    element: routeElement(lazy(() => import("../pages/payments/PaymentsPage"))),
  },
  {
    path: "/notifications",
    element: routeElement(lazy(() => import("../pages/notifications/NotificationManagementPage"))),
  },
  {
    path: "/tickets",
    element: routeElement(lazy(() => import("../pages/tickets/TicketManagementPage"))),
  },
  {
    path: "/reports-analytics",
    element: routeElement(lazy(() => import("../pages/reports-analytics/ReportsAnalyticsPage"))),
  },
]);
