import { useEffect, useState } from "react";

const TodayCapacityWidget = ({ capacity }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);

    return () => clearTimeout(timer);
  }, [capacity]);

  const total = capacity?.total || 0;
  const booked = capacity?.booked || 0;
  const available = capacity?.available || 0;

  const percentage =
    total > 0 ? Math.min(Math.round((booked / total) * 100), 100) : 0;

  return (
    <div className="app-card p-6 animate-slide-up delay-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-text-main text-sm">
          Today's Capacity
        </h3>

        <span
          className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
            percentage >= 90
              ? "bg-amber-500/10 text-amber-500"
              : "bg-emerald-500/10 text-emerald-500"
          }`}
        >
          {percentage}% Filled
        </span>
      </div>

      <div className="text-2xl font-black text-text-main mb-3">
        {booked} / {total}{" "}
        <span className="text-xs font-semibold text-text-muted">
          spots filled
        </span>
      </div>

      <div className="w-full h-2.5 bg-bg-main rounded-full overflow-hidden mb-4 border border-border-color">
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-1000 ease-out"
          style={{
            width: loaded ? `${percentage}%` : "0%",
          }}
        ></div>
      </div>

      <div className="space-y-2.5 text-xs border-t border-border-color pt-4 font-medium">
        <div className="flex justify-between items-center hover:bg-bg-main p-1 rounded-md transition-colors">
          <span className="text-text-muted">
            Available Spots
          </span>

          <span className="font-bold text-text-main">
            {available}
          </span>
        </div>

        <div className="flex justify-between items-center hover:bg-bg-main p-1 rounded-md transition-colors">
          <span className="text-text-muted">
            Total Capacity
          </span>

          <span className="font-bold text-text-main">
            {total}
          </span>
        </div>

        <div className="flex justify-between items-center hover:bg-bg-main p-1 rounded-md transition-colors">
          <span className="text-text-muted">
            Booked Spots
          </span>

          <span className="font-bold text-text-main">
            {booked}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayCapacityWidget;