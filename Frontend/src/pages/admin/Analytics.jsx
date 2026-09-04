import React, { useState, useRef, useEffect } from 'react';
import {
  BarChart3,
  BarChart,
  Moon,
  Sun,
  RefreshCw,
  Download,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Calendar,
  ArrowRightLeft,
  CalendarCheck,
  TrendingUp,
  IndianRupee,
  Users,
  UserCheck,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';
import AdminLayout from '../../components/admin/layout/AdminLayout';

const AppStyles = () => (
  <style>{`
    :root {
      --bg-main: #F8FAFC;
      --bg-surface: #FFFFFF;
      --bg-card: #FFFFFF;
      --accent-primary: #4F46E5;
      --accent-hover: #4338CA;
      --text-main: #0F172A;
      --text-muted: #64748B;
      --border-color: #E2E8F0;
      --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    .dark {
      --bg-main: #090D16;
      --bg-surface: #0F172A;
      --bg-card: #131E33;
      --accent-primary: #6366F1;
      --accent-hover: #4F46E5;
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --border-color: #1E293B;
      --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }

    /* Enhanced Card Transitions with Soft Springs */
    .app-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      box-shadow: var(--shadow-sm);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, box-shadow, border-color;
      position: relative;
      overflow: hidden;
    }

    .app-card:hover {
      box-shadow: 0 14px 28px -6px rgba(99, 102, 241, 0.12), 0 8px 12px -4px rgba(0, 0, 0, 0.04);
      border-color: rgba(99, 102, 241, 0.4);
      transform: translateY(-2px);
    }

    /* Ambient Subtle Sheen Card Reflection */
    .app-card::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .app-card:hover::after {
      opacity: 1;
    }

    .chart-glow {
      filter: drop-shadow(0px 8px 20px rgba(99, 102, 241, 0.25));
      transition: filter 0.4s ease;
    }

    .chart-glow:hover {
      filter: drop-shadow(0px 10px 26px rgba(99, 102, 241, 0.4));
    }

    /* Keyframe Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(14px) scale(0.99); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Staggered load animations */
    @keyframes cardStagger {
      0% { opacity: 0; transform: translateY(18px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .animate-stagger-1 { animation: cardStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
    .animate-stagger-2 { animation: cardStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both; }
    .animate-stagger-3 { animation: cardStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both; }
    .animate-stagger-4 { animation: cardStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both; }
    .animate-stagger-5 { animation: cardStagger 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.30s both; }

    @keyframes lineDraw {
      from { stroke-dashoffset: 1400; }
      to { stroke-dashoffset: 0; }
    }

    @keyframes areaFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }

    @keyframes glowPulse {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.08); }
    }

    @keyframes barGrow {
      0% { transform: scaleY(0); opacity: 0.2; }
      70% { transform: scaleY(1.04); }
      100% { transform: scaleY(1); opacity: 1; }
    }

    @keyframes barGlowEffect {
      0%, 100% { filter: drop-shadow(0 0 2px transparent); }
      50% { filter: drop-shadow(0 -4px 8px rgba(99, 102, 241, 0.5)); }
    }

    @keyframes donutSpinIn {
      0% { stroke-dasharray: 0 100; stroke-dashoffset: 0; transform: scale(0.92); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes sweepLight {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }

    .animate-line-draw {
      stroke-dasharray: 1400;
      stroke-dashoffset: 1400;
      animation: lineDraw 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-area-fade {
      animation: areaFade 1.2s ease-out 0.25s forwards;
    }

    .animate-float {
      animation: floatSlow 4s ease-in-out infinite;
    }

    .animate-glow-pulse {
      animation: glowPulse 2.5s ease-in-out infinite;
    }

    .animate-badge {
      animation: badgePulse 3s ease-in-out infinite;
    }

    /* Staggered dynamic Bar Chart Animations */
    .bar-animate {
      transform-origin: bottom;
      animation: barGrow 0.85s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
    }

    .bar-delay-1 { animation-delay: 0.05s; }
    .bar-delay-2 { animation-delay: 0.12s; }
    .bar-delay-3 { animation-delay: 0.18s; }
    .bar-delay-4 { animation-delay: 0.24s; }
    .bar-delay-5 { animation-delay: 0.30s; }
    .bar-delay-6 { animation-delay: 0.36s; }

    .interactive-bar {
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, filter 0.25s ease;
      transform-origin: bottom;
      cursor: pointer;
    }

    .interactive-bar:hover {
      opacity: 1 !important;
      transform: scaleY(1.08) scaleX(1.15);
      filter: brightness(1.25) drop-shadow(0 -4px 10px rgba(99, 102, 241, 0.6));
    }

    /* Progress bar leading edge sheen effect */
    .progress-bar-container {
      position: relative;
      overflow: hidden;
    }

    .progress-bar-fill {
      transition: width 1.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .progress-bar-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
      animation: sweepLight 2.8s infinite ease-in-out;
    }

    .group:hover .progress-bar-fill {
      filter: brightness(1.18) drop-shadow(0 0 6px currentColor);
    }

    /* Node & Interactive hover enhancements */
    .chart-node {
      transition: r 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), stroke-width 0.25s ease, fill 0.25s ease, filter 0.25s ease;
      cursor: pointer;
    }
    
    .chart-node:hover {
      filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.95));
    }

    .donut-segment {
      transition: stroke-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease, opacity 0.3s ease;
      cursor: pointer;
    }

    .donut-segment:hover {
      stroke-width: 5;
      filter: drop-shadow(0 0 8px currentColor);
      opacity: 1;
    }
  `}</style>
);

const TopHeader = ({
  isDark,
  onToggleTheme,
  viewState,
  onSetViewState,
  onRefresh,
  isRefreshing,
  lastUpdated,
  onExport
}) => {
  const [exportOpen, setExportOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4  border-[var(--border-color)] pb-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[var(--accent-primary)]/20 animate-float">
            <BarChart3 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[var(--text-main)] transition-colors duration-300">
                Analytics &amp; Insights
              </h1>
             
            </div>
            <p className="text-xs font-medium text-[var(--text-muted)] mt-0.5 transition-colors duration-300">
              Understand bookings, revenue, attendance and client activity across YogaPT.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE GLOBAL CONTROLS */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Prototype View State Switcher */}
        <div className="flex items-center bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-1 text-xs font-medium shadow-xs transition-all duration-300">
          {['data', 'loading', 'empty', 'error'].map((st) => {
            const isActive = viewState === st;
            const labels = { data: 'Data', loading: 'Skeleton', empty: 'Empty', error: 'Error' };
            return (
              <button
                key={st}
                onClick={() => onSetViewState(st)}
                className={`px-2.5 py-1.5 rounded-lg transition-all duration-300 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-md translate-y-[-1px]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)]'
                }`}
              >
                {labels[st]}
              </button>
            );
          })}
        </div>


        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 text-xs font-medium cursor-pointer hover:border-indigo-500/30"
          title="Refresh Analytics Data"
        >
          <RefreshCw
            className={`w-4 h-4 transition-transform duration-700 ease-in-out ${isRefreshing ? 'rotate-180 text-[var(--accent-primary)]' : ''}`}
          />
          <span className="hidden sm:inline text-[11px] text-[var(--text-muted)] font-normal transition-colors duration-300">
            {lastUpdated}
          </span>
        </button>

        {/* Export Menu */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={() => setExportOpen((prev) => !prev)}
            className="px-4 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] font-semibold text-xs flex items-center gap-2 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" /> Export Report
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${exportOpen ? 'rotate-180' : ''}`} />
          </button>

          {exportOpen && (
            <div className="absolute right-0 mt-2 w-48 app-card p-1.5 shadow-2xl z-50 animate-fade-in border border-[var(--border-color)]">
              <button
                onClick={() => {
                  setExportOpen(false);
                  onExport('CSV');
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-main)] hover:bg-[var(--bg-main)] flex items-center gap-2 transition-all duration-200 hover:translate-x-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--accent-primary)]" /> Export CSV Data
              </button>
              <button
                onClick={() => {
                  setExportOpen(false);
                  onExport('PDF');
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-main)] hover:bg-[var(--bg-main)] flex items-center gap-2 transition-all duration-200 hover:translate-x-1 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Export Executive PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const FilterBar = ({
  filters,
  onFilterChange,
  onResetFilters
}) => {
  return (
    <section className="mb-8 p-4 app-card flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 animate-stagger-1">
      {/* Date Range Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)] shadow-xs transition-all duration-300 hover:border-indigo-500/40">
          <Calendar className="w-4 h-4 text-[var(--accent-primary)] transition-transform duration-300 group-hover:scale-110" />
          <span>Date Range:</span>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="bg-transparent focus:outline-none text-[var(--accent-primary)] font-bold cursor-pointer transition-colors duration-200"
          >
            <option value="today" className="bg-[var(--bg-card)] text-[var(--text-main)]">Today</option>
            <option value="7d" className="bg-[var(--bg-card)] text-[var(--text-main)]">Last 7 Days</option>
            <option value="30d" className="bg-[var(--bg-card)] text-[var(--text-main)]">Last 30 Days</option>
            <option value="3m" className="bg-[var(--bg-card)] text-[var(--text-main)]">Last 3 Months</option>
            <option value="6m" className="bg-[var(--bg-card)] text-[var(--text-main)]">Last 6 Months</option>
            <option value="year" className="bg-[var(--bg-card)] text-[var(--text-main)]">This Year</option>
            <option value="custom" className="bg-[var(--bg-card)] text-[var(--text-main)]">Custom Range</option>
          </select>
        </div>
        <span className="text-[11px] font-medium text-[var(--text-muted)] hidden sm:flex items-center gap-1 transition-colors duration-300">
          <ArrowRightLeft className="w-3 h-3 text-emerald-500 animate-pulse" /> Compared with previous period
        </span>
      </div>

      {/* Analytical Filters */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        {/* Class Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 hover:border-indigo-500/40">
          <span className="text-[var(--text-muted)] font-medium">Class:</span>
          <select
            value={filters.classType}
            onChange={(e) => onFilterChange('classType', e.target.value)}
            className="bg-transparent font-medium text-[var(--text-main)] focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[var(--bg-card)]">All Classes</option>
            <option value="Morning Flow" className="bg-[var(--bg-card)]">Morning Flow</option>
            <option value="Power Yoga" className="bg-[var(--bg-card)]">Power Yoga</option>
            <option value="Hatha Yoga" className="bg-[var(--bg-card)]">Hatha Yoga</option>
            <option value="Evening Relaxation" className="bg-[var(--bg-card)]">Evening Relaxation</option>
            <option value="Meditation" className="bg-[var(--bg-card)]">Meditation</option>
          </select>
        </div>

        {/* Session Type Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 hover:border-indigo-500/40">
          <span className="text-[var(--text-muted)] font-medium">Type:</span>
          <select
            value={filters.sessionType}
            onChange={(e) => onFilterChange('sessionType', e.target.value)}
            className="bg-transparent font-medium text-[var(--text-main)] focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[var(--bg-card)]">All Types</option>
            <option value="paid" className="bg-[var(--bg-card)]">Paid Sessions</option>
            <option value="free" className="bg-[var(--bg-card)]">Free Sessions</option>
          </select>
        </div>

        {/* Booking Status Filter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 hover:border-indigo-500/40">
          <span className="text-[var(--text-muted)] font-medium">Status:</span>
          <select
            value={filters.bookingStatus}
            onChange={(e) => onFilterChange('bookingStatus', e.target.value)}
            className="bg-transparent font-medium text-[var(--text-main)] focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[var(--bg-card)]">All Statuses</option>
            <option value="confirmed" className="bg-[var(--bg-card)]">Confirmed</option>
            <option value="cancelled" className="bg-[var(--bg-card)]">Cancelled</option>
          </select>
        </div>

        <button
          onClick={onResetFilters}
          className="px-3 py-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] font-medium hover:bg-[var(--bg-main)] transition-all duration-200 active:scale-95 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </section>
  );
};

const KPICards = () => {
  const cards = [
    {
      title: 'Total Bookings',
      value: '324',
      change: '+12.4%',
      period: 'vs previous 30 days',
      icon: CalendarCheck,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      delayClass: 'animate-stagger-1'
    },
    {
      title: 'Total Revenue',
      value: '₹1,48,500',
      change: '+8.7%',
      period: 'vs previous 30 days',
      icon: IndianRupee,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      delayClass: 'animate-stagger-2'
    },
    {
      title: 'Active Clients',
      value: '231',
      change: '+6.2%',
      period: 'vs previous 30 days',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      delayClass: 'animate-stagger-3'
    },
    {
      title: 'Session Attendance',
      value: '87%',
      change: '+4.1%',
      period: 'vs previous 30 days',
      icon: UserCheck,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      delayClass: 'animate-stagger-4'
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`app-card p-6 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 ${item.delayClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors duration-200">
                {item.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[var(--text-main)] tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                {item.value}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 mt-2">
                <TrendingUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                <span className="font-bold">{item.change}</span>
                <span className="text-[var(--text-muted)] font-normal">{item.period}</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const RevenueOverviewChart = () => {
  const [tooltip, setTooltip] = useState(null);
  const [activePoint, setActivePoint] = useState(null);
  const [crosshairX, setCrosshairX] = useState(null);
  const svgRef = useRef(null);

  const points = [
    { id: 0, cx: 0, cy: 160, date: 'Aug 1', rev: '₹3,500', paid: '7' },
    { id: 1, cx: 133, cy: 140, date: 'Aug 5', rev: '₹4,800', paid: '10' },
    { id: 2, cx: 266, cy: 170, date: 'Aug 10', rev: '₹3,200', paid: '6' },
    { id: 3, cx: 400, cy: 90, date: 'Aug 15', rev: '₹6,500', paid: '13' },
    { id: 4, cx: 533, cy: 110, date: 'Aug 20', rev: '₹5,800', paid: '12' },
    { id: 5, cx: 666, cy: 50, date: 'Aug 25', rev: '₹8,200', paid: '16' },
    { id: 6, cx: 800, cy: 75, date: '28 Aug', rev: '₹7,500', paid: '15', pulse: true }
  ];

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * 800;
    setCrosshairX(Math.max(0, Math.min(800, svgX)));
  };

  const handleMouseLeave = () => {
    setCrosshairX(null);
  };

  const handlePointClick = (pt, e) => {
    e.stopPropagation();
    setActivePoint(pt.id);
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
    setTooltip({
      date: pt.date,
      rev: pt.rev,
      paid: pt.paid,
      left: rect.left - parentRect.left - 40,
      top: rect.top - parentRect.top - 80
    });
  };

  useEffect(() => {
    const handleOutside = () => {
      setTooltip(null);
      setActivePoint(null);
    };
    if (tooltip) {
      window.addEventListener('click', handleOutside);
      return () => window.removeEventListener('click', handleOutside);
    }
  }, [tooltip]);

  return (
    <section className="app-card p-6 lg:p-8 animate-stagger-2 group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
            Revenue Overview
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 animate-badge border border-emerald-500/20">
              ₹ INR
            </span>
          </h3>
          <p className="text-xs text-[var(--text-muted)] transition-colors duration-300">
            Daily revenue performance across paid sessions and workshops.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)]">
            <span className="w-3 h-3 rounded-full bg-[var(--accent-primary)] animate-glow-pulse"></span>
            <span className="text-[var(--text-muted)] font-semibold">Revenue (₹)</span>
          </div>
        </div>
      </div>

      {/* SVG Line Chart with Dynamic Hover & Node Pulsing */}
      <div 
        className="relative w-full h-72 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          ref={svgRef}
          className="w-full h-full overflow-visible chart-glow"
          viewBox="0 0 800 240"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          <line x1="0" y1="40" x2="800" y2="40" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.6" />
          <line x1="0" y1="90" x2="800" y2="90" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.6" />
          <line x1="0" y1="140" x2="800" y2="140" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.6" />
          <line x1="0" y1="190" x2="800" y2="190" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.6" />

          {/* Interactive Hover Crosshair */}
          {crosshairX !== null && (
            <line
              x1={crosshairX}
              y1="0"
              x2={crosshairX}
              y2="240"
              stroke="var(--accent-primary)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="0.8"
              className="pointer-events-none transition-opacity duration-200"
            />
          )}

          {/* Area Fill */}
          <polygon
            points="0,210 0,160 133,140 266,170 400,90 533,110 666,50 800,75 800,210"
            fill="url(#revenueGradient)"
            className="animate-area-fade"
          />

          {/* Line Path */}
          <path
            className="animate-line-draw"
            d="M 0 160 L 133 140 L 266 170 L 400 90 L 533 110 L 666 50 L 800 75"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Interactive Points */}
          {points.map((pt) => {
            const isSelected = activePoint === pt.id;
            return (
              <circle
                key={pt.id}
                cx={pt.cx}
                cy={pt.cy}
                r={isSelected ? 8 : pt.pulse ? 6 : 5}
                fill={pt.pulse || isSelected ? 'var(--accent-primary)' : 'var(--bg-card)'}
                stroke={pt.pulse || isSelected ? 'var(--bg-card)' : 'var(--accent-primary)'}
                strokeWidth={isSelected ? 4 : 3}
                className={`chart-node ${
                  pt.pulse ? 'animate-pulse hover:r-8' : 'hover:r-7'
                }`}
                onClick={(e) => handlePointClick(pt, e)}
              />
            );
          })}
        </svg>

        {/* Custom Interactive Floating Tooltip */}
        {tooltip && (
          <div
            className="absolute p-3 app-card shadow-2xl pointer-events-none text-xs z-20 border-accent-primary/40 min-w-[130px] animate-fade-in backdrop-blur-sm"
            style={{ left: `${tooltip.left}px`, top: `${tooltip.top}px` }}
          >
            <div className="font-bold text-[var(--text-main)] mb-1 flex items-center justify-between">
              <span>{tooltip.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
            </div>
            <div className="text-[var(--accent-primary)] font-black text-sm">{tooltip.rev}</div>
            <div className="text-[var(--text-muted)] mt-0.5">Paid bookings: {tooltip.paid}</div>
          </div>
        )}
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between text-xs text-[var(--text-muted)] mt-4 font-medium px-1">
        <span className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer">Aug 1</span>
        <span className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer">Aug 5</span>
        <span className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer">Aug 10</span>
        <span className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer">Aug 15</span>
        <span className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer">Aug 20</span>
        <span className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer">Aug 25</span>
        <span className="font-bold text-[var(--accent-primary)] hover:scale-105 transition-transform cursor-pointer">30 Aug</span>
      </div>
    </section>
  );
};

const BookingsOverviewAndDonut = () => {
  const [barTooltip, setBarTooltip] = useState(null);
  const [activeSegment, setActiveSegment] = useState(null);

  const barGroups = [
    { label: 'Aug 1', total: 80, paid: 60, free: 20, delay: 'bar-delay-1', xTotal: 30, yTotal: 70, hTotal: 80, xPaid: 44, yPaid: 90, hPaid: 60, xFree: 58, yFree: 130, hFree: 20 },
    { label: 'Aug 8', total: 100, paid: 70, free: 30, delay: 'bar-delay-2', xTotal: 120, yTotal: 50, hTotal: 100, xPaid: 134, yPaid: 80, hPaid: 70, xFree: 148, yFree: 120, hFree: 30 },
    { label: 'Aug 15', total: 110, paid: 85, free: 25, delay: 'bar-delay-3', xTotal: 210, yTotal: 40, hTotal: 110, xPaid: 224, yPaid: 65, hPaid: 85, xFree: 238, yFree: 125, hFree: 25 },
    { label: 'Aug 22', total: 90, paid: 65, free: 25, delay: 'bar-delay-4', xTotal: 300, yTotal: 60, hTotal: 90, xPaid: 314, yPaid: 85, hPaid: 65, xFree: 328, yFree: 125, hFree: 25 },
    { label: '28 Aug', total: 125, paid: 95, free: 30, delay: 'bar-delay-5', xTotal: 390, yTotal: 25, hTotal: 125, xPaid: 404, yPaid: 55, hPaid: 95, xFree: 418, yFree: 120, hFree: 30 },
    { label: 'Aug 30', total: 105, paid: 80, free: 25, delay: 'bar-delay-6', xTotal: 480, yTotal: 45, hTotal: 105, xPaid: 494, yPaid: 70, hPaid: 80, xFree: 508, yFree: 125, hFree: 25 },
  ];

  const handleBarHover = (e, group, type, count) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
    setBarTooltip({
      label: group.label,
      type,
      count,
      left: rect.left - parentRect.left - 20,
      top: rect.top - parentRect.top - 60
    });
  };

  const handleBarLeave = () => {
    setBarTooltip(null);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-stagger-3">
      {/* Bookings Trend (Multi-Series Bar Chart) */}
      <div className="lg:col-span-7 app-card p-6 lg:p-8 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Bookings Overview</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Total, Paid, and Free bookings breakdown over time.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[var(--accent-primary)] hover:scale-105 transition-transform cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse"></span> Total
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500 hover:scale-105 transition-transform cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Paid
              </span>
              <span className="flex items-center gap-1.5 text-amber-500 hover:scale-105 transition-transform cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> Free
              </span>
            </div>
          </div>

          {/* SVG Bar Chart with Pop-out Hover effect & Animated Stagger */}
          <div className="w-full h-56 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="600" y2="30" stroke="var(--border-color)" strokeDasharray="3" opacity="0.5" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="var(--border-color)" strokeDasharray="3" opacity="0.5" />
              <line x1="0" y1="130" x2="600" y2="130" stroke="var(--border-color)" strokeDasharray="3" opacity="0.5" />

              {barGroups.map((g, idx) => (
                <g key={idx} className="transition-all duration-300">
                  {/* Total Bar */}
                  <rect
                    x={g.xTotal}
                    y={g.yTotal}
                    width="12"
                    height={g.hTotal}
                    fill="var(--accent-primary)"
                    rx="3"
                    className={`interactive-bar bar-animate ${g.delay}`}
                    onMouseEnter={(e) => handleBarHover(e, g, 'Total Bookings', g.total)}
                    onMouseLeave={handleBarLeave}
                  />
                  {/* Paid Bar */}
                  <rect
                    x={g.xPaid}
                    y={g.yPaid}
                    width="12"
                    height={g.hPaid}
                    fill="#10B981"
                    rx="3"
                    className={`interactive-bar bar-animate ${g.delay}`}
                    onMouseEnter={(e) => handleBarHover(e, g, 'Paid Bookings', g.paid)}
                    onMouseLeave={handleBarLeave}
                  />
                  {/* Free Bar */}
                  <rect
                    x={g.xFree}
                    y={g.yFree}
                    width="12"
                    height={g.hFree}
                    fill="#F59E0B"
                    rx="3"
                    className={`interactive-bar bar-animate ${g.delay}`}
                    onMouseEnter={(e) => handleBarHover(e, g, 'Free Bookings', g.free)}
                    onMouseLeave={handleBarLeave}
                  />
                </g>
              ))}
            </svg>

            {/* Custom Bar Hover Tooltip */}
            {barTooltip && (
              <div
                className="absolute p-2.5 app-card shadow-2xl pointer-events-none text-xs z-30 border-accent-primary/40 min-w-[120px] animate-fade-in backdrop-blur-md"
                style={{ left: `${barTooltip.left}px`, top: `${barTooltip.top}px` }}
              >
                <div className="font-bold text-[var(--text-main)] text-[11px] mb-0.5">{barTooltip.label}</div>
                <div className="font-extrabold text-[var(--accent-primary)] text-sm flex items-center justify-between">
                  <span>{barTooltip.type}</span>
                  <span>{barTooltip.count}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-3 font-medium px-2">
          {barGroups.map((g, i) => (
            <span
              key={i}
              className={`transition-colors cursor-pointer hover:text-[var(--accent-primary)] ${
                g.label === '28 Aug' ? 'font-bold text-[var(--accent-primary)] hover:scale-105 transition-transform' : ''
              }`}
            >
              {g.label}
            </span>
          ))}
        </div>
      </div>

      {/* Booking Type Donut (Free vs Paid) */}
      <div className="lg:col-span-5 app-card p-6 lg:p-8 flex flex-col justify-between group">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)] mb-1">Booking Type</h3>
          <p className="text-xs text-[var(--text-muted)] mb-6">Distribution between paid and free trial bookings.</p>

          {/* Donut Graphic with Interactive Rotate & Floating Centre */}
          <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90 transition-transform duration-700 hover:rotate-[-70deg] hover:scale-105"
              viewBox="0 0 36 36"
            >
              {/* Background ring */}
              <path
                className="text-[var(--bg-main)]"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Free Segment (28%) */}
              <path
                className={`donut-segment text-amber-500 opacity-90 ${activeSegment === 'free' ? 'stroke-[5] opacity-100' : ''}`}
                strokeDasharray="28, 100"
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                onMouseEnter={() => setActiveSegment('free')}
                onMouseLeave={() => setActiveSegment(null)}
              />
              {/* Paid Segment (72%) */}
              <path
                className={`donut-segment text-[var(--accent-primary)] opacity-95 ${activeSegment === 'paid' ? 'stroke-[5] opacity-100' : ''}`}
                strokeDasharray="72, 100"
                strokeDashoffset="-28"
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                onMouseEnter={() => setActiveSegment('paid')}
                onMouseLeave={() => setActiveSegment(null)}
              />
            </svg>
            {/* Donut Center Label with Float */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none animate-float">
              <span className="text-2xl font-black text-[var(--text-main)] transition-transform duration-300 group-hover:scale-110">
                {activeSegment === 'paid' ? '233' : activeSegment === 'free' ? '91' : '324'}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)]">
                {activeSegment === 'paid' ? 'Paid (72%)' : activeSegment === 'free' ? 'Free (28%)' : 'Total Bookings'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border-color)] text-xs">
          <div
            onMouseEnter={() => setActiveSegment('paid')}
            onMouseLeave={() => setActiveSegment(null)}
            className={`p-3 rounded-xl bg-[var(--bg-main)] border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
              activeSegment === 'paid' ? 'border-indigo-500 shadow-md scale-[1.02]' : 'border-[var(--border-color)] hover:border-indigo-500/40'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-[var(--accent-primary)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse"></span> Paid (72%)
            </div>
            <div className="text-base font-black text-[var(--text-main)] mt-1">233</div>
          </div>
          <div
            onMouseEnter={() => setActiveSegment('free')}
            onMouseLeave={() => setActiveSegment(null)}
            className={`p-3 rounded-xl bg-[var(--bg-main)] border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
              activeSegment === 'free' ? 'border-amber-500 shadow-md scale-[1.02]' : 'border-[var(--border-color)] hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-amber-500">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> Free (28%)
            </div>
            <div className="text-base font-black text-[var(--text-main)] mt-1">91</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClassPerformanceAndOccupancy = () => {
  const popularClasses = [
    { name: 'Morning Flow', count: '84 bookings', width: '100%' },
    { name: 'Power Yoga', count: '72 bookings', width: '85%' },
    { name: 'Hatha Yoga', count: '58 bookings', width: '69%' },
    { name: 'Evening Relaxation', count: '42 bookings', width: '50%' },
    { name: 'Meditation', count: '31 bookings', width: '37%' }
  ];

  const occupancyClasses = [
    { name: 'Power Yoga', rate: '91%', color: 'bg-emerald-500', hoverText: 'group-hover:text-emerald-500', textClass: 'text-emerald-500' },
    { name: 'Morning Flow', rate: '86%', color: 'bg-indigo-500', hoverText: 'group-hover:text-indigo-500', textClass: 'text-indigo-500' },
    { name: 'Hatha Yoga', rate: '74%', color: 'bg-blue-500', hoverText: 'group-hover:text-blue-500', textClass: 'text-blue-500' },
    { name: 'Evening Relaxation', rate: '68%', color: 'bg-amber-500', hoverText: 'group-hover:text-amber-500', textClass: 'text-amber-500' },
    { name: 'Meditation', rate: '59%', color: 'bg-slate-400', hoverText: 'group-hover:text-slate-300', textClass: 'text-slate-400' }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-stagger-4">
      {/* Popular Classes Horizontal Bar Chart */}
      <div className="app-card p-6 lg:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Popular Classes</h3>
              <p className="text-xs text-[var(--text-muted)]">Top class offerings by total booking volume.</p>
            </div>
            <a
              href="#classes"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1 group/link"
            >
              View All Classes{' '}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </a>
          </div>

          <div className="space-y-4">
            {popularClasses.map((c, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex justify-between text-xs font-bold text-[var(--text-main)] mb-1.5">
                  <span className="group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all duration-200">
                    {c.name}
                  </span>
                  <span className="text-[var(--accent-primary)] font-semibold transition-transform duration-200 group-hover:scale-105">
                    {c.count}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
                  <div
                    className="h-full bg-[var(--accent-primary)] rounded-full progress-bar-fill"
                    style={{ width: c.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Occupancy Metrics */}
      <div className="app-card p-6 lg:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">Session Occupancy</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Average capacity utilization across active sessions.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold animate-badge border border-emerald-500/20">
              Avg 78%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] mb-5 text-xs flex items-center justify-between transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xs">
            <span className="text-[var(--text-muted)] font-medium">Highest Occupancy Class</span>
            <span className="font-bold text-emerald-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} /> Power Yoga · 91%
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {occupancyClasses.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="flex justify-between font-bold text-[var(--text-main)] mb-1">
                  <span className={`${item.hoverText} group-hover:translate-x-1 transition-all duration-200`}>
                    {item.name}
                  </span>
                  <span className={`${item.textClass} transition-transform duration-200 group-hover:scale-105`}>
                    {item.rate}
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--bg-main)] rounded-full overflow-hidden border border-[var(--border-color)]">
                  <div
                    className={`h-full ${item.color} rounded-full progress-bar-fill`}
                    style={{ width: item.rate }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AttendanceAndGrowth = () => {
  const [crosshairX, setCrosshairX] = useState(null);
  const [growthTooltip, setGrowthTooltip] = useState(null);
  const [activeGrowthNode, setActiveGrowthNode] = useState(null);
  const svgRef = useRef(null);

  const growthPoints = [
    { id: 0, cx: 0, cy: 110, date: 'Aug 1', newCount: '+2 new', total: '180 active' },
    { id: 1, cx: 83, cy: 95, date: 'Aug 5', newCount: '+3 new', total: '192 active' },
    { id: 2, cx: 166, cy: 78, date: 'Aug 10', newCount: '+4 new', total: '204 active' },
    { id: 3, cx: 250, cy: 55, date: 'Aug 15', newCount: '+5 new', total: '215 active' },
    { id: 4, cx: 333, cy: 42, date: 'Aug 20', newCount: '+3 new', total: '221 active' },
    { id: 5, cx: 416, cy: 30, date: 'Aug 25', newCount: '+6 new', total: '227 active' },
    { id: 6, cx: 500, cy: 15, date: '28 Aug', newCount: '+4 new', total: '231 active', pulse: true }
  ];

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * 500;
    setCrosshairX(Math.max(0, Math.min(500, svgX)));
  };

  const handleMouseLeave = () => {
    setCrosshairX(null);
  };

  const handleGrowthPointClick = (pt, e) => {
    e.stopPropagation();
    setActiveGrowthNode(pt.id);
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
    setGrowthTooltip({
      date: pt.date,
      newCount: pt.newCount,
      total: pt.total,
      left: rect.left - parentRect.left - 45,
      top: rect.top - parentRect.top - 75
    });
  };

  useEffect(() => {
    const handleOutside = () => {
      setGrowthTooltip(null);
      setActiveGrowthNode(null);
    };
    if (growthTooltip) {
      window.addEventListener('click', handleOutside);
      return () => window.removeEventListener('click', handleOutside);
    }
  }, [growthTooltip]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-stagger-5">
      {/* Attendance Metric Card */}
      <div className="lg:col-span-5 app-card p-6 lg:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[var(--text-main)]">Attendance Breakdown</h3>
            <span className="text-xs text-[var(--text-muted)] font-medium">156 completed sessions</span>
          </div>

          {/* Attendance Stacked Segment Bar with micro-grow on hover */}
          <div className="space-y-4 my-4">
            <div className="w-full h-4 bg-[var(--bg-main)] rounded-full overflow-hidden flex gap-0.5 border border-[var(--border-color)] shadow-inner">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 hover:brightness-110 hover:scale-y-125 cursor-pointer"
                style={{ width: '82%' }}
                title="Attended 82%"
              />
              <div
                className="h-full bg-amber-500 transition-all duration-500 hover:brightness-110 hover:scale-y-125 cursor-pointer"
                style={{ width: '11%' }}
                title="Missed 11%"
              />
              <div
                className="h-full bg-rose-500 transition-all duration-500 hover:brightness-110 hover:scale-y-125 cursor-pointer"
                style={{ width: '7%' }}
                title="Cancelled 7%"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xs cursor-pointer">
                <span className="text-emerald-500 font-extrabold block text-sm">82%</span>
                <span className="text-[var(--text-muted)] text-[10px] font-medium">Attended</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xs cursor-pointer">
                <span className="text-amber-500 font-extrabold block text-sm">11%</span>
                <span className="text-[var(--text-muted)] text-[10px] font-medium">Missed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-rose-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xs cursor-pointer">
                <span className="text-rose-500 font-extrabold block text-sm">7%</span>
                <span className="text-[var(--text-muted)] text-[10px] font-medium">Cancelled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-xs text-[var(--text-muted)] flex items-start gap-2.5 transition-colors duration-300 hover:border-indigo-500/40">
          <Info className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5 animate-pulse" />
          <span>Attendance data automatically updates as trainers complete session check-ins on mobile.</span>
        </div>
      </div>

      {/* Enhanced Client Growth Line Chart */}
      <div className="lg:col-span-7 app-card p-6 lg:p-8 flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[var(--text-main)]">Client Growth</h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[11px] font-bold flex items-center gap-1 animate-badge border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" /> +6.2%
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                New client acquisitions &amp; active member scaling over time.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[var(--text-main)] tracking-tight block transition-all duration-300 group-hover:text-[var(--accent-primary)] group-hover:scale-105">
                231
              </span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Total Active
              </span>
            </div>
          </div>

          {/* Line Chart SVG with Interactive Crosshairs and Spring Nodes */}
          <div
            className="w-full h-48 relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              ref={svgRef}
              className="w-full h-full overflow-visible chart-glow"
              viewBox="0 0 500 140"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="clientGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              <line x1="0" y1="35" x2="500" y2="35" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.5" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.5" />
              <line x1="0" y1="105" x2="500" y2="105" stroke="var(--border-color)" strokeDasharray="4" strokeOpacity="0.5" />

              {/* Interactive Hover Crosshair */}
              {crosshairX !== null && (
                <line
                  x1={crosshairX}
                  y1="0"
                  x2={crosshairX}
                  y2="140"
                  stroke="var(--accent-primary)"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                  opacity="0.8"
                  className="pointer-events-none transition-opacity duration-200"
                />
              )}

              {/* Area Polygon */}
              <polygon
                points="0,140 0,110 83,95 166,78 250,55 333,42 416,30 500,15 500,140"
                fill="url(#clientGrowthGradient)"
                className="animate-area-fade"
              />

              {/* Path Line */}
              <path
                className="animate-line-draw"
                d="M 0 110 L 83 95 L 166 78 L 250 55 L 333 42 L 416 30 L 500 15"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Nodes */}
              {growthPoints.map((pt) => {
                const isSelected = activeGrowthNode === pt.id;
                return (
                  <circle
                    key={pt.id}
                    cx={pt.cx}
                    cy={pt.cy}
                    r={isSelected ? 7.5 : pt.pulse ? 6 : 4.5}
                    fill={pt.pulse || isSelected ? 'var(--accent-primary)' : 'var(--bg-card)'}
                    stroke={pt.pulse || isSelected ? 'var(--bg-card)' : 'var(--accent-primary)'}
                    strokeWidth={isSelected ? 3.5 : pt.pulse ? 3 : 2.5}
                    className={`chart-node ${
                      pt.pulse ? 'animate-pulse hover:r-8' : 'hover:r-7'
                    }`}
                    onClick={(e) => handleGrowthPointClick(pt, e)}
                  />
                );
              })}
            </svg>

            {/* Floating Tooltip */}
            {growthTooltip && (
              <div
                className="absolute p-3 app-card shadow-2xl pointer-events-none text-xs z-20 border-accent-primary/40 min-w-[130px] animate-fade-in backdrop-blur-sm"
                style={{ left: `${growthTooltip.left}px`, top: `${growthTooltip.top}px` }}
              >
                <div className="font-bold text-[var(--text-main)] mb-1 flex items-center justify-between">
                  <span>{growthTooltip.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="text-[var(--accent-primary)] font-black text-sm">
                  Acquisitions: {growthTooltip.newCount}
                </div>
                <div className="text-[var(--text-muted)] mt-0.5">{growthTooltip.total}</div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-3">
          <div className="flex justify-between text-xs text-[var(--text-muted)] font-medium px-1">
            <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Aug 1</span>
            <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Aug 5</span>
            <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Aug 10</span>
            <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Aug 15</span>
            <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Aug 20</span>
            <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors">Aug 25</span>
            <span className="font-bold text-[var(--accent-primary)] hover:scale-105 transition-transform inline-block cursor-pointer">
              28 Aug
            </span>
          </div>

          {/* Bottom Quick Insights Bar with Micro-Hovers */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-color)] text-center text-xs">
            <div className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xs cursor-pointer">
              <span className="text-[10px] text-[var(--text-muted)] block font-medium">Avg Signup</span>
              <span className="font-bold text-[var(--text-main)]">+3.8/day</span>
            </div>
            <div className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1 hover:shadow-xs cursor-pointer">
              <span className="text-[10px] text-[var(--text-muted)] block font-medium">Retention</span>
              <span className="font-bold text-emerald-500">94.2%</span>
            </div>
            <div className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 hover:shadow-xs cursor-pointer">
              <span className="text-[10px] text-[var(--text-muted)] block font-medium">Peak Day</span>
              <span className="font-bold text-[var(--accent-primary)]">Aug 25 (+6)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RecentActivityAndClients = () => {
  const activities = [
    { title: 'Priya Sharma booked Morning Flow', time: '2 minutes ago', dotColor: 'bg-[var(--accent-primary)]', hoverColor: 'group-hover:text-[var(--accent-primary)]' },
    { title: 'Rahul Kumar booked Hatha Yoga', time: '18 minutes ago', dotColor: 'bg-emerald-500', hoverColor: 'group-hover:text-emerald-500' },
    { title: 'New client: Ananya Rao registered', time: '1 hour ago', dotColor: 'bg-blue-500', hoverColor: 'group-hover:text-blue-500' },
    { title: 'Session cancelled: Evening Relaxation', time: '2 hours ago', dotColor: 'bg-rose-500', hoverColor: 'group-hover:text-rose-500' },
    { title: 'Announcement: Sunday Schedule', time: '3 hours ago', dotColor: 'bg-amber-500', hoverColor: 'group-hover:text-amber-500' }
  ];

  const clients = [
    {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      bookings: 18,
      sessions: 15,
      spent: '₹6,000'
    },
    {
      name: 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      bookings: 14,
      sessions: 12,
      spent: '₹4,500'
    },
    {
      name: 'Ananya Rao',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      bookings: 12,
      sessions: 10,
      spent: '₹4,000'
    }
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Recent Activity Timeline */}
      <div className="lg:col-span-4 app-card p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--accent-primary)] animate-float" /> Recent Activity
          </h3>

          <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[7px] before:w-[1px] before:bg-[var(--border-color)] text-xs">
            {activities.map((act, i) => (
              <div key={i} className="relative flex items-start gap-3 pl-5 group cursor-pointer">
                <div
                  className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full ${act.dotColor} ring-4 ring-[var(--bg-surface)] group-hover:scale-150 transition-all duration-300 shadow-sm`}
                />
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <p className={`font-bold text-[var(--text-main)] ${act.hoverColor} transition-colors`}>
                    {act.title}
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)]">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Active Clients Table */}
      <div className="lg:col-span-5 app-card p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[var(--text-main)]">Most Active Clients</h3>
            <a
              href="#clients"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline flex items-center gap-1 group/btn"
            >
              View Clients <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2">
                  <th className="pb-2 font-bold uppercase text-[10px]">Client</th>
                  <th className="pb-2 font-bold uppercase text-[10px] text-center">Bookings</th>
                  <th className="pb-2 font-bold uppercase text-[10px] text-center">Sessions</th>
                  <th className="pb-2 font-bold uppercase text-[10px] text-right">Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] font-medium">
                {clients.map((c, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[var(--bg-main)] transition-all duration-200 cursor-pointer group"
                  >
                    <td className="py-3 flex items-center gap-2.5">
                      <div className="relative">
                        <img
                          src={c.avatar}
                          className="w-7 h-7 rounded-full object-cover transition-transform duration-300 group-hover:scale-115 ring-2 ring-transparent group-hover:ring-[var(--accent-primary)]"
                          alt={c.name}
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/80x80/6366f1/ffffff?text=' + c.name.charAt(0);
                          }}
                        />
                      </div>
                      <span className="font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {c.name}
                      </span>
                    </td>
                    <td className="py-3 text-center transition-transform duration-200 group-hover:scale-110">{c.bookings}</td>
                    <td className="py-3 text-center transition-transform duration-200 group-hover:scale-110">{c.sessions}</td>
                    <td className="py-3 text-right font-bold text-emerald-500 transition-transform duration-200 group-hover:scale-105">{c.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="lg:col-span-3 app-card p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-[var(--text-main)] mb-4">Revenue Breakdown</h3>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xs cursor-pointer group">
              <span className="text-[var(--text-muted)] font-medium block">Paid Sessions</span>
              <span className="text-lg font-black text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                ₹1,25,000
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xs cursor-pointer group">
              <span className="text-[var(--text-muted)] font-medium block">Workshops &amp; Events</span>
              <span className="text-lg font-black text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                ₹15,000
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xs cursor-pointer group">
              <span className="text-[var(--text-muted)] font-medium block">Other Services</span>
              <span className="text-lg font-black text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                ₹8,500
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkeletonStateView = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="app-card p-6 h-32 shimmer bg-[var(--bg-surface)]/50" />
      <div className="app-card p-6 h-32 shimmer bg-[var(--bg-surface)]/50" />
      <div className="app-card p-6 h-32 shimmer bg-[var(--bg-surface)]/50" />
      <div className="app-card p-6 h-32 shimmer bg-[var(--bg-surface)]/50" />
    </div>
    <div className="app-card p-8 h-80 shimmer bg-[var(--bg-surface)]/50" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="app-card p-8 h-64 shimmer bg-[var(--bg-surface)]/50" />
      <div className="app-card p-8 h-64 shimmer bg-[var(--bg-surface)]/50" />
    </div>
  </div>
);

const EmptyStateView = ({ onResetRange }) => (
  <div className="app-card p-12 text-center max-w-xl mx-auto my-12 animate-fade-in shadow-xl">
    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-[var(--accent-primary)] flex items-center justify-center mx-auto mb-4 animate-float">
      <BarChart className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">Not enough data yet</h3>
    <p className="text-xs text-[var(--text-muted)] mb-6">
      There isn't enough activity in this date range to display meaningful analytics.
    </p>
    <button
      onClick={onResetRange}
      className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
    >
      Change Date Range
    </button>
  </div>
);

const ErrorStateView = ({ onRetry }) => (
  <div className="app-card p-12 text-center max-w-xl mx-auto my-12 animate-fade-in border-rose-500/30 shadow-xl">
    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 animate-float">
      <AlertTriangle className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">Unable to load analytics</h3>
    <p className="text-xs text-[var(--text-muted)] mb-6">
      Something went wrong while retrieving your analytics data from the YogaPT server.
    </p>
    <button
      onClick={onRetry}
      className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
    >
      Try Again
    </button>
  </div>
);

export default function Analytics() {
  const [isDark, setIsDark] = useState(false);
  const [viewState, setViewState] = useState('data');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Updated 2m ago');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [filters, setFilters] = useState({
    dateRange: '30d',
    classType: 'all',
    sessionType: 'all',
    bookingStatus: 'all'
  });

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: '30d',
      classType: 'all',
      sessionType: 'all',
      bookingStatus: 'all'
    });
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
      showToast('Analytics data refreshed successfully.');
    }, 600);
  };

  const handleExport = (format) => {
    showToast(`Exporting YogaPT Analytics Report as ${format}...`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  return (
    <AdminLayout>
    <div className={isDark ? 'dark' : ''}>
      <AppStyles />
      <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-500 ease-in-out">
        <div className="max-w-[1600px] mx-auto">
          {/* Animated Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] shadow-2xl animate-fade-in text-xs font-semibold backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse" />
              <span>{toastMessage}</span>
              <button
                onClick={() => setToastMessage(null)}
                className="ml-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TOP TOOLBAR & THEME / STATE TOGGLE */}
          <TopHeader
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            viewState={viewState}
            onSetViewState={setViewState}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
            onExport={handleExport}
          />

          {/* FILTERS AND DATE RANGE BAR */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* VIEW STATES */}
          {viewState === 'data' && (
            <div
              className={`space-y-8 animate-fade-in transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-30 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100 filter blur-0'
              }`}
            >
              <KPICards />
              <RevenueOverviewChart />
              <BookingsOverviewAndDonut />
              <ClassPerformanceAndOccupancy />
              <AttendanceAndGrowth />
              <RecentActivityAndClients />
            </div>
          )}

          {viewState === 'loading' && <SkeletonStateView />}

          {viewState === 'empty' && (
            <EmptyStateView
              onResetRange={() => {
                handleFilterChange('dateRange', 'year');
                setViewState('data');
              }}
            />
          )}

          {viewState === 'error' && (
            <ErrorStateView onRetry={() => setViewState('data')} />
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}