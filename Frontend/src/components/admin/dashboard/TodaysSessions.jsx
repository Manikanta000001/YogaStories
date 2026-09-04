import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const TodaysSessions = ({ sessions = [] }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, [sessions]);

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatus = (session) => {
    if (session.status === "filled") {
      return {
        label: "Full",
        className: "bg-amber-500/10 text-amber-500",
      };
    }

    if (session.status === "unavailable") {
      return {
        label: "Unavailable",
        className: "bg-red-500/10 text-red-500",
      };
    }

    return {
      label: "Available",
      className: "bg-emerald-500/10 text-emerald-500",
    };
  };

  return (
    <div className="floating-card p-7 flex flex-col justify-between animate-slide-up delay-200">
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-border-color mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center transition-transform duration-300 hover:rotate-12">
              <CalendarDays className="w-4 h-4" />
            </div>

            <h3 className="font-bold text-text-main text-base">
              Today's Sessions
            </h3>
          </div>

          <Link
            to="/sessions"
            className="text-xs font-semibold text-accent-primary hover:underline transition-all"
          >
            View All Sessions
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="py-10 text-center">
            <CalendarDays className="w-8 h-8 mx-auto mb-3 text-text-muted opacity-50" />

            <p className="text-sm font-semibold text-text-main">
              No sessions scheduled today
            </p>

            <p className="text-xs text-text-muted mt-1">
              There are no sessions available for today.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2 todays-sessions-scroll">
            {sessions.map((session) => {
              const status = getStatus(session);

              const booked = session.bookedCount || 0;
              const capacity = session.capacity || 0;

              const percent =
                capacity > 0 ? Math.min((booked / capacity) * 100, 100) : 0;

              const isFree = session.type === "free";

              return (
                <div
                  key={session._id}
                  className="p-5 rounded-xl bg-bg-main border border-border-color flex flex-col sm:flex-row sm:items-center justify-between gap-4 interactive-row cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-text-main text-sm">
                        {session.classId?.title || "Yoga Session"}
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${status.className}`}
                      >
                        {status.label}
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                          isFree
                            ? "bg-slate-500/10 text-text-muted"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        {isFree ? "Free" : `₹${session.price}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-text-muted font-medium">
                      <span>
                        {formatTime(session.startTime)} –{" "}
                        {formatTime(session.endTime)}
                      </span>

                      <span>•</span>

                      <span>Leena Sajja</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2 min-w-[150px]">
                    <div className="text-xs flex justify-between w-full font-medium">
                      <span className="text-text-muted">Capacity</span>

                      <span className="font-bold text-text-main">
                        {booked} / {capacity}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-bg-surface rounded-full overflow-hidden border border-border-color">
                      <div
                        className={`h-full ${
                          percent >= 100 ? "bg-amber-500" : "bg-accent-primary"
                        } rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: loaded ? `${percent}%` : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysSessions;
