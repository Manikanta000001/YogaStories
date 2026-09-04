import { X, Users, Edit3, XCircle } from "lucide-react";

const SessionDetailsModal = ({
  session,
  status,
  onClose,
  onEdit,
  onCancel,
  onViewParticipants,
  StatusBadge,
}) => {
  if (!session) return null;

  const percentFull = Math.round(
    (session.bookedCount / session.capacity) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col transform transition-transform duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] block">
                {session.id}
              </span>

              <h3 className="font-extrabold text-base text-[var(--text-main)]">
                Session Overview
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* Lifecycle */}
            <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-between">
              <span className="font-bold text-[var(--text-muted)]">
                Session Lifecycle
              </span>

              <StatusBadge status={status} />
            </div>

            {/* Class Information */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                Class Information
              </span>

              <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Class Title
                  </span>

                  <span className="font-bold text-[var(--text-main)]">
                    {session.className}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Instructor
                  </span>

                  <span className="font-semibold text-[var(--text-main)]">
                    {session.instructor}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Date
                  </span>

                  <span className="font-semibold text-[var(--text-main)]">
                    {session.formattedDate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Time Slot
                  </span>

                  <span className="font-semibold text-[var(--text-main)]">
                    {session.startTime} – {session.endTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Occupancy */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                Occupancy & Capacity
              </span>

              <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[var(--text-muted)]">
                    Booked Participants
                  </span>

                  <span className="font-black text-sm text-[var(--text-main)]">
                    {session.bookedCount} / {session.capacity}
                  </span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-[var(--bg-surface)] overflow-hidden border border-[var(--border-color)]">
                  <div
                    className="h-full bg-[var(--accent-primary)] transition-all"
                    style={{
                      width: `${Math.min(percentFull, 100)}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                  <span>Occupancy Rate</span>

                  <span className="font-bold text-[var(--accent-primary)]">
                    {percentFull}%
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                Pricing Structure
              </span>

              <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Session Type
                  </span>

                  <span className="font-bold text-[var(--text-main)]">
                    {session.type}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">
                    Price per Ticket
                  </span>

                  <span className="font-bold text-amber-500">
                    {session.type === "Paid"
                      ? `₹${session.price}`
                      : "Free Access"}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {session.notes && (
              <div className="p-4 rounded-xl bg-[var(--bg-main)]/50 border border-[var(--border-color)] space-y-1">
                <span className="font-bold text-[var(--text-main)] block">
                  Session Notes
                </span>

                <p className="text-[var(--text-muted)] italic">
                  {session.notes}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
            <button
              onClick={onViewParticipants}
              className="w-full py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-extrabold hover:bg-[var(--accent-hover)] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              View Participants ({session.bookedCount})
            </button>

            {status !== "COMPLETED" && status !== "CANCELLED" && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={onEdit}
                  className="py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-main)] font-semibold hover:bg-[var(--bg-surface)] transition-all flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>

                <button
                  onClick={onCancel}
                  className="py-2.5 rounded-xl bg-red-500/10 text-red-500 font-extrabold hover:bg-red-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsModal;