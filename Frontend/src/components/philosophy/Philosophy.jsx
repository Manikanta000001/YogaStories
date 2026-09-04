function Philosophy() {
  return (
    <section className="min-h-screen py-24 px-6 flex items-center justify-center relative overflow-hidden bg-[var(--bg-main)] border-y border-[var(--border-color)]">
      {/* Subtle Ambient Background Image */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80"
          alt="Yoga Philosophy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center gap-6 sm:gap-8">
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--accent-primary)] font-bold">
          THE PHILOSOPHY
        </span>

        <h2 className="text-3xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight leading-tight sm:leading-none">
          STRENGTH IS NOT ALWAYS LOUD.
        </h2>

        <p className="text-sm sm:text-3xl font-light italic opacity-90 max-w-2xl mx-auto leading-relaxed px-2">
          "Sometimes, strength is simply showing up on the mat and taking the
          next deep breath."
        </p>

        <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">
          — LEENA SAJJA
        </p>
      </div>
    </section>
  );
}
export default Philosophy;
