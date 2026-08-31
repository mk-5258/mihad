/* ═══════════════════════════════════════════
   Scroll Progress — Side section indicator
   ═══════════════════════════════════════════ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "HOME", index: "00" },
  { id: "about", label: "ABOUT", index: "01" },
  { id: "community", label: "COMMUNITY", index: "02" },
  { id: "youtube", label: "YOUTUBE", index: "03" },
  { id: "instagram", label: "INSTAGRAM", index: "04" },
  { id: "connect", label: "CONNECT", index: "05" },
];

export function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollPercent(docHeight > 0 ? scrollY / docHeight : 0);

          // Find active section
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i].id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.4) {
                setActiveSection(sections[i].id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || scrollPercent < 0.02) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-5"
        >
          {/* Progress line */}
          <div className="absolute right-[3px] top-0 bottom-0 w-px bg-slate/10">
            <motion.div
              className="absolute inset-x-0 top-0 bg-off-white/20"
              style={{ height: `${scrollPercent * 100}%` }}
            />
          </div>

          {/* Section dots */}
          {sections.map((section) => {
            const isActive = section.id === activeSection;
            return (
              <button
                key={section.id}
                onClick={() => {
                  const el = document.getElementById(section.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative flex items-center gap-3 cursor-none group py-1"
                aria-label={`Go to ${section.label}`}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="font-body text-[9px] font-medium tracking-[0.2em] uppercase text-off-white/60"
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                <div
                  className={`w-[7px] h-[7px] rounded-full border transition-all duration-500 ${
                    isActive
                      ? "border-off-white/60 bg-off-white/20 scale-100"
                      : "border-slate/20 bg-transparent scale-75 group-hover:scale-100 group-hover:border-slate/40"
                  }`}
                />
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
