/* ═══════════════════════════════════════════
   Sticky Section — Pinned element + moving content
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface StickySectionProps {
  /** The large word/element that stays pinned */
  stickyElement: string;
  /** Color for the sticky element */
  stickyColor?: string;
  /** Content items that move around the pinned element */
  items: Array<{
    text: string;
    /** Direction this item moves from */
    from: "left" | "right" | "bottom" | "top";
    /** Optional accent color */
    accent?: boolean;
  }>;
}

export function StickySection({
  stickyElement,
  stickyColor = "rgba(212, 221, 228, 0.04)",
  items,
}: StickySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Sticky element: scale and rotate as user scrolls through
  const stickyScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1.05, 0.95]);
  const stickyRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const stickyOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const stickyX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]),
    { stiffness: 60, damping: 20 },
  );

  // Item movements based on scroll progress
  const getItemProgress = (index: number) => {
    const start = 0.1 + (index * 0.15);
    const end = start + 0.3;
    return { start: Math.min(start, 0.8), end: Math.min(end, 1) };
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${items.length * 30 + 40}vh` }}
    >
      {/* Pinned sticky element */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="font-display font-medium leading-none tracking-[-0.04em] select-none pointer-events-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 18rem)",
            color: stickyColor,
            scale: stickyScale,
            rotate: stickyRotate,
            opacity: stickyOpacity,
            x: stickyX,
          }}
        >
          {stickyElement}
        </motion.div>

        {/* Moving content items */}
        <div className="absolute inset-0 flex items-center justify-center">
          {items.map((item, i) => {
            const { start, end } = getItemProgress(i);
            const yRange = item.from === "bottom"
              ? [80, -80]
              : item.from === "top"
                ? [-60, 60]
                : [0, 0];
            const xRange = item.from === "left"
              ? [-60, 40]
              : item.from === "right"
                ? [60, -40]
                : [0, 0];

            const rawY = useTransform(scrollYProgress, [start, end], yRange);
            const y = useSpring(rawY, { stiffness: 80, damping: 25 });
            const rawX = useTransform(scrollYProgress, [start, end], xRange);
            const x = useSpring(rawX, { stiffness: 80, damping: 25 });
            const itemOpacity = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 0],
            );

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  y,
                  x,
                  opacity: itemOpacity,
                  top: `${25 + i * 15}%`,
                }}
              >
                <span
                  className={`font-body text-xs md:text-sm font-light tracking-[0.2em] uppercase ${
                    item.accent ? "text-accent/50" : "text-muted/50"
                  }`}
                >
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
