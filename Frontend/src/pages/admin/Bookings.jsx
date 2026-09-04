import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Phone,
  RefreshCw,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BookingFilters from "../../components/admin/bookings/BookingFilters";
import BookingStats from "../../components/admin/bookings/BookingStats";
import BookingTable from "../../components/admin/bookings/BookingTable";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import { api } from "../../services/api";
import { useSearchParams } from "react-router-dom";

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Bookings Data state
  // const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // All | Confirmed | Cancelled
  const [typeFilter, setTypeFilter] = useState("All"); // All | Free | Paid
  const [classFilter, setClassFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All"); // All | Today | This Week | This Month

  // Sorting
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Selected Booking Drawer & Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [cancellationReasonInput, setCancellationReasonInput] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Simulated UI States (Demo Controls)
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const clientEmailFromUrl = searchParams.get("clientEmail");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api("/bookings");

      console.log("Bookings data:", response);

      const rawBookings = response?.data || [];

      const formattedBookings = rawBookings.map((booking) => ({
        id: booking._id,

        clientName: booking.clientId?.name || "Unknown Client",
        clientEmail: booking.clientId?.email || "",
        clientPhone: booking.clientId?.phone || "",

        className: booking.classId?.title || "Unknown Class",

        date: booking.sessionId?.date
          ? booking.sessionId.date.split("T")[0]
          : "",

        formattedDate: booking.sessionId?.date
          ? new Date(booking.sessionId.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",

        time:
          booking.sessionId?.startTime && booking.sessionId?.endTime
            ? `${booking.sessionId.startTime} – ${booking.sessionId.endTime}`
            : "—",

        type: booking.sessionId?.type === "free" ? "Free" : "Paid",

        amount: booking.amount || 0,

        status: booking.status
          ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
          : "Pending",

        bookedOn: booking.bookedAt
          ? new Date(booking.bookedAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—",

        paymentMethod: booking.paymentMethod || "—",
        paymentStatus: booking.paymentStatus || "—",

        avatar: null,
        notes: "",
      }));

      setBookings(formattedBookings);
    } catch (error) {
      console.error("Failed to load bookings:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  // Toast Notification
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Keyboard shortcut: close drawer/modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (cancellingBooking) setCancellingBooking(null);
        else if (isDrawerOpen) setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cancellingBooking, isDrawerOpen]);

  const triggerToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3500);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
      triggerToast("Booking data refreshed successfully");
    }, 600);
  };
  const uniqueClasses = useMemo(() => {
    const classes = bookings
      .map((booking) => booking.className)
      .filter(Boolean);

    return ["All", ...new Set(classes)];
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((item) => {
        if (
          clientEmailFromUrl &&
          item.clientEmail.toLowerCase() !== clientEmailFromUrl.toLowerCase()
        ) {
          return false;
        }
        // Search text match
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.clientName.toLowerCase().includes(query) ||
          item.clientEmail.toLowerCase().includes(query) ||
          item.clientPhone.toLowerCase().includes(query) ||
          item.className.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query);

        // Status Filter
        const matchesStatus =
          statusFilter === "All" || item.status === statusFilter;

        // Type Filter
        const matchesType = typeFilter === "All" || item.type === typeFilter;

        // Class Filter
        const matchesClass =
          classFilter === "All" || item.className === classFilter;

        // Date Filter
        let matchesDate = true;
        if (dateFilter === "Today") {
          matchesDate = item.date === "2026-08-28";
        } else if (dateFilter === "This Week") {
          matchesDate = item.date >= "2026-08-24" && item.date <= "2026-08-30";
        } else if (dateFilter === "This Month") {
          matchesDate = item.date.startsWith("2026-08");
        }

        return (
          matchesSearch &&
          matchesStatus &&
          matchesType &&
          matchesClass &&
          matchesDate
        );
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === "amount") {
          valA = Number(valA);
          valB = Number(valB);
        } else if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [
    bookings,
    searchQuery,
    statusFilter,
    typeFilter,
    classFilter,
    dateFilter,
    sortField,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredBookings.slice(start, start + rowsPerPage);
  }, [filteredBookings, currentPage, rowsPerPage]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
    const paidCount = bookings.filter((b) => b.type === "Paid").length;
    const totalRevenue = bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((acc, curr) => acc + curr.amount, 0);

    return { total, confirmed, cancelled, paidCount, totalRevenue };
  }, [bookings]);

  const confirmCancelBooking = async () => {
    if (!cancellingBooking) return;

    try {
      setLoading(true);

      const bookingId = cancellingBooking.id;

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to cancel booking");
      }

      // Refresh bookings from backend
      await fetchBookings();

      // Update currently selected booking if drawer is open
      if (selectedBooking && selectedBooking._id === cancellingBooking._id) {
        setSelectedBooking(result.data);
      }

      triggerToast("Booking cancelled successfully.");

      setCancellingBooking(null);
      setIsDrawerOpen(false);
      setCancellationReasonInput("");
    } catch (error) {
      console.error("Cancel booking error:", error);

      triggerToast(error.message || "Failed to cancel booking.");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    statusFilter !== "All" ||
    typeFilter !== "All" ||
    classFilter !== "All" ||
    dateFilter !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setTypeFilter("All");
    setClassFilter("All");
    setDateFilter("All");
    setCurrentPage(1);
    triggerToast("Filters cleared");
  };

  return (
    <AdminLayout>
      <div
        className="min-h-screen flex flex-col relative font-sans transition-colors duration-300 antialiased"
        style={{
          backgroundColor: "var(--bg-main)",
          color: "var(--text-main)",
        }}
      >
        {/* CSS Theme Variable Injection for unified design token matching */}
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
        }

        .app-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          transition: all 0.25s ease;
        }

        .app-card:hover {
          box-shadow: var(--shadow-md);
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
      `}</style>

        {}

        {}
        <main className="flex-1 px-6 lg:px-10 py-8 space-y-7 max-w-[1600px] w-full mx-auto">
          {/* Error Banner State (Conditional) */}
          {hasError && (
            <div className="app-card p-6 border-red-500/30 bg-red-500/5 text-xs space-y-3">
              <div className="flex items-center gap-3 text-red-500 font-bold text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Unable to load bookings</span>
              </div>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Something went wrong while retrieving booking data from the
                YogaPT server. Please check your network connection or try
                again.
              </p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-xs inline-flex items-center gap-2 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try Again
              </button>
            </div>
          )}

          {!hasError && (
            <>
              {}
              <BookingStats stats={stats} isLoading={isLoading} />

              {}
              <BookingFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                classFilter={classFilter}
                setClassFilter={setClassFilter}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                uniqueClasses={uniqueClasses}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
                setCurrentPage={setCurrentPage}
              />

              {}
              <BookingTable
                isLoading={isLoading}
                filteredBookings={filteredBookings}
                paginatedBookings={paginatedBookings}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
                handleSort={handleSort}
                setSelectedBooking={setSelectedBooking}
                setIsDrawerOpen={setIsDrawerOpen}
                setCancellingBooking={setCancellingBooking}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </main>

        {}
        {isDrawerOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay Backdrop */}
            <div
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <div className="w-screen max-w-md bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
                {/* Drawer Header */}
                <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
                      {selectedBooking.id}
                    </span>
                    <h3 className="font-extrabold text-base text-[var(--text-main)]">
                      Booking Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                  {/* Status Indicator */}
                  <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-muted)]">
                      Current Status
                    </span>
                    {selectedBooking.status === "Confirmed" ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                        Confirmed
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>{" "}
                        Cancelled
                      </span>
                    )}
                  </div>

                  {/* Client Profile */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                      Client Information
                    </span>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                      <div className="w-12 h-12 rounded-full shrink-0 border border-[var(--border-color)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold text-xs uppercase">
                        {selectedBooking.clientName?.charAt(0) || "?"}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--text-main)]">
                          {selectedBooking.clientName}
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                          <Mail className="w-3.5 h-3.5" />{" "}
                          {selectedBooking.clientEmail}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3.5 h-3.5" />{" "}
                          {selectedBooking.clientPhone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                      Session Details
                    </span>
                    <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Class Name
                        </span>
                        <span className="font-bold text-[var(--text-main)]">
                          {selectedBooking.className}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Instructor
                        </span>
                        <span className="font-semibold text-[var(--text-main)]">
                          {selectedBooking.instructor}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">Date</span>
                        <span className="font-semibold text-[var(--text-main)]">
                          {selectedBooking.formattedDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Time Slot
                        </span>
                        <span className="font-semibold text-[var(--text-main)]">
                          {selectedBooking.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Billing & Payment */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                      Payment & Billing
                    </span>
                    <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Booking Type
                        </span>
                        <span className="font-bold text-[var(--text-main)]">
                          {selectedBooking.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Amount Paid
                        </span>
                        <span className="font-black text-sm text-amber-500">
                          {selectedBooking.amount > 0
                            ? `₹${selectedBooking.amount}`
                            : "₹0 (Free)"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Payment Method
                        </span>
                        <span className="font-medium text-[var(--text-main)]">
                          {selectedBooking.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-muted)]">
                          Payment Reference
                        </span>
                        <span className="font-mono text-[11px] text-[var(--text-muted)]">
                          {selectedBooking.paymentRef}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timestamps & Log */}
                  <div className="p-4 rounded-xl bg-[var(--bg-main)]/50 border border-[var(--border-color)] space-y-2 text-[11px] text-[var(--text-muted)]">
                    <div className="flex justify-between">
                      <span>Booked On:</span>
                      <span className="font-medium text-[var(--text-main)]">
                        {selectedBooking.bookedOn}
                      </span>
                    </div>
                    {selectedBooking.cancelledOn && (
                      <div className="flex justify-between text-red-500 font-medium">
                        <span>Cancelled On:</span>
                        <span>{selectedBooking.cancelledOn}</span>
                      </div>
                    )}
                    {selectedBooking.cancellationReason && (
                      <div className="flex justify-between text-red-500 font-medium">
                        <span>Reason:</span>
                        <span>{selectedBooking.cancellationReason}</span>
                      </div>
                    )}
                    {selectedBooking.notes && (
                      <div className="pt-2 border-t border-[var(--border-color)] mt-2">
                        <span className="block font-semibold text-[var(--text-main)] mb-1">
                          Notes:
                        </span>
                        <p className="italic text-[var(--text-muted)]">
                          {selectedBooking.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Drawer Footer Action */}
                <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
                  {selectedBooking.status === "Confirmed" ? (
                    <button
                      onClick={() => setCancellingBooking(selectedBooking)}
                      className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" /> Cancel Booking
                    </button>
                  ) : (
                    <div className="text-center text-[11px] text-[var(--text-muted)] py-2 font-medium">
                      This booking has been cancelled and logged for historical
                      reference.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {cancellingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="app-card max-w-md w-full p-6 space-y-5 bg-[var(--bg-surface)] shadow-2xl relative transform animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[var(--text-main)]">
                      Cancel Booking?
                    </h3>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {cancellingBooking.id}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCancellingBooking(null)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Are you sure you want to cancel{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingBooking.clientName}’s
                </strong>{" "}
                booking for{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingBooking.className}
                </strong>{" "}
                on{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingBooking.formattedDate}
                </strong>{" "}
                at{" "}
                <strong className="text-[var(--text-main)]">
                  {cancellingBooking.time}
                </strong>
                ?
              </p>

              <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs space-y-1.5 font-medium">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Client:</span>
                  <span className="text-[var(--text-main)] font-bold">
                    {cancellingBooking.clientName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Class:</span>
                  <span className="text-[var(--text-main)]">
                    {cancellingBooking.className}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Amount Paid:</span>
                  <span className="text-[var(--text-main)] font-bold">
                    {cancellingBooking.amount > 0
                      ? `₹${cancellingBooking.amount}`
                      : "Free"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--text-muted)] mb-1">
                  Reason for cancellation (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schedule conflict / Client requested refund..."
                  value={cancellationReasonInput}
                  onChange={(e) => setCancellationReasonInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-primary)] placeholder:text-[var(--text-muted)]/50"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setCancellingBooking(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-all shadow-md flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {toast.show && (
          <div className="fixed bottom-6 right-6 z-[9999] w-fit max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 shadow-2xl flex items-center gap-3 text-xs font-medium animate-in slide-in-from-bottom-5 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-[var(--text-main)]">{toast.message}</span>
            <button
              onClick={() =>
                setToast({ show: false, message: "", type: "success" })
              }
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] ml-2 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
