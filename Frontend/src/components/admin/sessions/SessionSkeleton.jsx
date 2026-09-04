function SessionSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="app-card p-4 animate-pulse flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-24 h-12 bg-[var(--border-color)] rounded-xl" />

            <div className="space-y-2">
              <div className="w-40 h-4 bg-[var(--border-color)] rounded" />
              <div className="w-28 h-3 bg-[var(--border-color)] rounded" />
            </div>
          </div>

          <div className="w-32 h-3 bg-[var(--border-color)] rounded" />
        </div>
      ))}
    </div>
  );
}

export default SessionSkeleton;