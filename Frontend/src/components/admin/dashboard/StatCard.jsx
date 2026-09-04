import React from "react";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  descriptionClassName = "text-text-muted",
  delay = "",
  children,
}) => {
  return (
    <div
      className={`app-card p-6 flex flex-col justify-between animate-slide-up ${delay}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          {title}
        </span>

        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 ${iconClassName}`}
        >
          {Icon && <Icon className="w-4 h-4" />}
        </div>
      </div>

      <div>
        <div className="text-3xl font-black text-text-main tracking-tight">
          {value}
        </div>

        {children ? (
          children
        ) : (
          <p
            className={`text-xs mt-1 font-medium ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;