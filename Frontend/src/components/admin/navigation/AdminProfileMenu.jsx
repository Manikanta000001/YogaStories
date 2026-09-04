import { ChevronDown, LogOut } from "lucide-react";

const AdminProfileMenu = ({ collapsed }) => {
  return (
    <div className="admin-profile">
      <div className="admin-profile-info">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          alt="Leena Sajja"
          className="admin-profile-avatar"
        />

        {!collapsed && (
          <div className="admin-profile-details">
            <div className="admin-profile-name">
              <span>Leena Sajja</span>
              <ChevronDown size={13} />
            </div>

            <div className="admin-profile-role">
              <span className="admin-status-dot" />
              Administrator
            </div>
          </div>
        )}
      </div>

      {!collapsed && (
        <button
          type="button"
          className="admin-profile-logout"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      )}
    </div>
  );
};

export default AdminProfileMenu;