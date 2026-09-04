const SessionSummaryCard = ({
  title,
  count,
  subtitle,
  icon,
  badge,
  isLoading,
}) => {
  return (
    <div className="app-card p-4 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </span>

        <div className="w-7 h-7 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-xl font-black text-[var(--text-main)]">
          {isLoading ? (
            <span className="inline-block w-10 h-5 bg-[var(--border-color)] rounded animate-pulse" />
          ) : (
            count
          )}
        </div>

        {badge ? (
          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-extrabold animate-pulse">
            {badge}
          </span>
        ) : (
          <span className="text-[10px] text-[var(--text-muted)] font-medium">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default SessionSummaryCard;