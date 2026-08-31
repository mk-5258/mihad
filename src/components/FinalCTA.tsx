/* ═══════════════════════════════════════════
   Final CTA — Strong cinematic closing
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
    url: "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#",
    accent: "group-hover:text-off-white/80",
  },
  {
    label: "Instagram Personal",
    handle: "@mihadd___",
    url: "https://www.instagram.com/mihadd___/?__pwa=1#",
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

  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [50, -15]),
    { stiffness: 70, damping: 25 },
  );

  const decorY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        style={{ y: decorY }}
      >
        <span className="font-display font-medium text-off-white/[0.012] leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
        >
          CONNECT
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 md:mb-16"
        >
          <span className="editorial-label">
            06 / Connect
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
            className="overflow-hidden mb-2"
          >
            <h2
              className="font-display font-medium leading-[0.95] tracking-[-0.03em] text-off-white"
              style={{
                fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
                wordBreak: "break-word",
              }}
            >
              Let&apos;s connect.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="editorial-body text-sm md:text-[15px] max-w-lg"
          >
            Find me across platforms. Every link leads somewhere worth exploring.
          </motion.p>
        </motion.div>

        {/* Thin separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="editorial-divider mb-10"
          style={{ transformOrigin: "left" }}
        />

        {/* Social links — large editorial list */}
        <div className="space-y-0">
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
                delay: 0.25 + i * 0.08,
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="group relative flex items-center justify-between py-6 md:py-8 border-b border-slate/8 last:border-b-0 cursor-none overflow-hidden"
            >
              <div className="flex items-baseline gap-3 md:gap-8 min-w-0">
                <span className="font-body text-[10px] font-medium tracking-[0.3em] text-muted/25 w-6 flex-shrink-0">
                  0{i + 1}
                </span>
                <div className="flex items-baseline gap-3 md:gap-4 min-w-0">
                  <span
                    className={`font-heading text-[clamp(1.2rem,3vw,2.5rem)] font-semibold tracking-[-0.01em] text-off-white/80 transition-colors duration-500 ${link.accent} whitespace-nowrap`}
                  >
                    {link.label}
                  </span>
                  <span className="hidden md:inline font-body text-[12px] font-light text-muted/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                    {link.handle}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <ArrowRight
                  size={14}
                  className="text-muted/0 group-hover:text-muted/50 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0"
                />
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-off-white/0 group-hover:bg-off-white/6 transition-colors duration-700" />
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mt-12 md:mt-16"
        >
          <MagneticButton
            href="#"
            data-cursor="TOP"
            className="group flex items-center gap-3 px-7 py-3.5 border border-slate/20 rounded-full text-[11px] font-body font-medium tracking-[0.2em] uppercase text-muted/60 transition-all duration-500 hover:border-off-white/30 hover:text-off-white/70"
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
