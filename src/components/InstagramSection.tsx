/* ═══════════════════════════════════════════
   Instagram — Two distinct profiles
   Centered editorial composition
   No duplication — exactly two profiles
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
  label,
  handle,
  tags,
  ctaText,
  url,
  cursorLabel,
  accentColor,
  accentBorder,
  direction,
  delay,
  isInView,
}: {
  label: string;
  handle: string;
  tags: string[];
  ctaText: string;
  url: string;
  cursorLabel: string;
  accentColor: string;
  accentBorder: string;
  direction: "left" | "right";
  delay: number;
  isInView: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Handle scale ── */
  const handleScale = useTransform(scrollYProgress, [0.1, 0.45], [0.92, 1]);
  const handleOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  /* ── Background text moves opposite direction ── */
  const bgXFrom = direction === "left" ? "8%" : "-8%";
  const bgXTo = direction === "left" ? "-12%" : "12%";
  const bgX = useSpring(
    useTransform(scrollYProgress, [0, 1], [bgXFrom, bgXTo]),
    { stiffness: 50, damping: 30 },
  );

  /* ── Line expand ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── CTA ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [15, 0]),
    { stiffness: 80, damping: 20 },
  );

  return (
    <div
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-44 overflow-hidden"
    >
      {/* Background text */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgX }}
      >
        <span
          className="absolute font-display font-medium whitespace-nowrap left-1/2 -translate-x-1/2"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(4rem, 11vw, 10rem)",
            letterSpacing: "-0.04em",
            color: "rgba(212, 221, 228, 0.015)",
          }}
        >
          {handle}
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay }}
          className="mb-10 md:mb-14 text-center"
        >
          <span className="editorial-label">{label}</span>
        </motion.div>

        {/* Handle — large */}
        <motion.div
          className="mb-6 text-center"
          style={{ scale: handleScale, opacity: handleOpacity }}
        >
          <span
            className="font-heading font-semibold tracking-tight block"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: accentColor,
              wordBreak: "break-word",
            }}
          >
            {handle}
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: delay + 0.15 }}
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

        {/* Line */}
        <motion.div
          className="editorial-divider mb-12 md:mb-16 mx-auto max-w-[200px]"
          style={{ scaleX: lineScale, transformOrigin: "center" }}
        />

        {/* CTA */}
        <motion.div
          className="text-center"
          style={{ y: ctaY }}
        >
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={cursorLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: delay + 0.25 }}
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-48 lg:pt-60">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="editorial-label">
            04 / Instagram
          </span>
        </motion.div>
      </div>

      {/* Editing Profile — enters from left */}
      <InstagramProfile
        label="Editing"
        handle="@mk_ed1tz"
        tags={["Editing", "Reels", "Shorts"]}
        ctaText="View Editing Page"
        url={IG_EDITING_URL}
        cursorLabel="VIEW"
        accentColor="rgba(200, 130, 200, 0.65)"
        accentBorder="rgba(200, 130, 200, 0.2)"
        direction="left"
        delay={0.1}
        isInView={isInView}
      />

      {/* Separator */}
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto editorial-divider" />
      </div>

      {/* Personal Profile — enters from right */}
      <InstagramProfile
        label="Personal"
        handle="@mihadd___"
        tags={["Personal Profile"]}
        ctaText="View Profile"
        url={IG_PERSONAL_URL}
        cursorLabel="FOLLOW"
        accentColor="rgba(140, 160, 180, 0.6)"
        accentBorder="rgba(140, 160, 180, 0.18)"
        direction="right"
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
