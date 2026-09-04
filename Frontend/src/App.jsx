import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import CustomCursor from "./components/common/CustomCursor";
import Navbar from "./components/layout/Navbar";

import Hero from "./components/hero/Hero";
import BreatheSection from "./components/breathing/BreatheSection";
import AboutLeena from "./components/about/AboutLeena";

import Achievements from "./components/achievements/Achievements";
import SilverMedalSpotlight from "./components/achievements/SilverMedalSpotlight";

import PracticeFlow from "./components/practice/PracticeFlow";
import ClassesSection from "./components/practice/ClassesSection";

import JourneyFlow from "./components/journey/JourneyFlow";
import Philosophy from "./components/philosophy/Philosophy";

import Testimonials from "./components/testimonials/Testimonials";
import Gallery from "./components/gallery/Gallery";
import FinalCTA from "./components/cta/FinalCTA";

import ContactAndFooter from "./components/contact/ContactAndFooter";

import BreathingModal from "./components/modals/BreathingModal";
import BookingModal from "./components/modals/BookingModal";

import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";
import SessionPage from "./pages/admin/Sessions";
import Classes from "./pages/admin/Classes";
import Announcements from "./pages/admin/Announcements";
import Clients from "./pages/admin/Clients";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import RazorpayTest from "./components/payment/RazorpayTest";
// import CashfreeTest from "./components/payment/CashfreeTest";

function PublicSite() {
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const cashfreeOrderId = searchParams.get("cashfree_order_id");

  const [selectedClass, setSelectedClass] = useState(null);

  const [isThemeAnimating, setIsThemeAnimating] = useState(false);

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!cashfreeOrderId) return;

    setIsBookingOpen(true);
  }, [cashfreeOrderId]);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("energy_theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(savedTheme);

    document.documentElement.setAttribute("data-theme", savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        const x = (e.clientX - window.innerWidth / 2) / 40;

        const y = (e.clientY - window.innerHeight / 2) / 40;

        setMousePos({ x, y });
      }
    };

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleTheme = (e) => {
    if (isThemeAnimating) return;

    setIsThemeAnimating(true);

    const nextTheme = theme === "light" ? "dark" : "light";

    const rect = e.currentTarget.getBoundingClientRect();

    const x = rect.left + rect.width / 2;

    const y = rect.top + rect.height / 2;

    const overlay = document.createElement("div");

    overlay.className = "theme-transition-orb";

    overlay.style.left = `${x}px`;
    overlay.style.top = `${y}px`;

    overlay.style.width = "24px";
    overlay.style.height = "24px";

    overlay.style.backgroundColor =
      nextTheme === "dark" ? "#080909" : "#F8F6F0";

    overlay.style.transform = "translate(-50%, -50%) scale(1)";

    overlay.style.opacity = "1";

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      const maxDim = Math.max(window.innerWidth, window.innerHeight) * 3;

      overlay.style.transform = `translate(-50%, -50%) scale(${maxDim / 10})`;
    });

    setTimeout(() => {
      setTheme(nextTheme);

      document.documentElement.setAttribute("data-theme", nextTheme);

      localStorage.setItem("energy_theme", nextTheme);
    }, 350);

    setTimeout(() => {
      overlay.style.opacity = "0";
    }, 650);

    setTimeout(() => {
      overlay.remove();

      setIsThemeAnimating(false);
    }, 900);
  };

  const openBooking = (classData = null) => {
    setSelectedClass(classData);

    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />

      <Navbar
        scrolled={scrolled}
        theme={theme}
        toggleTheme={toggleTheme}
        isThemeAnimating={isThemeAnimating}
        onOpenBooking={() => openBooking()}
        onOpenBreath={() => setIsBreathingOpen(true)}
      />

      <main>
        <Hero mousePos={mousePos} onOpenBooking={() => openBooking()} />

        <BreatheSection onOpenBreath={() => setIsBreathingOpen(true)} />

        <AboutLeena />

        <Achievements />

        <SilverMedalSpotlight />

        <PracticeFlow
          onSelectPractice={(classData) => openBooking(classData)}
        />

        <ClassesSection onOpenBooking={(practice) => openBooking(practice)} />

        <JourneyFlow />

        <Philosophy />

        <Testimonials />

        <Gallery />

        <FinalCTA />

        <ContactAndFooter />
      </main>

      {isBreathingOpen && (
        <BreathingModal onClose={() => setIsBreathingOpen(false)} />
      )}

      {isBookingOpen && (
        <BookingModal
          initialClass={selectedClass}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicSite />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />

        <Route path="/sessions" element={<SessionPage />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment" element={<RazorpayTest />} />
        {/* <Route
          path="/cashfree"
          element={
           
             <CashfreeTest/>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
