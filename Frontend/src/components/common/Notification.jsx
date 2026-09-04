import { useEffect, useState } from "react";

const notificationConfig = {
  success: {
    title: "Booking Confirmed",
    duration: 5000,
    color: "text-[var(--accent-primary)]",
    path: "M5 13l4 4L19 7",
  },
  warning: {
    title: "Schedule Notice",
    duration: 6500,
    color: "text-[var(--accent-gold)]",
    path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  error: {
    title: "Something went wrong",
    duration: 7000,
    color: "text-rose-500",
    path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77-1.333.192-1.732 1.732-1.732z",
  },
  info: {
    title: "Information",
    duration: 5000,
    color: "text-[var(--accent-gold)]",
    path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

function Notification({ notification, onClose }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!notification) return;

    setExiting(false);

    const timer = setTimeout(() => {
      handleClose();
    }, notification.duration || notificationConfig[notification.type]?.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  if (!notification) return null;

  const config =
    notificationConfig[notification.type] || notificationConfig.info;

  const handleClose = () => {
    setExiting(true);

    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
   <div className="fixed bottom-5 right-0 sm:bottom-6 sm:right-6 z-[100] w-[calc(100%-24px)] sm:w-[420px] pointer-events-none px-3 sm:px-0">
      <div
        className={`
          yogapt-toast-card
          pointer-events-auto
          relative
          overflow-hidden
          rounded-xl
          p-3.5 sm:p-4
          shadow-xl
          ${exiting ? "toast-exit" : "toast-enter"}
          ${
            notification.type === "warning" ||
            notification.type === "error"
              ? "animate-continuous-sway"
              : ""
          }
        `}
      >
        <div className="flex items-start gap-3 relative z-10">
          <div className="mt-0.5 shrink-0">
            <div
              className={`symbol-pulsing inline-flex p-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] ${config.color}`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  className="animated-icon-path"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={config.path}
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 pr-7 text-left">
            <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-[var(--text-main)] mb-0.5">
              {notification.title || config.title}
            </h4>

            <p className="text-[11px] sm:text-xs text-[var(--text-muted)] leading-relaxed">
              {notification.message}
            </p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close notification"
            className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[var(--text-muted)] hover:text-[var(--text-main)] p-2 rounded-md transition-colors hover:bg-[var(--bg-surface)] min-w-[32px] min-h-[32px] flex items-center justify-center"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--border-color)] overflow-hidden">
          <div
            className="notification-progress h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-gold)] to-[var(--accent-primary)] w-full origin-left bg-[length:200%_100%]"
            style={{
              animation: `shimmerBar 3s linear infinite`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Notification;