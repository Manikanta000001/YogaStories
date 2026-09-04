import { XCircle } from "lucide-react";
const BookingRow = ({
  booking,
  setSelectedBooking,
  setIsDrawerOpen,
  setCancellingBooking,
}) => {
  return (
    <tr
      className="hover:bg-[var(--bg-main)]/60 transition-colors group cursor-pointer"
      onClick={() => {
        setSelectedBooking(booking);
        setIsDrawerOpen(true);
      }}
    >
      {/* Booking ID */}
      {/* <td className="py-4 px-6 font-mono font-bold text-[var(--accent-primary)] whitespace-nowrap">
        {booking.id}
      </td> */}

      {/* Client */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full shrink-0 border border-[var(--border-color)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold text-xs uppercase">
            {booking.clientName?.charAt(0) || "?"}
          </div>

          <div className="overflow-hidden">
            <span className="font-bold text-[var(--text-main)] block truncate">
              {booking.clientName}
            </span>

            <span className="text-[10px] text-[var(--text-muted)] block truncate">
              {booking.clientEmail}
            </span>
          </div>
        </div>
      </td>

      {/* Class */}
      <td className="py-4 px-6 font-semibold text-[var(--text-main)] whitespace-nowrap">
        {booking.className}
      </td>

      {/* Date & Time */}
      <td className="py-4 px-6 whitespace-nowrap">
        <div className="font-semibold text-[var(--text-main)]">
          {booking.formattedDate}
        </div>

        <div className="text-[10px] text-[var(--text-muted)] font-medium">
          {booking.time}
        </div>
      </td>

      {/* Type */}
      <td className="py-4 px-6 whitespace-nowrap">
        {booking.type === "Paid" ? (
          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-bold text-[10px]">
            Paid
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-md bg-slate-500/10 text-[var(--text-muted)] font-bold text-[10px]">
            Free
          </span>
        )}
      </td>

      {/* Amount */}
      <td className="py-4 px-6 font-bold text-[var(--text-main)] whitespace-nowrap">
        {booking.amount > 0 ? `₹${booking.amount}` : "₹0"}
      </td>

      {/* Status */}
      <td className="py-4 px-6 whitespace-nowrap">
        {booking.status === "Confirmed" ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Confirmed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Cancelled
          </span>
        )}
      </td>

      {/* Actions */}
      <td
        className="py-4 px-6 text-right whitespace-nowrap"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setSelectedBooking(booking);
              setIsDrawerOpen(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] text-[11px] font-semibold transition-colors"
          >
            View Details
          </button>

          {booking.status === "Confirmed" && (
            <button
              onClick={() => setCancellingBooking(booking)}
              className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
              title="Cancel Booking"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
