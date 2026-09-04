import { useEffect, useState } from "react";
import { api } from "../../services/api";

function PracticeFlow({ onSelectPractice }) {
  const [activePractice, setActivePractice] = useState(0);
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api("/classes");

        console.log("Classes from backend:", response.data);

        setPractices(response.data);
      } catch (error) {
        console.error("Failed to load classes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section
        id="practice"
        className="py-28 px-6 bg-[var(--bg-surface)] relative"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">Loading practices...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="practice"
        className="py-28 px-6 bg-[var(--bg-surface)] relative"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-red-400">Unable to load yoga classes.</p>

          <p className="text-xs opacity-60 mt-2">{error}</p>
        </div>
      </section>
    );
  }

  // No classes
  if (practices.length === 0) {
    return (
      <section
        id="practice"
        className="py-28 px-6 bg-[var(--bg-surface)] relative"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">
            No yoga classes are currently available.
          </p>
        </div>
      </section>
    );
  }

  const activeClass = practices[activePractice];

  return (
    <section
      id="practice"
      className="py-28 px-6 bg-[var(--bg-surface)] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-semibold">
            CURATED DISCIPLINES
          </span>

          <h2 className="text-2xl sm:text-6xl font-display font-extrabold tracking-tight mt-2 leading-tight">
            CHOOSE YOUR FLOW
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Practice Options */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {practices.map((item, idx) => (
              <button
                key={item._id}
                onClick={() => setActivePractice(idx)}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  activePractice === idx
                    ? "bg-[var(--bg-main)] border-[var(--accent-primary)] shadow-xl scale-105"
                    : "bg-[var(--card-bg)] border-[var(--border-color)] opacity-70 hover:opacity-100"
                }`}
              >
                <span className="text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display font-bold text-lg mt-1">
                  {item.title}
                </h3>

                <p className="text-xs opacity-75 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </button>
            ))}
          </div>

          {/* Dynamic Image & Action */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--border-color)] group">
              <img
                src={activeClass.image}
                alt={activeClass.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs font-bold tracking-widest text-[var(--accent-gold)] uppercase">
                  SELECTED PRACTICE
                </span>

                <h3 className="text-3xl font-display font-bold mt-1">
                  {activeClass.title}
                </h3>

                <p className="text-sm opacity-80 mt-2 max-w-md font-light">
                  {activeClass.description}
                </p>

                <button
                  onClick={() => onSelectPractice(activeClass)}
                  className="mt-6 self-start px-6 py-3 rounded-full bg-[var(--accent-primary)] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
                >
                  BOOK THIS FLOW →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PracticeFlow;
