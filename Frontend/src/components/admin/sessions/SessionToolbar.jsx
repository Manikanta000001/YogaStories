import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";

const SessionToolbar = ({
  selectedDate,
  setSelectedDate,
  dateRangeFilter,
  setDateRangeFilter,
  viewMode,
  setViewMode,
}) => {
  // Convert YYYY-MM-DD to a Date without timezone shifting
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Convert Date back to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";

    const date = parseDate(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  // Previous day
  const goToPreviousDay = () => {
    const date = parseDate(selectedDate);
    date.setDate(date.getDate() - 1);

    setSelectedDate(formatDate(date));
    setDateRangeFilter("Custom");
  };

  // Next day
  const goToNextDay = () => {
    const date = parseDate(selectedDate);
    date.setDate(date.getDate() + 1);

    setSelectedDate(formatDate(date));
    setDateRangeFilter("Custom");
  };

  // Today
  const goToToday = () => {
    const today = new Date();

    setSelectedDate(formatDate(today));
    setDateRangeFilter("Today");
  };

  return (
    <div className="app-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Date Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] p-1">
          {/* Previous Day */}
          <button
            onClick={goToPreviousDay}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Selected Date / Today */}
          <button
            onClick={goToToday}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              dateRangeFilter === "Today"
                ? "bg-[var(--bg-surface)] text-[var(--accent-primary)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            {dateRangeFilter === "Today"
              ? `Today (${formatDisplayDate(selectedDate)})`
              : formatDisplayDate(selectedDate)}
          </button>

          {/* Next Day */}
          <button
            onClick={goToNextDay}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Date Picker */}
        <div className="relative flex items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setDateRangeFilter("Custom");
            }}
            className="bg-[var(--bg-main)] border border-[var(--border-color)] text-xs rounded-xl px-3 py-1.5 text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)]"
          />
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 self-start md:self-auto">
        <span className="text-xs font-semibold text-[var(--text-muted)] mr-1">
          View:
        </span>

        <div className="flex items-center rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] p-1">
          {/* List View */}
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "list"
                ? "bg-[var(--bg-surface)] text-[var(--accent-primary)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List View
          </button>

          {/* Calendar View */}
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "calendar"
                ? "bg-[var(--bg-surface)] text-[var(--accent-primary)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Calendar View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionToolbar;