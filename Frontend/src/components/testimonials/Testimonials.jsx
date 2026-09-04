import { useEffect, useState } from "react";

function Testimonials() {
  const quotes = [
    {
      text: "Training with Leena transformed my mobility and mental clarity completely. Her national-level expertise shows in every posture detail.",
      author: "Ananya Sharma",
      role: "Daily Cult Member",
    },
    {
      text: "Her focus on breath regulation and core balance helped me overcome chronic lower back strain within just weeks.",
      author: "Rohan Verma",
      role: "Personal Client",
    },
    {
      text: "Leena combines intense athletic strength with deep calming energy. Easily the best trainer experience I've had.",
      author: "Priya Nair",
      role: "Online Flow Student",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Automatically move to the next testimonial
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % quotes.length);
  };

  const goToTestimonial = (idx) => {
    setCurrent(idx);
  };

  return (
    <section className="py-28 px-6 bg-[var(--bg-surface)] relative">
      <div className="max-w-4xl mx-auto text-center">

        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sage)] font-semibold">
          VOICES OF FLOW
        </span>

        <div
          onClick={goToNext}
          className="relative my-12 p-8 sm:p-16 rounded-3xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-2xl cursor-pointer overflow-hidden"
        >
          <div
            key={current}
            className="animate-testimonial-slide"
          >
            <span className="text-6xl font-display text-[var(--accent-gold)] opacity-40 leading-none">
              “
            </span>

            <p className="text-lg sm:text-2xl font-light leading-relaxed my-4">
              {quotes[current].text}
            </p>

            <div className="mt-6">
              <h4 className="font-display font-bold text-lg">
                {quotes[current].author}
              </h4>

              <p className="text-xs text-[var(--accent-gold)] font-semibold uppercase">
                {quotes[current].role}
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          <div
            className="flex justify-center gap-3 mt-8 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToTestimonial(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                className={`h-3 rounded-full transition-all duration-500 ${
                  current === idx
                    ? "bg-[var(--accent-gold)] w-8"
                    : "bg-[var(--border-color)] w-3"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Smooth testimonial transition */}
      <style>
        {`
          @keyframes testimonialSlide {
            0% {
              opacity: 0;
              transform: translateX(28px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-testimonial-slide {
            animation: testimonialSlide 900ms cubic-bezier(0.22, 1, 0.36, 1);
          }
        `}
      </style>
    </section>
  );
}

export default Testimonials;