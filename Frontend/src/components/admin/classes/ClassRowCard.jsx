import {
  Calendar,
  CalendarDays,
  Clock,
  Edit3,
  Eye,
  MoreHorizontal,
  PauseCircle,
  PlayCircle,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

const ClassRowCard = ({
  cls,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  showToast,
  CategoryIcon,
  ClassStatusBadge,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = () => setMenuOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <div
      className={`app-card p-5 flex flex-col justify-between group relative transition-all duration-200 ${menuOpen ? "z-30 shadow-xl" : "z-1 hover:-translate-y-0.5"}`}
    >
      <div>
        {/* Cover Header */}
        <div
          className={`relative w-full h-32 rounded-xl p-4 text-white flex flex-col justify-between mb-4 shadow-xs ${
            menuOpen ? "z-40" : "z-0"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${cls.gradient} overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]`}
          >
            <div className="absolute -right-2 -bottom-2 opacity-25 transform rotate-12 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <CategoryIcon name={cls.icon || "layers"} className="w-24 h-24" />
            </div>
          </div>

          <div className="relative z-50 flex items-center justify-between">
            <ClassStatusBadge status={cls.status} />
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md hover:bg-black/60 text-white flex items-center justify-center transition-all shadow-xs active:scale-95"
                aria-label="Class action menu"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 py-1.5 rounded-xl bg-[var(--bg-surface)] shadow-2xl z-[100] text-xs font-medium border border-border-color animate-fade-in divide-y divide-border-color"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onViewDetails();
                      }}
                      className="w-full text-left px-3.5 py-2 text-text-main hover:bg-bg-main flex items-center gap-2.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-500" /> View
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit();
                      }}
                      className="w-full text-left px-3.5 py-2 text-text-main hover:bg-bg-main flex items-center gap-2.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-text-muted" /> Edit
                      Class
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onToggleStatus();
                      }}
                      className="w-full text-left px-3.5 py-2 text-text-main hover:bg-bg-main flex items-center gap-2.5 transition-colors"
                    >
                      {cls.status === "active" ? (
                        <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <PlayCircle className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                      {cls.status === "active"
                        ? "Deactivate Class"
                        : "Activate Class"}
                    </button>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete();
                      }}
                      className="w-full text-left px-3.5 py-2 text-rose-500 hover:bg-rose-500/10 flex items-center gap-2.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Class
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold border border-white/20 shadow-xs flex items-center gap-1">
              <Clock className="w-3 h-3" /> {cls.duration}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="font-bold text-text-main text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {cls.name}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
            {cls.description}
          </p>
        </div>
      </div>

      {/* Footer Session Indicators */}
      <div className="pt-4 mt-4 border-t border-border-color space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-text-muted flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-text-muted" /> Upcoming
            Sessions
          </span>
          <span
            className={
              cls.upcomingSessions > 0
                ? "text-indigo-600 dark:text-indigo-400 font-bold"
                : "text-text-muted/60 font-normal"
            }
          >
            {cls.upcomingSessions > 0
              ? `${cls.upcomingSessions} upcoming`
              : "No upcoming"}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Total Recorded</span>
          <span className="font-medium text-text-main">
            {cls.totalSessions} sessions
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onViewDetails}
            className="flex-1 py-2 px-3 rounded-xl bg-bg-main border border-border-color text-text-main text-xs font-semibold hover:bg-bg-surface hover:border-indigo-500/40 active:scale-[0.98] transition-all text-center"
          >
            View Details
          </button>
          {/* <button
            type="button"
            onClick={() => showToast(`Filtered sessions for ${cls.name}`)}
            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold flex items-center justify-center shrink-0 border border-indigo-500/20 active:scale-95"
            title="View Class Sessions"
          >
            <Calendar className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default ClassRowCard;
