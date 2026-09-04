import React from "react";
import {
  CalendarDays,
  CalendarCheck,
  Users,
  Layers,
} from "lucide-react";

import StatCard from "./StatCard";

const DashboardStats = ({ stats, today }) => {
  const todaysSessions = today?.sessions?.length || 0;

  const todaysBookings = today?.sessions?.reduce(
    (total, session) => total + (session.bookedCount || 0),
    0
  ) || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <StatCard
        title="Today's Sessions"
        value={todaysSessions}
        description={
          todaysSessions === 0
            ? "No sessions scheduled today"
            : "Scheduled for today"
        }
        icon={CalendarDays}
        iconClassName="bg-indigo-500/10 text-indigo-500"
        delay="delay-100"
      />

      <StatCard
        title="Today's Bookings"
        value={todaysBookings}
        description={
          todaysBookings === 0
            ? "No bookings today"
            : "Bookings for today's sessions"
        }
        icon={CalendarCheck}
        iconClassName="bg-emerald-500/10 text-emerald-500"
        delay="delay-150"
      />

      <StatCard
        title="Total Clients"
        value={stats?.totalClients ?? 0}
        description="Registered clients"
        icon={Users}
        iconClassName="bg-blue-500/10 text-blue-500"
        delay="delay-200"
      />

      <StatCard
        title="Active Classes"
        value={stats?.activeClasses ?? 0}
        description={`Out of ${stats?.totalClasses ?? 0} total classes`}
        icon={Layers}
        iconClassName="bg-amber-500/10 text-amber-500"
        delay="delay-250"
      />

    </div>
  );
};

export default DashboardStats;