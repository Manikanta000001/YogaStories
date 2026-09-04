import { useState } from "react";
import { Menu, X } from "lucide-react";
function Navbar({
  scrolled,
  theme,
  toggleTheme,
  isThemeAnimating,
  onOpenBooking,
  onOpenBreath,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Achievements", href: "#achievements" },
    { name: "Practice", href: "#practice" },
    { name: "Journey", href: "#journey" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500">
      <nav
        className={`flex items-center justify-between px-3 sm:px-6 py-3 rounded-full transition-all duration-500 max-w-7xl w-full border overflow-hidden  ${
          scrolled
            ? "bg-[var(--glass-bg)] backdrop-blur-xl border-[var(--border-color)] shadow-2xl scale-[0.98]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* BRAND */}
        <a href="#hero" className="flex items-center gap-2 group ml-2 sm:ml-4">
          <span className="font-display font-extrabold tracking-wider text-sm md:text-base">
            <span className="sm:hidden">LEENA</span>
            <span className="hidden sm:inline">LEENA SAJJA</span>
          </span>
        </a>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-medium opacity-80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[var(--accent-primary)] transition-colors hover:scale-105"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* ACTION & THEME TOGGLE */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBreath}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--accent-sage)] text-xs font-medium hover:bg-[var(--accent-sage)] hover:text-white transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-sage)] animate-ping"></span>
            Breath
          </button>

          <button
            onClick={onOpenBooking}
            className="hidden sm:block px-5 py-2 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-gold)] text-white text-xs font-bold tracking-wider shadow-lg hover:brightness-110 hover:shadow-amber-500/20 active:scale-95 transition-all"
          >
            BOOK
          </button>

          {}
          {/* ENERGY CORE TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            title="Toggle Energy Core Theme"
            className={`relative w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-md ${isThemeAnimating ? "theme-toggle-active" : ""}`}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--accent-gold)] animate-spin-slow opacity-60"></div>
            <span className="text-base font-bold text-[var(--accent-gold)] transition-transform duration-500">
              {theme === "light" ? "✦" : "◐"}
            </span>
          </button>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[var(--bg-main)]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-lg font-display uppercase tracking-widest lg:hidden animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[var(--accent-primary)] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBreath();
            }}
            className="px-6 py-2.5 rounded-full border border-[var(--accent-sage)] text-sm"
          >
            Take a Breath Widget
          </button>
        </div>
      )}
    </header>
  );
}
export default Navbar;
