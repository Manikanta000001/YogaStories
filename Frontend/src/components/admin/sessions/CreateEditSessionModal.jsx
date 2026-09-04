import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

const TIME_OPTIONS = Array.from({ length: 96 }, (_, index) => {
  const hour24 = Math.floor(index / 4);
  const minutes = (index % 4) * 15;

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )} ${period}`;
});

const timeToMinutes = (time) => {
  if (!time) return null;

  const match = time.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/i);

  if (!match) return null;

  let hour = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (hour === 12) {
    hour = 0;
  }

  if (period === "PM") {
    hour += 12;
  }

  return hour * 60 + minutes;
};

const TimeSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)] flex items-center justify-between"
      >
        <span>{value}</span>

        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full z-[200] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl max-h-56 overflow-y-auto">
          {TIME_OPTIONS.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => {
                onChange(time);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-[var(--accent-primary)] hover:text-white transition-colors ${
                time === value
                  ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                  : "text-[var(--text-main)]"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateEditSessionModal = ({
  title,
  sessionData,
  initialClass,
  initialDate,
  onClose,
  onSubmit,
  initialClasses,
}) => {
  const [classId, setClassId] = useState(
    sessionData?.classId?._id ||
      sessionData?.classId ||
      initialClass?.id ||
      initialClasses[0]?.id ||
      "",
  );

  const [date, setDate] = useState(
    sessionData ? sessionData.date : initialDate || "2026-08-28",
  );

  const [startTime, setStartTime] = useState(
    sessionData ? sessionData.startTime : "07:00 AM",
  );

  const [endTime, setEndTime] = useState(
    sessionData ? sessionData.endTime : "08:00 AM",
  );

  const [instructor, setInstructor] = useState(
    sessionData ? sessionData.instructor : "Leena Sajja",
  );

  const [type, setType] = useState(sessionData ? sessionData.type : "Paid");

  const [price, setPrice] = useState(sessionData ? sessionData.price : 500);

  const [capacity, setCapacity] = useState(
    sessionData ? sessionData.capacity : 15,
  );

  const [notes, setNotes] = useState(
    sessionData ? sessionData.notes || "" : "",
  );

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const capacityValue = Number(capacity);
    const priceValue = Number(price);

    if (!classId) {
      setErrorMsg("Please select a class");
      return;
    }

    if (!date) {
      setErrorMsg("Please select a date");
      return;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes === null || endMinutes === null) {
      setErrorMsg("Please select valid start and end times");
      return;
    }

    if (endMinutes <= startMinutes) {
      setErrorMsg("End time must be after start time");
      return;
    }

    if (capacityValue <= 0) {
      setErrorMsg("Capacity must be greater than 0");
      return;
    }

    if (type === "Paid" && priceValue <= 0) {
      setErrorMsg("Price must be greater than 0 for paid sessions");
      return;
    }

    const payload = {
      ...(sessionData?.id ? { id: sessionData.id } : {}),
      classId,
      date,
      startTime,
      endTime,
      type: type === "Free" ? "free" : "paid",
      price: type === "Free" ? 0 : priceValue,
      capacity: capacityValue,
    };

    onSubmit(payload);
  };
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
   <div className="fixed top-0 right-0 bottom-0 left-0 z-[1000] !m-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overscroll-contain">
      <div
        className="app-card max-w-lg w-full p-6 space-y-5 bg-[var(--bg-surface)] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <h3 className="font-extrabold text-base text-[var(--text-main)]">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-500 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[var(--text-muted)] mb-1">
              Select Class
            </label>

            {sessionData ? (
              <div className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold">
                {sessionData.className || "Unknown Class"}
              </div>
            ) : (
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)]"
              >
                {initialClasses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                Instructor
              </label>

              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                Start Time
              </label>
              <TimeSelect value={startTime} onChange={setStartTime} />
            </div>

            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                End Time
              </label>

              <TimeSelect value={endTime} onChange={setEndTime} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)]"
              >
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                Price (₹)
              </label>

              <input
                type="number"
                disabled={type === "Free"}
                value={type === "Free" ? 0 : price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)] disabled:opacity-40"
              />
            </div>

            <div>
              <label className="block font-bold text-[var(--text-muted)] mb-1">
                Capacity
              </label>

              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] font-semibold focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[var(--text-muted)] mb-1">
              Session Notes (Optional)
            </label>

            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add specific instructions for attendees..."
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[var(--text-muted)] font-semibold hover:text-[var(--text-main)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-extrabold shadow-md transition-all"
            >
              {sessionData ? "Save Changes" : "Create Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditSessionModal;
