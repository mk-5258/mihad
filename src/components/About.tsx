/* ═══════════════════════════════════════════
   About — Editorial WHO IS MIHAD? composition
   Multi-directional entry + scroll-linked objects
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import {
  fadeUp,
  staggerContainerSlow,
  textReveal,
} from "../utils/animations";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Heading moves upward (slower than content) ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [80, -20]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Body moves upward (faster than heading) ── */
  const bodyY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [60, -40]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Index moves slightly sideways ── */
  const indexX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.4], [0, 15]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Line expands ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  /* ── Decorative circle: rotate + diagonal move ── */
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const circleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 40]),
    { stiffness: 60, damping: 25 },
  );
  const circleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 60, damping: 25 },
  );
  const circleOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 0.12, 0.12, 0]);

  /* ── Decorative square: moves opposite direction ── */
  const squareX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -30]),
    { stiffness: 60, damping: 25 },
  );
  const squareY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 40]),
    { stiffness: 60, damping: 25 },
  );
  const squareRotate = useTransform(scrollYProgress, [0, 1], [0, -45]);

  /* ── Visual object: enters from right, continues moving ── */
  const visualX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [80, 0]),
    { stiffness: 70, damping: 25 },
  );
  const visualY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.6], [40, -30]),
    { stiffness: 60, damping: 25 },
  );

  /* ── Image internal movement — parallax inside frame ── */
  const imageInternalY = useTransform(scrollYProgress, [0.15, 0.6], [20, -20]);

  /* ── Watermark ── */
  const decorY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-44 lg:py-56 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute -left-[10%] top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="font-display text-[clamp(8rem,22vw,20rem)] font-medium text-off-white/[0.015] leading-none tracking-tight whitespace-nowrap">
          WHO IS
        </span>
      </motion.div>

      {/* ── Decorative circle — rotate + diagonal ── */}
      <motion.div
        className="absolute top-[15%] right-[10%] pointer-events-none hidden lg:block"
        style={{
          x: circleX,
          y: circleY,
          rotate: circleRotate,
          opacity: circleOpacity,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke="rgba(185, 197, 206, 0.12)" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="24" stroke="rgba(185, 197, 206, 0.06)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* ── Decorative square — opposite direction ── */}
      <motion.div
        className="absolute bottom-[20%] left-[8%] pointer-events-none hidden lg:block"
        style={{
          x: squareX,
          y: squareY,
          rotate: squareRotate,
          opacity: circleOpacity,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect x="1" y="1" width="28" height="28" stroke="rgba(185, 197, 206, 0.1)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section index — moves sideways */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
          style={{ x: indexX }}
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            01 / About
          </span>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* ── Left: Heading — enters from left, moves upward ── */}
          <motion.div
            className="lg:col-span-7"
            style={{ y: headingY }}
          >
            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="overflow-hidden mb-2">
                <motion.h2
                  variants={textReveal}
                  className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-off-white"
                >
                  Who is
                </motion.h2>
              </div>

              <div className="overflow-hidden mb-10 md:mb-14">
                <motion.h2
                  variants={textReveal}
                  className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-off-white/40"
                >
                  Mihad?
                </motion.h2>
              </div>

              {/* Expanding line */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-off-white/25 via-off-white/10 to-transparent mb-10 md:mb-14"
                style={{ scaleX: lineScale, transformOrigin: "left" }}
              />

              {/* Body — different speed from heading */}
              <motion.div style={{ y: bodyY }} className="max-w-lg">
                <motion.p
                  variants={fadeUp}
                  className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted mb-6"
                >
                  Mihad is a digital creator and video editor who creates visual
                  content across YouTube and Instagram, while also building and
                  managing a worldwide Discord community.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted/60"
                >
                  What started as a passion for editing has evolved into a
                  multi-platform creative presence — from cinematic video
                  production to community building at scale.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right: Visual — enters from right, image internal parallax ── */}
          <div className="lg:col-span-5 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.6,
                duration: 1.2,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{ x: visualX, y: visualY }}
              className="space-y-8"
            >
              {/* Portrait with internal parallax */}
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-slate/8">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    y: imageInternalY,
                    background:
                      "linear-gradient(160deg, #16191d 0%, #0c0e11 45%, #111419 75%, #16191d 100%)",
                  }}
                />
                <div
                  className="absolute top-[20%] left-[15%] w-[50%] h-[35%]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(192, 57, 43, 0.06) 0%, transparent 70%)",
                    filter: "blur(50px)",
                  }}
                />
                <div className="absolute inset-5 border border-slate/6 rounded-sm" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="font-body text-[9px] font-medium tracking-[0.3em] uppercase text-muted/25">
                    Creator — 2024
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-px bg-slate/8">
                {[
                  { value: "5+", label: "Roles" },
                  { value: "3+", label: "Platforms" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 1 + i * 0.1,
                      duration: 0.7,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="bg-dark p-5 md:p-6"
                  >
                    <span className="block font-heading text-xl md:text-2xl font-semibold text-off-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block font-body text-[10px] font-light tracking-wide text-muted/50 mt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
