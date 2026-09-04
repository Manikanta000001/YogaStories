import {
  ArrowUpDown,
  ChevronDown,
  LayoutGrid,
  List,
  Search,
  X,
  XCircle,
} from "lucide-react";
function ClassToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  activityFilter,
  setActivityFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  hasActiveFilters,
  clearFilters,
}) {
  return (
    <div className="app-card p-3 sm:p-4 space-y-3 bg-bg-surface border border-border-color">
  
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[220px] sm:min-w-[280px]">
                    <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search classes by name, description, ID..."
                      className="w-full pl-10 pr-9 py-2 rounded-xl bg-bg-main border border-border-color text-xs text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main p-0.5 rounded-full hover:bg-bg-surface transition-colors"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Filters Controls Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Status Filter */}
                    <div className="relative flex-1 sm:flex-initial">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full sm:w-auto pl-3 pr-8 py-2 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer font-medium appearance-none"
                      >
                        <option value="all">Status: All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Activity Filter */}
                    <div className="relative flex-1 sm:flex-initial">
                      <select
                        value={activityFilter}
                        onChange={(e) => setActivityFilter(e.target.value)}
                        className="w-full sm:w-auto pl-3 pr-8 py-2 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer font-medium appearance-none"
                      >
                        <option value="all">Sessions: All</option>
                        <option value="has_upcoming">
                          Has Upcoming Sessions
                        </option>
                        <option value="no_upcoming">
                          No Upcoming Sessions
                        </option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Sort By */}
                    <div className="relative w-full sm:w-auto">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full sm:w-auto pl-3 pr-8 py-2 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer font-medium appearance-none"
                      >
                        <option value="name">Sort by Name</option>
                        <option value="created">
                          Sort by Recently Created
                        </option>
                        <option value="upcoming_sessions">
                          Sort by Upcoming Sessions
                        </option>
                        <option value="most_sessions">
                          Sort by Total Sessions
                        </option>
                      </select>
                      <ArrowUpDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* View Switcher */}
                    <div className="flex items-center p-1 rounded-xl bg-bg-main border border-border-color ml-auto sm:ml-0 gap-0.5">
                      <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                          viewMode === "grid"
                            ? "bg-bg-surface text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                            : "text-text-muted hover:text-text-main"
                        }`}
                        title="Grid View"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                          viewMode === "list"
                            ? "bg-bg-surface text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                            : "text-text-muted hover:text-text-main"
                        }`}
                        title="List View"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Clear filters button */}
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5"
                        title="Reset all search and filter conditions"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Clear
                      </button>
                    )}
                  </div>
                </div>
    </div>
  );
}

export default ClassToolbar;