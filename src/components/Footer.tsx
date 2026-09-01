/* ═══════════════════════════════════════════
   Footer — Centered cinematic closing
   Animated line that grows horizontally
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

const roles = ["Digital Creator", "Video Editor", "Community Builder"];

const footerLinks = [
  { label: "YouTube", url: "https://www.youtube.com/@mkeditz494" },
  { label: "Discord", url: "https://discord.gg/wXSpfBQMqy" },
  { label: "Instagram", url: "https://www.instagram.com/mk_ed1tz/reels/?__pwa=1#" },
];

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const mihaY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [40, 0]),
    { stiffness: 60, damping: 25 },
  );
  const mihaOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  const rolesY = useSpring(
    useTransform(scrollYProgress, [0.15, 0.55], [25, 0]),
    { stiffness: 70, damping: 25 },
  );

  /* ── Animated line grows horizontally ── */
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  /* ── Background text ── */
  const bgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <footer
      ref={footerRef}
      className="relative py-28 md:py-36 lg:py-48 border-t border-slate/8 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        style={{ y: bgY }}
      >
        <span
          className="font-display font-medium leading-none tracking-tight whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 14vw, 12rem)",
            color: "rgba(212, 221, 228, 0.012)",
          }}
        >
          MIHAD
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Large MIHAD — centered */}
        <motion.div
          className="mb-10 md:mb-14 text-center"
          style={{ y: mihaY, opacity: mihaOpacity }}
        >
          <h2
            className="font-display font-medium leading-[0.85] tracking-[-0.04em] text-off-white"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 7rem)",
              wordBreak: "break-word",
            }}
          >
            MIHAD
          </h2>
        </motion.div>

        {/* Roles — centered */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-10 md:mb-14"
          style={{ y: rolesY }}
        >
          {roles.map((role, i) => (
            <span key={role} className="flex items-center gap-4">
              <span className="font-heading text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-muted/55">
                {role}
              </span>
              {i < roles.length - 1 && <span className="text-slate/20">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Animated growing line — centered */}
        <motion.div
          className="mx-auto mb-10 md:mb-14"
          style={{
            scaleX: lineScale,
            transformOrigin: "center",
            maxWidth: "600px",
          }}
        >
          <div
            className="w-full h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(185, 197, 206, 0.25), transparent)",
            }}
          />
        </motion.div>

        {/* Platform links — centered */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-muted/40 hover:text-off-white/60 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Copyright — centered */}
        <p className="font-body text-[10px] text-muted/20 font-light text-center">
          © 2024 Mihad. Crafted with intention.
        </p>
      </div>
    </footer>
  );
}
