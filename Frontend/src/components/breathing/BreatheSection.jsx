   import { Wind } from "lucide-react";
   function BreatheSection({ onOpenBreath }) {
      return (
        <section className="py-24 px-6 relative flex flex-col items-center justify-center text-center overflow-hidden border-y border-[var(--border-color)] bg-[var(--card-bg)]">
          <div className="absolute w-96 h-96 rounded-full border border-[var(--accent-gold)]/20 animate-ping opacity-30 pointer-events-none"></div>
          
          <div className="max-w-3xl z-10 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sage)] font-semibold">
              MINDFUL MOMENT
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
              BREATHE. MOVE. BE PRESENT.
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto font-light">
              Before exploring further, take a conscious pause to anchor your focus in the present moment.
            </p>

            <button 
              onClick={onOpenBreath}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[var(--accent-sage)] text-white font-display text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-900/10"
            >
              <Wind className="w-4 h-4" />
              TAKE A BREATH NOW
            </button>
          </div>
        </section>
      );
    }
export default BreatheSection;