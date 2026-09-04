function ClassesSection({ onOpenBooking }) {
  const classesList = [
    {
      id: "01",
      title: "PERSONAL YOGA",
      duration: "60 MIN",
      desc: "Customized 1-on-1 session targeted to individual mobility goals and posture refining.",
    },
    {
      id: "02",
      title: "GROUP YOGA",
      duration: "60 MIN",
      desc: "High-energy small group sessions cultivating shared breath and collective movement.",
    },
    {
      id: "03",
      title: "ONLINE VIRTUAL YOGA",
      duration: "45 MIN",
      desc: "Interactive live guidance from the comfort of your home with tailored adjustments.",
    },
  ];

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-sage)] font-semibold">
          TRAINING FORMATS
        </span>
        <h2 className="text-2xl sm:text-6xl font-display font-extrabold tracking-tight mt-2 leading-tight">
          SESSION EXPERIENCES
        </h2>
      </div>

      <div className="space-y-6">
        {classesList.map((cls) => (
          <div
            key={cls.id}
            className="p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--bg-surface)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:shadow-2xl"
          >
            <div className="flex items-start md:items-center gap-6">
              <span className="text-3xl font-display font-extrabold opacity-40 group-hover:text-[var(--accent-primary)] group-hover:opacity-100 transition-all">
                {cls.id}
              </span>
              <div>
                <h3 className="text-2xl font-display font-bold">{cls.title}</h3>
                <p className="text-xs opacity-75 max-w-md mt-1">{cls.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-center">
              <span className="px-4 py-1.5 rounded-full border border-[var(--border-color)] text-xs font-semibold">
                {cls.duration}
              </span>
              <button
                onClick={() => onOpenBooking(cls.title)}
                className="px-6 py-3 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
              >
                BOOK →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default ClassesSection;
