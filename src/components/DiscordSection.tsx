/* ═══════════════════════════════════════════
   Discord — Worldwide Community
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
import { ArrowRight } from "lucide-react";

const DISCORD_INVITE = "https://discord.gg/wXSpfBQMqy";

export function DiscordSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── WORLDWIDE moves horizontally left ── */
  const worldwideX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.6], ["8%", "-8%"]),
    { stiffness: 50, damping: 30 },
  );

  /* ── COMMUNITY moves horizontally right ── */
  const communityX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.6], ["-8%", "8%"]),
    { stiffness: 50, damping: 30 },
  );

  /* ── OWNER label fades separately ── */
  const ownerOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const ownerY = useSpring(
    useTransform(scrollYProgress, [0.15, 0.45], [20, 0]),
    { stiffness: 80, damping: 25 },
  );

  /* ── Description ── */
  const descOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const descY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.5], [25, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── CTA ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.25, 0.55], [15, 0]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Background text ── */
  const bgX = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  /* ── Line ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* ── Background text parallax ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgX }}
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(5rem,16vw,14rem)] font-medium text-off-white/[0.02] leading-none tracking-tight whitespace-nowrap"
        >
          DISCORD
        </span>
      </motion.div>

      {/* ── Subtle glow ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "80vh",
          opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 0.08, 0.04]),
          background:
            "radial-gradient(ellipse at center, rgba(88, 101, 242, 0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* ── Section index ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="editorial-label">
            03 / Community
          </span>
        </motion.div>

        {/* ── Large typography composition ── */}
        <div className="mb-12 md:mb-20">
          {/* WORLDWIDE — horizontal parallax left */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-medium leading-[0.85] tracking-[-0.03em] text-off-white"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                x: worldwideX,
                wordBreak: "break-word",
              }}
            >
              WORLDWIDE
            </motion.h2>
          </div>

          {/* COMMUNITY — horizontal parallax right */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{
                duration: 1.0,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.08,
              }}
              className="font-display font-medium leading-[0.85] tracking-[-0.03em]"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                x: communityX,
                color: "rgba(88, 101, 242, 0.35)",
                wordBreak: "break-word",
              }}
            >
              COMMUNITY
            </motion.h2>
          </div>
        </div>

        {/* ── Owner label + description ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div>
            {/* OWNER */}
            <motion.div
              style={{ opacity: ownerOpacity, y: ownerY }}
              className="mb-4"
            >
              <span className="editorial-mono text-base md:text-lg text-off-white/70">
                OWNER
              </span>
            </motion.div>

            {/* Thin line */}
            <motion.div
              className="editorial-divider mb-6 md:mb-8"
              style={{
                scaleX: lineScale,
                transformOrigin: "left",
              }}
            />

            {/* Description */}
            <motion.p
              className="editorial-body text-sm md:text-[15px] max-w-md"
              style={{ opacity: descOpacity, y: descY }}
            >
              Building and managing a worldwide Discord community. A global
              network of creators, gamers, and digital enthusiasts connected
              through shared creativity.
            </motion.p>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-end">
            <motion.div style={{ y: ctaY }}>
              <motion.a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="JOIN"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.4,
                }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-all duration-500 cursor-none"
                style={{
                  border: "1px solid rgba(88, 101, 242, 0.25)",
                  color: "rgba(88, 101, 242, 0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(88, 101, 242, 0.5)";
                  e.currentTarget.style.background = "rgba(88, 101, 242, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(88, 101, 242, 0.25)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
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
