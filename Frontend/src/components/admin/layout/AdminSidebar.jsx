import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Layers,
  Users,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  isCollapsed,
  toggleCollapse,
  isMobileOpen,
  closeMobile,
  onLogout,
}) => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin", active: true },
    { label: "Bookings", icon: CalendarCheck, href: "/bookings" },
    { label: "Sessions", icon: CalendarDays, href: "/sessions" },
    { label: "Classes", icon: Layers, href: "/classes" },
    { label: "Clients", icon: Users, href: "/clients" },
    { label: "Announcements", icon: Megaphone, href: "/announcements" },
    { label: "Analytics", icon: BarChart3, href: "/analytics" },
    { label: "Settings", icon: Settings, href: "#" },
  ];

  const activeClients = [
    { name: "Priya Sharma", statusColor: "bg-emerald-500" },
    { name: "Rahul Kumar", statusColor: "bg-emerald-500" },
    { name: "Ananya Rao", statusColor: "bg-amber-500" },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-sidebar-bg border-r border-border-color flex flex-col justify-between transform transition-all duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isCollapsed ? "w-20 p-3" : "w-72 p-5"}`}
      >
        <div className="space-y-6">
          {/* Admin Profile / Brand Header */}
          <div
            className={`flex items-center justify-between p-2 rounded-xl bg-bg-surface border border-border-color relative group transition-all duration-300 hover:border-accent-primary/40 ${isCollapsed ? "flex-col gap-2" : ""}`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Leena Sajja"
                className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-accent-primary/20 transition-transform duration-300 group-hover:scale-105"
              />
              {!isCollapsed && (
                <div className="sidebar-label whitespace-nowrap overflow-hidden animate-fade-in">
                  <h4 className="font-bold text-xs text-text-main flex items-center gap-1.5 truncate">
                    Leena Sajja
                    <ChevronDown className="w-3 h-3 text-text-muted transition-transform group-hover:translate-y-0.5" />
                  </h4>
                  <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                    Administrator
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={toggleCollapse}
              className="hidden md:flex p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main transition-all duration-200 active:scale-90 shrink-0"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={closeMobile}
              className="md:hidden text-text-muted hover:text-text-main active:scale-90 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => {
                   
                    closeMobile();
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 py-2.5 rounded-xl transition-all duration-200 interactive-btn ${
                    isCollapsed ? "justify-center px-0" : "px-3.5"
                  } ${
                    isActive
                      ? "bg-accent-primary text-white shadow-md shadow-accent-primary/20 scale-[1.02]"
                      : "text-text-muted hover:text-text-main hover:bg-bg-surface hover:translate-x-1"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
                  />
                  {!isCollapsed && (
                    <span className="sidebar-label whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Studio Active Clients Quick List */}
          {!isCollapsed && (
            <div className="pt-2 sidebar-label animate-fade-in">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  Active Clients
                </span>
                <a
                  href="#"
                  className="text-text-muted hover:text-accent-primary p-1 rounded-md hover:bg-bg-surface transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="space-y-1 text-xs">
                {activeClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-text-muted hover:bg-bg-surface hover:text-text-main transition-all duration-200 cursor-pointer"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${client.statusColor} animate-pulse`}
                    ></span>{" "}
                    {client.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-4 border-t border-border-color">
          <button
            onClick={onLogout}
            title={isCollapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-text-muted hover:text-red-500 hover:bg-red-500/10 text-xs font-medium transition-all duration-200 interactive-btn ${
              isCollapsed ? "justify-center px-0" : "px-3"
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="sidebar-label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
