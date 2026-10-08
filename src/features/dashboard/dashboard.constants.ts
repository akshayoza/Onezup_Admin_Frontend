import {
  BarChart3,
  Bell,
  Car,
  CircleDollarSign,
  LayoutDashboard,
  MapPin,
  Settings,
  Ticket,
  Users,
} from "lucide-react";

export const DASHBOARD_NAVIGATION = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Drivers",
    path: "/drivers",
    icon: Car,
  },
  {
    label: "Passengers",
    path: "/passengers",
    icon: Users,
  },
  {
    label: "Rides",
    path: "/rides",
    icon: MapPin,
  },
  {
    label: "Payments",
    path: "/payments",
    icon: CircleDollarSign,
  },
  {
    label: "Ticket Management",
    path: "/tickets",
    icon: Ticket,
  },
  {
    label: "Reports & Analytics",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Notification Management",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "Admin Management",
    path: "/admins",
    icon: Users,
  },
] as const;