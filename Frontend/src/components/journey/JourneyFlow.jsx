    function JourneyFlow() {
      const journeySteps = [
        { label: "BEGIN", text: "First steps onto the yoga mat discovering breath work." },
        { label: "TRAIN", text: "Years of rigorous physical discipline and posture mastering." },
        { label: "COMPETE", text: "Entering competitive artistic yoga arenas." },
        { label: "NATIONAL", text: "Representing state at the highest national level championships." },
        { label: "SILVER", text: "Awarded National Silver Medal for athletic distinction." },
        { label: "TEACH", text: "Empowering students daily at Cult & private sessions." }
      ];

      return (
        <section id="journey" className="py-28 px-6 bg-[var(--bg-surface)] relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold">
              THE PATHWAY
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight mt-2">
              JOURNEY FLOW
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Dynamic Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-gold)] to-[var(--accent-sage)] -translate-x-1/2"></div>

            <div className="space-y-12">
              {journeySteps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} text-center md:text-left`}
                >
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-xs font-bold text-[var(--accent-gold)] tracking-widest uppercase">STEP 0{idx + 1}</span>
                    <h3 className="font-display font-extrabold text-2xl mt-1">{step.label}</h3>
                    <p className="text-xs opacity-75 max-w-xs mt-1 inline-block">{step.text}</p>
                  </div>

                  <div className="relative z-10 w-8 h-8 rounded-full bg-[var(--bg-main)] border-2 border-[var(--accent-gold)] flex items-center justify-center shrink-0 shadow-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
export default JourneyFlow;