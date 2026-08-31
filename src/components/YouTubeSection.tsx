/* ═══════════════════════════════════════════
   YouTube — MK EDITZ · @mkeditz494
   2K+ stat + editorial video frame composition
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const YOUTUBE_URL = "https://www.youtube.com/@mkeditz494";

export function YouTubeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Frame: rises from below ── */
  const frameY = useSpring(
    useTransform(scrollYProgress, [0.08, 0.5], [80, 0]),
    { stiffness: 60, damping: 25 },
  );

  /* ── Image internal parallax ── */
  const imageInternalY = useTransform(scrollYProgress, [0.1, 0.6], [-12, 12]);

  /* ── Heading: slides from right ── */
  const headingX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [50, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Stats scale in ── */
  const statsScale = useTransform(scrollYProgress, [0.15, 0.5], [0.85, 1]);
  const statsOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  /* ── Line expands ── */
  const lineScale = useTransform(scrollYProgress, [0.12, 0.45], [0, 1]);

  /* ── CTA moves opposite ── */
  const ctaX = useSpring(
    useTransform(scrollYProgress, [0.2, 0.6], [-15, 0]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Watermark ── */
  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Watermark */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="font-display text-[clamp(5rem,14vw,12rem)] font-medium text-off-white/[0.015] leading-none tracking-tight">
          MK EDITZ
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            04 / YouTube
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ── Left: Video frame ── */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div style={{ y: frameY }}>
              {/* Main video frame */}
              <div
                className="group relative aspect-video rounded-sm overflow-hidden border border-slate/8 cursor-none"
                data-cursor="WATCH"
              >
                {/* Cinematic background with internal parallax */}
                <motion.div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{
                    y: imageInternalY,
                    background: "linear-gradient(145deg, #16191d 0%, #0c0e11 35%, #111419 65%, #16191d 100%)",
                  }}
                />

                <div
                  className="absolute top-[30%] right-[15%] w-[35%] h-[25%] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(192, 57, 43, 0.07) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />

                <div className="absolute inset-4 border border-slate/5 rounded-sm" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-off-white/10 flex items-center justify-center group-hover:border-off-white/25 transition-all duration-500 group-hover:scale-105">
                    <Play size={20} className="text-off-white/40 ml-1 group-hover:text-off-white/70 transition-colors duration-500" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="font-heading text-[10px] font-medium tracking-[0.3em] uppercase text-off-white/15">
                    MK EDITZ
                  </span>
                </div>

                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-all duration-500" />
              </div>

              {/* Secondary frames */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mt-3">
                {[{ label: "Shorts" }, { label: "Edits" }, { label: "Reels" }].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="group relative aspect-video rounded-sm overflow-hidden border border-slate/6 cursor-none bg-dark-elevated"
                    data-cursor="VIEW"
                  >
                    <div
                      className="w-full h-full"
                      style={{ background: `linear-gradient(135deg, #14171c 0%, #0e1014 ${60 + i * 10}%, #14171c 100%)` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-body text-[9px] font-medium tracking-[0.2em] uppercase text-off-white/50">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Text + Stats ── */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div style={{ x: headingX }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="mb-5"
              >
                <span className="font-heading text-sm font-medium tracking-[0.2em] uppercase text-accent/60">
                  MK EDITZ
                </span>
              </motion.div>

              <div className="overflow-hidden mb-2">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                  className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white"
                >
                  Watch the work.
                </motion.h2>
              </div>

              {/* Line */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-slate/25 to-transparent my-7 md:my-9"
                style={{ scaleX: lineScale, transformOrigin: "left" }}
              />

              {/* Stats — scale in */}
              <motion.div
                className="flex items-center gap-8 mb-7"
                style={{ scale: statsScale, opacity: statsOpacity }}
              >
                <div>
                  <span className="block font-heading text-2xl md:text-3xl font-semibold text-off-white tracking-tight">2K+</span>
                  <span className="block font-body text-[10px] font-medium tracking-[0.2em] uppercase text-muted/50 mt-1">Subscribers</span>
                </div>
                <div className="w-px h-10 bg-slate/15" />
                <div>
                  <span className="block font-heading text-base md:text-lg font-semibold text-off-white/70 tracking-tight">@mkeditz494</span>
                  <span className="block font-body text-[10px] font-medium tracking-[0.2em] uppercase text-muted/50 mt-1">YouTube Handle</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="font-body text-sm md:text-[15px] font-light leading-[1.9] text-muted mb-8"
              >
                Editing · Shorts · Creative Content. Every frame crafted
                with precision and creative intent.
              </motion.p>

              {/* CTA */}
              <motion.div style={{ x: ctaX }}>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-red-500/15 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-red-400/70 transition-all duration-500 hover:border-red-400/35 hover:bg-red-400/[0.04] cursor-none"
                >
                  <span>Watch on YouTube</span>
                  <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
