import { useEffect, useState } from "react";
import { X, Users } from "lucide-react";

function ParticipantsDrawer({ session, onClose }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!session?.id) return;

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/bookings?sessionId=${session.id}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load participants");
        }

        const formattedParticipants = (result.data || [])
          .filter(
            (booking) =>
              booking.status === "pending" || booking.status === "confirmed",
          )
          .map((booking) => ({
            id: booking._id,
            name: booking.clientId?.name || "Unknown Client",
            email: booking.clientId?.email || "—",
            phone: booking.clientId?.phone || "—",
            type: booking.amount > 0 ? "Paid" : "Free",
            amount: Number(booking.amount || 0),
            status: booking.status,
          }));

        setParticipants(formattedParticipants);
      } catch (err) {
        console.error("Participants fetch error:", err);
        setError(err.message || "Failed to load participants");
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [session?.id]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-2xl flex flex-col transform transition-transform duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] block">
                {session.id}
              </span>

              <h3 className="font-extrabold text-base text-[var(--text-main)]">
                Session Participants
              </h3>

              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {session.className} • {session.formattedDate}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Participants */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] text-[var(--text-muted)] font-bold uppercase text-[10px]">
              <span>Booked Client</span>
              <span>Payment Type</span>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-8 text-center text-[var(--text-muted)]">
                Loading participants...
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="p-8 text-center text-red-500">
                <p>{error}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && participants.length === 0 && (
              <div className="p-8 text-center text-[var(--text-muted)] space-y-2">
                <Users className="w-8 h-8 mx-auto opacity-50" />

                <p>No registered participants recorded yet for this session.</p>
              </div>
            )}

            {/* Real participants */}
            {!loading &&
              !error &&
              participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--border-color)] flex items-center justify-center font-bold shrink-0">
                      {p.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <span className="font-bold text-[var(--text-main)] block">
                        {p.name}
                      </span>

                      <span className="text-[10px] text-[var(--text-muted)] block">
                        {p.email}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] block mb-1 ${
                        p.status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {p.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>

                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      {p.type === "Paid" ? `Paid ₹${p.amount}` : "Free Pass"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantsDrawer;
