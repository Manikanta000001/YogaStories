import {
  Calendar,
  CheckCircle2,
  XCircle,
  IndianRupee,
} from "lucide-react";

const BookingStats = ({ stats, isLoading }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Bookings */}
      <div className="app-card p-5 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Total Bookings
          </span>

          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-[var(--text-main)]">
            {isLoading ? (
              <span className="inline-block w-12 h-6 bg-[var(--border-color)] rounded animate-pulse" />
            ) : (
              stats.total
            )}
          </div>

          <span className="text-[11px] text-[var(--text-muted)] font-medium">
            All recorded
          </span>
        </div>
      </div>

      {/* Confirmed Bookings */}
      <div className="app-card p-5 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Confirmed
          </span>

          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-emerald-500">
            {isLoading ? (
              <span className="inline-block w-12 h-6 bg-[var(--border-color)] rounded animate-pulse" />
            ) : (
              stats.confirmed
            )}
          </div>

          <span className="text-[11px] text-emerald-500/90 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active
          </span>
        </div>
      </div>

      {/* Cancelled Bookings */}
      <div className="app-card p-5 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Cancelled
          </span>

          <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-red-500">
            {isLoading ? (
              <span className="inline-block w-12 h-6 bg-[var(--border-color)] rounded animate-pulse" />
            ) : (
              stats.cancelled
            )}
          </div>

          <span className="text-[11px] text-[var(--text-muted)] font-medium">
            Historical logs kept
          </span>
        </div>
      </div>

      {/* Paid Revenue */}
      <div className="app-card p-5 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Paid Bookings
          </span>

          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <IndianRupee className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-black text-[var(--text-main)]">
            {isLoading ? (
              <span className="inline-block w-20 h-6 bg-[var(--border-color)] rounded animate-pulse" />
            ) : (
              `₹${stats.totalRevenue.toLocaleString()}`
            )}
          </div>

          <span className="text-[11px] text-amber-500 font-semibold">
            {stats.paidCount} paid sessions
          </span>
        </div>
      </div>
    </section>
  );
};

export default BookingStats;