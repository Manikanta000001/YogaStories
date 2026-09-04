import { Search, X, ChevronDown } from "lucide-react";

const BookingFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  classFilter,
  setClassFilter,
  dateFilter,
  setDateFilter,
  uniqueClasses,
  hasActiveFilters,
  clearFilters,
  setCurrentPage,
}) => {
  console.log(uniqueClasses);
  return (
    <div className="app-card p-4 space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, class, or booking ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
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

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Dropdown */}


          {/* Type Dropdown */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[var(--accent-primary)] font-medium cursor-pointer"
            >
              <option value="All">Type: All</option>
              <option value="Paid">Paid</option>
              <option value="Free">Free</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>
          {/* Class Dropdown */}
          <div className="relative">
            <select
              value={classFilter}
              onChange={(e) => {
                setClassFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[var(--accent-primary)] font-medium cursor-pointer"
            >
              {uniqueClasses.filter(Boolean).map((cls, index) => (
                <option key={`${cls}-${index}`} value={cls}>
                  {cls === "All" ? "Class: All Classes" : cls}
                </option>
              ))}
            </select>

            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>

          {/* Date Dropdown */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:border-[var(--accent-primary)] font-medium cursor-pointer"
            >
              <option value="All">Date: All Dates</option>
              <option value="Today">Today (28 Aug)</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2.5 rounded-xl text-xs text-red-500 hover:bg-red-500/10 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
