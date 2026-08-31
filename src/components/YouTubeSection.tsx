/* ═══════════════════════════════════════════
   YouTube — MK EDITZ
   Typography-based editorial composition
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

const YOUTUBE_URL = "https://www.youtube.com/@mkeditz494";

export function YouTubeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Title horizontal parallax ── */
  const titleX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.55], ["5%", "-5%"]),
    { stiffness: 50, damping: 30 },
  );

  /* ── 2K+ subtle scale ── */
  const statScale = useTransform(scrollYProgress, [0.1, 0.45], [0.88, 1]);
  const statOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── SUBSCRIBERS clip-path reveal ── */
  const subscribersClip = useTransform(
    scrollYProgress,
    [0.15, 0.4],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  /* ── Tags ── */
  const tagsY = useSpring(
    useTransform(scrollYProgress, [0.15, 0.5], [20, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── CTA ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [15, 0]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Line ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── Background text ── */
  const bgX = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* ── Background text ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgX }}
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(5rem,14vw,12rem)] font-medium text-off-white/[0.018] leading-none tracking-tight whitespace-nowrap"
        >
          MK EDITZ
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* ── Section index ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="editorial-label">04 / YouTube</span>
        </motion.div>

        {/* ── Main composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ── Left: Typography ── */}
          <div className="lg:col-span-8">
            {/* YOUTUBE title — parallax */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                className="font-display font-medium leading-[0.85] tracking-[-0.03em] text-off-white"
                style={{
                  fontSize: "clamp(3rem, 9vw, 8rem)",
                  x: titleX,
                  wordBreak: "break-word",
                }}
              >
                YOUTUBE
              </motion.h2>
            </div>

            {/* 2K+ stat — scale animation */}
            <motion.div
              className="mt-8 md:mt-12 mb-4"
              style={{ scale: statScale, opacity: statOpacity }}
            >
              <span
                className="font-heading font-bold tracking-tight block"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  lineHeight: "0.9",
                  color: "rgba(192, 57, 43, 0.8)",
                }}
              >
                2K+
              </span>
            </motion.div>

            {/* SUBSCRIBERS — clip-path reveal */}
            <motion.div
              className="mb-6 md:mb-8"
              style={{ clipPath: subscribersClip }}
            >
              <span className="font-heading text-sm md:text-base font-medium tracking-[0.2em] uppercase text-muted/60">
                SUBSCRIBERS
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-col gap-2 mt-6 md:mt-8"
              style={{ y: tagsY }}
            >
              {["EDITING", "SHORTS", "CREATIVE CONTENT"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 1, 0.5, 1],
                    delay: 0.25 + i * 0.08,
                  }}
                  className="font-body text-[11px] md:text-xs font-light tracking-[0.2em] uppercase text-muted/40"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: CTA + handle ── */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Handle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                className="mb-4"
              >
                <span className="font-heading text-base md:text-lg font-semibold text-off-white/60 tracking-tight">
                  @mkeditz494
                </span>
              </motion.div>

              {/* Thin line */}
              <motion.div
                className="editorial-divider my-6 md:my-8"
                style={{
                  scaleX: lineScale,
                  transformOrigin: "left",
                }}
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="editorial-body text-sm md:text-[15px] max-w-sm mb-8"
              >
                Every frame crafted with precision and creative intent.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div style={{ y: ctaY }}>
              <motion.a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="WATCH"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.4,
                }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-all duration-500 cursor-none"
                style={{
                  border: "1px solid rgba(192, 57, 43, 0.2)",
                  color: "rgba(192, 57, 43, 0.75)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(192, 57, 43, 0.45)";
                  e.currentTarget.style.background = "rgba(192, 57, 43, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(192, 57, 43, 0.2)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span>WATCH ON YOUTUBE</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom separator ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto editorial-divider" />
      </div>
    </section>
  );
}
