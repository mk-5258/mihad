/* ═══════════════════════════════════════════
   Horizontal Scroll Text — Bidirectional
   Words move across viewport, alternating direction
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const row1 = ["CREATOR", "EDITOR", "BUILDER", "COMMUNITY", "CREATOR", "EDITOR"];
const row2 = ["VISIONARY", "STORYTELLER", "LEADER", "CREATIVE", "VISIONARY", "STORYTELLER"];

export function HorizontalScrollText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* ── Row 1: moves left ── */
  const x1 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["10%", "-35%"]),
    { stiffness: 50, damping: 25 },
  );
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  /* ── Row 2: moves right (opposite direction) ── */
  const x2 = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-35%", "10%"]),
    { stiffness: 50, damping: 25 },
  );
  const opacity2 = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.7, 0.7, 0]);

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Row 1 — moves left */}
      <motion.div
        style={{ x: x1, opacity: opacity1 }}
        className="flex items-center gap-8 md:gap-12 whitespace-nowrap mb-4"
      >
        {row1.map((word, i) => (
          <span
            key={`r1-${word}-${i}`}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-[-0.02em] select-none"
            style={{ color: "rgba(212, 221, 228, 0.04)" }}
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* Row 2 — moves right (opposite) */}
      <motion.div
        style={{ x: x2, opacity: opacity2 }}
        className="flex items-center gap-8 md:gap-12 whitespace-nowrap"
      >
        {row2.map((word, i) => (
          <span
            key={`r2-${word}-${i}`}
            className="font-display text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.02em] select-none"
            style={{ color: "rgba(212, 221, 228, 0.025)" }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
