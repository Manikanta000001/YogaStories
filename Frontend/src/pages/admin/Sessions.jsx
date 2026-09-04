import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import CalendarView from "../../components/admin/sessions/CalendarView";
import CreateEditSessionModal from "../../components/admin/sessions/CreateEditSessionModal";
import SessionDetailsModal from "../../components/admin/sessions/SessionDetailsModal";
import SessionFilters from "../../components/admin/sessions/SessionFilters";
import ParticipantsDrawer from "../../components/admin/sessions/SessionParticipantsModal";
import SessionRowCard from "../../components/admin/sessions/SessionRowCard";
import SessionSkeleton from "../../components/admin/sessions/SessionSkeleton";
import SessionSummaryCard from "../../components/admin/sessions/SessionSummaryCard";
import SessionToolbar from "../../components/admin/sessions/SessionToolbar";
import StatusBadge from "../../components/admin/sessions/StatusBadge";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
// --- Inline Icon Components (SVG) ---
const IconWrapper = ({ children, className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const CalendarIcon = (props) => (
  <IconWrapper {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </IconWrapper>
);
const Clock = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconWrapper>
);
const Users = (props) => (
  <IconWrapper {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconWrapper>
);
const Search = (props) => (
  <IconWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconWrapper>
);
const Plus = (props) => (
  <IconWrapper {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </IconWrapper>
);
const X = (props) => (
  <IconWrapper {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
);
const ChevronLeft = (props) => (
  <IconWrapper {...props}>
    <path d="m15 18-6-6 6-6" />
  </IconWrapper>
);
const ChevronRight = (props) => (
  <IconWrapper {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconWrapper>
);
const MoreVertical = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </IconWrapper>
);
const CheckCircle2 = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </IconWrapper>
);
const XCircle = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </IconWrapper>
);
const AlertTriangle = (props) => (
  <IconWrapper {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </IconWrapper>
);

const RefreshCw = (props) => (
  <IconWrapper {...props}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </IconWrapper>
);
const LayoutGrid = (props) => (
  <IconWrapper {...props}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </IconWrapper>
);
const ListIcon = (props) => (
  <IconWrapper {...props}>
    <line x1="8" x2="21" y1="6" y2="6" />
    <line x1="8" x2="21" y1="12" y2="12" />
    <line x1="8" x2="21" y1="18" y2="18" />
    <line x1="3" x2="3.01" y1="6" y2="6" />
    <line x1="3" x2="3.01" y1="12" y2="12" />
    <line x1="3" x2="3.01" y1="18" y2="18" />
  </IconWrapper>
);
const Edit3 = (props) => (
  <IconWrapper {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </IconWrapper>
);
const Eye = (props) => (
  <IconWrapper {...props}>
    <path d="2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconWrapper>
);
const AlertCircle = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </IconWrapper>
);
const User = (props) => (
  <IconWrapper {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconWrapper>
);
const Sparkles = (props) => (
  <IconWrapper {...props}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
  </IconWrapper>
);

// const INITIAL_CLASSES = [
//   "Morning Flow",
//   "Hatha Yoga",
//   "Power Yoga",
//   "Evening Relaxation",
//   "Meditation",
// ];

function convertTo24Hour(time) {
  if (!time) return "00:00";

  // Already HH:mm
  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }

  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier?.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier?.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}`;
}

function computeSessionStatus(session) {
  // Backend cancellation takes priority
  if (
    session.status === "cancelled" ||
    session.status === "Cancelled" ||
    session.manuallyCancelled
  ) {
    return "CANCELLED";
  }

  const now = new Date();

  // Build the session start/end using the session's local date/time
  const start = new Date(
    `${session.date}T${convertTo24Hour(session.startTime)}:00`,
  );
  const end = new Date(
    `${session.date}T${convertTo24Hour(session.endTime)}:00`,
  );

  if (now < start) {
    return "UPCOMING";
  }

  if (now >= start && now < end) {
    return "ONGOING";
  }

  return "COMPLETED";
}

function formatTimeForDisplay(time) {
  if (!time) return "";

  // Already "07:00 AM"
  if (/[AP]M$/i.test(time)) {
    return time;
  }

  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getStartHour24(time) {
  if (!time) return 0;

  if (/^\d{2}:\d{2}$/.test(time)) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  }

  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier?.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }

  if (modifier?.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return hours + minutes / 60;
}

const formatSession = (session) => {
  const date = new Date(session.date);

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const startHour24 = getStartHour24(session.startTime);

  return {
    // MongoDB ID → UI ID
    id: session._id,

    // Populated class → className expected by UI
    className: session.classId?.title || "Unknown Class",

    // Keep API date in YYYY-MM-DD format
    date: session.date
      ? new Date(session.date).toISOString().split("T")[0]
      : "",

    formattedDate,

    // Backend already stores these
    startTime: formatTimeForDisplay(session.startTime),
    endTime: formatTimeForDisplay(session.endTime),

    startHour24,

    // These aren't currently supplied by your backend
    instructor: session.instructor || "Not Assigned",

    type: session.type?.toLowerCase() === "free" ? "Free" : "Paid",

    price: Number(session.price || 0),

    capacity: Number(session.capacity || 0),

    bookedCount: Number(session.bookedCount || 0),

    // Backend status
    status: session.status || "scheduled",

    manuallyCancelled: session.status?.toLowerCase() === "cancelled",

    cancellationReason: session.cancellationReason || "",

    notes: session.notes || "",

    participants: session.participants || [],

    // Keep original backend object available if needed later
    _raw: session,
  };
};

function SessionPage() {
  const [searchParams] = useSearchParams();
  const classIdFromUrl = searchParams.get("classId");
  // Theme State
  const [darkMode, setDarkMode] = useState(true);

  // Sessions State
  // const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/sessions`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch sessions");
      }

      const formattedSessions = result.data.map(formatSession);

      setSessions(formattedSessions);
    } catch (error) {
      console.error("Sessions fetch error:", error);
      setError(error.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await api("/classes");

        const formattedClasses = (result.data || []).map((classItem) => ({
          id: classItem._id,
          name: classItem.title || classItem.name,
        }));

        setClasses(formattedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setClasses([]);
      }
    };

    fetchClasses();
  }, []);
  
  useEffect(() => {
  if (!classIdFromUrl || classes.length === 0) return;

  const selectedClass = classes.find(
    (cls) => String(cls.id) === String(classIdFromUrl)
  );

  if (selectedClass) {
    setClassFilter(selectedClass.name);
  }
}, [classIdFromUrl, classes]);

  // Date Navigator & View Switcher
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'calendar'

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState("All");
  const [capacityFilter, setCapacityFilter] = useState("All");

  // Modals & Drawers
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [cancellingSession, setCancellingSession] = useState(null);
  const [cancellationReasonInput, setCancellationReasonInput] = useState("");
  const [activeDetailsSession, setActiveDetailsSession] = useState(null);
  const [activeParticipantsSession, setActiveParticipantsSession] =
    useState(null);

  // Demo Loading / Toast State
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Apply Dark Mode Class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Keyboard Esc key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCreateModalOpen(false);
        setEditingSession(null);
        setCancellingSession(null);
        setActiveDetailsSession(null);
        setActiveParticipantsSession(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 7500);
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);

      await fetchSessions();

      showToast("Sessions refreshed");
    } catch (error) {
      console.error("Refresh error:", error);
      showToast(error.message || "Failed to refresh sessions");
    } finally {
      setIsLoading(false);
    }
  };

  // Statistics calculation
  const stats = useMemo(() => {
    const currentDate = new Date();

    const todayDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    let today = 0;
    let upcoming = 0;
    let ongoing = 0;
    let completed = 0;
    let cancelled = 0;

    sessions.forEach((session) => {
      const status = computeSessionStatus(session);

      if (session.date === todayDate && status !== "CANCELLED") {
        today++;
      }

      if (status === "UPCOMING") {
        upcoming++;
      } else if (status === "ONGOING") {
        ongoing++;
      } else if (status === "COMPLETED") {
        completed++;
      } else if (status === "CANCELLED") {
        cancelled++;
      }
    });

    return {
      today,
      upcoming,
      ongoing,
      completed,
      cancelled,
    };
  }, [sessions]);

  // Filtered sessions calculation
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const computedStatus = computeSessionStatus(s);

      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.className.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.instructor.toLowerCase().includes(q);

      // Status
      const matchesStatus =
        statusFilter === "All" || computedStatus === statusFilter.toUpperCase();

      // Class
      const matchesClass = classFilter === "All" || s.className === classFilter;

      // Type
      const matchesType = typeFilter === "All" || s.type === typeFilter;

      // Date Range
      const now = new Date();

      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const weekStart = new Date(today);
      const day = weekStart.getDay();

      const diffToMonday = day === 0 ? 6 : day - 1;
      weekStart.setDate(weekStart.getDate() - diffToMonday);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const sessionDate = new Date(`${s.date}T00:00:00`);
      // Date Range
      let matchesDate = true;

      if (dateRangeFilter === "Today") {
        matchesDate = s.date === selectedDate;
      } else if (dateRangeFilter === "Tomorrow") {
        const tomorrowDate = `${tomorrow.getFullYear()}-${String(
          tomorrow.getMonth() + 1,
        ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

        matchesDate = s.date === tomorrowDate;
      } else if (dateRangeFilter === "This Week") {
        matchesDate = sessionDate >= weekStart && sessionDate <= weekEnd;
      } else if (selectedDate && dateRangeFilter === "Custom") {
        matchesDate = s.date === selectedDate;
      }

      // Capacity
      let matchesCapacity = true;
      const pct = (s.bookedCount / s.capacity) * 100;
      if (capacityFilter === "Available") {
        matchesCapacity = pct < 80;
      } else if (capacityFilter === "Almost Full") {
        matchesCapacity = pct >= 80 && pct < 100;
      } else if (capacityFilter === "Full") {
        matchesCapacity = pct >= 100;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesClass &&
        matchesType &&
        matchesDate &&
        matchesCapacity
      );
    });
  }, [
    sessions,
    searchQuery,
    statusFilter,
    classFilter,
    typeFilter,
    dateRangeFilter,
    selectedDate,
    capacityFilter,
  ]);

  const hasActiveFilters =
    searchQuery !== "" ||
    statusFilter !== "All" ||
    classFilter !== "All" ||
    typeFilter !== "All" ||
    dateRangeFilter !== "All" ||
    capacityFilter !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setClassFilter("All");
    setTypeFilter("All");
    setDateRangeFilter("All");
    setCapacityFilter("All");
    showToast("Filters cleared");
  };
  const handleCreateSession = async (newSessionData) => {
    try {
      const result = await api("/sessions", {
        method: "POST",
        body: JSON.stringify(newSessionData),
      });

      console.log("SESSION CREATED:", result);

      setIsCreateModalOpen(false);

      showToast("Session created successfully.");

      // Reload sessions from backend
      fetchSessions();
    } catch (error) {
      console.error("Create session error:", error);

      showToast(error.message || "Failed to create session.");
    }
  };
  const handleUpdateSession = async (updatedData) => {
    try {
      const result = await api(`/sessions/${updatedData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          date: updatedData.date,
          startTime: updatedData.startTime,
          endTime: updatedData.endTime,
          type: updatedData.type,
          price: updatedData.price,
          capacity: updatedData.capacity,
        }),
      });

      console.log("SESSION UPDATED:", result);

      setEditingSession(null);

      if (activeDetailsSession && activeDetailsSession.id === updatedData.id) {
        setActiveDetailsSession(null);
      }

      await fetchSessions();

      showToast("Session updated successfully.");
    } catch (error) {
      console.error("Update session error:", error);

      showToast(error.message || "Failed to update session.");
    }
  };

  const handleConfirmCancelSession = async () => {
    console.log("1. Confirm Cancel clicked");
    console.log("2. Cancelling session:", cancellingSession);

    if (!cancellingSession) {
      console.log("3. No cancelling session — returning");
      return;
    }

    const reason =
      cancellationReasonInput.trim() || "Cancelled by Administrator";

    console.log("4. Session ID:", cancellingSession.id);
    console.log("5. Sending cancel request...");

    try {
      const result = await api(`/sessions/${cancellingSession.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "cancelled",
        }),
      });

      console.log("6. SESSION CANCELLED:", result);

      setCancellingSession(null);
      setCancellationReasonInput("");

      await fetchSessions();

      showToast("Session cancelled successfully.");
    } catch (error) {
      console.error("7. Cancel session error:", error);
      showToast(error.message || "Failed to cancel session.");
    }
  };

  const dynamicClasses = useMemo(() => {
    const classes = sessions
      .map((session) => session.className)
      .filter(Boolean);

    return [...new Set(classes)];
  }, [sessions]);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Top Session Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-main)]">
                Session Schedule
              </h1>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Manage live, upcoming, and completed YogaPT classes, schedules,
              and client bookings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] shadow-xs transition-colors"
              title="Refresh Data"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" /> Create Session
            </button>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <SessionSummaryCard
            title="TODAY"
            count={stats.today}
            subtitle="Sessions today"
            icon={<CalendarIcon className="w-4 h-4 text-indigo-500" />}
            isLoading={isLoading}
          />
          <SessionSummaryCard
            title="UPCOMING"
            count={stats.upcoming}
            subtitle="Scheduled next"
            icon={<Clock className="w-4 h-4 text-emerald-500" />}
            isLoading={isLoading}
          />
          <SessionSummaryCard
            title="ONGOING"
            count={stats.ongoing}
            subtitle="In progress"
            badge="LIVE"
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            isLoading={isLoading}
          />
          <SessionSummaryCard
            title="COMPLETED"
            count={stats.completed}
            subtitle="Past sessions"
            icon={<CheckCircle2 className="w-4 h-4 text-slate-400" />}
            isLoading={isLoading}
          />
          <SessionSummaryCard
            title="CANCELLED"
            count={stats.cancelled}
            subtitle="Historical logs"
            icon={<XCircle className="w-4 h-4 text-red-500" />}
            isLoading={isLoading}
          />
        </section>

        <SessionToolbar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          dateRangeFilter={dateRangeFilter}
          setDateRangeFilter={setDateRangeFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <SessionFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          capacityFilter={capacityFilter}
          setCapacityFilter={setCapacityFilter}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
          classes={dynamicClasses}
        />

        {/* Sessions Display Container */}
        {isLoading ? (
          <SessionSkeleton />
        ) : filteredSessions.length === 0 ? (
          <div className="app-card p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-main)]">
                No sessions found
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
                No sessions match your search filters or selected date criteria.
              </p>
            </div>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-bold hover:bg-[var(--accent-hover)] transition-all"
              >
                Clear All Filters
              </button>
            ) : (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-bold hover:bg-[var(--accent-hover)] transition-all"
              >
                + Create First Session
              </button>
            )}
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <SessionRowCard
                key={session.id}
                session={session}
                status={computeSessionStatus(session)}
                onViewDetails={() => setActiveDetailsSession(session)}
                onViewParticipants={() => setActiveParticipantsSession(session)}
                onEdit={() => setEditingSession(session)}
                onCancel={() => setCancellingSession(session)}
              />
            ))}
          </div>
        ) : (
          <CalendarView
            sessions={filteredSessions}
            onSelectSession={(s) => setActiveDetailsSession(s)}
            computeSessionStatus={computeSessionStatus}
            StatusBadge={StatusBadge}
            selectedDate={selectedDate}
          />
        )}

        {/* --- Modals & Drawers --- */}
        {isCreateModalOpen && (
          <CreateEditSessionModal
            title="Create New Session"
            initialClass={classes[0]}
            initialDate={selectedDate}
            initialClasses={classes}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateSession}
          />
        )}

        {editingSession && (
          <CreateEditSessionModal
            title="Edit Session"
            sessionData={editingSession}
            initialClasses={classes}
            onClose={() => setEditingSession(null)}
            onSubmit={handleUpdateSession}
          />
        )}

        {cancellingSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="app-card max-w-md w-full p-6 space-y-5 bg-[var(--bg-surface)] shadow-2xl relative transform animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[var(--text-main)]">
                      Cancel Session?
                    </h3>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {cancellingSession.id}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCancellingSession(null)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Are you sure you want to cancel{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingSession.className}
                </strong>{" "}
                scheduled on{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingSession.formattedDate}
                </strong>{" "}
                at{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingSession.startTime}
                </strong>
                ?
              </p>

              {cancellingSession.bookedCount > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {cancellingSession.bookedCount} participant
                      {cancellingSession.bookedCount > 1 ? "s" : ""} currently
                      booked
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Booking history will be preserved. Registered clients will
                    receive cancellation notifications.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-1">
                  Reason for cancellation (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Instructor emergency / Facility maintenance..."
                  value={cancellationReasonInput}
                  onChange={(e) => setCancellationReasonInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-primary)] placeholder:text-[var(--text-muted)]/50"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setCancellingSession(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Keep Session
                </button>
                <button
                  onClick={handleConfirmCancelSession}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-red-500 text-white hover:bg-red-600 transition-all shadow-md flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeDetailsSession && (
          <SessionDetailsModal
            session={activeDetailsSession}
            status={computeSessionStatus(activeDetailsSession)}
            onClose={() => setActiveDetailsSession(null)}
            onEdit={() => {
              const sess = activeDetailsSession;
              setActiveDetailsSession(null);
              setEditingSession(sess);
            }}
            onCancel={() => {
              const sess = activeDetailsSession;
              setActiveDetailsSession(null);
              setCancellingSession(sess);
            }}
            onViewParticipants={() => {
              const sess = activeDetailsSession;
              setActiveDetailsSession(null);
              setActiveParticipantsSession(sess);
            }}
            StatusBadge={StatusBadge}
          />
        )}

        {activeParticipantsSession && (
          <ParticipantsDrawer
            session={activeParticipantsSession}
            onClose={() => setActiveParticipantsSession(null)}
          />
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-6 right-6 z-[9999] w-auto max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 shadow-xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />

            <span className="text-[var(--text-main)] whitespace-nowrap">
              {toast.message}
            </span>

            <button
              onClick={() => setToast({ show: false, message: "" })}
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] ml-2 p-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
export default SessionPage;
