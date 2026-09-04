import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

import BookingRow from "./BookingRow";
const BookingTable = ({
  isLoading,
  filteredBookings,
  paginatedBookings,
  hasActiveFilters,
  clearFilters,
  handleSort,
  setSelectedBooking,
  setIsDrawerOpen,
  setCancellingBooking,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="app-card overflow-hidden">
      {/* Loading State */}
      {isLoading ? (
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 animate-pulse py-2"
            >
              <div className="w-16 h-4 bg-[var(--border-color)] rounded" />
              <div className="w-48 h-4 bg-[var(--border-color)] rounded" />
              <div className="w-28 h-4 bg-[var(--border-color)] rounded" />
              <div className="w-28 h-4 bg-[var(--border-color)] rounded" />
              <div className="w-16 h-4 bg-[var(--border-color)] rounded" />
              <div className="w-20 h-4 bg-[var(--border-color)] rounded" />
            </div>
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-sm text-[var(--text-main)]">
              No bookings match your search
            </h3>

            <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
              Try adjusting your search criteria or clearing active filters.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all shadow-xs inline-flex items-center gap-1.5"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--bg-main)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  {/* <th
                    className="py-3.5 px-6 cursor-pointer hover:text-[var(--text-main)] transition-colors select-none"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1.5">
                      Booking ID
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th> */}

                  <th
                    className="py-3.5 px-6 cursor-pointer hover:text-[var(--text-main)] transition-colors select-none"
                    onClick={() => handleSort("clientName")}
                  >
                    <div className="flex items-center gap-1.5">
                      Client
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>

                  <th
                    className="py-3.5 px-6 cursor-pointer hover:text-[var(--text-main)] transition-colors select-none"
                    onClick={() => handleSort("className")}
                  >
                    <div className="flex items-center gap-1.5">
                      Class
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>

                  <th
                    className="py-3.5 px-6 cursor-pointer hover:text-[var(--text-main)] transition-colors select-none"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1.5">
                      Date & Time
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>

                  <th className="py-3.5 px-6">Type</th>

                  <th
                    className="py-3.5 px-6 cursor-pointer hover:text-[var(--text-main)] transition-colors select-none"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center gap-1.5">
                      Amount
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>

                  <th
                    className="py-3.5 px-6 cursor-pointer hover:text-[var(--text-main)] transition-colors select-none"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-1.5">
                      Status
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>

                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border-color)]">
                {paginatedBookings.map((booking) => (
                  <BookingRow
                    key={booking.id}
                    booking={booking}
                    setSelectedBooking={setSelectedBooking}
                    setIsDrawerOpen={setIsDrawerOpen}
                    setCancellingBooking={setCancellingBooking}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden divide-y divide-[var(--border-color)]">
            {paginatedBookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => {
                  setSelectedBooking(booking);
                  setIsDrawerOpen(true);
                }}
                className="p-4 space-y-3 hover:bg-[var(--bg-main)]/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                    {booking.id}
                  </span>

                  {booking.status === "Confirmed" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Cancelled
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={booking.avatar}
                    alt={booking.clientName}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />

                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-[var(--text-main)] truncate">
                      {booking.clientName}
                    </h4>

                    <span className="text-[11px] text-[var(--text-muted)] block truncate">
                      {booking.className}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
                  <div>
                    <span>{booking.formattedDate}</span> •{" "}
                    <span>{booking.time}</span>
                  </div>

                  <div className="font-bold text-[var(--text-main)] text-xs">
                    {booking.type === "Paid" ? `₹${booking.amount}` : "Free"}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Booked: {booking.bookedOn}
                  </span>

                  <div className="flex items-center gap-2">
                    {booking.status === "Confirmed" && (
                      <button
                        onClick={() => setCancellingBooking(booking)}
                        className="px-2.5 py-1 rounded-lg text-red-500 bg-red-500/10 text-[10px] font-bold"
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsDrawerOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] text-[10px] font-semibold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[var(--bg-main)]/50 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>

              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] rounded-lg px-2 py-1 text-xs focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <span className="ml-2 font-medium">
                Showing{" "}
                <span className="text-[var(--text-main)] font-bold">
                  {Math.min(
                    (currentPage - 1) * rowsPerPage + 1,
                    filteredBookings.length,
                  )}
                </span>{" "}
                to{" "}
                <span className="text-[var(--text-main)] font-bold">
                  {Math.min(currentPage * rowsPerPage, filteredBookings.length)}
                </span>{" "}
                of{" "}
                <span className="text-[var(--text-main)] font-bold">
                  {filteredBookings.length}
                </span>{" "}
                bookings
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-main)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                      currentPage === pageNum
                        ? "bg-[var(--accent-primary)] text-white shadow-xs"
                        : "bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-main)]"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--bg-main)] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingTable;
