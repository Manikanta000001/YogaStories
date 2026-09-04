import { Plus, Layers, CalendarCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="app-card p-6 animate-slide-up delay-300">
      <h3 className="font-bold text-text-main text-sm mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
        <button
          onClick={() => navigate("/sessions")}
          className="p-3 rounded-xl bg-accent-primary text-white hover:bg-accent-hover transition-all duration-200 interactive-btn flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Session
        </button>

        <button
          onClick={() => navigate("/classes")}
          className="p-3 rounded-xl bg-bg-main border border-border-color text-text-main hover:bg-bg-surface transition-all duration-200 interactive-btn flex items-center justify-center gap-2"
        >
          <Layers className="w-4 h-4" />
          Class
        </button>

        <button
          onClick={() => navigate("/bookings")}
          className="p-3 rounded-xl bg-bg-main border border-border-color text-text-main hover:bg-bg-surface transition-all duration-200 interactive-btn flex items-center justify-center gap-2"
        >
          <CalendarCheck className="w-4 h-4" />
          Bookings
        </button>

        <button
          onClick={() => navigate("/clients")}
          className="p-3 rounded-xl bg-bg-main border border-border-color text-text-main hover:bg-bg-surface transition-all duration-200 interactive-btn flex items-center justify-center gap-2"
        >
          <Users className="w-4 h-4" />
          Clients
        </button>
      </div>
    </div>
  );
};

export default QuickActions;