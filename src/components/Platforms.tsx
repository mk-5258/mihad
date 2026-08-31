/* ═══════════════════════════════════════════
   Community — Discord section
   Centered editorial composition
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

const DISCORD_URL = "https://discord.gg/wXSpfBQMqy";

export function Platforms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── "WORLDWIDE" moves slowly left ── */
  const worldwideX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.55], ["-12%", "12%"]),
    { stiffness: 50, damping: 30 },
  );

  /* ── "COMMUNITY" moves slowly right ── */
  const communityX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.55], ["10%", "-10%"]),
    { stiffness: 50, damping: 30 },
  );

  /* ── "OWNER" reveals from below ── */
  const ownerY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.45], [40, 0]),
    { stiffness: 70, damping: 25 },
  );
  const ownerOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  /* ── CTA moves upward ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [20, 0]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Line expand ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── Background text ── */
  const bgX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgText = useSpring(bgX, { stiffness: 50, damping: 30 });

  return (
    <section
      id="community"
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
          DISCORD
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
            02 / Community
          </span>
        </motion.div>

        {/* WORLDWIDE — moves left */}
        <motion.div
          className="overflow-hidden mb-2 text-center"
          style={{ x: worldwideX }}
        >
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
            WORLDWIDE
          </motion.h2>
        </motion.div>

        {/* COMMUNITY — moves right */}
        <motion.div
          className="overflow-hidden mb-6 text-center"
          style={{ x: communityX }}
        >
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            className="font-display font-medium leading-[0.88] tracking-[-0.03em] text-off-white/40"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              wordBreak: "break-word",
            }}
          >
            COMMUNITY
          </motion.h2>
        </motion.div>

        {/* OWNER — reveals from below */}
        <motion.div
          className="mb-10 md:mb-14 text-center"
          style={{ y: ownerY, opacity: ownerOpacity }}
        >
          <span className="font-heading text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase text-muted/55">
            Owner
          </span>
        </motion.div>

        {/* Expanding line */}
        <motion.div
          className="editorial-divider mb-10 md:mb-14 mx-auto max-w-[200px]"
          style={{ scaleX: lineScale, transformOrigin: "center" }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          className="editorial-body text-sm md:text-[15px] max-w-xl mx-auto mb-10 md:mb-14"
        >
          Leading a worldwide community of creators, editors, and enthusiasts.
          A space to share, learn, and grow together.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="text-center"
          style={{ y: ctaY }}
        >
          <motion.a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="JOIN"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-all duration-500 cursor-none border border-[rgba(88,101,242,0.25)] text-[rgba(88,101,242,0.7)] hover:border-[rgba(88,101,242,0.5)] hover:bg-[rgba(88,101,242,0.05)]"
          >
            <span>Join the Community</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
