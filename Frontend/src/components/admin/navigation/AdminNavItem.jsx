import { NavLink } from "react-router-dom";

const AdminNavItem = ({ to, label, icon: Icon, collapsed, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `admin-nav-item ${isActive ? "active" : ""}`
      }
    >
      <Icon className="admin-nav-icon" size={18} strokeWidth={1.8} />

      <span className={`admin-nav-label ${collapsed ? "hidden" : ""}`}>
        {label}
      </span>
    </NavLink>
  );
};

export default AdminNavItem;