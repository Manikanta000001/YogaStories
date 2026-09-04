import { useState, useEffect } from "react";

import { CheckCircle2 } from "lucide-react";
import { api } from "../../services/api";

import BookingRevenueOverview from "../../components/admin/dashboard/BookingRevenueOverview";
import DashboardHero from "../../components/admin/dashboard/DashboardHero";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import DashboardShimmer from "../../components/admin/dashboard/DashboardShimmer";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import RecentActivity from "../../components/admin/dashboard/RecentActivity";
import TodayCapacityWidget from "../../components/admin/dashboard/TodayCapacityWidget";
import TodaysSessions from "../../components/admin/dashboard/TodaysSessions";
import UpcomingSessions from "../../components/admin/dashboard/UpcomingSessions";
import AdminLayout from "../../components/admin/layout/AdminLayout";

const ToastNotification = ({ isVisible, message }) => (
  <div
    className={`fixed bottom-6 right-6 app-card px-4 py-3 shadow-2xl z-50 flex items-center gap-3 transform transition-all duration-300 text-xs font-medium ${
      isVisible
        ? "translate-y-0 opacity-100 scale-100"
        : "translate-y-20 opacity-0 scale-95"
    }`}
  >
    <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-bounce" />
    <span>{message}</span>
  </div>
);

export default function App() {
  // Dashboard State
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);

  // Toast State
  const [toastState, setToastState] = useState({
    isVisible: false,
    message: "",
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const startTime = Date.now();

      try {
        setDashboardLoading(true);
        setDashboardError(null);

        const response = await api("/dashboard");

        console.log("Dashboard data:", response);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setDashboardData(response);
          setDashboardLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error("Failed to load dashboard:", error);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsedTime, 0);

        setTimeout(() => {
          setDashboardError(error.message);
          setDashboardLoading(false);
        }, remainingTime);
      }
    };

    fetchDashboard();
  }, []);

  const showToast = (msg) => {
    setToastState({
      isVisible: true,
      message: msg,
    });

    setTimeout(() => {
      setToastState({
        isVisible: false,
        message: "",
      });
    }, 3500);
  };
console.log(dashboardData?.recentActivity);
  return (
    <AdminLayout activities={dashboardData?.recentActivity || []}>
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-6 py-8 space-y-8 max-w-[1600px] w-full mx-auto flex flex-col justify-start">
          {/* SHIMMER */}
          {dashboardLoading ? (
            <DashboardShimmer />
          ) : dashboardError ? (
            /* ERROR */
            <div className="app-card p-10 text-center">
              <p className="text-sm font-semibold text-red-500">
                Failed to load dashboard
              </p>

              <p className="text-xs text-text-muted mt-2">{dashboardError}</p>
            </div>
          ) : (
            /* DASHBOARD */
            <>
              {/* HERO SECTION */}
              <DashboardHero />

              {/* DASHBOARD STATS */}
              <DashboardStats
                stats={dashboardData?.stats}
                today={dashboardData?.today}
              />

              {/* MAIN RESPONSIVE LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* LEFT */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  <TodaysSessions
                    sessions={dashboardData?.today?.sessions || []}
                  />

                  <BookingRevenueOverview
                    bookingOverview={dashboardData?.bookingOverview}
                    revenue={dashboardData?.revenue}
                  />
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                  <TodayCapacityWidget
                    capacity={dashboardData?.today?.capacity}
                  />

                  <UpcomingSessions
                    sessions={dashboardData?.upcomingSessions || []}
                  />

                  <QuickActions />

                  <RecentActivity
                    activities={dashboardData?.recentActivity || []}
                  />
                </div>
              </div>
            </>
          )}
        </main>

        {/* FOOTER */}
        <footer className="px-6 py-4 border-t border-border-color text-center text-xs text-text-muted">
          <p>© 2026 YogaPT Studio Administration. All rights reserved.</p>
        </footer>
      </div>

      {/* TOAST */}
      <ToastNotification
        isVisible={toastState.isVisible}
        message={toastState.message}
      />
    </AdminLayout>
  );
}
