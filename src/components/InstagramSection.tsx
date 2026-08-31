/* ═══════════════════════════════════════════
   Instagram — Two distinct profiles
   Different parallax speeds + horizontal movement
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { ArrowRight, Camera, User } from "lucide-react";

const IG_EDITING_URL = "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#";
const IG_PERSONAL_URL = "https://www.instagram.com/mihadd___/?__pwa=1#";

export function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Heading: moves upward ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.4], [50, -10]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Editing card: enters from left, different speed ── */
  const editingX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [-50, 0]),
    { stiffness: 70, damping: 25 },
  );
  const editingY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.55], [30, -15]),
    { stiffness: 60, damping: 25 },
  );

  /* ── Personal card: enters from right, different speed ── */
  const personalX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [50, 0]),
    { stiffness: 70, damping: 25 },
  );
  const personalY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.55], [40, -10]),
    { stiffness: 60, damping: 25 },
  );

  /* ── Subtle rotations — extremely subtle ── */
  const editingRotate = useTransform(scrollYProgress, [0.1, 0.5], [-0.5, 0]);
  const personalRotate = useTransform(scrollYProgress, [0.1, 0.5], [0.5, 0]);

  /* ── Index: moves sideways ── */
  const indexX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.35], [0, 10]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Watermark ── */
  const decorY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16"
          style={{ x: indexX }}
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            05 / Instagram
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mb-14 md:mb-18"
          style={{ y: headingY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden mb-1"
          >
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white">
              Edit. Frame. Repeat.
            </h2>
          </motion.div>
        </motion.div>

        {/* Two accounts — different speeds and directions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Editing — enters from left */}
          <motion.a
            href={IG_EDITING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ x: editingX, y: editingY, rotate: editingRotate }}
            className="group relative bg-dark border border-slate/8 hover:border-slate/15 rounded-sm overflow-hidden transition-all duration-500 cursor-none"
          >
            {/* Reel-inspired vertical layout */}
            <div className="relative p-6 md:p-8 lg:p-10">
              <span className="inline-block font-body text-[9px] font-medium tracking-[0.3em] uppercase text-accent/50 border border-accent/15 rounded-full px-3 py-1 mb-6">
                Editing / Reels
              </span>

              <h3 className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-off-white tracking-tight mb-2 group-hover:text-white transition-colors duration-500">
                @mk_ed1tz
              </h3>
              <p className="font-body text-xs text-muted/50 font-light mb-5">
                The editing page
              </p>

              {/* Visual grid — reel-like vertical composition */}
              <div className="grid grid-cols-3 gap-1.5 mb-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="aspect-[3/4] rounded-sm overflow-hidden border border-slate/5">
                    <div className="w-full h-full" style={{ background: `linear-gradient(135deg, #181b20 0%, #0f1115 ${50 + i * 15}%, #181b20 100%)` }} />
                  </div>
                ))}
              </div>

              <p className="font-body text-[13px] font-light leading-[1.85] text-muted/55 mb-6 max-w-sm">
                Editing work, reels and YouTube Shorts. A growing collection
                of visual edits and creative content.
              </p>

              <div className="flex items-center gap-2">
                <Camera size={13} className="text-off-white/40" />
                <span className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-off-white/50 group-hover:text-off-white/70 transition-colors duration-500">
                  View Reels
                </span>
                <ArrowRight size={12} className="text-off-white/25 group-hover:text-off-white/45 transition-all duration-500 group-hover:translate-x-1" />
              </div>

              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-accent/0 group-hover:bg-accent/25 transition-colors duration-700" />
            </div>
          </motion.a>

          {/* Personal — enters from right */}
          <motion.a
            href={IG_PERSONAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="FOLLOW"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.45, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ x: personalX, y: personalY, rotate: personalRotate }}
            className="group relative bg-dark border border-slate/8 hover:border-slate/15 rounded-sm overflow-hidden transition-all duration-500 cursor-none"
          >
            <div className="relative p-6 md:p-8 lg:p-10">
              <span className="inline-block font-body text-[9px] font-medium tracking-[0.3em] uppercase text-muted/40 border border-slate/15 rounded-full px-3 py-1 mb-6">
                Personal
              </span>

              <h3 className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-off-white tracking-tight mb-2 group-hover:text-white transition-colors duration-500">
                @mihadd___
              </h3>
              <p className="font-body text-xs text-muted/50 font-light mb-5">
                Personal account
              </p>

              {/* Minimal visual — more minimal than editing */}
              <div className="relative aspect-[16/7] rounded-sm overflow-hidden border border-slate/5 mb-6">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(145deg, #15181d 0%, #101318 50%, #15181d 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <User size={24} className="text-off-white/[0.06]" />
                </div>
              </div>

              <p className="font-body text-[13px] font-light leading-[1.85] text-muted/55 mb-6 max-w-sm">
                Personal moments and thoughts — life beyond the edits.
              </p>

              <div className="flex items-center gap-2">
                <span className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-off-white/50 group-hover:text-off-white/70 transition-colors duration-500">
                  Follow
                </span>
                <ArrowRight size={12} className="text-off-white/25 group-hover:text-off-white/45 transition-all duration-500 group-hover:translate-x-1" />
              </div>

              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-off-white/0 group-hover:bg-off-white/8 transition-colors duration-700" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
