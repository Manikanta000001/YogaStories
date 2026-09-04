import { Sparkles, Plus, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHero = () => {
  const navigate = useNavigate();

  return(<section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 app-card bg-gradient-to-r from-bg-surface via-bg-surface to-accent-primary/5 animate-slide-up">
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-1 inline-flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Studio Dashboard
      </span>

      <h2 className="text-3xl font-extrabold tracking-tight text-text-main mb-1.5">
        Good morning, Leena
      </h2>

      <p className="text-sm text-text-muted">
        Here's what's happening with your YogaPT operations today.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() =>  navigate("/sessions")}
        className="px-5 py-3 rounded-xl bg-accent-primary text-white font-semibold text-xs flex items-center gap-2 hover:bg-accent-hover transition-all duration-200 interactive-btn shadow-md hover:shadow-accent-primary/25"
      >
        <Plus className="w-4 h-4" /> Create Session
      </button>

      <button
        onClick={() =>  navigate("/classes")}
        className="px-5 py-3 rounded-xl bg-bg-surface border border-border-color text-text-main font-semibold text-xs hover:bg-bg-main transition-all duration-200 interactive-btn hover:border-accent-primary/40"
      >
        Add Class
      </button>

      <button
         onClick={() =>  navigate("/bookings")}
        className="px-5 py-3 rounded-xl bg-bg-surface border border-border-color text-text-main font-semibold text-xs hover:bg-bg-main transition-all duration-200 interactive-btn hover:border-accent-primary/40 flex items-center gap-2"
      >
        <CalendarCheck className="w-4 h-4" /> View Bookings
      </button>
    </div>
  </section>);
  
  };

export default DashboardHero;