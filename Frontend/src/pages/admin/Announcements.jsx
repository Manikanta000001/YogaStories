import {
  AlertCircle,
  AlertTriangle,
  Archive,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  FileText,
  Layers,
  Link as LinkIcon,
  List,
  ListOrdered,
  Megaphone,
  MoreVertical,
  PlusCircle,
  RotateCcw,
  Search,
  SearchX,
  Send,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import { api } from "../../services/api";

function StatusBadge({ status }) {
  switch (status) {
    case "PUBLISHED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Published
        </span>
      );
    case "SCHEDULED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 text-[11px] font-bold border border-blue-500/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Scheduled
        </span>
      );
    case "ARCHIVED":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 dark:text-purple-300 text-[11px] font-bold border border-purple-500/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          Archived
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-300 text-[11px] font-bold border border-slate-500/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Draft
        </span>
      );
  }
}

function ActionDropdown({ announcement, onPublish, onArchive, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors active:scale-95"
        title="More actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 app-card py-1.5 shadow-xl z-30 text-xs font-medium text-[var(--text-main)] animate-scale-in border border-[var(--border-color)]">
          {announcement.status !== "PUBLISHED" && (
            <button
              onClick={() => {
                setOpen(false);
                onPublish(announcement);
              }}
              className="w-full text-left px-3.5 py-2 hover:bg-[var(--bg-main)] flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-semibold transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Publish Now
            </button>
          )}

          {announcement.status === "PUBLISHED" && (
            <button
              onClick={() => {
                setOpen(false);
                onArchive(announcement);
              }}
              className="w-full text-left px-3.5 py-2 hover:bg-[var(--bg-main)] flex items-center gap-2 text-purple-500 dark:text-purple-400 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" /> Archive
            </button>
          )}

          <button
            onClick={() => {
              setOpen(false);
              onDelete(announcement);
            }}
            className="w-full text-left px-3.5 py-2 hover:bg-red-500/10 flex items-center gap-2 text-red-500 border-t border-[var(--border-color)] mt-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
    publishMode: "DRAFT",
    scheduleDate: "2026-09-02",
    scheduleTime: "08:00",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3500);
  };
  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await api("/announcements");

      setAnnouncements(
        (response.data || []).map((item) => ({
          ...item,
          id: item._id,
        })),
      );
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((item) => {
        const matchesSearch =
          searchQuery === "" ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "ALL" || item.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "NEWEST")
          return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "OLDEST")
          return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortBy === "TITLE") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [announcements, searchQuery, statusFilter, sortBy]);

  const stats = useMemo(() => {
    return {
      total: announcements.length,
      published: announcements.filter((a) => a.status === "PUBLISHED").length,
      scheduled: announcements.filter((a) => a.status === "SCHEDULED").length,
      drafts: announcements.filter((a) => a.status === "DRAFT").length,
      archived: announcements.filter((a) => a.status === "ARCHIVED").length,
    };
  }, [announcements]);

  const handleOpenCreate = () => {
    setFormData({
      id: null,
      title: "",
      content: "",
      publishMode: "DRAFT",
      scheduleDate: "2026-09-02",
      scheduleTime: "08:00",
    });
    setActiveModal("CREATE");
  };

  const handleOpenEdit = (ann) => {
    setSelectedAnnouncement(ann);
    let pubMode = "DRAFT";
    if (ann.status === "SCHEDULED") pubMode = "SCHEDULE";
    if (ann.status === "PUBLISHED") pubMode = "PUBLISH_NOW";

    setFormData({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      publishMode: pubMode,
      scheduleDate: ann.scheduledFor
        ? ann.scheduledFor.split("T")[0]
        : "2026-09-02",
      scheduleTime: ann.scheduledFor
        ? ann.scheduledFor.split("T")[1].substring(0, 5)
        : "08:00",
    });
    setActiveModal("EDIT");
  };

  const handleOpenDetails = (ann) => {
    setSelectedAnnouncement(ann);
    setActiveModal("DETAILS");
  };

  const handleSaveForm = (forcedStatus = null) => {
    const targetStatus =
      forcedStatus ||
      (formData.publishMode === "PUBLISH_NOW"
        ? "PUBLISHED"
        : formData.publishMode === "SCHEDULE"
          ? "SCHEDULED"
          : "DRAFT");

    if (!formData.title.trim()) {
      showToast("Please enter an announcement title", "error");
      return;
    }

    if (
      targetStatus === "PUBLISHED" &&
      !forcedStatus &&
      formData.publishMode === "PUBLISH_NOW"
    ) {
      setActiveModal("CONFIRM_PUBLISH");
      return;
    }

    if (
      targetStatus === "SCHEDULED" &&
      !forcedStatus &&
      formData.publishMode === "SCHEDULE"
    ) {
      setActiveModal("CONFIRM_SCHEDULE");
      return;
    }

    executeSave(targetStatus);
  };

  const executeSave = async (finalStatus) => {
    try {
      setIsLoading(true);

      let scheduledFor = null;

      if (finalStatus === "SCHEDULED") {
        scheduledFor = new Date(
          `${formData.scheduleDate}T${formData.scheduleTime}`,
        ).toISOString();
      }

      if (formData.id) {
        // EDIT EXISTING ANNOUNCEMENT
        await api(`/announcements/${formData.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: formData.title.trim(),
            content: formData.content.trim(),
            status: finalStatus,
            scheduledFor,
          }),
        });

        showToast(
          finalStatus === "PUBLISHED"
            ? "Announcement published successfully."
            : finalStatus === "SCHEDULED"
              ? "Announcement scheduled successfully."
              : "Announcement updated successfully.",
        );
      } else {
        // CREATE NEW ANNOUNCEMENT
        await api("/announcements", {
          method: "POST",
          body: JSON.stringify({
            title: formData.title.trim(),
            content: formData.content.trim(),
            status: finalStatus,
            scheduledFor,
            author: "Leena Sajja (Admin)",
          }),
        });

        if (finalStatus === "PUBLISHED") {
          showToast("Announcement published successfully.");
        } else if (finalStatus === "SCHEDULED") {
          showToast("Announcement scheduled successfully.");
        } else {
          showToast("Announcement saved as draft.");
        }
      }

      await fetchAnnouncements();

      setActiveModal(null);
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error("Error saving announcement:", error);
      showToast(error.message || "Failed to save announcement.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectPublish = (ann) => {
    setSelectedAnnouncement(ann);
    setFormData({
      id: ann.id,
      title: ann.title,
      content: ann.content,
      publishMode: "PUBLISH_NOW",
      scheduleDate: "2026-09-02",
      scheduleTime: "08:00",
    });
    setActiveModal("CONFIRM_PUBLISH");
  };

  const handleDirectArchive = (ann) => {
    setSelectedAnnouncement(ann);
    setActiveModal("CONFIRM_ARCHIVE");
  };

  const handleDirectDelete = (ann) => {
    setSelectedAnnouncement(ann);
    setActiveModal("CONFIRM_DELETE");
  };

  const confirmArchive = async () => {
    try {
      setIsLoading(true);

      await api(`/announcements/${selectedAnnouncement.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "ARCHIVED",
        }),
      });

      await fetchAnnouncements();

      showToast("Announcement archived successfully.");
      setActiveModal(null);
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error("Error archiving announcement:", error);
      showToast(error.message || "Failed to archive announcement.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsLoading(true);

      await api(`/announcements/${selectedAnnouncement.id}`, {
        method: "DELETE",
      });

      await fetchAnnouncements();

      showToast("Announcement deleted successfully.");
      setActiveModal(null);
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error("Error deleting announcement:", error);
      showToast(error.message || "Failed to delete announcement.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const hasActiveFilters = statusFilter !== "ALL" || searchQuery !== "";

  const editorRef = useRef(null);
  useEffect(() => {
    if (
      (activeModal === "CREATE" || activeModal === "EDIT") &&
      editorRef.current
    ) {
      editorRef.current.innerHTML = formData.content || "";
    }
  }, [activeModal]);

  const updateEditorContent = () => {
    if (!editorRef.current) return;

    const html = editorRef.current.innerHTML;

    setFormData((prev) => ({
      ...prev,
      content: html,
    }));
  };

  const formatText = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    updateEditorContent();
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL:");

    if (!url) return;

    editorRef.current?.focus();
    document.execCommand("createLink", false, url);
    updateEditorContent();
  };

  const getCharacterCount = () => {
    if (!editorRef.current) return 0;

    return editorRef.current.innerText.length;
  };

  return (
    <AdminLayout>
      <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
        <style>{`
        :root {
          color-scheme: light;
          --bg-main: #F8FAFC;
          --bg-surface: #FFFFFF;
          --bg-card: #FFFFFF;
          --accent-primary: #4F46E5;
          --accent-hover: #4338CA;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --border-color: #E2E8F0;
          --sidebar-bg: #FFFFFF;
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }

        .dark {
          color-scheme: dark;
          --bg-main: #090D16;
          --bg-surface: #0F172A;
          --bg-card: #131E33;
          --accent-primary: #6366F1;
          --accent-hover: #4F46E5;
          --text-main: #F8FAFC;
          --text-muted: #94A3B8;
          --border-color: #1E293B;
          --sidebar-bg: #0B1120;
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        body {
          background-color: var(--bg-main);
          color: var(--text-main);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        select, input, textarea {
          color-scheme: inherit;
        }

        select option {
          background-color: var(--bg-card);
          color: var(--text-main);
          padding: 8px 12px;
        }

        .app-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app-card-interactive {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .app-card-interactive:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.12), 0 8px 10px -6px rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.35);
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg, var(--border-color) 25%, var(--bg-surface) 50%, var(--border-color) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideInRight {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        .animate-slide-right {
          animation: slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideInUp 0.25s ease-out forwards;
        }
           [contenteditable][data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: var(--text-muted);
    opacity: 0.6;
    pointer-events: none;
  }

  [contenteditable] ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }

  [contenteditable] ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }

[contenteditable] a {
  text-decoration: underline;
  color: var(--accent-primary);
}

/* Announcement modal scrollbar */
.announcement-modal-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;
}

.announcement-modal-scroll::-webkit-scrollbar {
  width: 4px;
}

.announcement-modal-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.announcement-modal-scroll::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 999px;
}

.announcement-modal-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
      `}</style>

        {}
        <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
          {}
          <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-[1600px] w-full mx-auto">
            {/* HERO BANNER */}
            <section className="app-card p-6 sm:p-8 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)] to-[var(--accent-primary)]/5 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                      Communication Hub
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)]">
                    Client Announcements
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
                    Keep your clients informed about classes, schedules, events,
                    studio closures, and important updates in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleOpenCreate}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Announcement</span>
                  </button>
                </div>
              </div>
            </section>

            {}
            <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div
                onClick={() => setStatusFilter("ALL")}
                className={`app-card app-card-interactive p-4 sm:p-5 cursor-pointer ${
                  statusFilter === "ALL"
                    ? "ring-2 ring-[var(--accent-primary)]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Total
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
                  {stats.total}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-medium mt-1 block">
                  All communications
                </span>
              </div>

              <div
                onClick={() => setStatusFilter("PUBLISHED")}
                className={`app-card app-card-interactive p-4 sm:p-5 cursor-pointer ${
                  statusFilter === "PUBLISHED" ? "ring-2 ring-emerald-500" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Published
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-500 dark:text-emerald-400">
                  {stats.published}
                </div>
                <span className="text-[10px] text-emerald-500/80 font-medium mt-1 block">
                  Active on client app
                </span>
              </div>

              <div
                onClick={() => setStatusFilter("SCHEDULED")}
                className={`app-card app-card-interactive p-4 sm:p-5 cursor-pointer ${
                  statusFilter === "SCHEDULED" ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Scheduled
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-500 dark:text-blue-400">
                  {stats.scheduled}
                </div>
                <span className="text-[10px] text-blue-500/80 font-medium mt-1 block">
                  Upcoming release
                </span>
              </div>

              <div
                onClick={() => setStatusFilter("DRAFT")}
                className={`app-card app-card-interactive p-4 sm:p-5 cursor-pointer ${
                  statusFilter === "DRAFT" ? "ring-2 ring-slate-400" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Drafts
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-500/10 text-slate-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[var(--text-muted)]">
                  {stats.drafts}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-medium mt-1 block">
                  Work in progress
                </span>
              </div>

              <div
                onClick={() => setStatusFilter("ARCHIVED")}
                className={`app-card app-card-interactive p-4 sm:p-5 cursor-pointer ${
                  statusFilter === "ARCHIVED" ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Archived
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Archive className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-400">
                  {stats.archived}
                </div>
                <span className="text-[10px] text-purple-400/80 font-medium mt-1 block">
                  Historical record
                </span>
              </div>
            </section>

            {}
            <section className="app-card p-4 sm:p-5 space-y-4">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search announcements by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters Group */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  {/* Status Filter */}
                  <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] px-3 py-2 rounded-xl transition-all hover:border-[var(--accent-primary)]/50 focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)] shadow-xs">
                    <span className="text-[var(--text-muted)] font-medium">
                      Status:
                    </span>
                    <div className="relative flex items-center">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-transparent font-semibold text-[var(--text-main)] focus:outline-none cursor-pointer pr-5 appearance-none"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="DRAFT">Draft</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-[var(--text-muted)] absolute right-0 pointer-events-none" />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-color)] px-3 py-2 rounded-xl transition-all hover:border-[var(--accent-primary)]/50 focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)] shadow-xs">
                    <span className="text-[var(--text-muted)] font-medium">
                      Sort:
                    </span>
                    <div className="relative flex items-center">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent font-semibold text-[var(--text-main)] focus:outline-none cursor-pointer pr-5 appearance-none"
                      >
                        <option value="NEWEST">Newest First</option>
                        <option value="OLDEST">Oldest First</option>
                        <option value="TITLE">Title A-Z</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-[var(--text-muted)] absolute right-0 pointer-events-none" />
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setStatusFilter("ALL");
                        setSearchQuery("");
                      }}
                      className="px-3 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-red-500/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Filters</span>
                    </button>
                  )}
                </div>
              </div>

              {/* State Simulation Demo Bar */}
              <div className="pt-3 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
                <span className="font-medium flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  System Simulation Controls:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchAnnouncements}
                    className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-all active:scale-95 shadow-md"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </section>

            {}
            {isLoading ? (
              /* SKELETON LOADING STATE */
              <div className="app-card p-6 space-y-4">
                <div className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-ping"></span>
                  Loading announcements...
                </div>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="p-4 rounded-xl border border-[var(--border-color)] space-y-3"
                  >
                    <div className="h-4 w-1/3 skeleton-shimmer rounded"></div>
                    <div className="h-3 w-3/4 skeleton-shimmer rounded"></div>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="h-3 w-20 skeleton-shimmer rounded"></div>
                      <div className="h-3 w-24 skeleton-shimmer rounded"></div>
                      <div className="h-3 w-16 skeleton-shimmer rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              /* ERROR STATE */
              <div className="app-card p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[var(--text-main)] text-base">
                    Unable to load announcements
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Something went wrong while retrieving updates from the
                    studio server.
                  </p>
                </div>
                <button
                  onClick={() => setIsError(false)}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] transition-all active:scale-95 shadow-md"
                >
                  Try Again
                </button>
              </div>
            ) : filteredAnnouncements.length === 0 ? (
              /* EMPTY STATES */
              announcements.length === 0 ? (
                <div className="app-card p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center mx-auto">
                    <Megaphone className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h3 className="font-bold text-[var(--text-main)] text-base">
                      No announcements yet
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Create your first announcement to keep your clients
                      informed about classes, studio schedules and updates.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenCreate}
                    className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] shadow-md transition-all active:scale-95"
                  >
                    + Create Announcement
                  </button>
                </div>
              ) : (
                <div className="app-card p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-500/10 text-[var(--text-muted)] flex items-center justify-center mx-auto">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-[var(--text-main)] text-base">
                      No announcements found
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      No results matched your current search criteria or active
                      filters.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStatusFilter("ALL");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs font-semibold hover:bg-[var(--bg-surface)] transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )
            ) : (
              /* ANNOUNCEMENT LIST / TABLE */
              <div className="space-y-6">
                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block app-card overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[var(--bg-main)]/60 border-b border-[var(--border-color)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      <tr>
                        <th className="py-4 px-6">
                          Announcement Title & Preview
                        </th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4">Created</th>
                        <th className="py-4 px-4">Published / Scheduled</th>
                        <th className="py-4 px-4">Author</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      {filteredAnnouncements.map((ann) => (
                        <tr
                          key={ann.id}
                          className="hover:bg-[var(--bg-main)]/50 transition-colors group"
                        >
                          {/* Title & Content Preview */}
                          <td className="py-4 px-6 max-w-sm">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                <Megaphone className="w-4 h-4" />
                              </div>
                              <div className="space-y-1 min-w-0">
                                <span
                                  onClick={() => handleOpenDetails(ann)}
                                  className="font-bold text-[var(--text-main)] text-sm hover:text-[var(--accent-primary)] cursor-pointer line-clamp-1 transition-colors"
                                >
                                  {ann.title}
                                </span>
                                <p className="text-[var(--text-muted)] text-[11px] line-clamp-2 leading-relaxed">
                                  "{ann.content}"
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <StatusBadge status={ann.status} />
                          </td>

                          {/* Created Date */}
                          <td className="py-4 px-4 whitespace-nowrap text-[var(--text-muted)] font-medium">
                            {new Date(ann.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>

                          {/* Published / Scheduled Date */}
                          <td className="py-4 px-4 whitespace-nowrap font-medium">
                            {ann.status === "PUBLISHED" && ann.publishedAt ? (
                              <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                {new Date(ann.publishedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            ) : ann.status === "SCHEDULED" &&
                              ann.scheduledFor ? (
                              <span className="text-blue-500 dark:text-blue-400 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(ann.scheduledFor).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}{" "}
                                ·{" "}
                                {new Date(ann.scheduledFor).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </span>
                            ) : (
                              <span className="text-[var(--text-muted)]">
                                —
                              </span>
                            )}
                          </td>

                          {/* Author */}
                          <td className="py-4 px-4 whitespace-nowrap text-[var(--text-muted)] font-medium">
                            {ann.author}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleOpenDetails(ann)}
                                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-main)] transition-colors active:scale-95"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenEdit(ann)}
                                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-main)] transition-colors active:scale-95"
                                title="Edit Announcement"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <ActionDropdown
                                announcement={ann}
                                onPublish={handleDirectPublish}
                                onArchive={handleDirectArchive}
                                onDelete={handleDirectDelete}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE CARD VIEW */}
                <div className="md:hidden space-y-4">
                  {filteredAnnouncements.map((ann) => (
                    <div key={ann.id} className="app-card p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center shrink-0 mt-0.5">
                            <Megaphone className="w-4 h-4" />
                          </div>
                          <h4
                            onClick={() => handleOpenDetails(ann)}
                            className="font-bold text-[var(--text-main)] text-sm hover:text-[var(--accent-primary)] cursor-pointer"
                          >
                            {ann.title}
                          </h4>
                        </div>
                        <StatusBadge status={ann.status} />
                      </div>

                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--border-color)]">
                        "{ann.content}"
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)] font-medium">
                        <div>
                          {ann.publishedAt &&
                            `Pub: ${new Date(ann.publishedAt).toLocaleDateString()}`}
                          {ann.scheduledFor &&
                            `Sched: ${new Date(ann.scheduledFor).toLocaleDateString()}`}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => handleOpenDetails(ann)}
                          className="px-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)]"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleOpenEdit(ann)}
                          className="px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white text-xs font-semibold"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-[var(--text-muted)] font-medium">
                  <div>
                    Showing{" "}
                    <span className="font-bold text-[var(--text-main)]">1</span>
                    –
                    <span className="font-bold text-[var(--text-main)]">
                      {filteredAnnouncements.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-[var(--text-main)]">
                      {announcements.length}
                    </span>{" "}
                    announcements
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span>Rows per page:</span>
                      <div className="relative flex items-center">
                        <select
                          value={pageSize}
                          onChange={(e) => setPageSize(Number(e.target.value))}
                          className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg pl-2.5 pr-6 py-1 text-[var(--text-main)] focus:outline-none cursor-pointer appearance-none text-xs"
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-[var(--text-muted)] absolute right-1.5 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        disabled
                        className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] opacity-50 cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-[var(--accent-primary)] text-white font-bold text-xs shadow-xs">
                        1
                      </button>
                      <button
                        disabled
                        className="p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] opacity-50 cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {}
          <footer className="px-8 py-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-muted)] mt-auto bg-[var(--bg-surface)]">
            <p>
              © 2026 YogaPT Studio Administration. Communication & Announcements
              Control Center.
            </p>
          </footer>
        </div>

        {}
        {(activeModal === "CREATE" || activeModal === "EDIT") && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
           <div className="announcement-modal-scroll app-card max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-scale-in">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold">
                    {activeModal === "CREATE" ? (
                      <PlusCircle className="w-5 h-5" />
                    ) : (
                      <Edit3 className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[var(--text-main)] text-lg">
                      {activeModal === "CREATE"
                        ? "Create Announcement"
                        : "Edit Announcement"}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Compose updates for YogaPT studio clients.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="space-y-5 text-xs">
                {activeModal === "EDIT" &&
                  selectedAnnouncement?.status === "PUBLISHED" && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        <strong>Warning:</strong> This announcement is already
                        published. Edits will immediately reflect on active
                        client devices.
                      </span>
                    </div>
                  )}

                {/* Title */}
                <div>
                  <label className="block font-bold text-[var(--text-main)] mb-1.5">
                    ANNOUNCEMENT TITLE *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunday Schedule Update"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-medium focus:outline-none focus:border-[var(--accent-primary)] text-sm shadow-inner"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-bold text-[var(--text-main)]">
                      ANNOUNCEMENT CONTENT *
                    </label>
                  </div>

                  <div className="rounded-xl border border-[var(--border-color)] overflow-hidden bg-[var(--bg-main)] shadow-inner">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 bg-[var(--bg-surface)] border-b border-[var(--border-color)] text-[var(--text-muted)]">
                      {/* Bold */}
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          formatText("bold");
                        }}
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] hover:text-[var(--text-main)] font-bold text-xs"
                        title="Bold"
                      >
                        B
                      </button>

                      {/* Italic */}
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          formatText("italic");
                        }}
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] hover:text-[var(--text-main)] italic text-xs"
                        title="Italic"
                      >
                        I
                      </button>

                      <div className="w-[1px] h-4 bg-[var(--border-color)] mx-1"></div>

                      {/* Bullet List */}
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          formatText("insertUnorderedList");
                        }}
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] hover:text-[var(--text-main)]"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>

                      {/* Numbered List */}
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          formatText("insertOrderedList");
                        }}
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] hover:text-[var(--text-main)]"
                        title="Numbered List"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>

                      {/* Link */}
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          insertLink();
                        }}
                        className="p-1.5 rounded hover:bg-[var(--bg-main)] hover:text-[var(--text-main)]"
                        title="Insert Link"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Editable Content */}
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      onInput={updateEditorContent}
                      className="w-full min-h-[168px] p-4 bg-transparent text-[var(--text-main)] text-xs focus:outline-none resize-y leading-relaxed"
                      data-placeholder="Write your announcement content here..."
                    />

                    {/* Footer */}
                    <div className="px-3 py-1.5 bg-[var(--bg-surface)] border-t border-[var(--border-color)] flex justify-between items-center text-[10px] text-[var(--text-muted)] font-medium">
                      <span>Formatted text editor</span>

                      <span>{getCharacterCount()} Characters</span>
                    </div>
                  </div>
                </div>

                {/* Publishing Options */}
                <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                  <label className="block font-bold text-[var(--text-main)]">
                    PUBLISHING OPTION
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, publishMode: "DRAFT" })
                      }
                      className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                        formData.publishMode === "DRAFT"
                          ? "border-slate-500 bg-slate-500/10 text-[var(--text-main)] ring-1 ring-slate-500"
                          : "border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)]"
                      }`}
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, publishMode: "PUBLISH_NOW" })
                      }
                      className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                        formData.publishMode === "PUBLISH_NOW"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500"
                          : "border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)]"
                      }`}
                    >
                      Publish Now
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, publishMode: "SCHEDULE" })
                      }
                      className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                        formData.publishMode === "SCHEDULE"
                          ? "border-blue-500 bg-blue-500/10 text-blue-500 ring-1 ring-blue-500"
                          : "border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)]"
                      }`}
                    >
                      Schedule
                    </button>
                  </div>

                  {formData.publishMode === "SCHEDULE" && (
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] mt-3 animate-slide-up">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={formData.scheduleDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scheduleDate: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={formData.scheduleTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scheduleTime: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveForm()}
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] shadow-md active:scale-95 transition-all"
                >
                  {formData.publishMode === "PUBLISH_NOW"
                    ? "Publish Announcement"
                    : formData.publishMode === "SCHEDULE"
                      ? "Schedule Announcement"
                      : "Save as Draft"}
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {activeModal === "DETAILS" && selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            ></div>

            <div className="relative w-full max-w-lg bg-[var(--bg-surface)] border-l border-[var(--border-color)] h-full shadow-2xl flex flex-col z-10 animate-slide-right">
              {/* Header */}
              <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-main)]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Announcement Details
                    </span>
                    <h3 className="font-extrabold text-[var(--text-main)] text-base line-clamp-1">
                      {selectedAnnouncement.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
                <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-[var(--text-muted)] font-bold uppercase text-[10px]">
                    CURRENT STATUS
                  </span>
                  <StatusBadge status={selectedAnnouncement.status} />
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                  <div>
                    <span className="text-[var(--text-muted)] font-medium block text-[10px] uppercase">
                      Author
                    </span>
                    <span className="font-bold text-[var(--text-main)] text-sm mt-0.5 block">
                      {selectedAnnouncement.author}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)] font-medium block text-[10px] uppercase">
                      Created On
                    </span>
                    <span className="font-bold text-[var(--text-main)] mt-0.5 block">
                      {new Date(
                        selectedAnnouncement.createdAt,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)] font-medium block text-[10px] uppercase">
                      {selectedAnnouncement.status === "SCHEDULED"
                        ? "Scheduled For"
                        : "Published Date"}
                    </span>
                    <span className="font-bold text-[var(--text-main)] mt-0.5 block">
                      {selectedAnnouncement.publishedAt
                        ? new Date(
                            selectedAnnouncement.publishedAt,
                          ).toLocaleString()
                        : selectedAnnouncement.scheduledFor
                          ? new Date(
                              selectedAnnouncement.scheduledFor,
                            ).toLocaleString()
                          : "—"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[var(--text-muted)] font-bold uppercase text-[10px]">
                    ANNOUNCEMENT BODY
                  </span>
                  <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs leading-relaxed whitespace-pre-wrap">
                    {selectedAnnouncement.content}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-main)]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(selectedAnnouncement)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all shadow-xs"
                  >
                    Edit
                  </button>

                  {selectedAnnouncement.status === "PUBLISHED" && (
                    <button
                      onClick={() => handleDirectArchive(selectedAnnouncement)}
                      className="px-4 py-2.5 rounded-xl bg-purple-500/10 text-purple-400 font-semibold text-xs hover:bg-purple-500/20 transition-colors"
                    >
                      Archive
                    </button>
                  )}

                  {selectedAnnouncement.status === "DRAFT" && (
                    <button
                      onClick={() => handleDirectDelete(selectedAnnouncement)}
                      className="px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 font-semibold text-xs hover:bg-red-500/20 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {}

        {}
        {activeModal === "CONFIRM_PUBLISH" && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="app-card max-w-md w-full p-6 space-y-5 animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <Send className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-extrabold text-[var(--text-main)] text-lg">
                  Publish Announcement?
                </h3>
                <p className="font-bold text-[var(--accent-primary)] text-sm">
                  "{formData.title || selectedAnnouncement?.title}"
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  This announcement will{" "}
                  <strong>immediately become visible</strong> on the mobile
                  application for all{" "}
                  <span className="text-[var(--text-main)] font-bold">
                    248 active clients
                  </span>
                  .
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] space-y-1">
                <div className="flex justify-between">
                  <span>Action:</span>
                  <span className="font-bold text-emerald-500">
                    Immediate Publish
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-[var(--text-muted)] font-semibold text-xs hover:text-[var(--text-main)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeSave("PUBLISHED")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 shadow-md active:scale-95 transition-all"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "CONFIRM_SCHEDULE" && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="app-card max-w-md w-full p-6 space-y-5 animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-extrabold text-[var(--text-main)] text-lg">
                  Schedule Announcement?
                </h3>
                <p className="font-bold text-blue-500 text-sm">
                  "{formData.title}"
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Scheduled to automatically broadcast on:
                </p>
                <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] font-bold text-[var(--text-main)] text-xs">
                  {formData.scheduleDate} at {formData.scheduleTime}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-[var(--text-muted)] font-semibold text-xs hover:text-[var(--text-main)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeSave("SCHEDULED")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-md active:scale-95 transition-all"
                >
                  Schedule Announcement
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "CONFIRM_ARCHIVE" && selectedAnnouncement && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="app-card max-w-md w-full p-6 space-y-5 animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto">
                <Archive className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-extrabold text-[var(--text-main)] text-lg">
                  Archive Announcement?
                </h3>
                <p className="font-bold text-purple-400 text-sm">
                  "{selectedAnnouncement.title}"
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  It will no longer appear as an active announcement to clients,
                  but the record will be safely retained in historical archives.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-[var(--text-muted)] font-semibold text-xs hover:text-[var(--text-main)] transition-colors"
                >
                  Keep Published
                </button>
                <button
                  onClick={confirmArchive}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-700 shadow-md active:scale-95 transition-all"
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        )}

        {activeModal === "CONFIRM_DELETE" && selectedAnnouncement && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="app-card max-w-md w-full p-6 space-y-5 animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-extrabold text-[var(--text-main)] text-lg">
                  Delete Announcement?
                </h3>
                <p className="font-bold text-red-500 text-sm">
                  "{selectedAnnouncement.title}"
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Are you sure you want to permanently delete this record? This
                  action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl text-[var(--text-muted)] font-semibold text-xs hover:text-[var(--text-main)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 shadow-md active:scale-95 transition-all"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {toast.show && (
          <div className="fixed bottom-6 right-6 app-card px-4 py-3 shadow-2xl z-50 flex items-center gap-3 animate-slide-up text-xs font-semibold border border-[var(--border-color)]">
            {toast.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            )}
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
