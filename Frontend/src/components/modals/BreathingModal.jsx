    import { useState ,useEffect} from "react";
    import { X } from "lucide-react";
    function BreathingModal({ onClose }) {
      const [phase, setPhase] = useState('INHALE'); // INHALE, HOLD, EXHALE
      const [counter, setCounter] = useState(4);

      useEffect(() => {
        const timer = setInterval(() => {
          setCounter((prev) => {
            if (prev === 1) {
              if (phase === 'INHALE') { setPhase('HOLD'); return 4; }
              if (phase === 'HOLD') { setPhase('EXHALE'); return 4; }
              if (phase === 'EXHALE') { setPhase('INHALE'); return 4; }
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }, [phase]);

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-6 animate-fade-in">
          <div className="relative max-w-md w-full bg-[var(--bg-surface)] p-10 rounded-3xl border border-[var(--border-color)] text-center shadow-2xl flex flex-col items-center">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-main)]"
            >
              <X className="w-5 h-5"></X>
            </button>

            <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)] font-bold mb-6">
              GUIDED BREATHING
            </span>

            {/* Pulsing Orb Circle */}
            <div className="relative w-52 h-52 my-6 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-gold)] opacity-30 transition-all duration-[1000ms] ${
                phase === 'INHALE' ? 'scale-110 shadow-2xl' : phase === 'HOLD' ? 'scale-105' : 'scale-75 opacity-20'
              }`}></div>
              <div className="w-40 h-40 rounded-full border-2 border-dashed border-[var(--accent-gold)] animate-spin-slow absolute"></div>
              
              <div className="z-10 text-center">
                <p className="text-2xl font-display font-extrabold tracking-widest">{phase}</p>
                <p className="text-4xl font-bold text-[var(--accent-primary)] mt-1">{counter}</p>
              </div>
            </div>

            <p className="text-xs opacity-75 max-w-xs mt-2">
              Follow the expanding and contracting flow. Reset your nervous system.
            </p>

            <button 
              onClick={onClose}
              className="mt-8 px-6 py-2.5 rounded-full border border-[var(--border-color)] text-xs uppercase tracking-wider font-semibold hover:bg-[var(--bg-main)] transition-all"
            >
              Exit Breathing
            </button>
          </div>
        </div>
      );
    }
export default BreathingModal;