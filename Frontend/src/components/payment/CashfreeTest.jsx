import React, { useEffect, useState, useRef } from "react";
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
  FileCheck,
  Wallet
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
  50% { opacity: 0.65; transform: scale(1.08); }
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

@keyframes svg-spin-clockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes svg-spin-counter {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

@keyframes svg-ray-burst {
  0% { stroke-dashoffset: 40; opacity: 0; transform: scale(0.7); }
  35% { opacity: 0.9; }
  100% { stroke-dashoffset: 0; opacity: 0; transform: scale(1.18); }
}

@keyframes svg-star-twinkle-1 {
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  25% { transform: scale(1.35) rotate(45deg); opacity: 1; }
  60% { transform: scale(0.9) rotate(90deg); opacity: 0.75; }
}

@keyframes svg-star-twinkle-2 {
  0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
  40% { transform: scale(1.3) rotate(-30deg); opacity: 1; }
  75% { transform: scale(0.85) rotate(-75deg); opacity: 0.7; }
}

@keyframes laser-sweep {
  0% { transform: translateY(-100%); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateY(320px); opacity: 0; }
}

@keyframes checkmark-hero {
  0% { stroke-dashoffset: 120; opacity: 0; }
  25% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}

@keyframes crest-scale-bounce {
  0% { transform: scale(0.2) rotate(-22deg); opacity: 0; }
  60% { transform: scale(1.12) rotate(4deg); opacity: 1; }
  80% { transform: scale(0.96) rotate(-1deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.animate-crest-pop {
  transform-origin: 70px 70px;
  animation: crest-scale-bounce 0.85s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.animate-draw-check-hero {
  stroke-dasharray: 120;
  stroke-dashoffset: 120;
  animation: checkmark-hero 0.85s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.25s;
}

.animate-svg-spin-slow {
  transform-origin: 70px 70px;
  animation: svg-spin-clockwise 22s linear infinite;
}

.animate-svg-spin-reverse {
  transform-origin: 70px 70px;
  animation: svg-spin-counter 16s linear infinite;
}

.animate-star-1 {
  transform-origin: 24px 30px;
  animation: svg-star-twinkle-1 3s ease-in-out infinite 0.3s;
}

.animate-star-2 {
  transform-origin: 114px 34px;
  animation: svg-star-twinkle-2 3.2s ease-in-out infinite 0.6s;
}

.animate-star-3 {
  transform-origin: 20px 104px;
  animation: svg-star-twinkle-2 2.8s ease-in-out infinite 0.9s;
}

.animate-star-4 {
  transform-origin: 116px 100px;
  animation: svg-star-twinkle-1 3.4s ease-in-out infinite 0.4s;
}

.animate-laser-scan {
  animation: laser-sweep 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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
    rgba(255, 255, 255, 0.07),
    transparent 40%
  );
}
`;

const CashfreeTest = () => {
  // Preserved original core state
  const [cashfree, setCashfree] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Advanced interactive visual state
  const [paymentStatus, setPaymentStatus] = useState("idle"); // 'idle' | 'success' | 'failed'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [animIteration, setAnimIteration] = useState(0);

  // 3D Tilt perspective and cursor physics
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    script.onload = () => {
      const instance = window.Cashfree({
        mode: "sandbox",
      });

      setCashfree(instance);
    };

    script.onerror = () => {
      setMessage("❌ Failed to load Cashfree Checkout");
      triggerFailure("Failed to load Cashfree Checkout SDK. Network unreachable.", {
        code: "SDK_LOAD_ERROR",
        source: "cdn.cashfree.com",
        step: "script_injection"
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const colors = ["#10b981", "#34d399", "#6ee7b7", "#ffffff", "#818cf8", "#f59e0b", "#06b6d4"];
    const particles = [];
    const particleCount = 75;

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

  const triggerFailure = (errorDescription, errorPayload = {}) => {
    setPaymentStatus("failed");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 700);

    setPaymentDetails({
      time: new Date().toLocaleTimeString(),
      reason: errorDescription || "Payment execution was rejected or cancelled.",
      code: errorPayload.code || "PAYMENT_DECLINED",
      source: errorPayload.source || "cashfree_gateway",
      step: errorPayload.step || "session_handshake",
    });

    setMessage(`❌ ${errorDescription}`);
  };

  const triggerSuccess = (verifiedData) => {
    setPaymentStatus("success");
    setPaymentDetails({
      orderId: verifiedData.orderId || "cf_order_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      sessionId: verifiedData.sessionId || "session_" + Math.random().toString(36).substring(2, 10).toLowerCase(),
      amount: "₹100.00",
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      gateway: "Cashfree Payment Gateway (v3)",
      signature: verifiedData.signature || "cf_verified_signature_256",
      attendee: "Cashfree Test User",
    });

    setMessage("✅ Cashfree payment successful and verified!");
    setTimeout(() => launchConfetti(), 150);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setMessage("");
      setPaymentStatus("idle");

      if (!cashfree) {
        throw new Error("Cashfree Checkout is not loaded yet");
      }

      // 1. Create order through our backend
      const orderResponse = await fetch(
        "http://localhost:5000/api/cashfree/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 100,
          }),
        },
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.message || "Failed to create Cashfree order");
      }

      const paymentSessionId = orderData.order.payment_session_id;

      if (!paymentSessionId) {
        throw new Error("Payment session ID was not returned");
      }

      // 2. Open Cashfree Checkout
      const result = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });

      console.log("Cashfree Checkout Result:", result);

      if (result?.error) {
        const errDesc = result.error.message || "Payment cancelled or rejected";
        triggerFailure(errDesc, {
          code: result.error.code || "USER_DROPPED_OR_DECLINED",
          source: "cashfree_modal",
          step: "checkout_execution"
        });
        setMessage(`❌ Payment failed: ${errDesc}`);
        return;
      }

      const verifyResponse = await fetch(
        "http://localhost:5000/api/cashfree/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderData.order.order_id,
          }),
        },
      );

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyData.success) {
        throw new Error(verifyData.message || "Payment verification failed");
      }

      triggerSuccess({
        orderId: orderData.order.order_id,
        sessionId: paymentSessionId,
      });
    } catch (error) {
      console.error("Cashfree payment error:", error);
      triggerFailure(error.message, { code: "SERVER_DISCONNECT_ERROR" });
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
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const resetFlow = () => {
    setPaymentStatus("idle");
    setMessage("");
    setPaymentDetails(null);
    setShowLogs(false);
  };

  const replaySuccessAnimation = () => {
    setAnimIteration((prev) => prev + 1);
    launchConfetti();
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
            : "bg-gradient-to-br from-indigo-900/25 via-violet-950/20 to-black/40 animate-pulse-glow"
        }`}
      />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-violet-900/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -top-10 -left-20 w-80 h-80 bg-indigo-900/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Main card container */}
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
                    : !cashfree
                    ? "bg-amber-400"
                    : "bg-violet-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  paymentStatus === "success"
                    ? "bg-emerald-500"
                    : paymentStatus === "failed"
                    ? "bg-red-500"
                    : !cashfree
                    ? "bg-amber-500"
                    : "bg-violet-500"
                }`}
              />
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400">
              {paymentStatus === "success"
                ? "Payment Confirmed"
                : paymentStatus === "failed"
                ? "Transaction Rejected"
                : !cashfree
                ? "Loading SDK..."
                : "Cashfree Sandbox v3"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800/80 shadow-sm backdrop-blur-md">
            <Lock className="w-3 h-3 text-zinc-300" />
            <span className="text-[11px] font-medium">PCI-DSS 256-Bit</span>
          </div>
        </div>

        {/* Interactive Card Shell with 3D Tilt */}
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
          className={`relative rounded-3xl bg-zinc-950/85 border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-7 sm:p-9 overflow-hidden group card-specular transition-colors duration-500 ${
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-700/60 shadow-inner flex items-center justify-center relative group-hover:border-zinc-500 transition-colors">
                <span className="font-extrabold text-white text-lg tracking-tighter">
                  CF
                </span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Cashfree Test
                </h1>
                <p className="text-xs text-zinc-400 font-normal">
                  Modal Payment Session Checkout
                </p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Activity className="w-3 h-3 text-violet-400" />
              {cashfree ? "SDK Ready" : "Initializing"}
            </span>
          </div>

          {/* ===================== VIEW 1: SUCCESS STATE ANIMATION ===================== */}
          {paymentStatus === "success" && (
            <div className="animate-receipt relative z-20 space-y-6">
              {/* Radial Success Badge with Master SVG Crest */}
              <div className="flex flex-col items-center justify-center py-2">
                <div
                  key={animIteration}
                  onClick={replaySuccessAnimation}
                  title="Click to replay SVG celebration animation"
                  className="relative flex items-center justify-center cursor-pointer group/crest select-none"
                >
                  {/* Dynamic Multi-Wave Emerald Rings */}
                  <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-shockwave-green" />
                  <div
                    className="absolute w-24 h-24 rounded-full bg-teal-400/15 animate-shockwave-green"
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Master Precision SVG Crest */}
                  <svg
                    className="w-32 h-32 relative z-10 drop-shadow-[0_0_25px_rgba(16,185,129,0.45)] group-hover/crest:scale-105 transition-transform duration-300"
                    viewBox="0 0 140 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Gradient Definitions */}
                      <linearGradient id="shieldFill" x1="20" y1="20" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#052e16" />
                        <stop offset="45%" stopColor="#064e3b" />
                        <stop offset="100%" stopColor="#022c22" />
                      </linearGradient>

                      <linearGradient id="shieldBorder" x1="25" y1="25" x2="115" y2="115" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="35%" stopColor="#10b981" />
                        <stop offset="70%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>

                      <linearGradient id="checkGlowHero" x1="45" y1="50" x2="95" y2="90" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="40%" stopColor="#a7f3d0" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>

                      <linearGradient id="glassReflection" x1="70" y1="26" x2="70" y2="82" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                      </linearGradient>

                      <radialGradient id="centerGlowLight" cx="70" cy="70" r="46" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                        <stop offset="75%" stopColor="#047857" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                      </radialGradient>

                      {/* Drop-Shadow Filters */}
                      <filter id="emeraldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#34d399" floodOpacity="0.75" />
                      </filter>

                      <filter id="starGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#a7f3d0" floodOpacity="0.9" />
                      </filter>
                    </defs>

                    {/* Ambient Glow Center */}
                    <circle cx="70" cy="70" r="50" fill="url(#centerGlowLight)" />

                    {/* Radiating Kinetic Sunburst Light Beams */}
                    <g className="opacity-40">
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <line
                          key={deg}
                          x1="70"
                          y1="16"
                          x2="70"
                          y2="24"
                          stroke="#34d399"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          transform={`rotate(${deg} 70 70)`}
                          className="opacity-70"
                        />
                      ))}
                    </g>

                    {/* Outer Rotating Calibration Telemetry Ring */}
                    <circle
                      cx="70"
                      cy="70"
                      r="63"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeDasharray="4 8"
                      strokeOpacity="0.6"
                      className="animate-svg-spin-slow"
                    />

                    {/* Middle Counter-Rotating Dot Matrix Ring */}
                    <circle
                      cx="70"
                      cy="70"
                      r="56"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeDasharray="1.5 12"
                      strokeOpacity="0.7"
                      strokeLinecap="round"
                      className="animate-svg-spin-reverse"
                    />

                    {/* Main Crest / Medallion Container with Elastic Pop */}
                    <g className="animate-crest-pop">
                      {/* Hexagonal / Precision Faceted Base */}
                      <circle
                        cx="70"
                        cy="70"
                        r="43"
                        fill="url(#shieldFill)"
                        stroke="url(#shieldBorder)"
                        strokeWidth="3.5"
                        filter="url(#emeraldGlowFilter)"
                      />

                      {/* Inner Thin Inset Hairline Ring */}
                      <circle
                        cx="70"
                        cy="70"
                        r="38.5"
                        stroke="#6ee7b7"
                        strokeWidth="1"
                        strokeDasharray="45 15 25 10"
                        strokeOpacity="0.35"
                      />

                      {/* Specular Glass Arc Sheen Overlay */}
                      <path
                        d="M 33 60 C 35 44 48 32 70 32 C 92 32 105 44 107 60 C 95 65 77 67 70 67 C 63 67 45 65 33 60 Z"
                        fill="url(#glassReflection)"
                      />

                      {/* Secondary 3D Checkmark Shadow */}
                      <path
                        d="M48 72L63 87L94 54"
                        fill="none"
                        stroke="#022c22"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-60"
                      />

                      {/* Primary Hero Drawing SVG Checkmark */}
                      <path
                        d="M48 71L63 86L94 53"
                        fill="none"
                        stroke="url(#checkGlowHero)"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-draw-check-hero drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]"
                      />

                      {/* Apex Kinetic Dots at Checkmark Terminal Nodes */}
                      <circle cx="48" cy="71" r="2.5" fill="#ffffff" className="animate-pop" />
                      <circle cx="63" cy="86" r="3" fill="#a7f3d0" className="animate-pop" />
                      <circle cx="94" cy="53" r="2.8" fill="#34d399" className="animate-pop" />
                    </g>

                    {/* Staggered 4-Point Twinkling Sparkle Stars */}
                    {/* Star 1 - Top Left */}
                    <g className="animate-star-1" filter="url(#starGlowFilter)">
                      <path
                        d="M24 23 Q24 30 17 30 Q24 30 24 37 Q24 30 31 30 Q24 30 24 23 Z"
                        fill="#6ee7b7"
                      />
                    </g>

                    {/* Star 2 - Top Right */}
                    <g className="animate-star-2" filter="url(#starGlowFilter)">
                      <path
                        d="M114 27 Q114 34 107 34 Q114 34 114 41 Q114 34 121 34 Q114 34 114 27 Z"
                        fill="#ffffff"
                      />
                    </g>

                    {/* Star 3 - Bottom Left */}
                    <g className="animate-star-3" filter="url(#starGlowFilter)">
                      <path
                        d="M20 97 Q20 104 13 104 Q20 104 20 111 Q20 104 27 104 Q20 104 20 97 Z"
                        fill="#34d399"
                      />
                    </g>

                    {/* Star 4 - Bottom Right */}
                    <g className="animate-star-4" filter="url(#starGlowFilter)">
                      <path
                        d="M116 93 Q116 100 109 100 Q116 100 116 107 Q116 100 123 100 Q116 100 116 93 Z"
                        fill="#a7f3d0"
                      />
                    </g>
                  </svg>
                </div>

                <div className="text-center mt-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-emerald-950/90 border border-emerald-500/40 px-3.5 py-1 rounded-full mb-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cryptographic Session Verified</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Payment Successful
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Order confirmed and verified via Cashfree verify endpoint.
                  </p>
                </div>
              </div>

              {/* Digital Holographic Receipt Pass with SVG Laser Scanner Sweep */}
              <div className="rounded-2xl bg-zinc-900/80 border border-emerald-500/25 p-4.5 space-y-3 relative overflow-hidden backdrop-blur-md shadow-inner">
                {/* Real-time SVG Laser Beam Sweeper across the receipt */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_14px_#34d399] pointer-events-none z-10 animate-laser-scan" />

                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center pb-3 border-b border-zinc-800/80 text-xs">
                  <span className="text-zinc-400">Total Settled</span>
                  <span className="text-xl font-bold text-white tracking-tight font-mono">
                    ₹100.00 <span className="text-xs text-zinc-400 font-normal">INR</span>
                  </span>
                </div>

                <div className="space-y-2 text-xs">
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
                    <span className="text-zinc-400">Session ID:</span>
                    <button
                      onClick={() => copyToClipboard(paymentDetails?.sessionId || "", "sid")}
                      className="font-mono text-zinc-200 hover:text-emerald-400 flex items-center gap-1 transition-colors group/btn truncate max-w-[180px]"
                    >
                      <span className="truncate">{paymentDetails?.sessionId}</span>
                      {copiedKey === "sid" ? (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-3 h-3 text-zinc-500 group-hover/btn:text-zinc-300 shrink-0" />
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
                  onClick={replaySuccessAnimation}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <PartyPopper className="w-4 h-4 text-emerald-400" />
                  <span>Replay SVG Celebration & Confetti ✨</span>
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
                    The transaction could not be processed by Cashfree.
                  </p>
                </div>
              </div>

              {/* Diagnostic Box */}
              <div className="rounded-2xl bg-red-950/30 border border-red-500/30 p-4 space-y-2.5 backdrop-blur-md">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-red-200 leading-relaxed break-words font-medium">
                    {paymentDetails?.reason || message || "Payment error encountered."}
                  </div>
                </div>

                <div className="pt-2 border-t border-red-500/20 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Diagnostic Code:</span>
                  <span className="font-mono text-red-300 font-semibold">
                    {paymentDetails?.code || "CHECKOUT_FAILED"}
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
                    <div>timestamp: {paymentDetails?.time || new Date().toLocaleTimeString()}</div>
                    <div>status: PAYMENT_REJECTED</div>
                    <div>source: {paymentDetails?.source || "cashfree_api"}</div>
                    <div>step: {paymentDetails?.step || "verify_endpoint"}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Failure */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handlePayment}
                  disabled={loading || !cashfree}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
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
                {/* Ambient sheen */}
                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-violet-500/[0.05] rounded-full blur-xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                      Session Pass & Token
                    </span>
                    <span className="text-sm font-semibold text-zinc-200">
                      Cashfree Sandbox Test Payment
                    </span>
                  </div>
                  <div className="w-8 h-6 rounded bg-gradient-to-r from-violet-400/80 to-purple-300/80 rounded-sm shadow-sm flex items-center justify-center opacity-85">
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
                      Mode
                    </span>
                    <span className="text-xs font-medium text-violet-300">
                      _modal sandbox
                    </span>
                  </div>
                </div>
              </div>

              {/* Prefill Parameters Summary */}
              <div className="bg-zinc-900/50 rounded-xl p-3.5 border border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-zinc-500" />
                    Target Channel:
                  </span>
                  <span className="text-zinc-300 font-mono text-[11px]">
                    UPI / Cards / Netbanking
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="text-zinc-400">SDK Status:</span>
                  <span className={`font-mono text-[11px] ${cashfree ? "text-emerald-400" : "text-amber-400"}`}>
                    {cashfree ? "Cashfree v3 Loaded" : "Injecting SDK..."}
                  </span>
                </div>
              </div>

              {/* Main Call to Action Button */}
              <button
                onClick={handlePayment}
                disabled={loading || !cashfree}
                className={`w-full group relative overflow-hidden rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 py-3.5 px-6 shadow-xl ${
                  loading || !cashfree
                    ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700"
                    : "bg-white text-black hover:bg-zinc-100 hover:shadow-2xl active:scale-[0.98] border border-white"
                }`}
              >
                {!loading && cashfree && (
                  <span className="absolute inset-0 w-full h-full -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />
                )}

                {!cashfree ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-400" />
                    <span>Loading Cashfree...</span>
                  </div>
                ) : loading ? (
                  <div className="flex items-center gap-2.5">
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-300" />
                    <span className="text-zinc-200 font-medium">Processing Cashfree Order...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Pay ₹100 with Cashfree</span>
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
              <span>PCI-DSS Certified Gateway</span>
            </div>
            <span className="font-mono text-zinc-400">cashfree.js/v3</span>
          </div>
        </div>

        {/* Interactive Animation Simulator Dock */}
        <div className="mt-4 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-md backdrop-blur-md">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Instant Animation Tester
            </span>
            <span className="text-[9px] text-zinc-400">Preview without backend</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                triggerSuccess({
                  orderId: "order_CF_" + Math.floor(100000 + Math.random() * 900000),
                  sessionId: "session_" + Math.random().toString(36).substring(2, 12),
                  signature: "cf_mock_signature_verified",
                })
              }
              className="py-2 px-3 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Success Flow</span>
            </button>

            <button
              onClick={() =>
                triggerFailure("Payment was declined or dismissed by the user in Cashfree Modal.", {
                  code: "PAYMENT_CANCELLED_OR_DECLINED",
                  source: "cashfree_modal",
                  step: "session_handshake",
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
          <span>Mode</span>
          <span className="font-mono bg-zinc-900 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-800 text-[10px]">
            sandbox
          </span>
          <span>•</span>
          <span>Target: localhost:5000/api/cashfree</span>
        </div>
      </div>
    </div>
  );
};

export default CashfreeTest;