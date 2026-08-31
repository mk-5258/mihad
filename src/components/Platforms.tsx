/* ═══════════════════════════════════════════
   Platforms — Editorial typography sections
   No cards, no images — pure text composition
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

const platforms = [
  {
    number: "02",
    label: "PLATFORM",
    title: "YOUTUBE",
    stat: "2K+",
    statLabel: "SUBSCRIBERS",
    tags: ["EDITING", "SHORTS", "CREATIVE CONTENT"],
    ctaText: "WATCH CHANNEL →",
    url: "https://www.youtube.com/@mkeditz494",
    accentColor: "rgba(192, 57, 43, 0.7)",
    accentBorder: "rgba(192, 57, 43, 0.25)",
    bgXFrom: "8%",
    bgXTo: "-12%",
  },
  {
    number: "03",
    label: "COMMUNITY",
    title: "DISCORD",
    stat: "",
    statLabel: "WORLDWIDE COMMUNITY",
    tags: ["OWNER", "COMMUNITY BUILDER"],
    ctaText: "JOIN COMMUNITY →",
    url: "https://discord.gg/wXSpfBQMqy",
    accentColor: "rgba(88, 101, 242, 0.7)",
    accentBorder: "rgba(88, 101, 242, 0.25)",
    bgXFrom: "-10%",
    bgXTo: "15%",
  },
  {
    number: "04",
    label: "EDITING",
    title: "INSTAGRAM",
    stat: "@mk_ed1tz",
    statLabel: "EDITING • REELS • SHORTS",
    tags: ["@mk_ed1tz"],
    ctaText: "VIEW PROFILE →",
    url: "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#",
    accentColor: "rgba(200, 130, 200, 0.65)",
    accentBorder: "rgba(200, 130, 200, 0.2)",
    bgXFrom: "5%",
    bgXTo: "-10%",
  },
  {
    number: "05",
    label: "PERSONAL",
    title: "INSTAGRAM",
    stat: "@mihadd___",
    statLabel: "PERSONAL PROFILE",
    tags: ["@mihadd___"],
    ctaText: "VIEW PROFILE →",
    url: "https://www.instagram.com/mihadd___/?__pwa=1#",
    accentColor: "rgba(140, 160, 180, 0.6)",
    accentBorder: "rgba(140, 160, 180, 0.18)",
    bgXFrom: "-6%",
    bgXTo: "8%",
  },
];

function PlatformSection({
  platform,
}: {
  platform: (typeof platforms)[number];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Background text parallax ── */
  const bgX = useTransform(
    scrollYProgress,
    [0, 1],
    [platform.bgXFrom, platform.bgXTo],
  );
  const bgText = useSpring(bgX, { stiffness: 50, damping: 30 });

  /* ── Title moves slightly ── */
  const titleY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.5], [40, -10]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Stat scale ── */
  const statScale = useTransform(scrollYProgress, [0.1, 0.45], [0.92, 1]);
  const statOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  /* ── Line expand ── */
  const lineScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── CTA ── */
  const ctaY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.55], [15, 0]),
    { stiffness: 80, damping: 20 },
  );

  const isInstagram = platform.title === "INSTAGRAM";

  return (
    <div
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* ── Background watermark text ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: bgText }}
      >
        <span
          className="absolute font-display font-medium text-off-white/[0.018] whitespace-nowrap"
          style={{
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            fontSize: "clamp(4rem, 12vw, 11rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {platform.title}
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* ── Section header row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-baseline gap-3 mb-12 md:mb-16"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            {platform.number} / {platform.label}
          </span>
        </motion.div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── Left: Title + Stat ── */}
          <div className="lg:col-span-7">
            {/* Title */}
            <motion.div
              className="overflow-hidden mb-2"
              style={{ y: titleY }}
            >
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{
                  duration: 1.0,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="font-display font-medium leading-[0.88] tracking-[-0.03em] text-off-white"
                style={{
                  fontSize: isInstagram
                    ? "clamp(2.5rem, 6vw, 5rem)"
                    : "clamp(3rem, 8vw, 7rem)",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {platform.title}
              </motion.h2>
            </motion.div>

            {/* Stat or Handle */}
            {platform.stat && (
              <motion.div
                className="mt-6 md:mt-8 mb-4"
                style={{ scale: statScale, opacity: statOpacity }}
              >
                <span
                  className="font-heading font-semibold tracking-tight block"
                  style={{
                    fontSize: isInstagram
                      ? "clamp(1.8rem, 4vw, 3rem)"
                      : "clamp(3rem, 7vw, 6rem)",
                    color: platform.accentColor,
                    wordBreak: "break-word",
                  }}
                >
                  {platform.stat}
                </span>
                <span className="font-body text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase text-muted/45 mt-2 block">
                  {platform.statLabel}
                </span>
              </motion.div>
            )}

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-x-3 gap-y-1.5 mt-6"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.3,
              }}
            >
              {platform.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-body text-[10px] md:text-[11px] font-light tracking-[0.2em] uppercase text-muted/40"
                >
                  {tag}
                  {i < platform.tags.length - 1 && (
                    <span className="ml-3 text-slate/20">·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: CTA ── */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            {/* Thin divider line */}
            <motion.div
              className="editorial-divider mb-8 md:mb-10"
              style={{
                scaleX: lineScale,
                transformOrigin: "left",
              }}
            />

            {/* CTA */}
            <motion.div style={{ y: ctaY }}>
              <motion.a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={platform.ctaText.replace(" →", "")}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 1, 0.5, 1],
                  delay: 0.4,
                }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase transition-all duration-500 cursor-none"
                style={{
                  border: `1px solid ${platform.accentBorder}`,
                  color: platform.accentColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = platform.accentColor;
                  e.currentTarget.style.background = `${platform.accentBorder.replace("0.25", "0.05")}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = platform.accentBorder;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span>{platform.ctaText.replace(" →", "")}</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom separator ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto editorial-divider" />
      </div>
    </div>
  );
}

export function Platforms() {
  return (
    <section id="platforms" className="relative overflow-hidden">
      {/* ── Section heading ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-36 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden"
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white">
            Where I create.
          </h2>
        </motion.div>
      </div>        {platforms.map((platform) => (
        <PlatformSection key={platform.number} platform={platform} />
      ))}
    </section>
  );
}
