const CalendarView = ({
  sessions,
  onSelectSession,
  computeSessionStatus,
  StatusBadge,
  selectedDate,
}) => {
  // Get Monday of the current week
  const getMonday = (date) => {
    const d = new Date(date);
    const day = d.getDay();

    const diff = day === 0 ? -6 : 1 - day;

    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);

    return d;
  };

  // Format date as YYYY-MM-DD without timezone shifting
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDisplayDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const monday = getMonday(
    selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date(),
  );

  // Generate Monday → Sunday
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      name: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      date: formatDisplayDate(date),
      fullDate: formatDateKey(date),
    };
  });

  const weekStart = days[0].fullDate;
  const weekEnd = days[6].fullDate;

  const weekStartDisplay = new Date(`${weekStart}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
    },
  );

  const weekEndDisplay = new Date(`${weekEnd}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <div className="app-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
        <h3 className="font-bold text-xs text-[var(--text-main)] uppercase tracking-wider">
          Weekly Scheduling Overview
        </h3>

        <span className="text-xs text-[var(--text-muted)] font-medium">
          {weekStartDisplay} – {weekEndDisplay}
        </span>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 border-b border-[var(--border-color)] bg-[var(--bg-main)] text-center text-xs font-bold divide-x divide-[var(--border-color)]">
        {days.map((day) => (
          <div key={day.fullDate} className="py-2.5">
            <span className="text-[var(--text-muted)] block text-[10px] uppercase">
              {day.name}
            </span>

            <span className="text-[var(--text-main)] font-extrabold">
              {day.date}
            </span>
          </div>
        ))}
      </div>

      {/* Sessions */}
      <div className="grid grid-cols-7 divide-x divide-[var(--border-color)] min-h-[350px] bg-[var(--bg-surface)]">
        {days.map((day) => {
          const daySessions = sessions.filter(
            (session) => session.date?.slice(0, 10) === day.fullDate,
          );

          return (
            <div key={day.fullDate} className="p-2 space-y-2">
              {daySessions.map((session) => {
                const status = computeSessionStatus(session);

                return (
                  <div
                    key={session.id}
                    onClick={() => onSelectSession(session)}
                    className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] hover:border-[var(--accent-primary)] cursor-pointer transition-all space-y-1 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[var(--accent-primary)]">
                        {session.startTime}
                      </span>

                      <span className="text-[9px] font-mono text-[var(--text-muted)]">
                        {session.bookedCount}/{session.capacity}
                      </span>
                    </div>

                    <span className="font-extrabold text-xs text-[var(--text-main)] block truncate">
                      {session.className}
                    </span>

                    <StatusBadge status={status} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
