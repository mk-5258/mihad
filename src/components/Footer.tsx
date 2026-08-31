/* ═══════════════════════════════════════════
   Footer — Compact cinematic closing
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";


const roles = ["Digital Creator", "Video Editor", "Community Builder"];

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  useInView(footerRef, { once: true, margin: "-60px" });

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
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative py-20 md:py-28 lg:py-36 border-t border-slate/8 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-display text-[clamp(5rem,16vw,14rem)] font-medium text-off-white/[0.012] leading-none tracking-tight">
          MIHAD
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Large MIHAD */}
        <motion.div
          className="mb-8 md:mb-10"
          style={{ y: mihaY, opacity: mihaOpacity }}
        >
          <h2 className="font-display text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.85] tracking-[-0.04em] text-off-white">
            MIHAD
          </h2>
        </motion.div>

        {/* Roles */}
        <motion.div
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 md:mb-10"
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

        {/* Separator */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-slate/18 to-transparent mb-8 md:mb-10"
          style={{ scaleX: lineScale, transformOrigin: "left" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h3 className="font-display text-[clamp(1.2rem,2.5vw,2rem)] font-medium text-off-white/50 leading-tight">
              Thank you for visiting.
            </h3>
          </div>
          <p className="font-body text-[10px] text-muted/20 font-light">
            © 2024 Mihad. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
