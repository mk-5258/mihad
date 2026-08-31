/* ═══════════════════════════════════════════
   Discord — Enter the Community
   Expanding circle + layered scroll motion
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
  textReveal,
  staggerContainerSlow,
} from "../utils/animations";
import { ArrowRight } from "lucide-react";

const DISCORD_INVITE = "https://discord.gg/wXSpfBQMqy";

export function DiscordSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Expanding circle: scale 0.8 → 1.2, then shrinks at exit ── */
  const circleScale = useTransform(scrollYProgress, [0.05, 0.4, 0.85, 1], [0.6, 1.2, 1.1, 0.8]);
  const circleOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.8, 1], [0, 0.12, 0.08, 0]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  /* ── Typography: moves upward ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [70, -20]),
    { stiffness: 70, damping: 25 },
  );

  /* ── CTA: moves slightly toward center ── */
  const ctaX = useSpring(
    useTransform(scrollYProgress, [0.2, 0.6], [-20, 0]),
    { stiffness: 70, damping: 20 },
  );

  /* ── Index: moves vertically ── */
  const indexY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.4], [0, -10]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Visual card: rises from below ── */
  const cardY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [80, 0]),
    { stiffness: 70, damping: 25 },
  );
  const cardScale = useTransform(scrollYProgress, [0.1, 0.5], [0.92, 1]);

  /* ── Image internal parallax ── */
  const imageInternalY = useTransform(scrollYProgress, [0.15, 0.6], [15, -15]);

  /* ── UI lines ── */
  const bgShift = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  /* ── Decorative ring: diagonal ── */
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const ringX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 30]),
    { stiffness: 50, damping: 25 },
  );
  const ringY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -40]),
    { stiffness: 50, damping: 25 },
  );
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);

  const decorY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-28 md:py-44 lg:py-56 overflow-hidden"
    >
      {/* ── Expanding circular environment ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "120vw",
          height: "120vw",
          maxWidth: "1200px",
          maxHeight: "1200px",
          borderRadius: "50%",
          scale: circleScale,
          opacity: circleOpacity,
          rotate: circleRotate,
          background:
            "radial-gradient(ellipse at center, rgba(88, 101, 242, 0.06) 0%, rgba(88, 101, 242, 0.02) 40%, transparent 70%)",
        }}
      />

      {/* ── UI grid lines ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: bgShift }}>
        {[20, 40, 60, 80].map((pos) => (
          <div key={pos} className="absolute left-0 right-0 h-px bg-slate/[0.03]" style={{ top: `${pos}%` }} />
        ))}
        <div className="absolute top-0 bottom-0 left-[20%] w-px bg-slate/[0.03]" />
        <div className="absolute top-0 bottom-0 right-[20%] w-px bg-slate/[0.03]" />
      </motion.div>

      {/* ── Decorative ring — diagonal movement ── */}
      <motion.div
        className="absolute top-[12%] left-[8%] pointer-events-none hidden lg:block"
        style={{ x: ringX, y: ringY, rotate: ringRotate, opacity: ringOpacity }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="rgba(88, 101, 242, 0.1)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="18" stroke="rgba(88, 101, 242, 0.05)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="font-display text-[clamp(6rem,16vw,14rem)] font-medium text-off-white/[0.012] leading-none tracking-tight whitespace-nowrap">
          COMMUNITY
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section index — moves vertically */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
          style={{ y: indexY }}
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            03 / Community
          </span>
        </motion.div>

        {/* Main heading — moves upward */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 md:mb-16"
          style={{ y: headingY }}
        >
          <div className="overflow-hidden mb-2">
            <motion.h2
              variants={textReveal}
              className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-off-white"
            >
              Enter the
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={textReveal}
              className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-off-white/35"
            >
              community.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Description + CTA */}
          <div className="lg:col-span-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <p className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted">
                A worldwide community built around people, creativity,
                conversation and shared interests.
              </p>
              <p className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted/60">
                What started as a small server has grown into a global network
                of creators, gamers, and digital enthusiasts — all connected
                through a shared love for creation and community.
              </p>

              {/* CTA — moves toward center */}
              <motion.div className="pt-4" style={{ x: ctaX }}>
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="JOIN"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-[#5865F2]/20 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-[#5865F2]/80 transition-all duration-500 hover:border-[#5865F2]/40 hover:bg-[#5865F2]/[0.05] cursor-none"
                >
                  <span>Join Discord</span>
                  <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Visual — rises from below, image internal parallax */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.92 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              style={{ y: cardY, scale: cardScale }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-slate/8">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    y: imageInternalY,
                    background: "linear-gradient(160deg, #14171c 0%, #0a0c0f 50%, #14171c 100%)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: "70%", height: "70%",
                    background: "radial-gradient(ellipse at center, rgba(88, 101, 242, 0.08) 0%, transparent 60%)",
                    filter: "blur(60px)",
                  }}
                />
                <div className="absolute inset-5 border border-slate/6 rounded-sm" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#5865F2]/15 flex items-center justify-center mb-4">
                    <span className="font-heading text-lg font-semibold text-[#5865F2]/50">D</span>
                  </div>
                  <span className="font-body text-[9px] font-medium tracking-[0.3em] uppercase text-muted/30">
                    Worldwide Server
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="absolute -bottom-5 -right-5 md:-right-8 bg-dark-elevated border border-slate/10 rounded-sm p-5"
              >
                <span className="block font-heading text-base font-semibold text-off-white tracking-tight">Open</span>
                <span className="block font-body text-[10px] font-light tracking-wide text-muted/50 mt-1">To everyone</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
