/* ═══════════════════════════════════════════
   Navbar — Minimal floating navigation
   Correct section order: About, Community, YouTube, Instagram
   ═══════════════════════════════════════════ */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "COMMUNITY", href: "#community" },
  { label: "YOUTUBE", href: "#youtube" },
  { label: "INSTAGRAM", href: "#instagram" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setIsScrolled(v > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ paddingLeft: "clamp(20px, 5vw, 100px)", paddingRight: "clamp(20px, 5vw, 100px)" }}
      >
        <div
          className="mx-auto flex items-center justify-between py-5 md:py-6 relative"
          style={{ maxWidth: "1400px" }}
        >
          {/* Background blur layer */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-none"
            style={{
              opacity: bgOpacity,
              backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
              backgroundColor: "rgba(5, 5, 5, 0.85)",
              borderBottom: isScrolled ? "1px solid rgba(185, 197, 206, 0.06)" : "1px solid transparent",
            }}
          />

          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="relative z-10 font-heading text-[15px] font-semibold tracking-[0.3em] text-off-white transition-colors duration-300 hover:text-white cursor-none"
          >
            MIHAD
          </motion.a>

          {/* Navigation links — desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.35 + i * 0.06 }}
                onClick={() => handleNavClick(link.href)}
                className="relative z-10 font-body text-[11px] font-medium tracking-[0.2em] text-muted transition-colors duration-300 hover:text-off-white cursor-none group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-off-white/30 transition-all duration-500 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative z-10 flex flex-col gap-1.5 cursor-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-off-white"
              animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-3 h-px bg-off-white"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-5 h-px bg-off-white"
              animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => handleNavClick(link.href)}
                className="font-heading text-2xl font-medium tracking-[0.15em] uppercase text-off-white/80 hover:text-white transition-colors cursor-none"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
