function StatusBadge({ status }) {
  if (status === "ONGOING") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>{" "}
        ONGOING
      </span>
    );
  }
  if (status === "COMPLETED") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-[var(--text-muted)] font-bold text-[10px]">
        COMPLETED
      </span>
    );
  }
  if (status === "CANCELLED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 font-extrabold text-[10px]">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> CANCELLED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> UPCOMING
    </span>
  );
}

export default StatusBadge;