import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";
import PendingTwoFactorRoute from "../components/common/PendingTwoFactorRoute";
import { isAdminAuthenticated } from "../features/auth/auth-session";

const loginPage = lazy(() => import("../pages/auth/LoginPage"));

const twoFactorAuthenticationPage = lazy(
  () => import("../pages/auth/TwoFactorAuthenticationPage"),
);

const twoFactorSetupPromptPage = lazy(
  () => import("../pages/auth/TwoFactorSetupPromptPage"),
);

const forgotPasswordPage = lazy(
  () => import("../pages/auth/ForgotPasswordPage"),
);

const resetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));

const dashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const driversPage = lazy(() => import("../pages/drivers/DriversPage"));
const ridersPage = lazy(() => import("../pages/riders/RidersPage"));
const paymentsPage = lazy(() => import("../pages/payments/PaymentsPage"));

const notificationManagementPage = lazy(
  () => import("../pages/notifications/NotificationManagementPage"),
);

const ticketManagementPage = lazy(
  () => import("../pages/tickets/TicketManagementPage"),
);

const reportsAnalyticsPage = lazy(
  () => import("../pages/reports-analytics/ReportsAnalyticsPage"),
);

const routeElement = (Page: ComponentType) => (
  <Suspense
    fallback={
      <main className="grid min-h-screen place-items-center bg-surface text-text-secondary">
        Loading…
      </main>
    }
  >
    <Page />
  </Suspense>
);

export const router = createBrowserRouter([
  // Public authentication routes
  {
    path: "/login",
    element: routeElement(loginPage),
  },
  {
    path: "/forgot-password",
    element: routeElement(forgotPasswordPage),
  },
  {
    path: "/reset-password",
    element: routeElement(resetPasswordPage),
  },

  // Pending password-authentication routes. They cannot access the dashboard
  // until the OTP is verified or the user safely declines optional setup.
  {
    element: <PendingTwoFactorRoute />,
    children: [
      {
        path: "/two-factor-setup-prompt",
        element: routeElement(twoFactorSetupPromptPage),
      },
      {
        path: "/two-factor-authentication",
        element: routeElement(twoFactorAuthenticationPage),
      },
    ],
  },

  // Protected admin pages
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: routeElement(dashboardPage),
      },
      {
        path: "/drivers",
        element: routeElement(driversPage),
      },
      {
        path: "/riders",
        element: routeElement(ridersPage),
      },
      {
        path: "/payments",
        element: routeElement(paymentsPage),
      },
      {
        path: "/notifications",
        element: routeElement(notificationManagementPage),
      },
      {
        path: "/tickets",
        element: routeElement(ticketManagementPage),
      },
      {
        path: "/reports-analytics",
        element: routeElement(reportsAnalyticsPage),
      },
    ],
  },

  // Root route
  {
    path: "/",
    element: (
      <Navigate to={isAdminAuthenticated() ? "/dashboard" : "/login"} replace />
    ),
  },

  // Unknown routes
  {
    path: "*",
    element: (
      <Navigate to={isAdminAuthenticated() ? "/dashboard" : "/login"} replace />
    ),
  },
]);
