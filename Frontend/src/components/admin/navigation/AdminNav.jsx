import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  BookOpen,
  Users,
  Megaphone,
  BarChart3,
  Settings,
} from "lucide-react";

import AdminNavItem from "./AdminNavItem";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    to: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Sessions",
    to: "/admin/sessions",
    icon: CalendarDays,
  },
  {
    label: "Classes",
    to: "/admin/classes",
    icon: BookOpen,
  },
  {
    label: "Clients",
    to: "/admin/clients",
    icon: Users,
  },
  {
    label: "Announcements",
    to: "/admin/announcements",
    icon: Megaphone,
  },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

const AdminNav = ({ collapsed, onNavigate }) => {
  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      {navigationItems.map((item) => (
        <AdminNavItem
          key={item.to}
          {...item}
          collapsed={collapsed}
          onClick={onNavigate}
        />
      ))}
    </nav>
  );
};

export default AdminNav;