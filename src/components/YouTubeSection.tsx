/* ═══════════════════════════════════════════
   YouTube — Centered editorial composition
   Typography-driven, no image boxes
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
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── 2K+ scale from 0.85 → 1 ── */
  const statScale = useTransform(scrollYProgress, [0.1, 0.45], [0.85, 1]);
  const statOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  /* ── SUBSCRIBERS reveal ── */
  const subscribersY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.45], [30, 0]),
    { stiffness: 70, damping: 25 },
  );
  const subscribersOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  /* ── CTA upward ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [20, 0]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Line expand ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── Background text ── */
  const bgX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const bgText = useSpring(bgX, { stiffness: 50, damping: 30 });

  return (
    <section
      id="youtube"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgText }}
      >
        <span
          className="absolute font-display font-medium whitespace-nowrap left-1/2 -translate-x-1/2"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(4rem, 12vw, 11rem)",
            letterSpacing: "-0.04em",
            color: "rgba(212, 221, 228, 0.018)",
          }}
        >
          YOUTUBE
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="editorial-label">
            03 / YouTube
          </span>
        </motion.div>

        {/* MK EDITZ title */}
        <motion.div className="overflow-hidden mb-4 text-center">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-medium leading-[0.88] tracking-[-0.03em] text-off-white"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              wordBreak: "break-word",
            }}
          >
            MK EDITZ
          </motion.h2>
        </motion.div>

        {/* 2K+ — scales from 0.85 → 1 */}
        <motion.div
          className="mb-3 text-center"
          style={{ scale: statScale, opacity: statOpacity }}
        >
          <span
            className="font-heading font-semibold tracking-tight block"
            style={{
              fontSize: "clamp(4rem, 10vw, 8rem)",
              color: "rgba(192, 57, 43, 0.7)",
              lineHeight: "1",
            }}
          >
            2K+
          </span>
        </motion.div>

        {/* SUBSCRIBERS — reveals */}
        <motion.div
          className="mb-10 md:mb-14 text-center"
          style={{ y: subscribersY, opacity: subscribersOpacity }}
        >
          <span className="font-heading text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase text-muted/55">
            Subscribers
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-10 md:mb-14"
        >
          {["Editing", "Shorts", "Creative Content"].map((tag, i) => (
            <span
              key={tag}
              className="font-body text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase text-muted/40"
            >
              {tag}
              {i < 2 && <span className="ml-4 text-slate/20">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Expanding line */}
        <motion.div
          className="editorial-divider mb-10 md:mb-14 mx-auto max-w-[200px]"
          style={{ scaleX: lineScale, transformOrigin: "center" }}
        />

        {/* CTA */}
        <motion.div
          className="text-center"
          style={{ y: ctaY }}
        >
          <motion.a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WATCH"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-all duration-500 cursor-none border border-[rgba(192,57,43,0.25)] text-[rgba(192,57,43,0.7)] hover:border-[rgba(192,57,43,0.5)] hover:bg-[rgba(192,57,43,0.05)]"
          >
            <span>Watch on YouTube</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
