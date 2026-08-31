/* ═══════════════════════════════════════════
   Platforms — WHERE I CREATE
   4 distinct interactive platform objects
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play, Camera, User, Users } from "lucide-react";

const platforms = [
  {
    id: "youtube",
    label: "YOUTUBE",
    handle: "@mkeditz494",
    description: "Editing, shorts, and creative content.",
    url: "https://www.youtube.com/@mkeditz494",
    cta: "Watch",
    icon: Play,
    accent: "rgba(192, 57, 43, 0.06)",
    accentBorder: "rgba(192, 57, 43, 0.2)",
    accentText: "rgba(192, 57, 43, 0.7)",
    gradient: "linear-gradient(145deg, #1a1215 0%, #110d10 50%, #1a1215 100%)",
  },
  {
    id: "ig-editing",
    label: "INSTAGRAM",
    handle: "@mk_ed1tz",
    description: "Editing reels and YouTube Shorts.",
    url: "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#",
    cta: "View Reels",
    icon: Camera,
    accent: "rgba(200, 130, 200, 0.05)",
    accentBorder: "rgba(200, 130, 200, 0.18)",
    accentText: "rgba(200, 130, 200, 0.65)",
    gradient: "linear-gradient(155deg, #17151a 0%, #100e14 50%, #17151a 100%)",
  },
  {
    id: "ig-personal",
    label: "INSTAGRAM",
    handle: "@mihadd___",
    description: "Personal moments and thoughts.",
    url: "https://www.instagram.com/mihadd___/?__pwa=1#",
    cta: "Follow",
    icon: User,
    accent: "rgba(140, 160, 180, 0.05)",
    accentBorder: "rgba(140, 160, 180, 0.15)",
    accentText: "rgba(140, 160, 180, 0.6)",
    gradient: "linear-gradient(160deg, #14181c 0%, #0e1116 50%, #14181c 100%)",
  },
  {
    id: "discord",
    label: "DISCORD",
    handle: "Worldwide Community",
    description: "A global creative community.",
    url: "https://discord.gg/wXSpfBQMqy",
    cta: "Join",
    icon: Users,
    accent: "rgba(88, 101, 242, 0.06)",
    accentBorder: "rgba(88, 101, 242, 0.2)",
    accentText: "rgba(88, 101, 242, 0.7)",
    gradient: "linear-gradient(150deg, #141620 0%, #0e101a 50%, #141620 100%)",
  },
];

export function Platforms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.4], [50, -10]),
    { stiffness: 70, damping: 25 },
  );

  const indexX = useSpring(
    useTransform(scrollYProgress, [0.05, 0.35], [0, 12]),
    { stiffness: 80, damping: 20 },
  );

  return (
    <section
      id="platforms"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [30, -30]),
        }}
      >
        <span className="font-display text-[clamp(5rem,14vw,12rem)] font-medium text-off-white/[0.015] leading-none tracking-tight">
          PLATFORMS
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
            02 / Platforms
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
            className="overflow-hidden"
          >
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.02em] text-off-white">
              Where I create.
            </h2>
          </motion.div>
        </motion.div>

        {/* Platform grid — 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {platforms.map((platform, i) => {
            const Icon = platform.icon;

            return (
              <motion.a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={platform.cta.toUpperCase()}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.8,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="group relative overflow-hidden rounded-sm border border-slate/8 hover:border-slate/15 transition-all duration-500 cursor-none"
                style={{ background: platform.gradient }}
              >
                {/* Accent glow */}
                <div
                  className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at center, ${platform.accent} 0%, transparent 70%)`,
                    filter: "blur(40px)",
                  }}
                />

                <div className="relative p-6 md:p-8 lg:p-10">
                  {/* Header: icon + label */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500"
                      style={{ borderColor: platform.accentBorder }}
                    >
                      <Icon
                        size={14}
                        className="transition-colors duration-500"
                        style={{ color: platform.accentText }}
                      />
                    </div>
                    <span
                      className="font-body text-[10px] font-medium tracking-[0.3em] uppercase"
                      style={{ color: platform.accentText }}
                    >
                      {platform.label}
                    </span>
                  </div>

                  {/* Handle */}
                  <h3 className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-off-white tracking-tight mb-2 group-hover:text-white transition-colors duration-500">
                    {platform.handle}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[13px] font-light leading-relaxed text-muted/55 mb-6 max-w-xs">
                    {platform.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-off-white/60 group-hover:text-off-white/80 transition-colors duration-500">
                      {platform.cta}
                    </span>
                    <ArrowRight
                      size={12}
                      className="text-off-white/30 group-hover:text-off-white/50 transition-all duration-500 group-hover:translate-x-1"
                    />
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(90deg, ${platform.accentBorder}, transparent)`,
                  }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
