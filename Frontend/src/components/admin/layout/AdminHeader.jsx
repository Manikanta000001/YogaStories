import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  Activity    ,
  Bell,
  Sun,
  Moon,
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

const READ_NOTIFICATIONS_KEY = "yogapt_read_notifications";

const AdminHeader = ({
  onOpenMobile,
  isDarkMode,
  toggleTheme,
  onToggleNotifications,
  isNotificationsOpen,
  onCloseNotifications,
  activities = [],
}) => {
  const [readNotifications, setReadNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(
        READ_NOTIFICATIONS_KEY
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /*
   * Get the activity date.
   *
   * Prefer bookedAt when available because that represents
   * the actual booking activity.
   */
  const getActivityDate = (activity) => {
    return activity.bookedAt || activity.createdAt;
  };

  /*
   * Only show unread activities from the last 3 hours.
   */
  const recentNotifications = useMemo(() => {
    const now = Date.now();

    const threeHoursAgo =
      now - 3 * 60 * 60 * 1000;

    return activities
      .filter((activity) => {
        const dateValue = getActivityDate(activity);

        if (!dateValue) return false;

        const activityTime =
          new Date(dateValue).getTime();

        if (Number.isNaN(activityTime)) {
          return false;
        }

        return activityTime >= threeHoursAgo;
      })
      .filter(
        (activity) =>
          activity._id &&
          !readNotifications.includes(activity._id)
      )
      .sort((a, b) => {
        const dateA = new Date(
          getActivityDate(a)
        ).getTime();

        const dateB = new Date(
          getActivityDate(b)
        ).getTime();

        return dateB - dateA;
      });
  }, [activities, readNotifications]);

  /*
   * Persist read notifications.
   */
  useEffect(() => {
    localStorage.setItem(
      READ_NOTIFICATIONS_KEY,
      JSON.stringify(readNotifications)
    );
  }, [readNotifications]);

  /*
   * Mark every currently visible notification as read.
   */
  const markAllAsRead = () => {
    const ids = recentNotifications
      .map((activity) => activity._id)
      .filter(Boolean);

    setReadNotifications((previous) => [
      ...new Set([
        ...previous,
        ...ids,
      ]),
    ]);
  };

  const getNotification = (activity) => {
    const clientName =
      activity.clientId?.name || "A client";

    const className =
      activity.classId?.title || "a session";

    switch (activity.status) {
      case "cancelled":
        return {
          text: `${clientName} cancelled ${className}`,
          icon: XCircle,
          iconClass: "text-red-500",
        };

      case "completed":
        return {
          text: `${clientName} completed ${className}`,
          icon: CheckCircle2,
          iconClass: "text-blue-500",
        };

      case "pending":
        return {
          text: `${clientName} booked ${className}`,
          icon: Clock3,
          iconClass: "text-amber-500",
        };

      case "confirmed":
      default:
        return {
          text: `${clientName} booked ${className}`,
          icon: CheckCircle2,
          iconClass: "text-accent-primary",
        };
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return "";

    const activityDate = new Date(date);
    const now = new Date();

    const difference = Math.floor(
      (now - activityDate) / 1000
    );

    if (difference < 0) {
      return "Just now";
    }

    if (difference < 60) {
      return "Just now";
    }

    const minutes = Math.floor(
      difference / 60
    );

    if (minutes < 60) {
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;
  };

  return (
    <header
      className="
        sticky top-0 z-30
        bg-bg-surface/90
        backdrop-blur-md
        border-b border-border-color
        px-8 py-3.5
        flex items-center justify-between
        shadow-sm
        transition-all duration-300
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobile}
          className="
            md:hidden
            p-2
            rounded-xl
            bg-bg-main
            border border-border-color
            text-text-main
            interactive-btn
          "
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div
            className="
              hidden sm:flex
              w-9 h-9
              rounded-xl
              bg-accent-primary/10
              text-accent-primary
              items-center justify-center
              font-bold
              transition-transform
              duration-300
              hover:rotate-12
              hover:scale-105
            "
          >
            <Activity     className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-text-main">
                Yoga Stories
              </h1>

              <span
                className="
                  hidden md:inline-flex
                  items-center gap-1
                  px-2 py-0.5
                  rounded-md
                  bg-emerald-500/10
                  text-emerald-500
                  text-[10px]
                  font-semibold
                  tracking-wide
                  uppercase
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Suite
              </span>
            </div>

            <span className="text-xs font-medium text-text-muted flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Studio Administration
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3.5">

        {/* NOTIFICATIONS */}
        <div className="relative">

          <button
            onClick={onToggleNotifications}
            className="
              relative
              p-2.5
              rounded-xl
              bg-bg-main
              border border-border-color
              text-text-muted
              hover:text-text-main
              hover:bg-bg-surface
              transition-all duration-200
              interactive-btn
              shadow-sm
            "
          >
            <Bell className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />

            {recentNotifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            )}
          </button>

          {isNotificationsOpen && (
            <>
              {/* BACKDROP */}
              <div
                className="
                  fixed inset-0
                  z-50
                  bg-transparent
                "
                onClick={onCloseNotifications}
              />

              {/* NOTIFICATION PANEL */}
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-4
                  w-80
                  z-[60]
                  rounded-2xl
                  bg-bg-surface
                  border border-border-color
                  shadow-2xl
                  overflow-hidden
                  animate-pop-in
                "
              >

                {/* HEADER */}
                <div
                  className="
                    flex items-center justify-between
                    px-5 py-3.5
                    border-b border-border-color
                    bg-bg-surface
                  "
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Notifications
                    </span>

                    {recentNotifications.length > 0 && (
                      <span className="text-[10px] text-accent-primary font-bold">
                        {recentNotifications.length} new
                      </span>
                    )}
                  </div>

                  {recentNotifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="
                        text-[10px]
                        text-accent-primary
                        hover:underline
                        font-semibold
                      "
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* CONTENT */}
                {recentNotifications.length === 0 ? (
                  <div className="px-5 py-9 text-center bg-bg-surface">
                    <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-2" />

                    <p className="text-xs font-semibold text-text-main">
                      You're all caught up
                    </p>

                    <p className="text-[10px] text-text-muted mt-1">
                      No new activity in the last 3 hours.
                    </p>
                  </div>
                ) : (
                  <div
                    className="
                      p-3
                      space-y-2.5
                      max-h-80
                      overflow-y-auto
                      bg-bg-surface
                    "
                  >
                    {recentNotifications.map(
                      (activity) => {
                        const notification =
                          getNotification(activity);

                        const Icon =
                          notification.icon;

                        return (
                          <div
                            key={activity._id}
                            className="
                              p-3
                              rounded-xl
                              bg-bg-main
                              border border-border-color
                              hover:border-accent-primary/40
                              transition-all
                              cursor-pointer
                            "
                          >
                            <div className="flex items-start gap-2.5">

                              <Icon
                                className={`
                                  w-4 h-4
                                  mt-0.5
                                  shrink-0
                                  ${notification.iconClass}
                                `}
                              />

                              <div className="min-w-0">
                                <p className="font-medium text-text-main text-xs leading-5">
                                  {notification.text}
                                </p>

                                <span className="text-[10px] text-text-muted">
                                  {formatTimeAgo(
                                    getActivityDate(
                                      activity
                                    )
                                  )}
                                </span>
                              </div>

                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            p-2.5
            rounded-xl
            bg-bg-main
            border border-border-color
            text-text-muted
            hover:text-text-main
            hover:bg-bg-surface
            transition-all duration-300
            interactive-btn
            shadow-sm
            flex items-center justify-center
            group
          "
          title={
            isDarkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 group-hover:rotate-180" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 transition-transform duration-500 group-hover:-rotate-45" />
          )}
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;