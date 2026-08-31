/* ═══════════════════════════════════════════
   Identity — Vertical editorial role list
   Scroll-linked movement + rotating accent
   ═══════════════════════════════════════════ */

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { fadeUp, textReveal } from "../utils/animations";

const roles = [
  { number: "01", title: "Digital Creator", short: "CREATOR", description: "Crafting content that resonates — from concept to final frame." },
  { number: "02", title: "Video Editor", short: "EDITOR", description: "Cinematic editing, color grading, and visual storytelling." },
  { number: "03", title: "YouTube Creator", short: "YOUTUBE", description: "Building a channel through creative shorts and visual content." },
  { number: "04", title: "Instagram Creator", short: "INSTAGRAM", description: "Curated visual identity across reels, posts, and stories." },
  { number: "05", title: "Community Owner", short: "OWNER", description: "Leading a worldwide Discord community built on shared creativity." },
];

export function Identity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Heading moves upward ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.4], [50, -10]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Progress line ── */
  const progressHeight = useTransform(scrollYProgress, [0.05, 0.6], ["0%", "100%"]);

  /* ── Decorative ring: rotates + diagonal ── */
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const ringX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -25]),
    { stiffness: 50, damping: 25 },
  );
  const ringY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 35]),
    { stiffness: 50, damping: 25 },
  );
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);

  /* ── Watermark ── */
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  /* ── Each role gets subtle individual motion ── */
  const getRoleY = (index: number) => {
    const offset = 0.05 + index * 0.08;
    return useSpring(
      useTransform(scrollYProgress, [offset, offset + 0.3], [20, -5]),
      { stiffness: 80, damping: 25 },
    );
  };

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="relative py-28 md:py-44 lg:py-56 overflow-hidden"
    >
      {/* Watermark */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="font-display text-[clamp(6rem,18vw,16rem)] font-medium text-off-white/[0.015] leading-none tracking-tight">
          ROLES
        </span>
      </motion.div>

      {/* Decorative ring — diagonal + rotate */}
      <motion.div
        className="absolute top-[10%] left-[5%] pointer-events-none hidden lg:block"
        style={{ x: ringX, y: ringY, rotate: ringRotate, opacity: ringOpacity }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="rgba(185, 197, 206, 0.1)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="18" stroke="rgba(185, 197, 206, 0.05)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section index */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            02 / Identity
          </span>
        </motion.div>

        {/* Heading — moves upward */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
          style={{ y: headingY }}
        >
          <div className="overflow-hidden">
            <motion.h2 variants={textReveal} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-off-white">
              The many sides of
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.h2 variants={textReveal} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-off-white/35">
              Mihad.
            </motion.h2>
          </div>
        </motion.div>

        {/* Vertical role list */}
        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-slate/8">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-off-white/25 to-off-white/5"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Active accent */}
          {hoveredIndex !== null && (
            <motion.div
              className="hidden md:block absolute left-0 w-px bg-accent/50"
              initial={false}
              animate={{
                top: `${(hoveredIndex / roles.length) * 100}%`,
                height: `${(1 / roles.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            />
          )}

          {roles.map((role, i) => {
            const roleY = getRoleY(i);
            return (
              <motion.div
                key={role.short}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="group relative border-b border-slate/8 last:border-b-0 cursor-none"
                data-cursor="VIEW"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="flex items-baseline justify-between py-8 md:py-10 lg:py-12 md:pl-12"
                  style={{ y: roleY }}
                >
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-body text-[10px] font-medium tracking-[0.3em] text-muted/30 transition-colors duration-500 group-hover:text-accent/60 w-6 flex-shrink-0">
                      {role.number}
                    </span>
                    <motion.h3
                      className="font-heading text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.02em] text-off-white/80 transition-colors duration-500 group-hover:text-white"
                      animate={{ x: hoveredIndex === i ? 8 : 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    >
                      {role.short}
                    </motion.h3>
                  </div>
                  <motion.p
                    className="hidden md:block font-body text-[13px] font-light text-muted/50 max-w-xs text-right"
                    animate={{ opacity: hoveredIndex === i ? 1 : 0, x: hoveredIndex === i ? 0 : 20 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {role.description}
                  </motion.p>
                </motion.div>

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: "linear-gradient(90deg, rgba(192, 57, 43, 0.02) 0%, transparent 40%)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
