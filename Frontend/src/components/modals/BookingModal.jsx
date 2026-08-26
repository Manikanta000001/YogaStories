import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Notification from "../common/Notification";

function BookingModal({ initialClass, onClose }) {
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [step, setStep] = useState(1);
  const [sessionType, setSessionType] = useState("paid"); // 'free' or 'paid'
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(initialClass || null);
  const [loadingClasses, setLoadingClasses] = useState(true);

  const [formData, setFormData] = useState({
    practice: initialClass?.title || "",
    date: getToday(),
    time: "",
    sessionId: "",
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionError, setSessionError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true);

        const response = await api("/classes");

        console.log("Classes from backend:", response.data);

        setClasses(response.data);

        // If a class was passed from PracticeFlow,
        // select that class initially.
        if (initialClass?._id) {
          const matchedClass = response.data.find(
            (classItem) => classItem._id === initialClass._id,
          );

          if (matchedClass) {
            setSelectedClass(matchedClass);

            setFormData((prev) => ({
              ...prev,
              practice: matchedClass.title,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to load classes:", error);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [initialClass]);

  useEffect(() => {
    if (!selectedClass?._id) {
      setSessions([]);
      return;
    }

    const fetchSessions = async () => {
      try {
        setLoadingSessions(true);
        setSessionError(null);

        // Clear previous selection because we're loading
        // sessions for a different class.
        setFormData((prev) => ({
          ...prev,
          date: getToday(),
          time: "",
          sessionId: "",
        }));

        const response = await api(`/sessions?classId=${selectedClass._id}`);

        console.log("Sessions for:", selectedClass.title, response.data);

        setSessions(response.data);
      } catch (error) {
        console.error("Failed to load sessions:", error);
        setSessionError(error.message);
        setSessions([]);
      } finally {
        setLoadingSessions(false);
      }
    };

    fetchSessions();
  }, [selectedClass]);
  const selectedDateSessions = sessions.filter((session) => {
    if (!formData.date) return false;

    return session.date.split("T")[0] === formData.date;
  });

  const showNotification = ({ type, title, message }) => {
    setNotification({
      type,
      title,
      message,
      id: Date.now(),
    });
  };

  // Mock slots with status: 'available', 'filled', 'unavailable'
  // const timeSlots = [
  //   { time: "07:00 AM", status: "available", type: "regular", price: "$45" },
  //   { time: "08:30 AM", status: "filled", type: "regular", price: "$45" },
  //   { time: "10:00 AM", status: "available", type: "free", price: "FREE" },
  //   { time: "04:00 PM", status: "available", type: "free", price: "FREE" },
  //   { time: "05:30 PM", status: "filled", type: "regular", price: "$45" },
  // ];

  const handleNextStep = () => {
    // STEP 1 → STEP 2
    if (step === 1) {
      if (!selectedClass?._id) {
        showNotification({
          type: "warning",
          title: "Choose a Practice",
          message: "Please select a yoga practice before continuing.",
        });
        return;
      }

      setStep(2);
      return;
    }

    // STEP 2 → STEP 3
    if (step === 2) {
      if (!formData.date) {
        showNotification({
          type: "warning",
          title: "Select a Date",
          message: "Please choose a date before continuing.",
        });
        return;
      }

      setStep(3);
      return;
    }

    // STEP 3 → STEP 4
    if (step === 3) {
      if (!formData.sessionId) {
        showNotification({
          type: "warning",
          title: "Select a Session",
          message: "Please select an available session before continuing.",
        });
        return;
      }

      setStep(4);
      return;
    }

    // STEP 4 → STEP 5
    if (step === 4) {
      if (!formData.name.trim()) {
        showNotification({
          type: "warning",
          title: "Name Required",
          message: "Please enter your name before continuing.",
        });
        return;
      }

      if (!formData.email.trim()) {
        showNotification({
          type: "warning",
          title: "Email Required",
          message: "Please enter your email address.",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        showNotification({
          type: "warning",
          title: "Invalid Email",
          message: "Please enter a valid email address.",
        });
        return;
      }

      if (!formData.phone.trim()) {
        showNotification({
          type: "warning",
          title: "Phone Number Required",
          message: "Please enter your phone number.",
        });
        return;
      }

      const phoneRegex = /^[6-9]\d{9}$/;

      if (!phoneRegex.test(formData.phone.trim())) {
        showNotification({
          type: "warning",
          title: "Invalid Phone Number",
          message: "Please enter a valid 10-digit Indian phone number.",
        });
        return;
      }

      setStep(5);
      return;
    }
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = async () => {
    if (!formData.sessionId) {
      showNotification({
        type: "warning",
        title: "Session Required",
        message: "Please select a session before continuing.",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      showNotification({
        type: "warning",
        title: "Details Required",
        message: "Please fill in all your details before continuing.",
      });
      return;
    }

    if (sessionType === "paid") {
      showNotification({
        type: "info",
        title: "Payment Coming Soon",
        message: "Online payment will be available shortly.",
      });
      return;
    }

    try {
      setIsProcessingPayment(true);

      const response = await api("/bookings", {
        method: "POST",
        body: JSON.stringify({
          sessionId: formData.sessionId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      console.log("Booking created:", response);
      showNotification({
        type: "success",
        title: "Booking Request Received",
        message:
          "Your request has been submitted. We'll let you know once your session is confirmed.",
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Booking failed:", error);

      showNotification({
        type: "error",
        title: "Booking Failed",
        message:
          error.message || "Unable to complete your booking. Please try again.",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <>
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 animate-fade-in">
        <div className="relative max-w-2xl w-full bg-[var(--bg-surface)] p-6 sm:p-10 rounded-3xl border border-[var(--border-color)] shadow-2xl overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-main)]"
          >
            ✕
          </button>

          {!isSuccess ? (
            <div>
              {/* Progress Bar Header */}
              <div className="mb-5 text-center">
                <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">
                  STEP 0{step} OF 05 —{" "}
                  {sessionType === "free" ? "FREE SESSION" : "PAID SESSION"}
                </span>
                <div className="w-full h-1.5 bg-[var(--border-color)] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-gold)] transition-all duration-500"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Practice Selection */}
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-center">
                    Select Your Practice Flow
                  </h3>

                  {loadingClasses ? (
                    <div className="py-8 text-center opacity-60">
                      <p className="text-sm">Loading practices...</p>
                    </div>
                  ) : classes.length === 0 ? (
                    <div className="py-8 text-center opacity-60">
                      <p className="text-sm">No practices available.</p>
                    </div>
                  ) : (
                    classes.map((classItem) => (
                      <button
                        key={classItem._id}
                        onClick={() => {
                          setSelectedClass(classItem);

                          setFormData((prev) => ({
                            ...prev,
                            practice: classItem.title,
                            date: "",
                            time: "",
                            sessionId: "",
                          }));

                          setSessionType("paid");
                        }}
                        className={`w-full p-3 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all ${
                          selectedClass?._id === classItem._id
                            ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-lg"
                            : "bg-[var(--bg-main)] border-[var(--border-color)]"
                        }`}
                      >
                        {classItem.title}
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Step 2: Date Selection */}
              {step === 2 && (
                <div className="space-y-4 text-center py-4">
                  <h3 className="text-lg font-display font-bold">
                    Choose Session Date
                  </h3>
                  <input
                    type="date"
                    value={formData.date}
                    min={getToday()}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        date: e.target.value,
                        time: "",
                        sessionId: "",
                      }));
                    }}
                    className="booking-date-input w-full p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-center font-bold text-base"
                  />
                  <p className="text-xs opacity-70">
                    Slots are updated live for {formData.date}
                  </p>
                </div>
              )}

              {/* Step 3: Interactive Slot Selector with Color Legend */}
              {step === 3 && (
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-lg font-display font-bold">
                      Select Available Slot
                    </h3>
                    <p className="text-[11px] opacity-75 mt-0.5">
                      Choose an open slot below.
                    </p>
                  </div>

                  {/* Color Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold py-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>{" "}
                      Available
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>{" "}
                      Filled Out
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60"></span>{" "}
                      Unavailable
                    </div>
                  </div>

                  {/* Slots List */}
                  <div className="space-y-2">
                    {!formData.date ? (
                      <div className="py-8 text-center opacity-60">
                        <p className="text-sm">
                          Select a date to view available sessions.
                        </p>
                      </div>
                    ) : selectedDateSessions.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-sm font-semibold">
                          No sessions available
                        </p>

                        <p className="text-xs opacity-60 mt-1">
                          Please select another date.
                        </p>
                      </div>
                    ) : (
                      selectedDateSessions.map((session) => {
                        const isAvailable = session.status === "available";
                        const isFilled = session.status === "full";

                        const isSelectable = isAvailable;

                        const displayTime = `${session.startTime} - ${session.endTime}`;

                        const displayPrice =
                          session.type === "free"
                            ? "FREE"
                            : `₹${session.price}`;

                        return (
                          <div
                            key={session._id}
                            onClick={() => {
                              if (!isSelectable) return;

                              setFormData({
                                ...formData,
                                date: session.date.split("T")[0],
                                time: displayTime,
                                sessionId: session._id,
                              });

                              setSessionType(
                                session.type === "free" ? "free" : "paid",
                              );
                            }}
                            className={`p-2.5 rounded-2xl border flex items-center justify-between transition-all ${
                              formData.sessionId === session._id
                                ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 ring-2 ring-[var(--accent-gold)]"
                                : isAvailable
                                  ? "border-[var(--border-color)] bg-[var(--bg-main)] cursor-pointer hover:border-emerald-500"
                                  : "border-amber-500/40 bg-amber-500/5 opacity-75 cursor-not-allowed"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  isAvailable
                                    ? "bg-emerald-500"
                                    : "bg-amber-500"
                                }`}
                              ></span>

                              <div>
                                <p className="font-display font-bold text-xs sm:text-sm">
                                  {displayTime}
                                </p>

                                <p className="text-[10px] opacity-70">
                                  {isAvailable
                                    ? session.type === "free"
                                      ? "Free Session Slot"
                                      : "Regular Paid Slot"
                                    : "Slot Filled"}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)]">
                                {displayPrice}
                              </span>

                              {formData.sessionId === session._id && (
                                <p className="text-[9px] text-[var(--accent-gold)] font-bold mt-0.5 uppercase">
                                  Selected
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: User Details */}
              {step === 4 && (
                <div className="space-y-3 py-2">
                  <h3 className="text-lg font-display font-bold text-center">
                    Practitioner Details
                  </h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                </div>
              )}

              {/* Step 5: Final Review & Payment */}
              {step === 5 && (
                <div className="space-y-3 py-1">
                  <h3 className="text-lg font-display font-bold text-center">
                    Review & Final Confirmation
                  </h3>
                  <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-left space-y-1.5 text-xs sm:text-sm">
                    <p>
                      <span className="opacity-60">Flow Type:</span>{" "}
                      <strong>{formData.practice}</strong> (
                      {sessionType === "free" ? "Free Session" : "Paid Session"}
                      )
                    </p>
                    <p>
                      <span className="opacity-60">Date & Slot:</span>{" "}
                      <strong>
                        {formData.date} at {formData.time || "10:00 AM"}
                      </strong>
                    </p>
                    <p>
                      <span className="opacity-60">Name:</span>{" "}
                      <strong>{formData.name || "Practitioner"}</strong>
                    </p>
                    <p>
                      <span className="opacity-60">Amount:</span>{" "}
                      <strong className="text-[var(--accent-gold)]">
                        {sessionType === "free" ? "FREE ($0)" : "$45.00"}
                      </strong>
                    </p>
                  </div>

                  {sessionType === "paid" && (
                    <div className="p-3 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider">
                        Select Payment Method
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <label className="flex items-center gap-2 p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] cursor-pointer">
                          <input type="radio" name="pay" defaultChecked /> Card
                        </label>
                        <label className="flex items-center gap-2 p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] cursor-pointer">
                          <input type="radio" name="pay" /> UPI / Wallet
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Controls */}
              <div className="flex justify-between mt-6 pt-3 border-t border-[var(--border-color)]">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-5 py-2 rounded-full border border-[var(--border-color)] text-xs font-bold uppercase"
                  >
                    BACK
                  </button>
                ) : (
                  <div></div>
                )}
                {step < 5 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-7 py-2 rounded-full bg-[var(--accent-primary)] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110"
                  >
                    NEXT STEP →
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    disabled={isProcessingPayment}
                    className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-gold)] text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                  >
                    {isProcessingPayment
                      ? "Processing..."
                      : sessionType === "free"
                        ? "Submit Free Booking"
                        : "Complete Payment"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div
                className={`w-16 h-16 rounded-full text-3xl flex items-center justify-center mx-auto animate-bounce ${
                  sessionType === "free"
                    ? "bg-amber-500/20 text-amber-600"
                    : "bg-emerald-500/20 text-emerald-600"
                }`}
              >
                {sessionType === "free" ? "⏳" : "✓"}
              </div>

              <h3 className="text-2xl font-display font-extrabold">
                {sessionType === "free"
                  ? "REQUEST SUBMITTED."
                  : "PAYMENT SUCCESSFUL!"}
              </h3>

              <p className="text-xs sm:text-sm opacity-80 max-w-sm mx-auto leading-relaxed">
                {sessionType === "free"
                  ? "Your session request has been successfully submitted. We'll notify you once the session is confirmed."
                  : "Your payment has been received successfully. We'll notify you once your session is confirmed."}
              </p>

              <button
                onClick={onClose}
                className="px-7 py-2.5 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-bold uppercase tracking-wider hover:opacity-90"
              >
                CLOSE EXPERIENCE
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default BookingModal;
