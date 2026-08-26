    function FinalCTA({ onOpenBooking }) {
      return (
        <section className="py-28 px-6 text-center relative overflow-hidden bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
          <div className="max-w-3xl mx-auto space-y-6 z-10 relative">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] font-bold">
              START YOUR TRANSFORMATION
            </span>
            <h2 className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight">
              WHERE DOES YOUR FLOW BEGIN?
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto font-light">
              Step onto the mat with a national medalist. Book your personalized private or online practice session today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button 
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-gold)] text-white font-display font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
              >
                BOOK A SESSION NOW →
              </button>
              <a 
                href="https://wa.me/" target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] font-display font-bold text-xs uppercase tracking-widest hover:bg-[var(--bg-main)] transition-all"
              >
                WHATSAPP LEENA
              </a>
            </div>
          </div>
        </section>
      );
    }
export default FinalCTA;