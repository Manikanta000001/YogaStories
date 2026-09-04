import {
  AlertTriangle,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MoreHorizontal,
  Phone,
  Search,
  User,
  UserCheck,
  Users,
  UserX,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import { api } from "../../services/api";

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatClient = (client) => {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,

    status: client.active ? "Active" : "Inactive",

    bookingsCount: client.bookingCount || 0,

    joined: formatDate(client.firstBookingDate),
    joinedTimestamp: client.firstBookingDate
      ? new Date(client.firstBookingDate).getTime()
      : 0,

    lastBooking: formatDate(client.lastBookingDate),
    lastBookingTimestamp: client.lastBookingDate
      ? new Date(client.lastBookingDate).getTime()
      : 0,

    upcoming: client.upcomingBookings || [],
    completed: client.completedBookings || [],

    spent: `₹${(client.totalSpent || 0).toLocaleString("en-IN")}`,

    totalSpent: client.totalSpent || 0,
  };
};

export default function Clients() {
  const [isDark, setIsDark] = useState(false);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState("20");
  const [currentPage, setCurrentPage] = useState(1);

  // UI Interactive States
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Drawer & Modal States
  const [drawerClientId, setDrawerClientId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerClient, setDrawerClient] = useState(null);

  const [confirmToggleClientId, setConfirmToggleClientId] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, bookingFilter, sortBy, rowsPerPage]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const triggerToast = (msg) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    setShowToast(true);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setSimulatedError(false);

      const response = await api("/clients/admin");

      const backendClients = response.data || [];

      const formattedClients = backendClients.map(formatClient);

      setClients(formattedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setSimulatedError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".action-menu-container")) {
        setActiveMenuId(null);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const filteredClients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let list = clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone.toLowerCase().includes(term) ||
        client.id.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      if (statusFilter === "active" && client.status !== "Active") return false;
      if (statusFilter === "inactive" && client.status !== "Inactive")
        return false;

      if (bookingFilter === "upcoming" && client.upcoming.length === 0)
        return false;
      if (bookingFilter === "none" && client.upcoming.length > 0) return false;

      return true;
    });

    list.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "bookings") return b.bookingsCount - a.bookingsCount;
      if (sortBy === "leastBookings") return a.bookingsCount - b.bookingsCount;
      if (sortBy === "newest") return b.joinedTimestamp - a.joinedTimestamp;
      if (sortBy === "oldest") return a.joinedTimestamp - b.joinedTimestamp;
      return 0;
    });

    return list;
  }, [clients, searchTerm, statusFilter, bookingFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / Number(rowsPerPage)),
  );

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * Number(rowsPerPage);

    return filteredClients.slice(startIndex, startIndex + Number(rowsPerPage));
  }, [filteredClients, currentPage, rowsPerPage]);

  const handleOpenDrawer = (clientId) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;
    setDrawerClientId(clientId);
    setDrawerClient(client);
    setIsDrawerOpen(true);
    setActiveMenuId(null);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setDrawerClientId(null);
      setDrawerClient(null);
    }, 300);
  };

  const handlePromptToggleStatus = (clientId) => {
    setConfirmToggleClientId(clientId);
    setIsConfirmModalOpen(true);
    setActiveMenuId(null);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setTimeout(() => setConfirmToggleClientId(null), 300);
  };

  const handleExecuteStatusToggle = async () => {
    if (!confirmToggleClientId) return;

    const client = clients.find((c) => c.id === confirmToggleClientId);

    if (!client) return;

    const nextStatus = client.status === "Active" ? false : true;

    try {
      setIsLoading(true);
      setSimulatedError(false);

      await api(`/clients/${client.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          active: nextStatus,
        }),
      });

      await fetchClients();

      if (drawerClient && drawerClient.id === confirmToggleClientId) {
        setDrawerClient((prev) =>
          prev
            ? {
                ...prev,
                status: nextStatus ? "Active" : "Inactive",
              }
            : null,
        );
      }

      triggerToast(
        nextStatus
          ? "Client activated successfully."
          : "Client deactivated successfully.",
      );

      handleCloseConfirmModal();
    } catch (error) {
      console.error("Error updating client status:", error);

      triggerToast(error.message || "Failed to update client status.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setBookingFilter("all");
    setSortBy("name");
    triggerToast("Filters cleared");
  };

  const clientToConfirm = clients.find((c) => c.id === confirmToggleClientId);

  const totalClients = clients.length;

  const totalBookings = clients.reduce(
    (total, client) => total + client.bookingsCount,
    0,
  );

  const upcomingBookings = clients.reduce(
    (total, client) => total + client.upcoming.length,
    0,
  );

  const totalRevenue = clients.reduce(
    (total, client) => total + client.totalSpent,
    0,
  );

  return (
    <AdminLayout>
      <div
        className={`min-h-screen flex flex-col antialiased selection:bg-[#4F46E5] selection:text-white ${isDark ? "dark" : ""}`}
      >
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
          --sidebar-bg: #FFFFFF;
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
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
          --sidebar-bg: #0B1120;
          --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        body, .app-root {
          background-color: var(--bg-main);
          color: var(--text-main);
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }

        .app-card:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(79, 70, 229, 0.3);
        }

        .stat-card-hover {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }
        .stat-card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          border-color: rgba(79, 70, 229, 0.35);
        }

        .drawer-backdrop, .modal-backdrop {
          transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.32s ease;
        }
        .drawer-panel {
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-panel {
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.75; }
        }
        @keyframes jiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }

        .animate-fade-in {
          animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .bell-hover:hover svg {
          animation: jiggle 0.45s ease-in-out;
        }
        .btn-interactive {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-interactive:active {
          transform: scale(0.96);
        }
        .table-row-interactive {
          transition: background-color 0.18s ease, transform 0.18s ease;
        }
        .table-row-interactive:hover {
          transform: scale-[1.002];
        }
      `}</style>

        {/* Main Content */}
        <main className="flex-1 px-6 md:px-10 py-8 space-y-8 max-w-[1600px] w-full mx-auto flex flex-col justify-start animate-fade-in">
          {/* Summary Metric Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Clients */}
            <div className="app-card stat-card-hover p-6 flex flex-col justify-between cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Total Clients
                </span>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--text-main)] transition-all duration-200 group-hover:translate-x-0.5">
                  {clients.length}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                  All registered members
                </p>
              </div>
            </div>
            {/* Total Bookings */}
            <div className="app-card stat-card-hover p-6 flex flex-col justify-between cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Total Bookings
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white">
                  <CalendarCheck className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-[var(--text-main)] transition-all duration-200 group-hover:translate-x-0.5">
                  {totalBookings}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                  Upcoming + completed
                </p>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="app-card stat-card-hover p-6 flex flex-col justify-between cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Upcoming Bookings
                </span>
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-[var(--text-main)] transition-all duration-200 group-hover:translate-x-0.5">
                  {upcomingBookings}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                  Scheduled sessions
                </p>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="app-card stat-card-hover p-6 flex flex-col justify-between cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Total Revenue
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white">
                  <span className="text-sm font-bold">₹</span>
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-[var(--text-main)] transition-all duration-200 group-hover:translate-x-0.5">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                  From client bookings
                </p>
              </div>
            </div>
          </section>
          {/* Search & Filter Toolbar */}
          <section className="app-card p-5 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Prominent Search Bar */}
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors duration-200" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search clients by name, email, phone or client ID (#CL-1024)..."
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all duration-200 shadow-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3.5 top-3 text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 transition-transform duration-150 hover:scale-110 btn-interactive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filters & Sorting Dropdowns */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-primary)] font-medium transition-all hover:border-[var(--accent-primary)]/40 cursor-pointer"
                >
                  <option value="all">Status: All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {/* Booking Activity Filter */}
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-primary)] font-medium transition-all hover:border-[var(--accent-primary)]/40 cursor-pointer"
                >
                  <option value="all">Upcoming: All</option>
                  <option value="upcoming">Has Upcoming Session</option>
                  <option value="none">No Upcoming Session</option>
                </select>

                {/* Sorting */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-primary)] font-medium transition-all hover:border-[var(--accent-primary)]/40 cursor-pointer"
                >
                  <option value="name">Sort by: Name</option>
                  <option value="bookings">Most Bookings</option>
                  <option value="leastBookings">Least Bookings</option>
                  <option value="newest">Newest Client</option>
                  <option value="oldest">Oldest Client</option>
                </select>

                {/* Clear Filters */}
                <button
                  onClick={handleResetFilters}
                  className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs font-semibold transition-all duration-200 hover:bg-[var(--bg-surface)] hover:border-[var(--accent-primary)]/40 btn-interactive"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </section>

          {/* Client Table */}
          <section className="app-card overflow-visible">
            <div className="overflow-x-visible">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)]/50 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <th className="py-4 px-6">Client</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Joined</th>
                    <th className="py-4 px-6">Bookings</th>
                    <th className="py-4 px-6">Last Booking</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-xs">
                  {paginatedClients.map((client, index) => {
                    const initials = client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");

                    return (
                      <tr
                        key={client.id}
                        onClick={() => handleOpenDrawer(client.id)}
                        className="border-b border-[var(--border-color)] hover:bg-[var(--bg-main)]/70 transition-all duration-150 cursor-pointer group"
                        style={{
                          animation: `fadeIn 0.28s ease-out ${index * 0.04}s backwards`,
                        }}
                      >
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all duration-200 shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-[var(--text-main)] block group-hover:text-[var(--accent-primary)] transition-colors duration-150">
                              {client.name}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">
                              {client.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-[var(--text-muted)]">
                          {client.email}
                        </td>
                        <td className="py-4 px-6 text-[var(--text-muted)]">
                          {client.phone}
                        </td>
                        <td className="py-4 px-6 text-[var(--text-muted)]">
                          {client.joined}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[var(--text-main)]">
                          {client.bookingsCount} bookings
                        </td>
                        <td className="py-4 px-6 text-[var(--text-muted)]">
                          {client.lastBooking}
                        </td>
                        <td className="py-4 px-6">
                          {client.status === "Active" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[11px] transition-transform duration-200 group-hover:scale-105">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                              ACTIVE
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 text-[var(--text-muted)] font-bold text-[11px] transition-transform duration-200 group-hover:scale-105">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>{" "}
                              INACTIVE
                            </span>
                          )}
                        </td>
                        <td
                          className="py-4 px-6 text-right relative action-menu-container"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="relative inline-block text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(
                                  activeMenuId === client.id ? null : client.id,
                                );
                              }}
                              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-all duration-200 btn-interactive"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>

                            {activeMenuId === client.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-1.5 shadow-2xl z-[9999] text-left space-y-0.5 animate-scale-in origin-top-right">
                                <button
                                  onClick={() => handleOpenDrawer(client.id)}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-all duration-150 hover:translate-x-1"
                                >
                                  <User className="w-3.5 h-3.5" /> View Profile
                                </button>
                                <button
                                  onClick={() => {
                                    window.location.href = `/bookings?clientEmail=${encodeURIComponent(client.email)}`;
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-all duration-150 hover:translate-x-1"
                                >
                                  <CalendarCheck className="w-3.5 h-3.5" /> View
                                  Bookings
                                </button>

                                <div className="my-1 border-t border-[var(--border-color)]"></div>
                                {client.status === "Active" ? (
                                  <button
                                    onClick={() =>
                                      handlePromptToggleStatus(client.id)
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-all duration-150 hover:translate-x-1 font-medium"
                                  >
                                    <UserX className="w-3.5 h-3.5" /> Deactivate
                                    Client
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handlePromptToggleStatus(client.id)
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-all duration-150 hover:translate-x-1 font-medium"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />{" "}
                                    Activate Client
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredClients.length === 0 && (
              <div className="py-16 px-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center mx-auto">
                  <UserX className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[var(--text-main)] text-sm">
                    No clients match your search
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs shadow-sm hover:bg-[var(--accent-hover)] transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span>
                  {filteredClients.length === 0
                    ? "Showing 0 of 0 clients"
                    : `Showing ${
                        (currentPage - 1) * Number(rowsPerPage) + 1
                      }–${Math.min(
                        currentPage * Number(rowsPerPage),
                        filteredClients.length,
                      )} of ${filteredClients.length} clients`}
                </span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(e.target.value);
                    triggerToast(`Displaying ${e.target.value} rows per page`);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] focus:outline-none transition-all hover:border-[var(--accent-primary)]/40 cursor-pointer"
                >
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-interactive"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg transition-all btn-interactive ${
                      currentPage === page
                        ? "bg-[var(--accent-primary)] text-white shadow-xs"
                        : "bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--accent-primary)]/40"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-50 disabled:cursor-not-allowed transition-all btn-interactive"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-muted)] mt-12 bg-[var(--bg-surface)]/50 transition-colors">
          <p>© 2026 YogaPT Studio Administration. Client Management Module.</p>
        </footer>

        {/* Slide-over Drawer */}
        {drawerClientId && (
          <>
            <div
              className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 drawer-backdrop ${
                isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={handleCloseDrawer}
            />
            <div
              className={`fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col drawer-panel ${
                isDrawerOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {drawerClient && (
                <>
                  {/* Drawer Header */}
                  <div className="px-6 py-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-card)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold text-sm shadow-xs transition-transform duration-300 hover:scale-105">
                        {drawerClient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-main)] text-sm">
                          {drawerClient.name}
                        </h3>
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">
                          {drawerClient.id}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-transform duration-200 ${
                          drawerClient.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-slate-500/10 text-[var(--text-muted)]"
                        }`}
                      >
                        {drawerClient.status}
                      </span>
                      <button
                        onClick={handleCloseDrawer}
                        className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-all duration-200 btn-interactive"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Drawer Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                    {/* Contact & Account Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2 transition-all duration-200 hover:border-[var(--accent-primary)]/30">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Contact Information
                        </span>
                        <div className="space-y-1 text-[var(--text-main)]">
                          <p className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" />{" "}
                            <span>{drawerClient.email}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[var(--text-muted)]" />{" "}
                            <span>{drawerClient.phone}</span>
                          </p>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2 transition-all duration-200 hover:border-[var(--accent-primary)]/30">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Account Timelines
                        </span>
                        <div className="space-y-1 text-[var(--text-main)]">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />{" "}
                            Joined:{" "}
                            <span className="font-medium">
                              {drawerClient.joined}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />{" "}
                            Last Booking:{" "}
                            <span className="font-medium">
                              {drawerClient.lastBooking}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Booking & Payment Summary
                        </span>
                        <button
                          onClick={() => {
                            window.location.href = `/bookings?clientEmail=${encodeURIComponent(drawerClient.email)}`;
                          }}
                          className="text-[var(--accent-primary)] font-semibold hover:underline flex items-center gap-1 transition-all duration-150 hover:translate-x-0.5"
                        >
                          View All Bookings <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-center transition-all duration-200 hover:scale-105">
                          <span className="text-[var(--text-muted)] block text-[10px]">
                            Total
                          </span>
                          <span className="font-extrabold text-sm text-[var(--text-main)]">
                            {drawerClient.bookingsCount}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-center transition-all duration-200 hover:scale-105">
                          <span className="text-[var(--text-muted)] block text-[10px]">
                            Upcoming
                          </span>
                          <span className="font-extrabold text-sm text-emerald-500">
                            {drawerClient.upcoming.length}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-center transition-all duration-200 hover:scale-105">
                          <span className="text-[var(--text-muted)] block text-[10px]">
                            Completed
                          </span>
                          <span className="font-extrabold text-sm text-[var(--text-main)]">
                            {drawerClient.completed.length}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-center transition-all duration-200 hover:scale-105">
                          <span className="text-[var(--text-muted)] block text-[10px]">
                            Total Spent
                          </span>
                          <span className="font-extrabold text-sm text-amber-500">
                            {drawerClient.spent}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Upcoming Bookings Section */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-[var(--text-main)] text-xs uppercase tracking-wider">
                        Upcoming Bookings
                      </h4>
                      <div className="space-y-2">
                        {drawerClient.upcoming.length === 0 ? (
                          <p className="text-[var(--text-muted)] italic py-2">
                            No upcoming bookings found.
                          </p>
                        ) : (
                          drawerClient.upcoming.map((up) => (
                            <div
                              key={up.id}
                              className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between transition-all duration-200 hover:border-[var(--accent-primary)]/40 hover:translate-x-1"
                            >
                              <div>
                                <span className="font-bold text-[var(--text-main)] block">
                                  {up.className}
                                </span>

                                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                                  {formatDate(up.date)} · {up.startTime} -{" "}
                                  {up.endTime}
                                </span>
                              </div>

                              <span className="px-2.5 py-1 rounded-md bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold text-[10px] transition-transform duration-200 hover:scale-105">
                                ₹{(up.amount || 0).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-card)] flex items-center justify-end">
                    {drawerClient.status === "Active" ? (
                      <button
                        onClick={() => {
                          const id = drawerClient.id;
                          handleCloseDrawer();
                          handlePromptToggleStatus(id);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 font-semibold hover:bg-red-500/20 transition-all duration-200 flex items-center gap-2 btn-interactive"
                      >
                        <UserX className="w-4 h-4" /> Deactivate Account
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const id = drawerClient.id;
                          handleCloseDrawer();
                          handlePromptToggleStatus(id);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 font-semibold hover:bg-emerald-500/20 transition-all duration-200 flex items-center gap-2 btn-interactive"
                      >
                        <UserCheck className="w-4 h-4" /> Activate Account
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Confirmation Modal */}
        {isConfirmModalOpen && clientToConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
            <div className="app-card p-6 max-w-md w-full !h-auto !min-h-0 shadow-2xl relative modal-panel animate-scale-in">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${
                    clientToConfirm.status === "Active"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {clientToConfirm.status === "Active" ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <UserCheck className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-main)] text-sm">
                    {clientToConfirm.status === "Active"
                      ? "Deactivate Account?"
                      : "Activate Account?"}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Confirmation required
                  </p>
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                {clientToConfirm.status === "Active"
                  ? `Are you sure you want to deactivate ${clientToConfirm.name}'s account? The client will no longer be able to book sessions. Historical records remain intact.`
                  : `Are you sure you want to activate ${clientToConfirm.name}'s account? The client will be able to book sessions again.`}
              </p>
              <div className="flex items-center justify-end gap-3 text-xs">
                <button
                  onClick={handleCloseConfirmModal}
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold hover:bg-[var(--bg-surface)] transition-all duration-200 btn-interactive"
                >
                  {clientToConfirm.status === "Active"
                    ? "Keep Active"
                    : "Cancel"}
                </button>
                <button
                  onClick={handleExecuteStatusToggle}
                  className={`px-4 py-2.5 rounded-xl text-white font-semibold transition-all duration-200 shadow-sm btn-interactive ${
                    clientToConfirm.status === "Active"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  {clientToConfirm.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Toast Notification */}
        <div
          className={`fixed bottom-6 right-6  px-4 py-3 shadow-2xl z-50 flex items-center gap-3 transition-all duration-300 text-xs font-medium ${
            showToast
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-12 opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      </div>
    </AdminLayout>
  );
}
