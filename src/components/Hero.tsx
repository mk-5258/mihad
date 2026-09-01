/* ═══════════════════════════════════════════
   Hero — MIHAD dominates the viewport
   Centered composition + text movement
   ═══════════════════════════════════════════ */

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Title: upward movement + scale + fade ── */
  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -150]),
    { stiffness: 80, damping: 28 },
  );
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleLetterSpacing = useTransform(scrollYProgress, [0, 0.5], ["-0.04em", "-0.01em"]);

  /* ── Subtitle: moves upward at different speed ── */
  const subtitleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -80]),
    { stiffness: 80, damping: 28 },
  );

  /* ── Label: horizontal movement ── */
  const labelX = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, 30]),
    { stiffness: 80, damping: 20 },
  );

  /* ── CTA area ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -30]),
    { stiffness: 100, damping: 25 },
  );
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  /* ── Background text: different speeds ── */
  const bgEditX = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);
  const bgCreateX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgCommunityX = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  const bgEditY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgCreateY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgCommunityY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.6, 0]);

  /* ── Line expands ── */
  const lineScale = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  /* ── Scroll indicator ── */
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ scale: titleScale, opacity: titleOpacity }}
    >
      {/* ── Background animated text layers ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ opacity: bgTextOpacity }}
      >
        <motion.span
          className="absolute font-display font-medium whitespace-nowrap left-1/2 -translate-x-1/2"
          style={{
            x: bgEditX,
            y: bgEditY,
            top: "18%",
            fontSize: "clamp(5rem, 14vw, 14rem)",
            letterSpacing: "-0.04em",
            color: "rgba(212, 221, 228, 0.025)",
          }}
        >
          EDIT
        </motion.span>
        <motion.span
          className="absolute font-display font-medium whitespace-nowrap left-1/2 -translate-x-1/2"
          style={{
            x: bgCreateX,
            y: bgCreateY,
            top: "48%",
            fontSize: "clamp(4rem, 12vw, 11rem)",
            letterSpacing: "-0.03em",
            color: "rgba(212, 221, 228, 0.02)",
          }}
        >
          CREATE
        </motion.span>
        <motion.span
          className="absolute font-display font-medium whitespace-nowrap left-1/2 -translate-x-1/2"
          style={{
            x: bgCommunityX,
            y: bgCommunityY,
            top: "75%",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "-0.03em",
            color: "rgba(212, 221, 228, 0.018)",
          }}
        >
          COMMUNITY
        </motion.span>
      </motion.div>

      {/* ── Main content ── */}
      {showContent && (
        <div className="relative z-10 w-full px-6 md:px-12 pt-32 md:pt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.15,
                },
              },
            }}
            className="section-centered max-w-[1400px] mx-auto"
          >
            {/* Small label */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
              }}
              className="mb-10 md:mb-14"
              style={{ x: labelX }}
            >
              <span className="inline-block font-body text-[10px] md:text-[11px] font-medium tracking-[0.35em] uppercase text-muted/60 border border-slate/15 rounded-full px-5 py-2">
                Digital Creator · Video Editor · Community Owner
              </span>
            </motion.div>

            {/* MIHAD — the dominant visual */}
            <motion.div
              className="overflow-hidden mb-3"
              style={{ y: titleY }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.3 } },
              }}
            >
              <motion.h1
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } },
                }}
                className="font-display font-medium leading-[0.82] text-white"
                style={{
                  fontSize: "clamp(4rem, 16vw, 16rem)",
                  letterSpacing: titleLetterSpacing,
                  wordBreak: "break-word",
                }}
              >
                MIHAD
              </motion.h1>
            </motion.div>

            {/* Expanding line */}
            <motion.div
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)" },
                visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } },
              }}
              className="w-full max-w-[180px] h-px my-10 md:my-14"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(128, 138, 146, 0.35), transparent)",
                scaleX: lineScale,
              }}
            />

            {/* Secondary statement */}
            <motion.div className="overflow-hidden" style={{ y: subtitleY }}>
              <motion.p
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } },
                }}
                className="font-display italic font-light tracking-[-0.01em] text-light/70"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 3.5rem)",
                  lineHeight: "1.1",
                  wordBreak: "break-word",
                }}
              >
                I build, edit &amp; create.
              </motion.p>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
              }}
              className="mt-16 md:mt-20"
              style={{ y: ctaY, opacity: ctaOpacity }}
            >
              <MagneticButton
                onClick={scrollToAbout}
                data-cursor="EXPLORE"
                className="group flex items-center gap-3 px-7 py-3.5 border border-slate/25 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-light/80 transition-all duration-500 hover:border-off-white/40 hover:bg-off-white/[0.03]"
              >
                <span>Scroll / Explore</span>
                <ArrowDown
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-[9px] font-body font-medium tracking-[0.3em] uppercase text-muted/35">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-muted/25" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
