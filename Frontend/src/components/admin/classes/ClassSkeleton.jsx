const ClassSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="app-card p-5 space-y-4">
          <div className="w-full h-32 rounded-xl skeleton-bg animate-shimmer"></div>

          <div className="w-2/3 h-5 rounded-md skeleton-bg animate-shimmer"></div>

          <div className="w-full h-12 rounded-md skeleton-bg animate-shimmer"></div>

          <div className="flex justify-between items-center pt-2">
            <div className="w-1/3 h-4 rounded-md skeleton-bg animate-shimmer"></div>
            <div className="w-1/4 h-4 rounded-md skeleton-bg animate-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassSkeleton;