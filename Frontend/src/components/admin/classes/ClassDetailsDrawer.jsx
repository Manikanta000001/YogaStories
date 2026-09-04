import { Calendar, Edit3, X } from "lucide-react";
import { useEffect } from "react";
const ClassDetailsDrawer = ({
  ClassStatusBadge,
  selectedClassDetails,
  onClose,
  onEdit,
  onViewSessions,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  if (!selectedClassDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-full sm:max-w-md bg-bg-surface border-l border-border-color shadow-2xl p-5 sm:p-6 overflow-y-auto animate-slide-left z-10 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border-color pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Class Details
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cover Visual */}
          <div
            className={`w-full h-36 rounded-2xl bg-gradient-to-br ${selectedClassDetails.gradient} p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-md`}
          >
            <div className="flex items-center justify-between">
              <ClassStatusBadge status={selectedClassDetails.status} />
              <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-semibold">
                {selectedClassDetails.duration}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black">
                {selectedClassDetails.name}
              </h3>
              <span className="text-xs opacity-80 font-mono">
                ID: {selectedClassDetails.id}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
              Description
            </h4>
            <p className="text-xs text-text-main leading-relaxed bg-bg-main p-3.5 rounded-xl border border-border-color">
              {selectedClassDetails.description}
            </p>
          </div>

          {/* Metrics Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-bg-main border border-border-color">
              <span className="text-text-muted font-medium block">
                Upcoming Sessions
              </span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {selectedClassDetails.upcomingSessions}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-bg-main border border-border-color">
              <span className="text-text-muted font-medium block">
                Total Sessions
              </span>
              <span className="text-lg font-bold text-text-main">
                {selectedClassDetails.totalSessions}
              </span>
            </div>
          </div>

          {/* Scheduled Sessions Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Upcoming Sessions List
              </h4>
            </div>
            {selectedClassDetails.sessions &&
            selectedClassDetails.sessions.length > 0 ? (
              <div className="space-y-2 max-h-[395px] overflow-y-auto pr-1 class-modal-scroll">
                {selectedClassDetails.sessions.map((sess, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-bg-main border border-border-color text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-text-main">
                        {sess.date}
                      </div>
                      <div className="text-text-muted text-[11px]">
                        {sess.time}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[11px]">
                      {sess.booked} / {sess.capacity} booked
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted italic bg-bg-main p-3.5 rounded-xl border border-border-color">
                No upcoming sessions currently scheduled for this class
                category.
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-border-color flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => onEdit(selectedClassDetails)}
            className="flex-1 py-2.5 rounded-xl bg-bg-main border border-border-color text-text-main text-xs font-bold hover:bg-bg-surface transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Edit3 className="w-4 h-4" /> Edit Class
          </button>
          <button
            type="button"
            onClick={() => onViewSessions(selectedClassDetails)}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 text-center shadow-md shadow-indigo-600/20"
          >
            <Calendar className="w-4 h-4" /> View Sessions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsDrawer;
