import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children,activities = []  }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const openMobileSidebar = () => {
    setIsMobileOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div
      className="admin-root min-h-screen"
      data-admin-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="flex min-h-screen">
        <AdminSidebar
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
          isMobileOpen={isMobileOpen}
          closeMobile={closeMobileSidebar}
          onLogout={handleLogout}
        />

        <div className="flex-1 min-w-0 flex flex-col">
    <AdminHeader
  onOpenMobile={openMobileSidebar}
  isDarkMode={isDarkMode}
  toggleTheme={toggleTheme}
  onToggleNotifications={toggleNotifications}
  isNotificationsOpen={isNotificationsOpen}
  onCloseNotifications={closeNotifications}
  activities={activities}
/>

          <main className="flex-1 p-0 md:p-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;