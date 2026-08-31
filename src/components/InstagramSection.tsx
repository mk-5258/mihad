/* ═══════════════════════════════════════════
   Instagram — Two distinct profiles
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

const IG_EDITING_URL = "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#";
const IG_PERSONAL_URL = "https://www.instagram.com/mihadd___/?__pwa=1#";

function InstagramProfile({
  number,
  label,
  subtitle,
  handle,
  tags,
  ctaText,
  url,
  cursorLabel,
  accentColor,
  accentBorder,
  bgXFrom,
  bgXTo,
  delay,
  isInView,
}: {
  number: string;
  label: string;
  subtitle: string;
  handle: string;
  tags: string[];
  ctaText: string;
  url: string;
  cursorLabel: string;
  accentColor: string;
  accentBorder: string;
  bgXFrom: string;
  bgXTo: string;
  delay: number;
  isInView: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX = useSpring(
    useTransform(scrollYProgress, [0, 1], [bgXFrom, bgXTo]),
    { stiffness: 50, damping: 30 },
  );

  const handleScale = useTransform(scrollYProgress, [0.1, 0.45], [0.92, 1]);
  const handleOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [15, 0]),
    { stiffness: 80, damping: 20 },
  );

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background text */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgX }}
      >
        <span
          className="absolute font-display font-medium text-off-white/[0.015] whitespace-nowrap"
          style={{
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            fontSize: "clamp(4rem, 11vw, 10rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {handle}
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            ease: [0.25, 1, 0.5, 1],
            delay,
          }}
          className="mb-10 md:mb-14"
        >
          <span className="editorial-label">
            {number} / {label}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Title + Handle */}
          <div className="lg:col-span-8">
            {/* INSTAGRAM title */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 1.0,
                  ease: [0.76, 0, 0.24, 1],
                  delay,
                }}
                className="font-display font-medium leading-[0.88] tracking-[-0.03em] text-off-white"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  wordBreak: "break-word",
                }}
              >
                {subtitle}
              </motion.h2>
            </div>

            {/* Handle — scale */}
            <motion.div
              className="mt-6 md:mt-8 mb-3"
              style={{ scale: handleScale, opacity: handleOpacity }}
            >
              <span
                className="font-heading font-semibold tracking-tight block"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: accentColor,
                  wordBreak: "break-word",
                }}
              >
                {handle}
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-x-3 gap-y-1.5 mt-5"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
                delay: delay + 0.2,
              }}
            >
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-body text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase text-muted/40"
                >
                  {tag}
                  {i < tags.length - 1 && (
                    <span className="ml-3 text-slate/20">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: CTA */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <motion.div
              className="editorial-divider mb-6 md:mb-8"
              style={{
                scaleX: lineScale,
                transformOrigin: "left",
              }}
            />

            <motion.div style={{ y: ctaY }}>
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={cursorLabel}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: delay + 0.3,
                }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-all duration-500 cursor-none"
                style={{
                  border: `1px solid ${accentBorder}`,
                  color: accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.background = `${accentBorder.replace("0.2", "0.05")}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = accentBorder;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span>{ctaText}</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Section heading */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-36 lg:pt-44">
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
      </div>

      {/* Editing Profile */}
      <InstagramProfile
        number="04"
        label="EDITING"
        subtitle="INSTAGRAM"
        handle="@mk_ed1tz"
        tags={["EDITING", "REELS", "SHORTS"]}
        ctaText="VIEW PROFILE"
        url={IG_EDITING_URL}
        cursorLabel="VIEW"
        accentColor="rgba(200, 130, 200, 0.65)"
        accentBorder="rgba(200, 130, 200, 0.2)"
        bgXFrom="5%"
        bgXTo="-10%"
        delay={0.1}
        isInView={isInView}
      />

      {/* Separator */}
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto editorial-divider" />
      </div>

      {/* Personal Profile */}
      <InstagramProfile
        number="05"
        label="PERSONAL"
        subtitle="INSTAGRAM"
        handle="@mihadd___"
        tags={["PERSONAL PROFILE"]}
        ctaText="VIEW PROFILE"
        url={IG_PERSONAL_URL}
        cursorLabel="FOLLOW"
        accentColor="rgba(140, 160, 180, 0.6)"
        accentBorder="rgba(140, 160, 180, 0.18)"
        bgXFrom="-6%"
        bgXTo="8%"
        delay={0.2}
        isInView={isInView}
      />

      {/* Bottom separator */}
      <div className="px-6 md:px-12 lg:px-16 pb-0">
        <div className="max-w-[1400px] mx-auto editorial-divider" />
      </div>
    </section>
  );
}
