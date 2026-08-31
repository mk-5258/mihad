/* ═══════════════════════════════════════════
   Social Hub — Editorial text index
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeUp, lineExpand, socialLinkHover } from "../utils/animations";
import { ArrowRight } from "lucide-react";

const socialLinks = [
  {
    label: "YouTube",
    handle: "@mkeditz494",
    url: "https://www.youtube.com/@mkeditz494",
    accent: "group-hover:text-red-400/80",
  },
  {
    label: "Discord",
    handle: "Community Server",
    url: "https://discord.gg/wXSpfBQMqy",
    accent: "group-hover:text-[#5865F2]/80",
  },
  {
    label: "Instagram Editing",
    handle: "@mk_ed1tz",
    url: "https://www.instagram.com/mk_ed1tz",
    accent: "group-hover:text-off-white/80",
  },
  {
    label: "Instagram Personal",
    handle: "@mihadd___",
    url: "https://www.instagram.com/mihadd___",
    accent: "group-hover:text-off-white/80",
  },
];

export function SocialHub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="socials"
      ref={sectionRef}
      className="relative py-28 md:py-44 lg:py-56 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ y: decorY }}
      >
        <span className="font-display text-[clamp(5rem,12vw,10rem)] font-medium text-off-white/[0.012] leading-none tracking-tight">
          CONNECT
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section index */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
        >
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase text-muted/50">
            06 / Connect
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-off-white">
            Find me
            <span className="text-off-white/35"> everywhere.</span>
          </h2>
        </motion.div>

        {/* Thin separator */}
        <motion.div
          variants={lineExpand}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full h-px bg-gradient-to-r from-slate/25 to-transparent mb-12"
        />

        {/* Social links — large editorial list */}
        <div className="space-y-0">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="group relative flex items-center justify-between py-7 md:py-9 border-b border-slate/8 last:border-b-0 cursor-none overflow-hidden"
            >
              {/* Left: Label + Handle */}
              <div className="flex items-baseline gap-4 md:gap-8">
                {/* Index */}
                <span className="font-body text-[10px] font-medium tracking-[0.3em] text-muted/25 w-6 flex-shrink-0">
                  0{i + 1}
                </span>

                {/* Main label — shifts on hover */}
                <motion.div
                  className="flex items-baseline gap-4"
                  variants={socialLinkHover}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <span
                    className={`font-heading text-[clamp(1.5rem,3.5vw,3rem)] font-semibold tracking-[-0.01em] text-off-white/80 transition-colors duration-500 ${link.accent}`}
                  >
                    {link.label}
                  </span>

                  {/* Handle — visible on hover */}
                  <span className="hidden md:inline font-body text-[12px] font-light text-muted/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {link.handle}
                  </span>
                </motion.div>
              </div>

              {/* Right: Arrow */}
              <div className="flex items-center gap-2">
                <ArrowRight
                  size={14}
                  className="text-muted/0 group-hover:text-muted/50 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0"
                />
              </div>

              {/* Hover underline accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-off-white/0 group-hover:bg-off-white/8 transition-colors duration-700" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
