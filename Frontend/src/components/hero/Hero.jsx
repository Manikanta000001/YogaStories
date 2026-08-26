    function Hero({ mousePos, onOpenBooking }) {
      return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
          {/* Animated Background Energy Orb */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-tr from-[var(--accent-primary)]/20 via-[var(--accent-gold)]/20 to-[var(--accent-sage)]/20 blur-3xl pointer-events-none animate-pulse-glow"
            style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
          ></div>

          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
            {/* Left Column: Heading & Info */}
            <div 
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
              style={{ transform: `translate(${mousePos.x * -0.1}px, ${mousePos.y * -0.1}px)` }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-xs font-semibold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]"></span>
                LEENA SAJJA — PROFESSIONAL YOGA TRAINER
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight leading-[0.95]">
                MOVE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-gold)] to-[var(--accent-sage)]">
                  YOUR
                </span> <br />
                ENERGY.
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg opacity-80 font-light leading-relaxed">
                Strength, flexibility, balance, and mindful movement designed to awaken your body and quiet your mind through holistic flow.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={onOpenBooking}
                  className="px-8 py-4 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] font-display font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  START YOUR PRACTICE
                </button>
                <a 
                  href="#about"
                  className="px-8 py-4 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] font-display font-bold text-xs uppercase tracking-widest hover:bg-[var(--bg-surface)] transition-all"
                >
                  MEET LEENA
                </a>
              </div>
            </div>

            {/* Right Column: Hero Photograph with Organic Mask & Energy Ring */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Architectural Gold Accent Frame Backdrop */}
              <div 
                className="absolute w-[295px] h-[375px] sm:w-[375px] sm:h-[475px] mask-arch-shape border-2 border-[var(--accent-gold)]/40 translate-x-3 translate-y-3 pointer-events-none"
                style={{ transform: `translate(${mousePos.x * 0.2 + 12}px, ${mousePos.y * 0.2 + 12}px)` }}
              ></div>

              {/* Leena Sajja Featured Editorial Image - Elegant Arch Silhouette */}
              <div 
                className="relative w-[280px] h-[360px] sm:w-[360px] sm:h-[460px] mask-arch-shape overflow-hidden shadow-2xl border-2 border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-700 hover:scale-[1.02] energy-glow"
                style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80" 
                  alt="Leena Sajja Yoga Trainer" 
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wider font-light">
                  <p className="font-bold text-sm tracking-widest uppercase">CULT TRAINER & MEDALIST</p>
                  <p className="opacity-80">National Level Competitor</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
export default Hero;