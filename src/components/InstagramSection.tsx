/* ═══════════════════════════════════════════
   Instagram — Two identities: Editing + Personal
   Different entry directions + rotating ring
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
import { ArrowRight, Camera } from "lucide-react";

const IG_EDITING_URL = "https://www.instagram.com/mk_ed1tz";
const IG_PERSONAL_URL = "https://www.instagram.com/mihadd___";

export function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Heading: moves upward ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.4], [60, -10]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Editing account: enters from left ── */
  const editingX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [-50, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Personal account: enters from right ── */
  const personalX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [50, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Decorative ring: rotates ── */
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);

  /* ── Index: moves sideways ── */
  const indexX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.35], [0, 12]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Watermark ── */
  const decorY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative py-28 md:py-44 lg:py-56 overflow-hidden"
    >
      {/* Watermark */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="font-display text-[clamp(5rem,14vw,12rem)] font-medium text-off-white/[0.015] leading-none tracking-tight whitespace-nowrap">
          INSTAGRAM
        </span>
      </motion.div>

      {/* Decorative ring */}
      <motion.div
        className="absolute top-[10%] right-[12%] pointer-events-none hidden lg:block"
        style={{ rotate: ringRotate, opacity: ringOpacity }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="23" stroke="rgba(185, 197, 206, 0.1)" strokeWidth="0.5" />
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
            05 / Instagram
          </span>
        </motion.div>

        {/* Heading — moves upward */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
          style={{ y: headingY }}
        >
          <div className="overflow-hidden mb-1">
            <motion.h2 variants={textReveal} className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white">
              Edit.
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h2 variants={textReveal} className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white">
              Frame.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 variants={textReveal} className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white/35">
              Repeat.
            </motion.h2>
          </div>
        </motion.div>

        {/* Two accounts — different entry directions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate/8">
          {/* Editing — enters from left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ x: editingX }}
            className="group relative bg-dark p-8 md:p-12 lg:p-14"
          >
            <span className="inline-block font-body text-[9px] font-medium tracking-[0.3em] uppercase text-accent/50 border border-accent/15 rounded-full px-3 py-1 mb-8">
              Editing / Reels
            </span>

            <div className="mb-6">
              <span className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-off-white tracking-tight block">@mk_ed1tz</span>
              <span className="font-body text-xs text-muted/50 font-light mt-1 block">The editing page</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-sm overflow-hidden border border-slate/5">
                  <div className="w-full h-full" style={{ background: `linear-gradient(135deg, #181b20 0%, #0f1115 ${50 + i * 15}%, #181b20 100%)` }} />
                </div>
              ))}
            </div>

            <p className="font-body text-[13px] font-light leading-[1.85] text-muted/60 mb-8 max-w-sm">
              Editing content and reels — also shared through YouTube Shorts.
              A growing collection of visual edits and creative work.
            </p>

            <a href={IG_EDITING_URL} target="_blank" rel="noopener noreferrer" data-cursor="VIEW"
              className="group/btn inline-flex items-center gap-3 px-7 py-3.5 border border-slate/20 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-off-white/70 transition-all duration-500 hover:border-off-white/30 hover:bg-off-white/[0.03] cursor-none"
            >
              <Camera size={13} />
              <span>View Editing Page</span>
              <ArrowRight size={12} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
            </a>

            <div className="absolute top-0 left-0 right-0 h-px bg-off-white/0 group-hover:bg-accent/30 transition-colors duration-700" />
          </motion.div>

          {/* Personal — enters from right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.45, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ x: personalX }}
            className="group relative bg-dark p-8 md:p-12 lg:p-14"
          >
            <span className="inline-block font-body text-[9px] font-medium tracking-[0.3em] uppercase text-muted/40 border border-slate/15 rounded-full px-3 py-1 mb-8">
              Personal
            </span>

            <div className="mb-6">
              <span className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-off-white tracking-tight block">@mihadd___</span>
              <span className="font-body text-xs text-muted/50 font-light mt-1 block">Personal account</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-sm overflow-hidden border border-slate/5">
                  <div className="w-full h-full" style={{ background: `linear-gradient(145deg, #15181d 0%, #101318 ${55 + i * 10}%, #15181d 100%)` }} />
                </div>
              ))}
            </div>

            <p className="font-body text-[13px] font-light leading-[1.85] text-muted/60 mb-8 max-w-sm">
              The personal side — life beyond the edits. Moments, thoughts,
              and the world behind the screen.
            </p>

            <a href={IG_PERSONAL_URL} target="_blank" rel="noopener noreferrer" data-cursor="FOLLOW"
              className="group/btn inline-flex items-center gap-3 px-7 py-3.5 border border-slate/20 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-off-white/70 transition-all duration-500 hover:border-off-white/30 hover:bg-off-white/[0.03] cursor-none"
            >
              <span>Follow</span>
              <ArrowRight size={12} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
            </a>

            <div className="absolute top-0 left-0 right-0 h-px bg-off-white/0 group-hover:bg-off-white/10 transition-colors duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
