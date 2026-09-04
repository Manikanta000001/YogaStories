import { Search, X } from "lucide-react";

const SessionFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  classFilter,
  setClassFilter,
  typeFilter,
  setTypeFilter,
  capacityFilter,
  setCapacityFilter,
  hasActiveFilters,
  clearFilters,
  classes,
}) => {
  return (
    <div className="app-card p-4 space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">

        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />

          <input
            type="text"
            placeholder="Search sessions by class name, instructor, or session ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--accent-primary)] transition-all"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Select Options */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-primary)] font-semibold cursor-pointer"
          >
            <option value="All">Status: All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Class */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-primary)] font-semibold cursor-pointer"
          >
            <option value="All">Class: All Classes</option>

            {classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-primary)] font-semibold cursor-pointer"
          >
            <option value="All">Type: All</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>

          {/* Capacity */}
          <select
            value={capacityFilter}
            onChange={(e) => setCapacityFilter(e.target.value)}
            className="bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-primary)] font-semibold cursor-pointer"
          >
            <option value="All">Capacity: All</option>
            <option value="Available">
              Available (&lt;80%)
            </option>
            <option value="Almost Full">
              Almost Full (80%+)
            </option>
            <option value="Full">
              Full (100%)
            </option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 rounded-xl text-xs text-red-500 hover:bg-red-500/10 font-bold flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionFilters;