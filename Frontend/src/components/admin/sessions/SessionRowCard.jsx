import { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  Calendar,
  User,
  Users,
  MoreVertical,
  Eye,
  Edit3,
  XCircle,
} from "lucide-react";

const SessionRowCard = ({
  session,
  status,
  onViewDetails,
  onViewParticipants,
  onEdit,
  onCancel,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const percentFull = Math.round(
    (session.bookedCount / session.capacity) * 100,
  );

  let capState = "Available";
  let capColor = "bg-emerald-500";

  if (percentFull >= 100) {
    capState = "Full";
    capColor = "bg-red-500";
  } else if (percentFull >= 80) {
    capState = "Almost Full";
    capColor = "bg-amber-500";
  }

  return (
    // your existing JSX here
    <div
      className={`app-card relative p-4 hover:border-[var(--accent-primary)]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        menuOpen ? "z-50" : "z-0"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-center min-w-[100px] shrink-0">
          <span className="text-xs font-black text-[var(--accent-primary)] block">
            {session.startTime}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
            {session.endTime}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-[11px] font-bold text-[var(--text-muted)]">
              #{session.id}
            </span>
            <h3 className="font-extrabold text-sm text-[var(--text-main)]">
              {session.className}
            </h3>
            <StatusBadge status={status} />
          </div>

          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {session.formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {session.instructor}
            </span>
            <span>•</span>
            {session.type === "Paid" ? (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-bold text-[10px]">
                Paid ₹{session.price}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md bg-slate-500/10 text-[var(--text-muted)] font-bold text-[10px]">
                Free
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[var(--border-color)]">
        <div className="w-36 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-[var(--text-main)]">
              {session.bookedCount} / {session.capacity}
            </span>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                capState === "Full"
                  ? "bg-red-500/10 text-red-500"
                  : capState === "Almost Full"
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-emerald-500/10 text-emerald-500"
              }`}
            >
              {capState}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--bg-main)] overflow-hidden border border-[var(--border-color)]">
            <div
              className={`h-full transition-all duration-500 ${capColor}`}
              style={{ width: `${Math.min(percentFull, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={onViewParticipants}
            className="px-3 py-1.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-surface)] text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">Participants</span> (
            {session.bookedCount})
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl z-[100] p-1.5 space-y-1 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onViewDetails();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-main)] text-[var(--text-main)] text-left"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-500" /> View Details
                  </button>

                  {status !== "COMPLETED" && status !== "CANCELLED" && (
                    <>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          onEdit();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-main)] text-[var(--text-main)] text-left"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-500" /> Edit
                        Session
                      </button>

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          onCancel();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 text-left"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel Session
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRowCard;
