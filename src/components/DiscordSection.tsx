/* ═══════════════════════════════════════════
   Discord — Building a Worldwide Community
   Scroll-linked horizontal movement + glow
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const DISCORD_INVITE = "https://discord.gg/wXSpfBQMqy";

export function DiscordSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Visual: moves horizontally on scroll ── */
  const visualX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.6], [60, -30]),
    { stiffness: 60, damping: 25 },
  );
  const visualY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.6], [40, -20]),
    { stiffness: 60, damping: 25 },
  );

  /* ── Background text: moves in opposite direction ── */
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

  /* ── Glow: changes opacity on scroll ── */
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 0.1, 0.06]);

  /* ── Heading: moves upward ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [60, -15]),
    { stiffness: 70, damping: 25 },
  );

  /* ── CTA ── */
  const ctaX = useSpring(
    useTransform(scrollYProgress, [0.2, 0.6], [-15, 0]),
    { stiffness: 70, damping: 20 },
  );

  /* ── Progressive reveal for elements ── */
  const element1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const element1Y = useSpring(
    useTransform(scrollYProgress, [0.05, 0.25], [30, 0]),
    { stiffness: 80, damping: 25 },
  );

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* ── Background text: moves opposite direction ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgTextX }}
      >
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(6rem,18vw,16rem)] font-medium text-off-white/[0.02] leading-none tracking-tight whitespace-nowrap">
          COMMUNITY
        </span>
      </motion.div>

      {/* ── Subtle glow ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "80vh",
          opacity: glowOpacity,
          background:
            "radial-gradient(ellipse at center, rgba(88, 101, 242, 0.08) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            03 / Community
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mb-10 md:mb-14"
          style={{ y: headingY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden mb-2"
          >
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-off-white">
              Building a worldwide
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
            className="overflow-hidden"
          >
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#5865F2]/30">
              community.
            </h2>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Description + CTA */}
          <motion.div style={{ opacity: element1Opacity, y: element1Y }}>
            <p className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted mb-4">
              Owner of a worldwide Discord community — a global network of
              creators, gamers, and digital enthusiasts connected through
              shared creativity.
            </p>
            <p className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted/55 mb-8">
              What started as a small server has grown into something much bigger.
            </p>

            <motion.div style={{ x: ctaX }}>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="JOIN"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-[#5865F2]/20 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-[#5865F2]/80 transition-all duration-500 hover:border-[#5865F2]/40 hover:bg-[#5865F2]/[0.05] cursor-none"
              >
                <span>Join the Community</span>
                <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual — moves horizontally on scroll */}
          <motion.div
            style={{ x: visualX, y: visualY }}
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#5865F2]/8">
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(160deg, #14171c 0%, #0a0c0f 50%, #14171c 100%)",
                }}
              />

              {/* Center glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "70%",
                  height: "70%",
                  background: "radial-gradient(ellipse at center, rgba(88, 101, 242, 0.08) 0%, transparent 60%)",
                  filter: "blur(50px)",
                }}
              />

              {/* Inner border */}
              <div className="absolute inset-5 border border-[#5865F2]/5 rounded-sm" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#5865F2]/15 flex items-center justify-center mb-4">
                  <span className="font-heading text-lg font-semibold text-[#5865F2]/50">D</span>
                </div>
                <span className="font-body text-[9px] font-medium tracking-[0.3em] uppercase text-muted/30">
                  Worldwide Server
                </span>
              </div>

              {/* Label */}
              <div className="absolute bottom-5 left-5">
                <span className="font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-[#5865F2]/15">
                  DISCORD
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
