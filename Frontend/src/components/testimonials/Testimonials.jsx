import { useState } from "react";

  function Testimonials() {
      const quotes = [
        { text: "Training with Leena transformed my mobility and mental clarity completely. Her national-level expertise shows in every posture detail.", author: "Ananya Sharma", role: "Daily Cult Member" },
        { text: "Her focus on breath regulation and core balance helped me overcome chronic lower back strain within just weeks.", author: "Rohan Verma", role: "Personal Client" },
        { text: "Leena combines intense athletic strength with deep calming energy. Easily the best trainer experience I've had.", author: "Priya Nair", role: "Online Flow Student" }
      ];

      const [current, setCurrent] = useState(0);

      return (
        <section className="py-28 px-6 bg-[var(--bg-surface)] relative">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sage)] font-semibold">
              VOICES OF FLOW
            </span>

            <div className="relative my-12 p-8 sm:p-16 rounded-3xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-2xl">
              <span className="text-6xl font-display text-[var(--accent-gold)] opacity-40 leading-none">“</span>
              <p className="text-lg sm:text-2xl font-light leading-relaxed my-4">
                {quotes[current].text}
              </p>
              <div className="mt-6">
                <h4 className="font-display font-bold text-lg">{quotes[current].author}</h4>
                <p className="text-xs text-[var(--accent-gold)] font-semibold uppercase">{quotes[current].role}</p>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-3 mt-8">
                {quotes.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-[var(--accent-gold)] w-8' : 'bg-[var(--border-color)]'}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }
export default Testimonials;