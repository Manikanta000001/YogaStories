   function SilverMedalSpotlight() {
      return (
        <section className="py-24 px-6 relative overflow-hidden bg-[var(--bg-main)]">
          <div className="max-w-6xl mx-auto rounded-3xl border border-[var(--border-color)] bg-gradient-to-r from-[var(--bg-surface)] via-[var(--card-bg)] to-[var(--bg-surface)] p-8 sm:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-4 border-dashed border-[var(--accent-gold)]/20 animate-spin-slow pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10 relative">
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full border-4 border-[var(--accent-gold)] flex items-center justify-center p-2 energy-glow bg-[var(--bg-main)]">
                  <div className="text-center">
                    <span className="text-5xl">🥈</span>
                    <p className="font-display font-extrabold text-sm sm:text-base tracking-widest mt-2">NATIONAL</p>
                    <p className="text-xs text-[var(--accent-gold)] font-bold uppercase">Silver Medalist</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4 text-center md:text-left">
                <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] font-bold">
                  NATIONAL RECOGNITION
                </span>
                <h3 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
                  A MILESTONE BUILT THROUGH DISCIPLINE.
                </h3>
                <p className="text-sm sm:text-base opacity-80 font-light leading-relaxed">
                  Securing silver at the National Level stands as a testament to years of unwavering practice, breath regulation, and refined athletic performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }
export default SilverMedalSpotlight;