/* ═══════════════════════════════════════════
   About — Centered editorial composition
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Title moves upward ── */
  const titleY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [60, -15]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Subtitle moves from below ── */
  const subtitleY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [50, -10]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Body text ── */
  const bodyY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [40, -25]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Line expand ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  /* ── Background text ── */
  const bgWhoX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const bgWhoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        style={{ x: bgWhoX, y: bgWhoY }}
      >
        <span
          className="font-display font-medium leading-none tracking-tight whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 16vw, 14rem)",
            color: "rgba(212, 221, 228, 0.015)",
          }}
        >
          WHO IS
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
            01 / About
          </span>
        </motion.div>

        {/* Title: MIHAD */}
        <motion.div
          className="mb-4 text-center"
          style={{ y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <h2
              className="editorial-heading"
              style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
            >
              MIHAD
            </h2>
          </motion.div>
        </motion.div>

        {/* Subtitle: Creator · Editor · Community Owner */}
        <motion.div
          className="mb-10 md:mb-14 text-center"
          style={{ y: subtitleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          >
            <span className="font-heading text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase text-muted/55">
              Creator · Editor · Community Owner
            </span>
          </motion.div>
        </motion.div>

        {/* Expanding line */}
        <motion.div
          className="editorial-divider mb-10 md:mb-14 mx-auto max-w-[200px]"
          style={{ scaleX: lineScale, transformOrigin: "center" }}
        />

        {/* Body text */}
        <motion.div
          className="max-w-xl mx-auto mb-14 md:mb-20 text-center"
          style={{ y: bodyY }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="editorial-body text-sm md:text-[15px]"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            Crafting visual stories across YouTube and Instagram, while building
            and leading a worldwide Discord community. What started as a passion
            for editing has grown into a multi-platform creative presence.
          </motion.p>
        </motion.div>

        {/* Stats row — centered */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "2K+", label: "YouTube Subscribers" },
            { value: "Worldwide", label: "Discord Community" },
            { value: "2", label: "Instagram Profiles" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-off-white tracking-tight">
                {stat.value}
              </span>
              <span className="block font-body text-[10px] md:text-[11px] font-light tracking-[0.15em] uppercase text-muted/50 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
