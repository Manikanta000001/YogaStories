import { useEffect, useState } from "react";

const RecentActivity = ({ activities = [] }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);

    return () => clearTimeout(timer);
  }, [activities]);

  const getActivity = (activity) => {
    const clientName = activity.clientId?.name || "A client";
    const className = activity.classId?.title || "a session";

    switch (activity.status) {
      case "cancelled":
        return {
          text: `${clientName} cancelled ${className}`,
          dotClass: "bg-red-500",
        };

      case "completed":
        return {
          text: `${clientName} completed ${className}`,
          dotClass: "bg-blue-500",
        };

      case "pending":
        return {
          text: `${clientName} booked ${className}`,
          dotClass: "bg-amber-500",
        };

      case "confirmed":
      default:
        return {
          text: `${clientName} booked ${className}`,
          dotClass: "bg-accent-primary",
        };
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return "";

    const activityDate = new Date(date);
    const now = new Date();

    const difference = Math.floor((now - activityDate) / 1000);

    if (difference < 60) {
      return "Just now";
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  return (
    <div className="app-card p-6 flex-1 flex flex-col animate-slide-up delay-400">
      <h3 className="font-bold text-text-main text-sm mb-4">
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-8">
          <p className="text-xs text-text-muted font-medium">
            No recent activity
          </p>
        </div>
      ) : (
        <div
          className="
            max-h-[190px]
            overflow-y-auto
            pr-2
            space-y-4
            text-xs
            scrollbar-thin
            scrollbar-thumb-border-color
            scrollbar-track-transparent
          "
        >
          <div className="relative before:absolute before:inset-y-2 before:left-[7px] before:w-[1px] before:bg-border-color">
            {activities.map((activity) => {
              const activityInfo = getActivity(activity);

              return (
                <div
                  key={activity._id}
                  className="relative flex items-start gap-3.5 pl-5 mb-4 last:mb-0 group cursor-pointer"
                >
                  <div
                    className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full ${
                      activityInfo.dotClass
                    } ring-4 ring-bg-surface transition-transform duration-200 group-hover:scale-125`}
                  ></div>

                  <div
                    className={`transition-all duration-200 ${
                      loaded
                        ? "translate-x-0 opacity-100"
                        : "translate-x-2 opacity-0"
                    } group-hover:translate-x-1`}
                  >
                    <p className="font-bold text-text-main">
                      {activityInfo.text}
                    </p>

                    <span className="text-[11px] text-text-muted font-medium">
                      {formatTimeAgo(
                        activity.createdAt || activity.bookedAt
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;