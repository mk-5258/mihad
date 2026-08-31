/* ═══════════════════════════════════════════
   Hero — Cinematic editorial composition
   Multi-layer parallax + scroll-linked objects
   ═══════════════════════════════════════════ */

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  heroContainer,
  heroLine,
  fadeUp,
  textReveal,
} from "../utils/animations";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ═══ Layer 1: Background — slowest ═══ */
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 50]),
    { stiffness: 60, damping: 25 },
  );
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  /* ═══ Layer 2: Atmospheric shapes — medium-slow ═══ */
  const atmoY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -30]),
    { stiffness: 70, damping: 25 },
  );
  const atmoRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  /* ═══ Layer 3: Main typography — medium ═══ */
  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -140]),
    { stiffness: 80, damping: 28 },
  );
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const subtitleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -70]),
    { stiffness: 80, damping: 28 },
  );

  const lineScale = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  /* ═══ Layer 4: Foreground UI — fastest ═══ */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -25]),
    { stiffness: 100, damping: 25 },
  );
  const labelX = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, 30]),
    { stiffness: 80, damping: 20 },
  );

  /* ═══ Decorative rotating ring ═══ */
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5], [0.12, 0]);

  /* ═══ Mouse parallax — X only for atmospheric glow ═══ */
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseX.set(x * 8);
  };

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ opacity: titleOpacity, scale: titleScale }}
    >
      {/* ── Layer 1: Background atmosphere — slowest ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(138, 152, 165, 0.03) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* ── Layer 2: Atmospheric red glow — diagonal + rotation ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: smoothMouseX,
          y: atmoY,
          width: "40vw",
          height: "40vh",
          right: "-10%",
          top: "20%",
          rotate: atmoRotate,
          background:
            "radial-gradient(ellipse at center, rgba(192, 57, 43, 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Layer 3: Rotating decorative ring — scroll-linked ── */}
      <motion.div
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          rotate: ringRotate,
          scale: ringScale,
          opacity: ringOpacity,
          right: "12%",
          top: "18%",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="58" stroke="rgba(185, 197, 206, 0.15)" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="42" stroke="rgba(185, 197, 206, 0.08)" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="26" stroke="rgba(185, 197, 206, 0.04)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* ── Layer 3b: Small rotating cross — opposite direction ── */}
      <motion.div
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [-45, 45]),
          opacity: ringOpacity,
          left: "15%",
          bottom: "22%",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <line x1="20" y1="5" x2="20" y2="35" stroke="rgba(185, 197, 206, 0.12)" strokeWidth="0.5" />
          <line x1="5" y1="20" x2="35" y2="20" stroke="rgba(185, 197, 206, 0.12)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* ── Layer 4: Main content — fastest ── */}
      {showContent && (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-0">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Small label — moves horizontally */}
            <motion.div
              variants={fadeUp}
              className="mb-8 md:mb-10"
              style={{ x: labelX, y: ctaY }}
            >
              <span className="inline-block font-body text-[10px] md:text-[11px] font-medium tracking-[0.35em] uppercase text-muted/70 border border-slate/20 rounded-full px-5 py-2">
                Digital Creator · Editor · Community Builder
              </span>
            </motion.div>

            {/* Main title — MIHAD */}
            <motion.div className="overflow-hidden mb-2" style={{ y: titleY }}>
              <motion.h1
                variants={textReveal}
                className="font-display text-[clamp(4rem,15vw,14rem)] font-medium leading-[0.85] tracking-[-0.03em] text-white"
              >
                MIHAD
              </motion.h1>
            </motion.div>

            {/* Expanding line */}
            <motion.div
              variants={heroLine}
              className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-muted/40 to-transparent my-8 md:my-10"
              style={{ scaleX: lineScale }}
            />

            {/* Secondary statement — different speed */}
            <motion.div className="overflow-hidden" style={{ y: subtitleY }}>
              <motion.p
                variants={textReveal}
                className="font-display italic text-[clamp(1.8rem,5vw,4.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-light/80"
              >
                I build,
                <br />
                edit &amp;
                <br />
                create.
              </motion.p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-10 md:mt-12 max-w-md text-[13px] md:text-sm font-body font-light leading-relaxed text-muted/80 tracking-wide"
              style={{ y: ctaY }}
            >
              Crafting visual stories, building communities, and pushing
              creative boundaries across YouTube, Instagram, and Discord.
            </motion.p>

            {/* CTAs — Magnetic */}
            <motion.div
              variants={fadeUp}
              className="mt-12 md:mt-16 flex items-center gap-6"
              style={{ y: ctaY }}
            >
              <MagneticButton
                onClick={scrollToWork}
                data-cursor="EXPLORE"
                className="group flex items-center gap-3 px-7 py-3.5 border border-slate/30 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-light/90 transition-all duration-500 hover:border-off-white/50 hover:bg-off-white/[0.03]"
              >
                <span>Explore Work</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </MagneticButton>

              <MagneticButton
                onClick={scrollToAbout}
                data-cursor="CONNECT"
                className="group flex items-center gap-3 px-7 py-3.5 text-[11px] font-body font-medium tracking-[0.2em] uppercase text-muted/70 transition-colors duration-500 hover:text-off-white"
              >
                <span>Connect</span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-body font-medium tracking-[0.3em] uppercase text-muted/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-muted/30" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
