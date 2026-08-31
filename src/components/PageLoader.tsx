/* ═══════════════════════════════════════════
   Page Loader — Quick cinematic entrance
   ═══════════════════════════════════════════ */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [phase, setPhase] = useState<"dark" | "line" | "label" | "exit">("dark");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("line"), 150),
      setTimeout(() => setPhase("label"), 400),
      setTimeout(() => setPhase("exit"), 850),
      setTimeout(() => setIsVisible(false), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: "#050505" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center gap-5">
            {/* Thin horizontal line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: phase === "line" || phase === "label" || phase === "exit" ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="w-16 h-px origin-center"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(185, 197, 206, 0.3), transparent)",
              }}
            />

            {/* MIHAD label */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase === "label" || phase === "exit" ? 1 : 0,
                y: phase === "label" || phase === "exit" ? 0 : 8,
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="font-heading text-[11px] font-medium tracking-[0.4em] uppercase"
              style={{ color: "rgba(212, 221, 228, 0.6)" }}
            >
              Mihad
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
