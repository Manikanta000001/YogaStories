import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import Notification from "../common/Notification";
import { useSearchParams } from "react-router-dom";
import { Clock, Check, ChevronRight } from "lucide-react";
const PAYMENT_GATEWAY = import.meta.env.VITE_PAYMENT_GATEWAY || "razorpay";

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
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionError, setSessionError] = useState(null);
  const [notification, setNotification] = useState(null);
  const cashfreeCompletionStarted = useRef(false);

  const [searchParams] = useSearchParams();

  const cashfreeOrderId = searchParams.get("cashfree_order_id");

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
    if (!cashfreeOrderId) return;

    const pendingBooking = sessionStorage.getItem("cashfree_pending_booking");

    if (!pendingBooking) {
      return;
    }

    const completeCashfreeBooking = async () => {
      if (cashfreeCompletionStarted.current) return;

      cashfreeCompletionStarted.current = true;
      try {
        setIsProcessingPayment(true);

        const booking = JSON.parse(pendingBooking);

        // Verify Cashfree payment
        await api("/cashfree/verify", {
          method: "POST",
          body: JSON.stringify({
            order_id: cashfreeOrderId,
          }),
        });

        // Payment verified — create the booking
        await api("/bookings", {
          method: "POST",
          body: JSON.stringify({
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            sessionId: booking.sessionId,
            paymentMethod: "other",
            paymentId: cashfreeOrderId,
            paymentOrderId: cashfreeOrderId,
          }),
        });

        sessionStorage.removeItem("cashfree_pending_booking");

        setIsProcessingPayment(false);
        setIsSuccess(true);
      } catch (error) {
        console.error("Cashfree booking completion error:", error);

        sessionStorage.removeItem("cashfree_pending_booking");

        setIsProcessingPayment(false);

        setNotification({
          type: "error",
          message:
            error.message ||
            "Payment was successful, but we could not complete your booking.",
        });
      }
    };

    completeCashfreeBooking();
  }, [cashfreeOrderId]);

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
  const selectedSession = sessions.find(
    (session) => session._id === formData.sessionId,
  );

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

    if (!selectedSession) {
      showNotification({
        type: "error",
        title: "Session Error",
        message: "Unable to find the selected session.",
      });
      return;
    }

    // FREE SESSION
    if (sessionType === "free") {
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

        console.log("Free booking created:", response);

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
            error.message ||
            "Unable to complete your booking. Please try again.",
        });
      } finally {
        setIsProcessingPayment(false);
      }

      return;
    }

    // PAID SESSION
    try {
      setIsProcessingPayment(true);

      // Get actual price from selected session
      const amount = Number(selectedSession.price);

      if (!amount || amount <= 0) {
        throw new Error("Invalid session price.");
      }

      // Validate booking before taking payment
      await api("/bookings/validate", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          sessionId: formData.sessionId,
        }),
      });

      // ============================================================
      // CASHFREE PAYMENT
      // ============================================================
      if (PAYMENT_GATEWAY === "cashfree") {
        // Load Cashfree Checkout SDK
        if (!window.Cashfree) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");

            script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";

            script.onload = resolve;

            script.onerror = () =>
              reject(new Error("Failed to load Cashfree Checkout."));

            document.body.appendChild(script);
          });
        }

        // Create Cashfree order
        const orderResponse = await api("/cashfree/create-order", {
          method: "POST",
          body: JSON.stringify({
            amount,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }),
        });

        console.log("Cashfree order created:", orderResponse);

        const order = orderResponse.order;

        if (!order?.payment_session_id) {
          throw new Error("Cashfree payment session was not created.");
        }

        // Initialize Cashfree
        const cashfree = window.Cashfree({
          mode:
            import.meta.env.VITE_CASHFREE_ENVIRONMENT === "production"
              ? "production"
              : "sandbox",
        });

        // Save booking details temporarily before Cashfree redirects
        sessionStorage.setItem(
          "cashfree_pending_booking",
          JSON.stringify({
            sessionId: formData.sessionId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            amount,
            orderId: order.order_id,
          }),
        );

        // Open Cashfree Checkout
        // Open Cashfree Checkout
        const checkoutResult = await cashfree.checkout({
          paymentSessionId: order.payment_session_id,
          redirectTarget: "_modal",
        });

        console.log("Cashfree checkout result:", checkoutResult);

        if (checkoutResult?.paymentDetails) {
          // Payment attempt completed.
          // Now verify the actual payment status on our backend.
          await api("/cashfree/verify", {
            method: "POST",
            body: JSON.stringify({
              order_id: order.order_id,
            }),
          });

          // Payment verified successfully — create the booking.
          await api("/bookings", {
            method: "POST",
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              sessionId: formData.sessionId,
              paymentMethod: "other",
              paymentId: order.order_id,
              paymentOrderId: order.order_id,
            }),
          });

          sessionStorage.removeItem("cashfree_pending_booking");

          setIsProcessingPayment(false);
          setIsSuccess(true);

          return;
        }

        if (checkoutResult?.error) {
          console.error("Cashfree checkout error:", checkoutResult.error);

          setIsProcessingPayment(false);

          setNotification({
            type: "error",
            message: "Payment was not completed. Please try again.",
          });

          return;
        }

        setIsProcessingPayment(false);
        return;
      }

      // ============================================================
      // RAZORPAY PAYMENT
      // ============================================================

      // Load Razorpay Checkout script
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");

          script.src = "https://checkout.razorpay.com/v1/checkout.js";

          script.onload = resolve;

          script.onerror = () =>
            reject(new Error("Failed to load Razorpay Checkout."));

          document.body.appendChild(script);
        });
      }

      // Create Razorpay order
      const orderResponse = await api("/payments/create-order", {
        method: "POST",
        body: JSON.stringify({
          amount,
        }),
      });

      console.log("Razorpay order created:", orderResponse);

      const order = orderResponse.order;

      // Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: "YogaStories",

        image: "https://yogastories.vercel.app/favicon.png",

        description: `${selectedClass?.title || "Yoga"} Session`,

        order_id: order.id,

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#6F8064",
          backdrop_color: "#111111",
        },

        handler: async function (paymentResponse) {
          try {
            console.log("Razorpay payment successful:", paymentResponse);

            // Verify payment on backend
            const verifyResponse = await api("/payments/verify", {
              method: "POST",
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });

            console.log("Razorpay verification:", verifyResponse);

            if (!verifyResponse.success) {
              throw new Error(
                verifyResponse.message || "Payment verification failed.",
              );
            }

            // Only create booking AFTER payment verification
            const bookingResponse = await api("/bookings", {
              method: "POST",
              body: JSON.stringify({
                sessionId: formData.sessionId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                paymentId: paymentResponse.razorpay_payment_id,
                paymentOrderId: paymentResponse.razorpay_order_id,
              }),
            });

            console.log("Paid booking created:", bookingResponse);

            setIsProcessingPayment(false);

            // Show success
            showNotification({
              type: "success",
              title: "Payment Successful",
              message:
                "Your payment was successful and your session has been booked.",
            });

            setIsSuccess(true);
          } catch (error) {
            console.error("Payment verification/booking failed:", error);

            setIsProcessingPayment(false);

            showNotification({
              type: "error",
              title: "Payment Verification Failed",
              message:
                error.message ||
                "Payment was received, but we couldn't verify your booking. Please contact us.",
            });
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Razorpay checkout closed.");

            setIsProcessingPayment(false);

            showNotification({
              type: "info",
              title: "Payment Cancelled",
              message:
                "The payment window was closed. Your booking was not created.",
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);

      setIsProcessingPayment(false);

      showNotification({
        type: "error",
        title: "Payment Failed",
        message:
          error.message || "Unable to start the payment. Please try again.",
      });
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
                        {sessionType === "free"
                          ? "FREE (₹0)"
                          : `₹${selectedSession?.price || 0}`}
                      </strong>
                    </p>
                  </div>
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
            //  <div className="text-center py-6 space-y-4 animate-fade-in">
            //     <div
            //       className={`w-16 h-16 rounded-full text-3xl flex items-center justify-center mx-auto animate-bounce ${
            //         sessionType === "free"
            //           ? "bg-amber-500/20 text-amber-600"
            //           : "bg-emerald-500/20 text-emerald-600"
            //       }`}
            //     >
            //       {sessionType === "free" ? "⏳" : "✓"}
            //     </div>

            //     <h3 className="text-2xl font-display font-extrabold">
            //       {sessionType === "free"
            //         ? "REQUEST SUBMITTED."
            //         : "PAYMENT SUCCESSFUL!"}
            //     </h3>

            //     <p className="text-xs sm:text-sm opacity-80 max-w-sm mx-auto leading-relaxed">
            //       {sessionType === "free"
            //         ? "Your session request has been successfully submitted. We'll notify you once the session is confirmed."
            //         : "Your payment has been received successfully. We'll notify you once your session is confirmed."}
            //     </p>

            //     <button
            //       onClick={onClose}
            //       className="px-7 py-2.5 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-bold uppercase tracking-wider hover:opacity-90"
            //     >
            //       CLOSE EXPERIENCE
            //     </button>
            //   </div>
            <div className="text-center py-7 px-4 sm:px-6 space-y-6 max-w-sm mx-auto animate-fade-in">
              <style>{`
    @keyframes yogapt-shockwave {
      0% {
        transform: scale(0.6);
        opacity: 0.9;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        transform: scale(1.75);
        opacity: 0;
      }
    }

    @keyframes yogapt-spark-ray {
      0% {
        transform: rotate(var(--rot)) translateY(0) scale(0);
        opacity: 0;
      }
      40% {
        opacity: 1;
        transform: rotate(var(--rot)) translateY(-26px) scale(1);
      }
      100% {
        opacity: 0;
        transform: rotate(var(--rot)) translateY(-36px) scale(0.3);
      }
    }

    @keyframes yogapt-ring-trace {
      0% {
        stroke-dashoffset: 260;
        transform: rotate(-100deg) scale(0.85);
        opacity: 0;
      }
      30% {
        opacity: 1;
      }
      100% {
        stroke-dashoffset: 0;
        transform: rotate(-90deg) scale(1);
        opacity: 1;
      }
    }

    @keyframes yogapt-check-snap {
      0% {
        stroke-dashoffset: 48;
        opacity: 0;
      }
      40% {
        opacity: 1;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }

    @keyframes yogapt-gyro-clockwise {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes yogapt-gyro-counter {
      0% {
        transform: rotate(360deg) scale(0.92);
      }
      50% {
        transform: rotate(180deg) scale(1.05);
      }
      100% {
        transform: rotate(0deg) scale(0.92);
      }
    }

    @keyframes yogapt-breathe {
      0%, 100% {
        transform: scale(0.96);
        opacity: 0.35;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
    }

    @keyframes yogapt-pop {
      0% {
        opacity: 0;
        transform: scale(0.7) translateY(8px);
      }
      70% {
        transform: scale(1.04) translateY(-2px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes yogapt-slide {
      0% {
        opacity: 0;
        transform: translateY(14px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes yogapt-shine {
      0% {
        transform: translateX(-150%) skewX(-20deg);
      }
      100% {
        transform: translateX(250%) skewX(-20deg);
      }
    }

    .yogapt-pop {
      animation: yogapt-pop 0.55s
        cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .yogapt-breathe {
      animation: yogapt-breathe 3s ease-in-out infinite;
    }

    .yogapt-shockwave-1 {
      animation: yogapt-shockwave 1.4s
        cubic-bezier(0.1, 0.9, 0.2, 1) 0.1s infinite;
    }

    .yogapt-shockwave-2 {
      animation: yogapt-shockwave 1.6s
        cubic-bezier(0.1, 0.9, 0.2, 1) 0.4s infinite;
    }

    .yogapt-spark {
      animation: yogapt-spark-ray 0.75s
        cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
    }

    .yogapt-ring {
      stroke-dasharray: 260;
      stroke-dashoffset: 260;
      animation: yogapt-ring-trace 0.65s
        cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
      transform-origin: center;
    }

    .yogapt-check {
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: yogapt-check-snap 0.45s
        cubic-bezier(0.16, 1, 0.3, 1) 0.42s forwards;
    }

    .yogapt-gyro-outer {
      animation: yogapt-gyro-clockwise 8s linear infinite;
      transform-origin: center;
    }

    .yogapt-gyro-inner {
      animation: yogapt-gyro-counter 4.5s
        cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
      transform-origin: center;
    }

    .yogapt-slide-1 {
      animation: yogapt-slide 0.5s
        cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
    }

    .yogapt-slide-2 {
      animation: yogapt-slide 0.5s
        cubic-bezier(0.16, 1, 0.3, 1) 0.32s both;
    }

    .yogapt-slide-3 {
      animation: yogapt-slide 0.5s
        cubic-bezier(0.16, 1, 0.3, 1) 0.44s both;
    }

    .yogapt-shine-button {
      position: relative;
      overflow: hidden;
    }

    .yogapt-shine-button::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.25),
        transparent
      );
      animation: yogapt-shine 3.5s ease-in-out infinite;
    }
  `}</style>

              {/* Kinetic Animated Centerpiece */}
              <div className="relative flex items-center justify-center mx-auto w-24 h-24 yogapt-pop">
                {/* Ambient Glow */}
                <div
                  className={`absolute -inset-2 rounded-full blur-2xl pointer-events-none yogapt-breathe ${
                    sessionType === "free"
                      ? "bg-amber-500/30"
                      : "bg-emerald-500/30"
                  }`}
                />

                {/* Shockwave 1 */}
                <div
                  className={`absolute inset-0 rounded-full border pointer-events-none yogapt-shockwave-1 ${
                    sessionType === "free"
                      ? "border-amber-500/50 bg-amber-500/[0.05]"
                      : "border-emerald-500/50 bg-emerald-500/[0.05]"
                  }`}
                />

                {/* Shockwave 2 */}
                <div
                  className={`absolute inset-0 rounded-full border pointer-events-none yogapt-shockwave-2 ${
                    sessionType === "free"
                      ? "border-amber-400/30"
                      : "border-emerald-400/30"
                  }`}
                />

                {/* Photon Sparks — paid only */}
                {sessionType !== "free" && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(
                      (angle, index) => (
                        <span
                          key={index}
                          className="absolute w-1 h-3 rounded-full bg-emerald-400 yogapt-spark"
                          style={{
                            "--rot": `${angle}deg`,
                            filter: "drop-shadow(0 0 4px rgba(52,211,153,0.8))",
                          }}
                        />
                      ),
                    )}
                  </div>
                )}

                {/* Main Glass Badge */}
                <div
                  className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl border shadow-xl ${
                    sessionType === "free"
                      ? "bg-amber-500/10 border-amber-500/30 shadow-amber-500/10 text-amber-500"
                      : "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {sessionType === "free" ? (
                    /* FREE — Gyroscope */
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      {/* Outer Orbit */}
                      <svg
                        className="absolute inset-0 w-full h-full yogapt-gyro-outer"
                        viewBox="0 0 56 56"
                      >
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeDasharray="6 8"
                          className="opacity-70"
                        />

                        <circle cx="28" cy="4" r="2.5" fill="currentColor" />
                      </svg>

                      {/* Inner Orbit */}
                      <svg
                        className="absolute inset-1 w-12 h-12 yogapt-gyro-inner"
                        viewBox="0 0 48 48"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="17"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="18 40"
                          className="opacity-90"
                        />

                        <circle cx="24" cy="7" r="2" fill="currentColor" />
                      </svg>

                      {/* Center */}
                      <div className="relative z-10 p-2 rounded-full bg-amber-500/20 text-amber-500">
                        <Clock className="w-7 h-7" strokeWidth={1.8} />
                      </div>
                    </div>
                  ) : (
                    /* PAID — Animated Check */
                    <svg
                      className="w-14 h-14"
                      viewBox="0 0 100 100"
                      fill="none"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))",
                      }}
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="yogapt-ring"
                      />

                      <path
                        d="M31 52.5L44 65.5L69 35.5"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="yogapt-check"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Confirmation Content */}
              <div className="space-y-2.5">
                {/* Status */}
                <div className="yogapt-slide-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border ${
                      sessionType === "free"
                        ? "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400"
                        : "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        sessionType === "free"
                          ? "bg-amber-500 animate-ping"
                          : "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                      }`}
                    />

                    {sessionType === "free"
                      ? "Review in Progress"
                      : "Instant Authorization"}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
                  {sessionType === "free"
                    ? "REQUEST SUBMITTED"
                    : "PAYMENT SUCCESSFUL"}
                </h3>

                {/* Message */}
                <p className="yogapt-slide-2 text-xs sm:text-sm opacity-80 max-w-sm mx-auto leading-relaxed">
                  {sessionType === "free"
                    ? "Your session request has been successfully submitted. We'll notify you once the session is confirmed."
                    : "Your payment has been received successfully. We'll send you the class details shortly."}
                </p>
              </div>

              {/* Existing YogaPT Close Button */}
              <div className="yogapt-slide-3 pt-1">
                <button
                  onClick={onClose}
                  type="button"
                  className="yogapt-shine-button relative px-8 py-3 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all shadow-md inline-flex items-center justify-center"
                >
                  <span className="relative z-10">CLOSE EXPERIENCE</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default BookingModal;
