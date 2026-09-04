const ClassSummaryCard = ({
  title,
  count,
  subtitle,
  icon: Icon,
  valueClassName,
  iconClassName,
}) => {
  return (
    <div className="app-card p-4 flex items-center justify-between">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          {title}
        </span>

        <div
          className={`text-2xl font-black mt-0.5 ${valueClassName}`}
        >
          {count}
        </div>

        <span className="text-[11px] text-text-muted font-medium">
          {subtitle}
        </span>
      </div>

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${iconClassName}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ClassSummaryCard;