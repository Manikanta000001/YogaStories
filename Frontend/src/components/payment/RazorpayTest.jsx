import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Zap,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Layers,
  Radio,
  Eye,
  Activity,
  Award,
  XCircle,
  RotateCcw,
  Download,
  Terminal,
  ShieldAlert,
  PartyPopper,
  Share2,
  Receipt,
  FileCheck
} from "lucide-react";

const customStyles = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.08); }
}

@keyframes checkmark-pop {
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  70% { transform: scale(1.15) rotate(4deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes stroke-draw {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}

@keyframes shockwave-emerald {
  0% { transform: scale(0.85); opacity: 0.9; box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1.2); opacity: 0.2; box-shadow: 0 0 0 35px rgba(16, 185, 129, 0); }
  100% { transform: scale(1.3); opacity: 0; box-shadow: 0 0 0 45px rgba(16, 185, 129, 0); }
}

@keyframes shockwave-crimson {
  0% { transform: scale(0.85); opacity: 0.9; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { transform: scale(1.2); opacity: 0.2; box-shadow: 0 0 0 35px rgba(239, 68, 68, 0); }
  100% { transform: scale(1.3); opacity: 0; box-shadow: 0 0 0 45px rgba(239, 68, 68, 0); }
}

@keyframes card-shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-12px) rotate(-1.5deg); }
  30% { transform: translateX(10px) rotate(1.2deg); }
  45% { transform: translateX(-8px) rotate(-0.8deg); }
  60% { transform: translateX(6px) rotate(0.6deg); }
  75% { transform: translateX(-3px) rotate(-0.3deg); }
}

@keyframes receipt-slide-up {
  0% { opacity: 0; transform: translateY(40px) scale(0.96); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-draw-check {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: stroke-draw 0.75s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.2s;
}

.animate-draw-cross {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: stroke-draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.15s;
}

.animate-shockwave-green {
  animation: shockwave-emerald 1.8s infinite cubic-bezier(0.24, 0, 0.38, 1);
}

.animate-shockwave-red {
  animation: shockwave-crimson 1.8s infinite cubic-bezier(0.24, 0, 0.38, 1);
}

.animate-card-shake {
  animation: card-shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.animate-receipt {
  animation: receipt-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-shimmer {
  animation: shimmer 2.2s infinite ease-in-out;
}

.animate-float {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 4s ease-in-out infinite;
}

.animate-pop {
  animation: checkmark-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.card-specular {
  background: radial-gradient(
    800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.08),
    transparent 40%
  );
}
`;

const RazorpayTest = () => {
  // Preserved original core states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Visual, physics & interaction states
  const [paymentStatus, setPaymentStatus] = useState("idle"); // 'idle' | 'success' | 'failed'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const colors = ["#10b981", "#34d399", "#6ee7b7", "#ffffff", "#38bdf8", "#f59e0b"];
    const particles = [];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height * 0.28,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.9) * 12 - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 60 + 90,
      });
    }

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.life++;
        if (p.life < p.maxLife) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.28; // gravity
          p.vx *= 0.98; // air resistance
          p.rotation += p.vr;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const triggerFailure = (errorDescription, errorPayload = {}) => {
    setPaymentStatus("failed");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 700);

    setPaymentDetails({
      time: new Date().toLocaleTimeString(),
      reason: errorDescription || "Payment execution was declined or cancelled.",
      code: errorPayload.code || "BAD_REQUEST_ERROR",
      source: errorPayload.source || "gateway",
      step: errorPayload.step || "payment_verification",
    });

    setMessage(`❌ ${errorDescription}`);
  };

  const triggerSuccess = (verifiedData) => {
    setPaymentStatus("success");
    setPaymentDetails({
      paymentId: verifiedData.paymentId || "pay_TEST" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      orderId: verifiedData.orderId || "order_TEST" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      amount: "₹100.00",
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      signature: verifiedData.signature ? `${verifiedData.signature.substring(0, 16)}...` : "sig_verified_sha256",
      attendee: "YogaPT Test User",
      email: "test@example.com",
    });

    setMessage("✅ Payment successful and verified!");
    setTimeout(() => launchConfetti(), 150);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setMessage("");
      setPaymentStatus("idle");

      // 1. Load Razorpay Checkout
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay Checkout SDK. Please check your connection.");
      }

      // 2. Create order through backend
      const orderResponse = await fetch(
        "http://localhost:5000/api/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 100,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(
          orderData.message || "Failed to create Razorpay order on http://localhost:5000"
        );
      }

      const order = orderData.order;

      // 3. Open Razorpay Checkout
      const razorpayKey =
        (typeof import.meta !== "undefined" && import.meta.env?.VITE_RAZORPAY_KEY_ID)
          ? import.meta.env.VITE_RAZORPAY_KEY_ID
          : "rzp_test_placeholder";

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency || "INR",

        name: "YogaStories",
        description: "Razorpay Test Payment",

        order_id: order.id,

        handler: async function (response) {
          try {
            // 4. Send Razorpay response to backend for cryptographic signature check
            const verifyResponse = await fetch(
              "http://localhost:5000/api/payments/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.message || "Payment verification failed on server"
              );
            }

            // High level success animation activation
            triggerSuccess({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
          } catch (error) {
            console.error(error);
            triggerFailure(error.message, { code: "SERVER_VERIFICATION_FAILED" });
          }
        },

        prefill: {
          name: "YogaPT Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        triggerFailure(
          response.error?.description || "Payment was rejected or dismissed by user.",
          response.error || {}
        );
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      triggerFailure(error.message, { code: "NETWORK_GATEWAY_ERROR" });
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || paymentStatus !== "idle") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setMousePos({ x, y, rotateX, rotateY });
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const resetFlow = () => {
    setPaymentStatus("idle");
    setMessage("");
    setPaymentDetails(null);
    setShowLogs(false);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-zinc-700 selection:text-white relative overflow-hidden font-sans">
      <style>{customStyles}</style>

      {/* Dynamic ambient backdrop lights with color shifts based on status */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${
          paymentStatus === "success"
            ? "bg-emerald-600/25 animate-pulse-glow"
            : paymentStatus === "failed"
            ? "bg-red-600/20 animate-pulse-glow"
            : "bg-gradient-to-br from-zinc-800/30 via-stone-900/20 to-black/40 animate-pulse-glow"
        }`}
      />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-zinc-700/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -top-10 -left-20 w-80 h-80 bg-stone-700/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main card wrapper */}
      <div
        className={`relative z-10 w-full max-w-[500px] transition-all duration-300 ${
          isShaking ? "animate-card-shake" : ""
        }`}
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  paymentStatus === "success"
                    ? "bg-emerald-400"
                    : paymentStatus === "failed"
                    ? "bg-red-400"
                    : "bg-emerald-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  paymentStatus === "success"
                    ? "bg-emerald-500"
                    : paymentStatus === "failed"
                    ? "bg-red-500"
                    : "bg-emerald-500"
                }`}
              />
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400">
              {paymentStatus === "success"
                ? "Payment Confirmed"
                : paymentStatus === "failed"
                ? "Transaction Rejected"
                : "Gateway Channel 01"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800/80 shadow-sm backdrop-blur-md">
            <Lock className="w-3 h-3 text-zinc-300" />
            <span className="text-[11px] font-medium">256-Bit SSL</span>
          </div>
        </div>

        {/* Card Shell */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
          }}
          style={{
            transform:
              isHovered && paymentStatus === "idle"
                ? `perspective(1000px) rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg) translateY(-2px)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
            transition: isHovered
              ? "transform 0.1s ease-out"
              : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
          }}
          className={`relative rounded-3xl bg-zinc-950/85 border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-7 sm:p-9 overflow-hidden group card-specular transition-colors duration-500 ${
            paymentStatus === "success"
              ? "border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
              : paymentStatus === "failed"
              ? "border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.15)]"
              : "border-zinc-800/80"
          }`}
        >
          {/* Subtle top edge glare line */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent pointer-events-none" />

          {/* Confetti canvas overlay inside card for celebration */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
          />

          {/* Brand header */}
          <div className="flex items-start justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black border border-zinc-700/60 shadow-inner flex items-center justify-center relative group-hover:border-zinc-500 transition-colors">
                <span className="font-extrabold text-white text-lg tracking-tighter">
                  YS
                </span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  YogaStories
                </h1>
                <p className="text-xs text-zinc-400 font-normal">
                  Razorpay Checkout Integration
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Activity className="w-3 h-3 text-emerald-400" />
              Test Mode
            </span>
          </div>

          {/* ===================== VIEW 1: SUCCESS STATE ANIMATION ===================== */}
          {paymentStatus === "success" && (
            <div className="animate-receipt relative z-20 space-y-6">
              {/* Radial Success Badge with Shockwave */}
              <div className="flex flex-col items-center justify-center py-3">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="absolute w-20 h-20 rounded-full bg-emerald-500/20 animate-shockwave-green" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-[2px] shadow-2xl flex items-center justify-center relative z-10 animate-pop">
                    <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-emerald-400"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="opacity-20"
                        />
                        <path
                          d="M14 24.5L21 31.5L34 17.5"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-draw-check"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-0.5 rounded-full mb-1">
                    <Check className="w-3.5 h-3.5" />
                    Cryptographically Verified
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Payment Successful
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Order confirmed and verified via Razorpay webhook.
                  </p>
                </div>
              </div>

              {/* Digital Holographic Receipt Pass */}
              <div className="rounded-2xl bg-zinc-900/80 border border-emerald-500/25 p-4.5 space-y-3 relative overflow-hidden backdrop-blur-md shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center pb-3 border-b border-zinc-800/80 text-xs">
                  <span className="text-zinc-400">Total Settled</span>
                  <span className="text-xl font-bold text-white tracking-tight font-mono">
                    ₹100.00 <span className="text-xs text-zinc-400 font-normal">INR</span>
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Payment ID:</span>
                    <button
                      onClick={() => copyToClipboard(paymentDetails?.paymentId || "", "pid")}
                      className="font-mono text-zinc-200 hover:text-emerald-400 flex items-center gap-1 transition-colors group/btn"
                    >
                      <span>{paymentDetails?.paymentId}</span>
                      {copiedKey === "pid" ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-zinc-500 group-hover/btn:text-zinc-300" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Order ID:</span>
                    <button
                      onClick={() => copyToClipboard(paymentDetails?.orderId || "", "oid")}
                      className="font-mono text-zinc-200 hover:text-emerald-400 flex items-center gap-1 transition-colors group/btn"
                    >
                      <span>{paymentDetails?.orderId}</span>
                      {copiedKey === "oid" ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-zinc-500 group-hover/btn:text-zinc-300" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Timestamp:</span>
                    <span className="text-zinc-300 font-mono text-[11px]">
                      {paymentDetails?.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Success */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={launchConfetti}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <PartyPopper className="w-4 h-4 text-emerald-400" />
                  <span>Trigger Confetti Celebration ✨</span>
                </button>

                <button
                  onClick={resetFlow}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                >
                  <RotateCcw className="w-4 h-4 text-black" />
                  <span>Start New Payment</span>
                </button>
              </div>
            </div>
          )}

          {/* ===================== VIEW 2: REJECTED / FAILED STATE ANIMATION ===================== */}
          {paymentStatus === "failed" && (
            <div className="animate-receipt relative z-20 space-y-6">
              {/* Radial Rejection Badge with Shockwave */}
              <div className="flex flex-col items-center justify-center py-3">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="absolute w-20 h-20 rounded-full bg-red-500/20 animate-shockwave-red" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-rose-400 p-[2px] shadow-2xl flex items-center justify-center relative z-10 animate-pop">
                    <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-red-400"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="opacity-20"
                        />
                        <path
                          d="M17 17L31 31M31 17L17 31"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          className="animate-draw-cross"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-950/60 border border-red-500/30 px-3 py-0.5 rounded-full mb-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Transaction Rejected
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Payment Incomplete
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    The transaction could not be processed by Razorpay.
                  </p>
                </div>
              </div>

              {/* Diagnostic Box */}
              <div className="rounded-2xl bg-red-950/30 border border-red-500/30 p-4 space-y-2.5 backdrop-blur-md">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-red-200 leading-relaxed break-words font-medium">
                    {paymentDetails?.reason}
                  </div>
                </div>

                <div className="pt-2 border-t border-red-500/20 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Diagnostic Code:</span>
                  <span className="font-mono text-red-300 font-semibold">
                    {paymentDetails?.code}
                  </span>
                </div>
              </div>

              {/* Collapsible Debug Details */}
              <div>
                <button
                  onClick={() => setShowLogs(!showLogs)}
                  className="w-full text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1 py-1 transition-colors"
                >
                  <Terminal className="w-3 h-3 text-zinc-500" />
                  <span>{showLogs ? "Hide Gateway Logs" : "Inspect Gateway Log Payload"}</span>
                </button>

                {showLogs && (
                  <div className="mt-2 p-3 bg-black rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-1 animate-receipt">
                    <div>timestamp: {paymentDetails?.time}</div>
                    <div>status: PAYMENT_REJECTED</div>
                    <div>source: {paymentDetails?.source}</div>
                    <div>step: {paymentDetails?.step}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Failure */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                >
                  <RotateCcw className="w-4 h-4 text-black" />
                  <span>Retry Payment (₹100)</span>
                </button>

                <button
                  onClick={resetFlow}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Return to Checkout</span>
                </button>
              </div>
            </div>
          )}

          {/* ===================== VIEW 3: INITIAL READY STATE ===================== */}
          {paymentStatus === "idle" && (
            <div className="space-y-6">
              {/* Holographic interactive preview pass */}
              <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black p-5 border border-zinc-800/90 shadow-xl overflow-hidden">
                {/* Ambient metallic sheen */}
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/[0.03] rounded-full blur-xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                      Pass & Verification Token
                    </span>
                    <span className="text-sm font-semibold text-zinc-200">
                      Razorpay Test Payment
                    </span>
                  </div>
                  <div className="w-8 h-6 rounded bg-gradient-to-r from-amber-400/80 to-amber-200/80 rounded-sm shadow-sm flex items-center justify-center opacity-85">
                    <div className="w-5 h-3.5 border border-black/30 rounded-[2px]" />
                  </div>
                </div>

                <div className="flex justify-between items-end pt-3 border-t border-zinc-800/80">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Amount Due
                    </span>
                    <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-1">
                      <span>₹100</span>
                      <span className="text-xs text-zinc-400 font-normal">INR</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Attendee
                    </span>
                    <span className="text-xs font-medium text-zinc-300">
                      YogaPT Test User
                    </span>
                  </div>
                </div>
              </div>

              {/* Prefill Parameters Summary */}
              <div className="bg-zinc-900/50 rounded-xl p-3.5 border border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
                    Prefill Contact:
                  </span>
                  <span className="text-zinc-300 font-mono text-[11px]">
                    test@example.com
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-zinc-400">Phone Verification:</span>
                  <span className="text-zinc-300 font-mono text-[11px]">
                    +91 99999 99999
                  </span>
                </div>
              </div>

              {/* Main Call to Action Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full group relative overflow-hidden rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 py-3.5 px-6 shadow-xl ${
                  loading
                    ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700"
                    : "bg-white text-black hover:bg-zinc-100 hover:shadow-2xl active:scale-[0.98] border border-white"
                }`}
              >
                {!loading && (
                  <span className="absolute inset-0 w-full h-full -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />
                )}

                {loading ? (
                  <div className="flex items-center gap-2.5">
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-300" />
                    <span className="text-zinc-200 font-medium">
                      Connecting to Razorpay...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Pay ₹100 with Razorpay</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-black" />
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Bottom Security Seals */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>PCI-DSS Level 1 Encrypted</span>
            </div>
            <span className="font-mono text-zinc-400">v1/checkout.js</span>
          </div>
        </div>

        {/* Interactive Animation Simulator Dock */}
        <div className="mt-4 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-md backdrop-blur-md">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Instant Animation Tester
            </span>
            <span className="text-[9px] text-zinc-400">Preview without live API</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                triggerSuccess({
                  paymentId: "pay_DEMO" + Math.floor(100000 + Math.random() * 900000),
                  orderId: "order_DEMO" + Math.floor(100000 + Math.random() * 900000),
                  signature: "sig_mock_verified_secret",
                })
              }
              className="py-2 px-3 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Success Flow</span>
            </button>

            <button
              onClick={() =>
                triggerFailure("Payment was declined by user's bank or card expired.", {
                  code: "BAD_REQUEST_PAYMENT_DECLINED",
                  source: "bank_auth",
                  step: "otp_verification",
                })
              }
              className="py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Test Rejection Flow</span>
            </button>
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-1.5">
          <span>Theme Color</span>
          <span className="font-mono bg-zinc-900 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-800 text-[10px]">
            #000000
          </span>
          <span>•</span>
          <span>Target: localhost:5000</span>
        </div>
      </div>
    </div>
  );
};

export default RazorpayTest;