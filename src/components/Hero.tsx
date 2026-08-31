/* ═══════════════════════════════════════════
   Hero — MIHAD dominates the viewport
   Multi-layer parallax + background text
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

  /* ── Title: scale + fade + vertical movement ── */
  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -120]),
    { stiffness: 80, damping: 28 },
  );
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ── Subtitle: different speed ── */
  const subtitleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -60]),
    { stiffness: 80, damping: 28 },
  );

  /* ── Label: moves horizontally ── */
  const labelX = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, 25]),
    { stiffness: 80, damping: 20 },
  );

  /* ── CTA area ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    { stiffness: 100, damping: 25 },
  );

  /* ── Background text: slow horizontal parallax ── */
  const bgText1X = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);
  const bgText2X = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgText3X = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.6, 0]);

  /* ── Line expands ── */
  const lineScale = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ opacity: titleOpacity, scale: titleScale }}
    >
      {/* ── Background animated text layers ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ opacity: bgTextOpacity }}
      >
        <motion.span
          className="absolute font-display font-medium text-off-white/[0.025] whitespace-nowrap"
          style={{
            x: bgText1X,
            top: "15%",
            fontSize: "clamp(5rem, 14vw, 14rem)",
            letterSpacing: "-0.04em",
          }}
        >
          EDIT
        </motion.span>
        <motion.span
          className="absolute font-display font-medium text-off-white/[0.02] whitespace-nowrap"
          style={{
            x: bgText2X,
            top: "45%",
            fontSize: "clamp(4rem, 12vw, 11rem)",
            letterSpacing: "-0.03em",
          }}
        >
          CREATE
        </motion.span>
        <motion.span
          className="absolute font-display font-medium text-off-white/[0.018] whitespace-nowrap"
          style={{
            x: bgText3X,
            top: "72%",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "-0.03em",
          }}
        >
          CONNECT
        </motion.span>
      </motion.div>

      {/* ── Main content ── */}
      {showContent && (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-0">
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
            className="flex flex-col items-center text-center"
          >
            {/* Small label */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
              }}
              className="mb-8 md:mb-10"
              style={{ x: labelX, y: ctaY }}
            >
              <span className="inline-block font-body text-[10px] md:text-[11px] font-medium tracking-[0.35em] uppercase text-muted/60 border border-slate/15 rounded-full px-5 py-2">
                Editor · Creator · Community Owner
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
                className="font-display font-medium leading-[0.82] tracking-[-0.04em] text-white"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 14rem)",
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
              className="w-full max-w-[180px] h-px bg-gradient-to-r from-transparent via-muted/35 to-transparent my-8 md:my-10"
              style={{ scaleX: lineScale }}
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
              className="mt-12 md:mt-16"
              style={{ y: ctaY }}
            >
              <MagneticButton
                onClick={scrollToAbout}
                data-cursor="EXPLORE"
                className="group flex items-center gap-3 px-7 py-3.5 border border-slate/25 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-light/80 transition-all duration-500 hover:border-off-white/40 hover:bg-off-white/[0.03]"
              >
                <span>Explore</span>
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
