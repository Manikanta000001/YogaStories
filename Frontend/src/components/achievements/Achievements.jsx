    import { useState } from "react";
    function Achievements() {
      const [activeItem, setActiveItem] = useState(0);

      const milestones = [
        {
          title: "National Silver Medal",
          subtitle: "NATIONAL CHAMPIONSHIP",
          desc: "Awarded silver in competitive artistic yoga demonstration for precision and flexibility.",
          icon: "🥈"
        },
        {
          title: "Cult Yoga Trainer",
          subtitle: "PROFESSIONAL FACULTY",
          desc: "Leading high-energy and restorative yoga sessions across top fitness centers.",
          icon: "✦"
        },
        {
          title: "National Competitor",
          subtitle: "ATHLETIC EXCELLENCE",
          desc: "Represented state in multiple prestigious national-level yoga tournaments.",
          icon: "🏆"
        },
        {
          title: "Multiple State Awards",
          subtitle: "CONSISTENT DISTINCTION",
          desc: "Honored with multiple trophies for artistic form, balance, and endurance.",
          icon: "🎖️"
        }
      ];

      return (
        <section id="achievements" className="py-28 px-6 bg-[var(--bg-surface)] relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] font-semibold">
              ENERGY MILESTONES
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight mt-2">
              ACHIEVEMENTS IN MOTION
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Interactive Selector List */}
            <div className="md:col-span-6 space-y-4">
              {milestones.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveItem(idx)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeItem === idx 
                      ? 'bg-[var(--bg-main)] border-[var(--accent-gold)] shadow-xl scale-[1.02]' 
                      : 'border-[var(--border-color)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold">{item.subtitle}</p>
                      <h3 className="font-display font-bold text-lg">{item.title}</h3>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${activeItem === idx ? 'bg-[var(--accent-gold)] animate-ping' : 'bg-transparent border border-current'}`}></div>
                </div>
              ))}
            </div>

            {/* Central Orbital Display */}
            <div className="md:col-span-6 flex flex-col items-center justify-center text-center p-8 rounded-full border-2 border-dashed border-[var(--accent-gold)]/40 relative aspect-square max-w-sm mx-auto shadow-2xl bg-[var(--bg-main)]">
              <div className="absolute inset-2 rounded-full border border-[var(--border-color)] animate-spin-reverse-slow"></div>
              
              <div className="text-5xl mb-4 animate-bounce">
                {milestones[activeItem].icon}
              </div>
              <h3 className="font-display font-bold text-2xl max-w-xs">
                {milestones[activeItem].title}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold mt-1">
                {milestones[activeItem].subtitle}
              </p>
              <p className="text-xs opacity-75 max-w-xs mt-3 leading-relaxed">
                {milestones[activeItem].desc}
              </p>
            </div>
          </div>
        </section>
      );
    }
export default Achievements;