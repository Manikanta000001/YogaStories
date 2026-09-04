const UpcomingSessionItem = ({ title, date, time, booked, total }) => (
  <div className="p-3.5 rounded-xl bg-bg-main border border-border-color flex items-center justify-between interactive-row cursor-pointer">
    <div>
      <span className="font-bold text-text-main block">
        {title}
      </span>

      <span className="text-text-muted font-medium">
        {date} • {time}
      </span>
    </div>

    <span className="font-bold text-text-main bg-bg-surface px-2.5 py-1 rounded-lg border border-border-color">
      {booked} / {total}
    </span>
  </div>
);

export default UpcomingSessionItem;