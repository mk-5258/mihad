/* ═══════════════════════════════════════════
   Footer — Strong cinematic closing
   Layered entrance from different depths
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { textReveal } from "../utils/animations";
import { ArrowUp } from "lucide-react";

const footerSocials = [
  { label: "YouTube", url: "https://www.youtube.com/@mkeditz494" },
  { label: "Discord", url: "https://discord.gg/wXSpfBQMqy" },
  { label: "Instagram", url: "https://www.instagram.com/mk_ed1tz" },
  { label: "Instagram Personal", url: "https://www.instagram.com/mihadd___" },
];

const roles = ["Digital Creator", "Video Editor", "Community Builder"];

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  /* ── Large MIHAD: rises slowly from depth ── */
  const mihaY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [60, 0]),
    { stiffness: 60, damping: 25 },
  );
  const mihaOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  /* ── Roles: moves at different speed ── */
  const rolesY = useSpring(
    useTransform(scrollYProgress, [0.15, 0.55], [40, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Line expands ── */
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  /* ── Social links: appear sequentially via opacity ── */
  const socialsOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const socialsY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.5], [20, 0]),
    { stiffness: 80, damping: 20 },
  );

  /* ── Thank you: rises from different depth ── */
  const thanksY = useSpring(
    useTransform(scrollYProgress, [0.25, 0.6], [30, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Decorative circle: rotates toward edge ── */
  const circleRotate = useTransform(scrollYProgress, [0.1, 0.8], [0, 90]);
  const circleX = useSpring(
    useTransform(scrollYProgress, [0.1, 0.8], [0, 40]),
    { stiffness: 50, damping: 25 },
  );
  const circleY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.8], [0, -30]),
    { stiffness: 50, damping: 25 },
  );
  const circleOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 0.08, 0.08, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-28 md:py-40 lg:py-52 border-t border-slate/8 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-display text-[clamp(6rem,18vw,16rem)] font-medium text-off-white/[0.012] leading-none tracking-tight">
          MIHAD
        </span>
      </div>

      {/* Decorative circle — rotates toward edge */}
      <motion.div
        className="absolute bottom-[15%] right-[8%] pointer-events-none hidden lg:block"
        style={{ x: circleX, y: circleY, rotate: circleRotate, opacity: circleOpacity }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke="rgba(185, 197, 206, 0.08)" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="25" stroke="rgba(185, 197, 206, 0.04)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Large MIHAD — rises from depth */}
        <motion.div
          className="mb-12 md:mb-16"
          style={{ y: mihaY, opacity: mihaOpacity }}
        >
          <div className="overflow-hidden">
            <motion.h2
              variants={textReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-display text-[clamp(4rem,12vw,10rem)] font-medium leading-[0.85] tracking-[-0.04em] text-off-white"
            >
              MIHAD
            </motion.h2>
          </div>
        </motion.div>

        {/* Roles — different speed */}
        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-12 md:mb-16"
          style={{ y: rolesY }}
        >
          {roles.map((role, i) => (
            <span key={role} className="flex items-center gap-4">
              <span className="font-heading text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-muted/60">
                {role}
              </span>
              {i < roles.length - 1 && <span className="text-slate/20">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Separator — expands */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-slate/20 to-transparent mb-12 md:mb-16"
          style={{ scaleX: lineScale, transformOrigin: "left" }}
        />

        {/* Social links — sequential appearance */}
        <motion.div
          className="flex flex-wrap items-center gap-6 md:gap-10 mb-16 md:mb-20"
          style={{ opacity: socialsOpacity, y: socialsY }}
        >
          {footerSocials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-muted/40 transition-colors duration-300 hover:text-off-white/60 cursor-none"
            >
              {social.label}
            </a>
          ))}
        </motion.div>

        {/* Thank you — rises from different depth */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          style={{ y: thanksY }}
        >
          <div>
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium text-off-white/60 leading-tight">
              Thank you
              <br />
              for visiting.
            </h3>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="group flex items-center gap-3 font-body text-[10px] font-medium tracking-[0.2em] uppercase text-muted/35 transition-colors duration-300 hover:text-off-white/50 cursor-none"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="transition-transform duration-500 group-hover:-translate-y-1" />
          </button>
        </motion.div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-slate/5">
          <p className="font-body text-[10px] text-muted/20 font-light">
            © 2024 Mihad. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
