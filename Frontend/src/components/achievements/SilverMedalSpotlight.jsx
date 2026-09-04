function SilverMedalSpotlight() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[var(--bg-main)]">
      <div className="max-w-6xl mx-auto rounded-3xl border border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-surface)] via-[var(--card-bg)] to-[var(--bg-surface)] p-5 sm:p-8 md:p-16 relative overflow-hidden shadow-2xl">

        {/* Decorative orbit */}
        <div className="absolute -right-24 -bottom-24 sm:-right-16 sm:-bottom-16 w-56 h-56 sm:w-80 sm:h-80 rounded-full border-4 border-dashed border-[var(--accent-gold)]/20 animate-spin-slow pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center z-10 relative">

          {/* MEDAL */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full border-4 border-[var(--accent-gold)] flex items-center justify-center p-2 energy-glow bg-[var(--bg-main)]">

              <div className="text-center">
                <span className="text-4xl sm:text-5xl">🥈</span>

                <p className="font-display font-extrabold text-xs sm:text-sm md:text-base tracking-widest mt-2">
                  NATIONAL
                </p>

                <p className="text-[10px] sm:text-xs text-[var(--accent-gold)] font-bold uppercase">
                  Silver Medalist
                </p>
              </div>

            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-8 space-y-3 sm:space-y-4 text-center md:text-left">

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--accent-gold)] font-bold">
              NATIONAL RECOGNITION
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-tight">
              A MILESTONE BUILT THROUGH DISCIPLINE.
            </h3>

            <p className="text-xs sm:text-sm md:text-base opacity-80 font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
              Securing silver at the National Level stands as a testament to years of unwavering practice, breath regulation, and refined athletic performance.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default SilverMedalSpotlight;