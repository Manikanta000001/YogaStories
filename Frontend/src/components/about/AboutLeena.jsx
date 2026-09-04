import image from "../../../public/images/images.jpeg";
import leena from "../../../public/images/leena.jpeg";

function AboutLeena() {
  return (
    <section
      id="about"
      className="py-16 sm:py-28 px-4 sm:px-6 relative max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

        {/* Image & Floating Credentials */}
        <div className="lg:col-span-6 relative flex items-center justify-center">

          {/* Architectural Accent Offset Frame */}
          <div className="absolute w-[255px] h-[325px] sm:w-[395px] sm:h-[495px] mask-arch-shape border-2 border-[var(--accent-sage)]/30 -translate-x-2 -translate-y-2 sm:-translate-x-3 sm:-translate-y-3 pointer-events-none"></div>

          {/* Main Image */}
          <div className="w-[245px] h-[315px] sm:w-[380px] sm:h-[480px] mask-arch-shape overflow-hidden shadow-2xl border-2 border-[var(--border-color)] bg-[var(--card-bg)]">
            <img
              src={leena}
              alt="Leena Sajja Yoga Pose"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge 1 */}
          <div className="absolute top-0 left-1 sm:-top-4 sm:left-4 p-2.5 sm:p-4 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-color)] shadow-xl flex items-center gap-2 sm:gap-3 animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-base sm:text-lg">
              🥈
            </div>

            <div className="text-[10px] sm:text-xs font-semibold">
              <p className="text-[var(--accent-gold)]">
                NATIONAL LEVEL
              </p>
              <p className="opacity-80">
                Silver Medalist
              </p>
            </div>
          </div>

          {/* Floating Badge 2 */}
          <div
            className="absolute bottom-0 right-1 sm:-bottom-6 sm:right-4 p-2.5 sm:p-4 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border-color)] shadow-xl flex items-center gap-2 sm:gap-3 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xs overflow-hidden">
              <img
                src={image}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </div>

            <div className="text-[10px] sm:text-xs font-semibold">
              <p className="text-[var(--accent-sage)]">
                OFFICIAL TRAINER
              </p>
              <p className="opacity-80">
                Cult Fitness
              </p>
            </div>
          </div>
        </div>

        {/* Biography Details */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--accent-primary)] font-semibold">
            BIOGRAPHY
          </span>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight leading-tight">
            MEET LEENA SAJJA.
          </h2>

          <p className="text-sm sm:text-lg opacity-80 leading-relaxed font-light">
            Leena Sajja is a distinguished national-level yoga competitor,
            medalist, and professional yoga trainer currently guiding
            practices at Cult. Her philosophy bridges time-tested athletic
            discipline with modern mindful wellness.
          </p>

          <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">

            {/* Credential 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--accent-sage)]/20 text-[var(--accent-sage)] flex items-center justify-center shrink-0 mt-1 text-sm">
                ✓
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider leading-relaxed">
                  Professional Yoga Trainer at Cult
                </h4>

                <p className="text-[11px] sm:text-xs opacity-75 mt-1 leading-relaxed">
                  Empowering hundreds of daily practitioners toward optimal
                  physical stability and focus.
                </p>
              </div>
            </div>

            {/* Credential 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] flex items-center justify-center shrink-0 mt-1 text-sm">
                🥈
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider leading-relaxed">
                  National-Level Silver Medalist
                </h4>

                <p className="text-[11px] sm:text-xs opacity-75 mt-1 leading-relaxed">
                  Recognized for technical excellence, grace, and flexibility
                  in competitive yoga.
                </p>
              </div>
            </div>

            {/* Credential 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center shrink-0 mt-1 text-sm">
                ★
              </div>

              <div>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider leading-relaxed">
                  Multiple Competition Honours
                </h4>

                <p className="text-[11px] sm:text-xs opacity-75 mt-1 leading-relaxed">
                  Consistent top rankings in regional and national yoga
                  championships.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutLeena;