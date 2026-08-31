/* ═══════════════════════════════════════════
   Final CTA — Centered cinematic closing
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const links = [
  {
    label: "YouTube",
    url: "https://www.youtube.com/@mkeditz494",
    accent: "group-hover:text-red-400/80",
  },
  {
    label: "Discord",
    url: "https://discord.gg/wXSpfBQMqy",
    accent: "group-hover:text-[#5865F2]/80",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#",
    accent: "group-hover:text-off-white/80",
  },
];

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Heading moves upward ── */
  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [50, -15]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Background text ── */
  const decorY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        style={{ y: decorY }}
      >
        <span
          className="font-display font-medium leading-none tracking-tight whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 11vw, 9rem)",
            color: "rgba(212, 221, 228, 0.012)",
          }}
        >
          CONNECT
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="editorial-label">
            05 / Connect
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mb-12 md:mb-16"
          style={{ y: headingY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden mb-2 text-center"
          >
            <h2
              className="font-display font-medium leading-[0.95] tracking-[-0.03em] text-off-white"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                wordBreak: "break-word",
              }}
            >
              Let&apos;s
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
            className="overflow-hidden text-center"
          >
            <h2
              className="font-display font-medium leading-[0.95] tracking-[-0.03em] text-off-white/40"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                wordBreak: "break-word",
              }}
            >
              Connect.
            </h2>
          </motion.div>
        </motion.div>

        {/* Social links — text links, centered */}
        <div className="flex flex-col items-center gap-6 md:gap-8 mb-12 md:mb-16">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.25 + i * 0.1,
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
              }}
              className={`group font-heading text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-[-0.01em] text-off-white/80 transition-colors duration-500 cursor-none ${link.accent}`}
            >
              {link.label}
              <ArrowRight
                size={14}
                className="inline-block ml-3 text-muted/0 group-hover:text-muted/50 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0"
              />
            </motion.a>
          ))}
        </div>

        {/* Thin separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="editorial-divider mb-10 mx-auto max-w-[200px]"
          style={{ transformOrigin: "center" }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center"
        >
          <MagneticButton
            href="#"
            data-cursor="TOP"
            className="group inline-flex items-center gap-3 px-7 py-3.5 border border-slate/20 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-muted/60 transition-all duration-500 hover:border-off-white/30 hover:text-off-white/70"
          >
            <span>Back to Top</span>
            <ArrowRight
              size={12}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 rotate-[-90deg]"
            />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
