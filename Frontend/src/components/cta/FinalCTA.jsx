function FinalCTA({ onOpenBooking }) {
  return (
    <section className="py-16 sm:py-28 px-4 sm:px-6 text-center relative overflow-hidden bg-[var(--bg-surface)] border-t border-[var(--border-color)]">
      <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 z-10 relative">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--accent-gold)] font-bold">
          START YOUR TRANSFORMATION
        </span>

        <h2 className="text-2xl sm:text-7xl font-display font-extrabold tracking-tight leading-tight sm:leading-none">
          <span className="sm:hidden">BEGIN YOUR PRACTICE.</span>

          <span className="hidden sm:inline">WHERE DOES YOUR FLOW BEGIN?</span>
        </h2>
        <p className="text-sm sm:text-lg opacity-80 max-w-xl mx-auto font-light leading-relaxed">
          Step onto the mat with a national medalist. Book your personalized
          private or online practice session today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-gold)] text-white font-display font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            BOOK A SESSION NOW →
          </button>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] font-display font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[var(--bg-main)] transition-all"
          >
            WHATSAPP LEENA
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
