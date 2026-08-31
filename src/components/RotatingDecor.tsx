/* ═══════════════════════════════════════════
   Rotating Decor — Scroll-linked rotating geometry
   Thin rings, geometric frames, editorial marks
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface RotatingDecorProps {
  className?: string;
  variant?: "ring" | "disc" | "cross" | "corner";
}

export function RotatingDecor({ className = "", variant = "ring" }: RotatingDecorProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotationRange: [number, number] = variant === "cross" ? [-90, 90] : [0, 180];
  const rotation = useTransform(scrollYProgress, [0, 1], rotationRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0]);

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none select-none ${className}`}
      style={{ rotate: rotation, opacity }}
    >
      {variant === "ring" && (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke="rgba(185, 197, 206, 0.12)" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="28" stroke="rgba(185, 197, 206, 0.06)" strokeWidth="0.5" />
        </svg>
      )}

      {variant === "disc" && (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="29" stroke="rgba(192, 57, 43, 0.1)" strokeWidth="0.5" />
          <line x1="30" y1="0" x2="30" y2="60" stroke="rgba(185, 197, 206, 0.06)" strokeWidth="0.5" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(185, 197, 206, 0.06)" strokeWidth="0.5" />
        </svg>
      )}

      {variant === "cross" && (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <line x1="20" y1="5" x2="20" y2="35" stroke="rgba(185, 197, 206, 0.1)" strokeWidth="0.5" />
          <line x1="5" y1="20" x2="35" y2="20" stroke="rgba(185, 197, 206, 0.1)" strokeWidth="0.5" />
        </svg>
      )}

      {variant === "corner" && (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="rgba(185, 197, 206, 0.08)" />
        </svg>
      )}
    </motion.div>
  );
}
