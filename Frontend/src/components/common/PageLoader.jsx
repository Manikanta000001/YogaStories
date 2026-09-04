import React from "react";
const LOADER_STYLES = `
  /* Default CSS Variable fallbacks matching YogaPT Design System */
 
  /* 8-Second Pranayama Breathing Rhythm (Inhale, Hold, Exhale, Rest) */
  @keyframes yogicBreath {
    0% {
      transform: scale(0.92);
      opacity: 0.65;
    }
    38% {
      transform: scale(1.08);
      opacity: 1;
    }
    50% {
      transform: scale(1.08);
      opacity: 0.95;
    }
    88% {
      transform: scale(0.92);
      opacity: 0.65;
    }
    100% {
      transform: scale(0.92);
      opacity: 0.65;
    }
  }

  /* Atmospheric Core Halo Breathing Pulse */
  @keyframes auraGlow {
    0%, 100% {
      transform: scale(0.85);
      opacity: 0.25;
    }
    45% {
      transform: scale(1.3);
      opacity: 0.55;
    }
  }

  /* Harmonic Celestial Clockwise Orbit (24s cycle) */
  @keyframes celestialClockwise {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Counter-Rotational Harmony Orbit (36s cycle) */
  @keyframes celestialCounter {
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

 
 
  /* Ethereal hairline progress beacon shimmer */
  @keyframes etherealTracer {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateX(200%);
      opacity: 0;
    }
  }

  /* Gentle staggered text dot fade */
  @keyframes dotBreathe {
    0%, 20% {
      opacity: 0.15;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-1.5px);
    }
    80%, 100% {
      opacity: 0.15;
      transform: translateY(0);
    }
  }

  /* Respect Accessibility: Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .anim-yogic-breath,
    .anim-aura-glow,
    .anim-orbit-cw,
    .anim-orbit-ccw,
    
    .anim-tracer,
    .anim-dot-1,
    .anim-dot-2,
    .anim-dot-3 {
      animation: none !important;
      transform: none !important;
    }
    .anim-static-fallback {
      opacity: 0.8 !important;
    }
  }

  .anim-yogic-breath {
    animation: yogicBreath 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-origin: center;
  }

  .anim-aura-glow {
    animation: auraGlow 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-origin: center;
  }

  .anim-orbit-cw {
    animation: celestialClockwise 22s linear infinite;
    transform-origin: center;
  }

  .anim-orbit-ccw {
    animation: celestialCounter 34s linear infinite;
    transform-origin: center;
  }



  .anim-tracer {
    animation: etherealTracer 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }

  .anim-dot-1 {
    animation: dotBreathe 1.8s ease-in-out 0s infinite;
  }
  .anim-dot-2 {
    animation: dotBreathe 1.8s ease-in-out 0.25s infinite;
  }
  .anim-dot-3 {
    animation: dotBreathe 1.8s ease-in-out 0.5s infinite;
  }
`;

/**
 * Peace & Tranquility Vector Architectures for YogaPT:
 * - "peace-dove" (Default): Fluid, minimalist peace dove in calm flight carrying a golden olive sprig
 * - "peace-mudra": Anjali Mudra (hands folded at heart center in stillness and inner peace)
 * - "peace-cairn": Meditative stacked zen river stones in complete balance and equilibrium
 * - "peace-branch": Delicate curving olive peace sprig representing universal calm
 */
export const LoaderSymbol = ({ type = "peace-dove" }) => {
  switch (type) {
    case "peace-mudra":
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 text-[var(--accent-sage)] transition-all duration-300"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Subtle Outer Serenity Aura */}
          <path
            d="M34 56 C34 38, 44 26, 50 20 C56 26, 66 38, 66 56"
            stroke="var(--border-color)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            className="opacity-50"
          />
          {/* Left Hand Silhouette */}
          <path
            d="M50 22 C48 30, 42 42, 38 52 C35 59, 36 68, 42 74 C46 78, 50 78, 50 78"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="opacity-85"
          />
          {/* Right Hand Silhouette (Mirrored Symmetry) */}
          <path
            d="M50 22 C52 30, 58 42, 62 52 C65 59, 64 68, 58 74 C54 78, 50 78, 50 78"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="opacity-85"
          />
          {/* Central Fingertip Contact Line */}
          <line
            x1="50"
            y1="22"
            x2="50"
            y2="54"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="opacity-90"
          />
          {/* Heart/Palm Stillness Prana Node */}
          <circle
            cx="50"
            cy="54"
            r="4"
            fill="var(--accent-gold)"
            style={{ filter: "drop-shadow(0 0 6px var(--accent-gold))" }}
          />
          {/* Gentle Base Lotus Grounding */}
          <path
            d="M40 82 Q50 85 60 82"
            stroke="var(--accent-sage)"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-60"
          />
        </svg>
      );

    case "peace-cairn":
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 text-[var(--accent-sage)] transition-all duration-300"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Grounding Base Stone (Stability & Equanimity) */}
          <path
            d="M26 74 C26 67, 36 64, 50 64 C64 64, 74 67, 74 74 C74 80, 63 82, 50 82 C37 82, 26 80, 26 74 Z"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-75"
          />
          {/* Middle Balance Stone (Harmony) */}
          <path
            d="M32 54 C32 48, 40 46, 50 46 C60 46, 68 48, 68 54 C68 60, 60 62, 50 62 C40 62, 32 60, 32 54 Z"
            stroke="currentColor"
            strokeWidth="2.2"
            className="opacity-85"
          />
          {/* Top Pebble of Enlightenment & Peace */}
          <path
            d="M39 36 C39 30, 44 28, 50 28 C56 28, 61 30, 61 36 C61 41, 56 43, 50 43 C44 43, 39 41, 39 36 Z"
            stroke="currentColor"
            strokeWidth="2.2"
            className="opacity-95"
          />
          {/* Meditative Golden Core Beacon */}
          <circle
            cx="50"
            cy="20"
            r="3.5"
            fill="var(--accent-gold)"
            style={{ filter: "drop-shadow(0 0 6px var(--accent-gold))" }}
          />
          {/* Subtle Vertical Equilibrium Axis */}
          <line
            x1="50"
            y1="25"
            x2="50"
            y2="78"
            stroke="var(--accent-gold)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
            className="opacity-40"
          />
        </svg>
      );

    case "peace-branch":
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 text-[var(--accent-sage)] transition-all duration-300"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Gentle Curving Olive Stem */}
          <path
            d="M28 78 C36 68, 44 48, 70 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="opacity-80"
          />
          {/* Peaceful Leaf Pair 1 */}
          <path
            d="M34 68 C30 62, 32 54, 38 52 C42 58, 40 64, 34 68 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path
            d="M40 64 C48 64, 52 58, 50 50 C44 52, 40 58, 40 64 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Peaceful Leaf Pair 2 */}
          <path
            d="M47 48 C42 42, 44 34, 52 32 C55 38, 52 44, 47 48 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <path
            d="M54 44 C62 42, 65 36, 62 28 C56 30, 53 36, 54 44 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Tip Golden Olive Leaf of Reconciliation */}
          <path
            d="M68 25 C74 18, 80 18, 82 22 C78 28, 72 28, 68 25 Z"
            stroke="var(--accent-gold)"
            strokeWidth="1.8"
            fill="var(--accent-gold)"
            fillOpacity="0.35"
          />
          <circle
            cx="72"
            cy="26"
            r="3"
            fill="var(--accent-gold)"
            style={{ filter: "drop-shadow(0 0 5px var(--accent-gold))" }}
          />
        </svg>
      );

    case "peace-dove":
    default:
      return (
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 text-[var(--accent-sage)] transition-all duration-300"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Fluid Peace Dove Silhouette in Calm Flight */}
          <path
            d="M26 62 C34 60, 42 56, 48 50 C54 44, 58 38, 62 38 C68 38, 73 34, 76 30 C76 33, 74 36, 70 38 C67 40, 60 48, 54 58 C50 64, 42 70, 32 72 C28 73, 25 70, 26 62 Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />
          {/* Sweeping Calming Wing Arc */}
          <path
            d="M48 50 C44 36, 52 24, 66 18 C64 26, 58 36, 52 46"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-85"
          />
          {/* Secondary Wing Feather Layer */}
          <path
            d="M52 46 C56 34, 64 26, 74 22 C70 30, 64 38, 58 46"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="2 3"
            className="opacity-50"
          />
          {/* Golden Olive Peace Twig Carried in Beak */}
          <path
            d="M74 30 C78 27, 83 26, 88 28"
            stroke="var(--accent-gold)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Olive Leaf 1 */}
          <path
            d="M82 27 C84 22, 88 22, 90 25 C88 28, 84 28, 82 27 Z"
            stroke="var(--accent-gold)"
            strokeWidth="1.3"
            fill="var(--accent-gold)"
            fillOpacity="0.4"
          />
          {/* Olive Leaf 2 */}
          <path
            d="M86 28 C88 32, 92 33, 93 30 C91 28, 88 27, 86 28 Z"
            stroke="var(--accent-gold)"
            strokeWidth="1.3"
            fill="var(--accent-gold)"
            fillOpacity="0.4"
          />
          {/* Inner Light of Stillness */}
          <circle
            cx="48"
            cy="52"
            r="3.5"
            fill="var(--accent-gold)"
            style={{ filter: "drop-shadow(0 0 6px var(--accent-gold))" }}
          />
        </svg>
      );
  }
};

/**
 * PageLoader Component
 * Full-screen, GPU-optimized Suspense fallback for YogaPT Admin.
 *
 * Props:
 * - title: Custom brand display (defaults to "YogaPT")
 * - subtitle: Status notification (defaults to "Preparing your experience")
 * - fullScreen: boolean (defaults to true for Suspense viewport coverage)
 * - symbol: "peace-dove" | "peace-mudra" | "peace-cairn" | "peace-branch"
 */
export const PageLoader = ({
  title = "YogaPT",
  subtitle = "Preparing your experience",
  fullScreen = true,
  symbol = "peace-mudra",
  className = "",
}) => {
  return (
    <>
      <style>{LOADER_STYLES}</style>
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading YogaPT admin experience"
        className={`${
          fullScreen
            ? "fixed inset-0 z-[9999]"
            : "relative w-full h-full min-h-[450px]"
        } flex flex-col items-center justify-center select-none overflow-hidden transition-colors duration-500 bg-[var(--bg-main)] text-[var(--text-main)] ${className}`}
      >
        {/* Screen Reader Announcements */}
        <span className="sr-only">
          YogaPT Admin Panel is loading, please hold on...
        </span>

        {/* Atmospheric Ambient Backdrop Blobs */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
        >
          {/* Primary Sage Bloom */}
          <div
            className="absolute w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] rounded-full blur-[100px] opacity-[0.07]  transition-all"
            style={{
              background:
                "radial-gradient(circle, var(--accent-sage) 0%, transparent 70%)",
            }}
          />
          {/* Warm Gold Corona */}
          <div
            className="absolute w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] rounded-full blur-[80px] opacity-[0.05] transition-all translate-y-8"
            style={{
              background:
                "radial-gradient(circle, var(--accent-gold) 0%, transparent 65%)",
            }}
          />
          {/* Subtle Vignette Shading */}
          <div
            className="absolute inset-0 opacity-40 "
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, var(--bg-main) 95%)",
            }}
          />
        </div>

        {/* Main Vector Meditation Centerpiece */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Breathing Geometric Vessel */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Layer 0: Ambient Breathing Plasma */}
            <div
              aria-hidden="true"
              className="absolute inset-4 rounded-full blur-xl anim-aura-glow pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-sage) 0%, var(--accent-primary) 50%, transparent 80%)",
              }}
            />

            {/* Layer 1: Outer Celestial Precision Ring (Counter-Clockwise) */}
            <svg
              className="absolute inset-0 w-full h-full anim-orbit-ccw pointer-events-none"
              viewBox="0 0 160 160"
              fill="none"
            >
              {/* Fine Outer Boundary */}
              <circle
                cx="80"
                cy="80"
                r="76"
                stroke="var(--border-color)"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="opacity-60"
              />
              {/* Subtle Gold Segment Track */}
              <circle
                cx="80"
                cy="80"
                r="76"
                stroke="var(--accent-gold)"
                strokeWidth="1.5"
                strokeDasharray="18 160"
                strokeLinecap="round"
                className="opacity-70"
              />
            </svg>

            {/* Layer 2: Mid-Orbit Sage Ring with Harmonic Dashes (Clockwise) */}
            <svg
              className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] anim-orbit-cw pointer-events-none"
              viewBox="0 0 136 136"
              fill="none"
            >
              <circle
                cx="68"
                cy="68"
                r="62"
                stroke="var(--accent-sage)"
                strokeWidth="1.2"
                strokeDasharray="28 85"
                strokeLinecap="round"
                className="opacity-40"
              />
              {/* Subtle Accent Point */}
              <circle
                cx="68"
                cy="6"
                r="2.5"
                fill="var(--accent-sage)"
                className="opacity-80"
              />
            </svg>

            {/* Layer 3: Central Dynamic Vector Emblem */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center anim-yogic-breath">
              {/* Dynamic Glassmorphism Backdrop Pill */}
              <div
                className="absolute inset-0 rounded-full backdrop-blur-md border border-[var(--border-color)] shadow-2xl transition-all"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.06), rgba(0,0,0,0.15))",
                  boxShadow: "0 8px 32px -4px rgba(0, 0, 0, 0.35)",
                }}
              />

              {/* Central Minimalist Vector Symbol */}
              <LoaderSymbol type={symbol} />
            </div>
          </div>

          {/* Brand Typography & Elegant Status Feedback */}
          <div className="mt-8 flex flex-col items-center text-center space-y-2.5 max-w-xs px-4">
            {/* Prominent Yet Minimalist Brand Title */}
            <div className="flex items-center gap-1.5 tracking-[0.28em] font-medium text-lg sm:text-xl uppercase font-sans">
              <span className="font-semibold tracking-[0.24em] text-[var(--text-main)]">
                {title}
              </span>
              {/* Subtle Gold Accent Mark */}
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mb-1"
                style={{
                  backgroundColor: "var(--accent-gold)",
                  boxShadow: "0 0 8px var(--accent-gold)",
                }}
              />
            </div>

            {/* Subtitle with Breathing Ellipsis */}
            <div className="flex items-center text-xs sm:text-sm font-normal text-[var(--text-muted)] tracking-wide">
              <span>{subtitle}</span>
              <span className="inline-flex ml-1 w-5 text-left font-mono">
                <span className="anim-dot-1">.</span>
                <span className="anim-dot-2">.</span>
                <span className="anim-dot-3">.</span>
              </span>
            </div>

            {/* Hairline Ethereal Progress Tracer Bar */}
            <div className="w-36 sm:w-44 h-[2px] bg-[var(--border-color)] rounded-full overflow-hidden mt-3 relative">
              <div
                className="absolute inset-0 w-1/2 h-full rounded-full anim-tracer"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--accent-sage) 50%, var(--accent-gold) 75%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
