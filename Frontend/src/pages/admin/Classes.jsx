import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  Edit3,
  Feather,
  Heart,
  Layers,
  Moon,
  PauseCircle,
  PlayCircle,
  Plus,
  Power,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Sun,
  Trash2,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ClassDetailsDrawer from "../../components/admin/classes/ClassDetailsDrawer";
import ClassRowCard from "../../components/admin/classes/ClassRowCard";
import ClassSkeleton from "../../components/admin/classes/ClassSkeleton";
import ClassSummaryCard from "../../components/admin/classes/ClassSummaryCard";
import ClassToolbar from "../../components/admin/classes/ClassToolbar";
import CreateEditClassModal from "../../components/admin/classes/CreateEditClassModal";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import { api } from "../../services/api";

const CategoryIcon = ({ name, className = "w-4 h-4" }) => {
  switch (name) {
    case "sun":
      return <Sun className={className} />;
    case "feather":
      return <Feather className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "moon":
      return <Moon className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "compass":
      return <Compass className={className} />;
    case "book-open":
      return <BookOpen className={className} />;
    case "layers":
    default:
      return <Layers className={className} />;
  }
};

const INITIAL_CLASSES = [
  {
    id: "cls-01",
    name: "Morning Flow",
    description:
      "An energizing morning practice focused on mobility, dynamic postures, and mindful breath synchronization.",
    duration: "60 min",
    status: "active",
    upcomingSessions: 6,
    totalSessions: 32,
    createdDate: "12 July 2026",
    gradient: "from-indigo-600 to-purple-600",
    icon: "sun",
    sessions: [
      { date: "28 Aug 2026", time: "07:00 – 08:00", booked: 12, capacity: 15 },
      { date: "29 Aug 2026", time: "07:00 – 08:00", booked: 10, capacity: 15 },
      { date: "30 Aug 2026", time: "07:00 – 08:00", booked: 14, capacity: 15 },
      { date: "31 Aug 2026", time: "07:00 – 08:00", booked: 8, capacity: 15 },
    ],
  },
  {
    id: "cls-02",
    name: "Hatha Yoga",
    description:
      "A steady practice combining traditional postures, breathing techniques, and deep conscious relaxation.",
    duration: "60 min",
    status: "active",
    upcomingSessions: 4,
    totalSessions: 24,
    createdDate: "15 May 2026",
    gradient: "from-emerald-600 to-teal-700",
    icon: "feather",
    sessions: [
      { date: "29 Aug 2026", time: "09:00 – 10:00", booked: 9, capacity: 12 },
      { date: "31 Aug 2026", time: "09:00 – 10:00", booked: 11, capacity: 12 },
    ],
  },
  {
    id: "cls-03",
    name: "Power Yoga",
    description:
      "A dynamic and strength-focused yoga practice designed to build stamina, balance, and core stability.",
    duration: "60 min",
    status: "active",
    upcomingSessions: 5,
    totalSessions: 28,
    createdDate: "01 June 2026",
    gradient: "from-rose-600 to-amber-600",
    icon: "zap",
    sessions: [
      { date: "28 Aug 2026", time: "16:00 – 17:00", booked: 4, capacity: 10 },
      { date: "30 Aug 2026", time: "16:00 – 17:00", booked: 8, capacity: 10 },
    ],
  },
  {
    id: "cls-04",
    name: "Evening Relaxation",
    description:
      "A gentle practice designed to release deep muscle tension, calm the nervous system, and prepare the body for rest.",
    duration: "45 min",
    status: "active",
    upcomingSessions: 3,
    totalSessions: 19,
    createdDate: "20 June 2026",
    gradient: "from-blue-600 to-cyan-600",
    icon: "moon",
    sessions: [
      { date: "28 Aug 2026", time: "18:30 – 19:15", booked: 8, capacity: 10 },
    ],
  },
  {
    id: "cls-05",
    name: "Guided Meditation",
    description:
      "A guided mindfulness session focused on breath awareness, mental clarity, and deep emotional grounding.",
    duration: "30 min",
    status: "active",
    upcomingSessions: 2,
    totalSessions: 15,
    createdDate: "05 July 2026",
    gradient: "from-violet-600 to-fuchsia-600",
    icon: "sparkles",
    sessions: [
      { date: "29 Aug 2026", time: "18:00 – 18:30", booked: 6, capacity: 12 },
    ],
  },
  {
    id: "cls-06",
    name: "Restorative Yin",
    description:
      "Passive floor-based poses held for extended intervals targeting deep connective fascia tissue and joints.",
    duration: "75 min",
    status: "active",
    upcomingSessions: 1,
    totalSessions: 8,
    createdDate: "10 Aug 2026",
    gradient: "from-teal-600 to-emerald-800",
    icon: "heart",
    sessions: [
      { date: "01 Sept 2026", time: "10:00 – 11:15", booked: 5, capacity: 10 },
    ],
  },
  {
    id: "cls-07",
    name: "Ashtanga Primary",
    description:
      "Traditional structured sequence of breath-synchronized postures built for intermediate and advanced practitioners.",
    duration: "90 min",
    status: "inactive",
    upcomingSessions: 0,
    totalSessions: 12,
    createdDate: "10 Jan 2026",
    gradient: "from-slate-600 to-gray-700",
    icon: "compass",
    sessions: [],
  },
  {
    id: "cls-08",
    name: "Beginners Foundations",
    description:
      "Step-by-step introduction covering key alignment principles, breathing techniques, and basic sun salutations.",
    duration: "45 min",
    status: "inactive",
    upcomingSessions: 0,
    totalSessions: 0,
    createdDate: "02 Feb 2026",
    gradient: "from-zinc-600 to-stone-700",
    icon: "book-open",
    sessions: [],
  },
];

const ClassStatusBadge = ({ status }) => {
  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border shadow-xs ${
        isActive
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          : "bg-slate-500/10 text-slate-300 border-slate-400/30"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
      ></span>
      {isActive ? "ACTIVE" : "INACTIVE"}
    </span>
  );
};

const CLASS_VISUALS = [
  {
    gradient: "from-indigo-600 to-purple-600",
    icon: "sun",
  },
  {
    gradient: "from-emerald-600 to-teal-700",
    icon: "feather",
  },
  {
    gradient: "from-rose-600 to-amber-600",
    icon: "zap",
  },
  {
    gradient: "from-blue-600 to-cyan-600",
    icon: "moon",
  },
  {
    gradient: "from-violet-600 to-fuchsia-600",
    icon: "sparkles",
  },
  {
    gradient: "from-teal-600 to-emerald-800",
    icon: "heart",
  },
  {
    gradient: "from-slate-600 to-gray-700",
    icon: "compass",
  },
  {
    gradient: "from-zinc-600 to-stone-700",
    icon: "book-open",
  },
];
const DEFAULT_CLASS_IMAGE =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80";

const getClassVisuals = (classItem, index) => {
  const name = classItem.title?.toLowerCase() || "";

  // Keep the original visual identity for known classes.
  if (name.includes("morning")) return CLASS_VISUALS[0];
  if (name.includes("hatha")) return CLASS_VISUALS[1];
  if (name.includes("power")) return CLASS_VISUALS[2];
  if (name.includes("evening")) return CLASS_VISUALS[3];
  if (name.includes("meditation")) return CLASS_VISUALS[4];
  if (name.includes("yin")) return CLASS_VISUALS[5];
  if (name.includes("ashtanga")) return CLASS_VISUALS[6];
  if (name.includes("beginner")) return CLASS_VISUALS[7];

  // Give new classes a different visual automatically.
  return CLASS_VISUALS[index % CLASS_VISUALS.length];
};

export default function Classes() {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);

  // Modals & Drawers
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [statusToggleModal, setStatusToggleModal] = useState({
    open: false,
    classObj: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    classObj: null,
  });

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Handle Toast trigger
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  // Toggle Dark Mode class on HTML/container
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Stats Calculations
  const stats = useMemo(() => {
    const total = classes.length;
    const active = classes.filter((c) => c.status === "active").length;
    const inactive = classes.filter((c) => c.status === "inactive").length;
    const upcomingSessions = classes.reduce(
      (sum, c) => sum + (c.upcomingSessions || 0),
      0,
    );
    return { total, active, inactive, upcomingSessions };
  }, [classes]);

  // Filter & Sort Logic
  const filteredClasses = useMemo(() => {
    return classes
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || c.status === statusFilter;

        const matchesActivity =
          activityFilter === "all" ||
          (activityFilter === "has_upcoming" && c.upcomingSessions > 0) ||
          (activityFilter === "no_upcoming" && c.upcomingSessions === 0);

        return matchesSearch && matchesStatus && matchesActivity;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "created")
          return new Date(b.createdDate) - new Date(a.createdDate);
        if (sortBy === "most_sessions")
          return b.totalSessions - a.totalSessions;
        if (sortBy === "upcoming_sessions")
          return b.upcomingSessions - a.upcomingSessions;
        return 0;
      });
  }, [classes, searchQuery, statusFilter, activityFilter, sortBy]);

  const getLocalDateKey = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getSessionDateTime = (session) => {
    const dateKey = getLocalDateKey(session.date);

    return new Date(`${dateKey}T${session.startTime}`);
  };

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      setSimulatedError(false);

      const [classesResponse, sessionsResponse] = await Promise.all([
        api("/classes/admin"),
        api("/sessions"),
      ]);

      const backendClasses = classesResponse.data || [];
      const backendSessions = sessionsResponse.data || [];

      const now = new Date();

      const formattedClasses = backendClasses.map((classItem, index) => {
        const visuals = getClassVisuals(classItem, index);

        // Get all sessions belonging to this class
        const classSessions = backendSessions.filter((session) => {
          const sessionClassId =
            typeof session.classId === "object"
              ? session.classId?._id
              : session.classId;

          return String(sessionClassId) === String(classItem._id);
        });

        // Upcoming sessions
        const upcomingSessions = classSessions
          .filter((session) => {
            if (session.status === "cancelled") return false;

            const sessionDateTime = getSessionDateTime(session);

            return sessionDateTime > now;
          })
          .sort(
            (a, b) =>
              getSessionDateTime(a).getTime() - getSessionDateTime(b).getTime(),
          );

        return {
          id: classItem._id,
          name: classItem.title,
          description: classItem.description,

          duration: `${classItem.duration} min`,

          status: classItem.active ? "active" : "inactive",

          // REAL SESSION DATA
          upcomingSessions: upcomingSessions.length,
          totalSessions: classSessions.length,

          sessions: upcomingSessions.map((session) => ({
            id: session._id,
            date: getLocalDateKey(session.date),
            time: `${session.startTime} - ${session.endTime}`,
            booked: session.bookedCount || 0,
            capacity: session.capacity || 0,
            status: session.status,
            type: session.type,
            price: session.price,
          })),

          createdDate: classItem.createdAt,
          category: classItem.category,
          level: classItem.level,
          image: classItem.image,
          benefits: classItem.benefits || [],
          schedule: classItem.schedule || [],

          gradient: visuals.gradient,
          icon: visuals.icon,
        };
      });

      setClasses(formattedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setSimulatedError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  const hasActiveFilters =
    searchQuery !== "" || statusFilter !== "all" || activityFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setActivityFilter("all");
    setSortBy("name");
  };

  // Action Handlers
  const handleSaveClass = async (formData) => {
    try {
      setIsLoading(true);
      setSimulatedError(false);

      const slug = formData.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const durationValue = parseInt(formData.duration, 10);

      const payload = {
        title: formData.name,
        slug,
        description: formData.description,
        duration: durationValue,
        level: formData.level,
        category: formData.category,
        image: formData.image.trim() || DEFAULT_CLASS_IMAGE,
        benefits: editingClass?.benefits || [],
        schedule: editingClass?.schedule || [],
        active: formData.status === "active",
      };

      if (editingClass) {
        await api(`/classes/${editingClass.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });

        showToast(`Updated "${formData.name}" successfully.`);
      } else {
        await api("/classes", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        showToast(`Created class "${formData.name}" successfully.`);
      }

      await fetchClasses();

      setIsFormModalOpen(false);
      setEditingClass(null);
    } catch (error) {
      console.error("Error saving class:", error);
      showToast(error.message || "Failed to save class.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmStatusToggle = async () => {
    const target = statusToggleModal.classObj;

    if (!target) return;

    const newStatus = target.status === "active" ? "inactive" : "active";

    try {
      setIsLoading(true);
      setSimulatedError(false);

      await api(`/classes/${target.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          active: newStatus === "active",
        }),
      });

      await fetchClasses();

      showToast(`Class "${target.name}" is now ${newStatus}.`);
      setStatusToggleModal({ open: false, classObj: null });
    } catch (error) {
      console.error("Error updating class status:", error);

      showToast(error.message || "Failed to update class status.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteClass = async () => {
    const target = deleteModal.classObj;

    if (!target) return;

    try {
      setIsLoading(true);
      setSimulatedError(false);

      await api(`/classes/${target.id}`, {
        method: "DELETE",
      });

      await fetchClasses();

      showToast(`Deleted class "${target.name}".`);

      setDeleteModal({ open: false, classObj: null });

      if (selectedClassDetails?.id === target.id) {
        setSelectedClassDetails(null);
      }
    } catch (error) {
      console.error("Error deleting class:", error);

      showToast(error.message || "Failed to delete class.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSimulatedRefresh = async () => {
    await fetchClasses();
  };
  const handleViewDetails = (cls) => {
    setSelectedClassDetails(cls);
  };

  return (
    <AdminLayout>
      <div
        className={`min-h-screen p-3.5 sm:p-6 md:p-8 font-sans ${isDarkMode ? "dark" : ""}`}
      >
        {/* Dynamic Theme Styles and Utility Class Enforcements */}
        <style>{`
        :root {
          --bg-main: #F8FAFC;
          --bg-surface: #FFFFFF;
          --bg-card: #FFFFFF;
          --accent-primary: #4F46E5;
          --accent-hover: #4338CA;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --border-color: #E2E8F0;
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
        }

        .dark {
          --bg-main: #090D16;
          --bg-surface: #0F172A;
          --bg-card: #131E33;
          --accent-primary: #6366F1;
          --accent-hover: #4F46E5;
          --text-main: #F8FAFC;
          --text-muted: #94A3B8;
          --border-color: #1E293B;
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }

        body {
          background-color: var(--bg-main);
          color: var(--text-main);
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        /* Explicit Class Fallbacks to ensure full rendering consistency */
        .bg-bg-main { background-color: var(--bg-main); }
        .bg-bg-surface { background-color: var(--bg-surface); }
        .bg-bg-card { background-color: var(--bg-card); }
        .text-text-main { color: var(--text-main); }
        .text-text-muted { color: var(--text-muted); }
        .border-border-color { border-color: var(--border-color); }
        .bg-accent-primary { background-color: var(--accent-primary); }
        .text-accent-primary { color: var(--accent-primary); }

        .app-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s ease;
        }

        .app-card:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .skeleton-bg {
          background: linear-gradient(90deg, var(--border-color) 25%, var(--bg-surface) 50%, var(--border-color) 75%);
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes slideLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-shimmer {
          animation: shimmer 1.8s infinite linear;
        }

        .animate-slide-left {
          animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

        <div className="max-w-[1500px] mx-auto space-y-5 sm:space-y-6">
          {/* TOP UTILITY HEADER / TOOLBAR */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-color">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-text-main tracking-tight mt-1.5 flex items-center gap-2.5">
                <span>Classes Management</span>
              </h1>
              <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                Define, organize, and manage reusable yoga class categories and
                schedules.
              </p>
            </div>

            {/* Action Button Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleSimulatedRefresh}
                className="p-2 sm:p-2.5 rounded-xl bg-bg-surface border border-border-color text-text-muted hover:text-text-main hover:border-indigo-500/30 transition-all shadow-xs active:scale-95 flex items-center justify-center"
                title="Refresh catalogue"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin text-indigo-500" : ""}`}
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingClass(null);
                  setIsFormModalOpen(true);
                }}
                className="px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all ml-1"
              >
                <Plus className="w-4 h-4" /> <span>Add Class</span>
              </button>
            </div>
          </header>

          {}
          {simulatedError ? (
            <div className="app-card p-8 sm:p-12 text-center space-y-4 my-8 border-rose-500/30 bg-rose-500/5">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-main">
                  Unable to load classes
                </h3>
                <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
                  Something went wrong while retrieving your class catalogue.
                  Please check your network connection and try again.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSimulatedError(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all inline-flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Try Again
              </button>
            </div>
          ) : (
            <>
              {/* SUMMARY STATISTICS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <ClassSummaryCard
                  title="Total Classes"
                  count={stats.total}
                  subtitle="Reusable categories"
                  icon={Layers}
                  valueClassName="text-text-main"
                  iconClassName="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                />

                <ClassSummaryCard
                  title="Active"
                  count={stats.active}
                  subtitle="Available for scheduling"
                  icon={CheckCircle2}
                  valueClassName="text-emerald-500"
                  iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                />

                <ClassSummaryCard
                  title="Inactive"
                  count={stats.inactive}
                  subtitle="Hidden from scheduling"
                  icon={PauseCircle}
                  valueClassName="text-text-muted"
                  iconClassName="bg-slate-500/10 text-slate-500 border-slate-500/20"
                />

                <ClassSummaryCard
                  title="Upcoming Sessions"
                  count={stats.upcomingSessions}
                  subtitle="Scheduled occurrences"
                  icon={CalendarDays}
                  valueClassName="text-indigo-600 dark:text-indigo-400"
                  iconClassName="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                />
              </div>

              <ClassToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                activityFilter={activityFilter}
                setActivityFilter={setActivityFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />

              {isLoading ? (
                <ClassSkeleton />
              ) : filteredClasses.length === 0 ? (
                /* EMPTY STATE */
                <div className="app-card p-8 sm:p-12 text-center space-y-4 my-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-main">
                      {hasActiveFilters
                        ? "No classes match your filters"
                        : "No classes created yet"}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto">
                      {hasActiveFilters
                        ? "Try adjusting your search criteria or clear active filters."
                        : "Create your first yoga class definition to start building your studio schedule."}
                    </p>
                  </div>
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="px-4 py-2 rounded-xl bg-bg-main border border-border-color text-text-main text-xs font-semibold hover:bg-bg-surface transition-all inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingClass(null);
                        setIsFormModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Create First Class
                    </button>
                  )}
                </div>
              ) : viewMode === "grid" ? (
                /* GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredClasses.map((cls) => (
                    <ClassRowCard
                      key={cls.id}
                      cls={cls}
                      onViewDetails={() => setSelectedClassDetails(cls)}
                      onEdit={() => {
                        setEditingClass(cls);
                        setIsFormModalOpen(true);
                      }}
                      onToggleStatus={() =>
                        setStatusToggleModal({ open: true, classObj: cls })
                      }
                      onDelete={() =>
                        setDeleteModal({ open: true, classObj: cls })
                      }
                      showToast={showToast}
                      CategoryIcon={CategoryIcon}
                      ClassStatusBadge={ClassStatusBadge}
                    />
                  ))}
                </div>
              ) : (
                /* LIST VIEW */
                <div className="app-card overflow-hidden border border-border-color shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs min-w-[640px]">
                      <thead>
                        <tr className="border-b border-border-color bg-bg-main text-text-muted uppercase tracking-wider font-bold text-[11px]">
                          <th className="py-3.5 px-5">Class</th>
                          <th className="py-3.5 px-4">Duration</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-center">
                            Upcoming Sessions
                          </th>
                          <th className="py-3.5 px-4 text-center">
                            Total Sessions
                          </th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="font-medium">
                        {filteredClasses.map((cls) => (
                          <tr
                            key={cls.id}
                            className="border-b border-border-color hover:bg-bg-main/60 transition-colors"
                          >
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cls.gradient} text-white flex items-center justify-center shrink-0 shadow-xs`}
                                >
                                  <CategoryIcon
                                    name={cls.icon || "layers"}
                                    className="w-4 h-4"
                                  />
                                </div>
                                <div>
                                  <div className="font-bold text-text-main text-sm">
                                    {cls.name}
                                  </div>
                                  <div className="text-text-muted text-[11px] line-clamp-1 max-w-xs">
                                    {cls.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-text-muted whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 font-medium">
                                <Clock className="w-3.5 h-3.5 text-text-muted" />{" "}
                                {cls.duration}
                              </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <ClassStatusBadge status={cls.status} />
                            </td>
                            <td className="py-4 px-4 text-center font-bold whitespace-nowrap">
                              {cls.upcomingSessions > 0 ? (
                                <span className="text-indigo-600 dark:text-indigo-400">
                                  {cls.upcomingSessions} upcoming
                                </span>
                              ) : (
                                <span className="text-text-muted font-normal">
                                  None
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-center text-text-muted whitespace-nowrap">
                              {cls.totalSessions}
                            </td>
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedClassDetails(cls)}
                                  className="px-2.5 py-1.5 rounded-lg bg-bg-main border border-border-color text-text-main hover:bg-bg-surface font-semibold transition-all shadow-xs text-[11px]"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingClass(cls);
                                    setIsFormModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main transition-colors"
                                  title="Edit"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setStatusToggleModal({
                                      open: true,
                                      classObj: cls,
                                    })
                                  }
                                  className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-main transition-colors"
                                  title={
                                    cls.status === "active"
                                      ? "Deactivate"
                                      : "Activate"
                                  }
                                >
                                  {cls.status === "active" ? (
                                    <Power className="w-4 h-4 text-amber-500" />
                                  ) : (
                                    <PlayCircle className="w-4 h-4 text-emerald-500" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {selectedClassDetails && (
            <ClassDetailsDrawer
              ClassStatusBadge={ClassStatusBadge}
              selectedClassDetails={selectedClassDetails}
              onClose={() => setSelectedClassDetails(null)}
              onEdit={(cls) => {
                setEditingClass(cls);
                setIsFormModalOpen(true);
              }}
              onViewSessions={(cls) => {
                window.location.href = `/sessions?classId=${cls.id}`;
              }}
            />
          )}

          {/* CREATE / EDIT CLASS MODAL */}
          {isFormModalOpen && (
            <CreateEditClassModal
              editingClass={editingClass}
              onClose={() => {
                setIsFormModalOpen(false);
                setEditingClass(null);
              }}
              onSave={handleSaveClass}
            />
          )}

          {/* ACTIVATE / DEACTIVATE CONFIRMATION MODAL */}
          {statusToggleModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
              <div className="p-6 max-w-sm w-full space-y-4 rounded-2xl bg-[var(--bg-surface)] shadow-2xl border border-border-color">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-main">
                    {statusToggleModal.classObj?.status === "active"
                      ? "Deactivate"
                      : "Activate"}{" "}
                    "{statusToggleModal.classObj?.name}"?
                  </h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {statusToggleModal.classObj?.status === "active"
                      ? "Deactivated classes cannot be selected when creating new sessions. Existing scheduled sessions remain unaffected."
                      : "Activating this class will make it available again when scheduling new sessions across YogaPT."}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setStatusToggleModal({ open: false, classObj: null })
                    }
                    className="px-4 py-2 rounded-xl text-text-muted hover:text-text-main text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmStatusToggle}
                    className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-xs ${
                      statusToggleModal.classObj?.status === "active"
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    {statusToggleModal.classObj?.status === "active"
                      ? "Deactivate Class"
                      : "Activate Class"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE CLASS MODAL (WITH SESSION PROTECTION CHECK) */}
          {deleteModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
              <div className="p-6 max-w-md w-full space-y-4 rounded-2xl bg-[var(--bg-surface)] shadow-2xl border border-border-color">
                {deleteModal.classObj?.totalSessions > 0 ? (
                  /* PROTECTED STATE: CANNOT HARD DELETE */
                  <>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-main">
                        This class has associated sessions
                      </h3>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        "{deleteModal.classObj?.name}" has{" "}
                        <strong>
                          {deleteModal.classObj?.totalSessions} total sessions
                        </strong>{" "}
                        linked to it. To preserve historical booking logs,
                        consider deactivating this class instead of deleting it.
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteModal({ open: false, classObj: null })
                        }
                        className="px-4 py-2 rounded-xl text-text-muted hover:text-text-main text-xs font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const cls = deleteModal.classObj;
                          setDeleteModal({ open: false, classObj: null });
                          setStatusToggleModal({ open: true, classObj: cls });
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        Deactivate Class Instead
                      </button>
                    </div>
                  </>
                ) : (
                  /* HARD DELETE PERMITTED */
                  <>
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text-main">
                        Delete "{deleteModal.classObj?.name}"?
                      </h3>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        Are you sure you want to permanently delete this yoga
                        class definition? This action cannot be undone.
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteModal({ open: false, classObj: null })
                        }
                        className="px-4 py-2 rounded-xl text-text-muted hover:text-text-main text-xs font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={confirmDeleteClass}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
                      >
                        Delete Class
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* TOAST NOTIFICATION CONTAINER */}
          <div
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl bg-[var(--bg-surface)] shadow-2xl z-50 flex items-center gap-3 transition-all duration-300 transform text-xs font-medium border border-border-color ${
              toast.show
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0 pointer-events-none"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-text-main">{toast.message}</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
