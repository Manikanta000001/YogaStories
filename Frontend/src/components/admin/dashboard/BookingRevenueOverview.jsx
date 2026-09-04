import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const BookingRevenueOverview = ({ bookingOverview = {}, revenue = {} }) => {
  const confirmed = bookingOverview.confirmed || 0;
  const cancelled = bookingOverview.cancelled || 0;
  const paid = bookingOverview.paid || 0;
  const free = bookingOverview.free || 0;

  const currentMonth = revenue.currentMonth || 0;
  const previousMonth = revenue.previousMonth || 0;
  const growthRate = revenue.growthRate;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 animate-slide-up delay-300">
      {/* Booking Overview */}
      <div className="app-card p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-text-main text-sm">
              Booking Overview
            </h3>

            <Link
              to="/bookings"
              className="text-xs font-semibold text-accent-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-main border border-border-color interactive-row">
              <span className="text-text-muted font-medium">
                Confirmed Bookings
              </span>

              <span className="font-bold text-text-main text-sm">
                {confirmed}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-main border border-border-color interactive-row">
              <span className="text-text-muted font-medium">
                Cancelled Bookings
              </span>

              <span className="font-bold text-red-500 text-sm">
                {cancelled}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-main border border-border-color interactive-row">
              <span className="text-text-muted font-medium">Paid Bookings</span>

              <span className="font-bold text-amber-500 text-sm">{paid}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-bg-main border border-border-color interactive-row">
              <span className="text-text-muted font-medium">Free Bookings</span>

              <span className="font-bold text-text-main text-sm">{free}</span>
            </div>
          </div>
        </div>

        <span className="text-[11px] text-text-muted mt-5 pt-3 border-t border-border-color block font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Auto-confirmation workflow active
        </span>
      </div>

      {/* Revenue Overview */}
      <div className="app-card p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-text-main text-sm">
              Revenue Overview
            </h3>

            <Link
              to="/analytics"
              className="text-xs font-semibold text-accent-primary hover:underline"
            >
              Analytics
            </Link>
          </div>

          <div className="space-y-1 mb-5">
            <span className="text-xs text-text-muted uppercase font-semibold">
              Current Month
            </span>

            <div className="text-2xl font-black text-text-main">
              ₹{currentMonth.toLocaleString("en-IN")}
            </div>

            <span className="text-xs text-text-muted font-medium">
              Previous Month: ₹{previousMonth.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Revenue Trend */}
          <div className="w-full h-3 bg-bg-main rounded-full overflow-hidden flex gap-1 border border-border-color">
            <div
              className="h-full bg-accent-primary/50 transition-all duration-1000"
              style={{
                width: currentMonth > 0 ? "30%" : "0%",
              }}
            ></div>

            <div
              className="h-full bg-accent-primary/80 transition-all duration-1000 delay-100"
              style={{
                width: currentMonth > 0 ? "40%" : "0%",
              }}
            ></div>

            <div
              className="h-full bg-accent-primary transition-all duration-1000 delay-200"
              style={{
                width: currentMonth > 0 ? "30%" : "0%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-text-muted mt-5 pt-3 border-t border-border-color font-semibold">
          <span>Growth Rate</span>

          {growthRate === null || growthRate === undefined ? (
            <span className="text-text-muted font-bold">
              No previous revenue
            </span>
          ) : (
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 animate-bounce" />
              {growthRate > 0 ? "+" : ""}
              {growthRate}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRevenueOverview;
