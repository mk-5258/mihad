/* ═══════════════════════════════════════════
   ScrollLayer — Scroll-linked motion wrapper
   Applies parallax, rotation, scale based on scroll
   ═══════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollLayerProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical parallax speed: 0 = fixed, 1 = normal scroll, >1 = faster */
  speed?: number;
  /** Horizontal movement in px at full scroll */
  x?: [number, number];
  /** Rotation in degrees at full scroll */
  rotate?: [number, number];
  /** Scale range */
  scale?: [number, number];
  /** Opacity range */
  opacity?: [number, number];
  /** Whether to use spring smoothing */
  smooth?: boolean;
}

export function ScrollLayer({
  children,
  className = "",
  speed = 0.3,
  x,
  rotate,
  scale,
  opacity,
  smooth = true,
}: ScrollLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate Y based on speed: lower speed = more parallax (moves slower)
  const yRange: [number, number] = [100 * (1 - speed), -100 * (1 - speed)];
  const rawY = useTransform(scrollYProgress, [0, 1], yRange);
  const y = smooth ? useSpring(rawY, { stiffness: 80, damping: 25, mass: 0.8 }) : rawY;

  const rawX = x ? useTransform(scrollYProgress, [0, 1], x) : undefined;
  const smoothX = rawX && smooth ? useSpring(rawX, { stiffness: 80, damping: 25 }) : rawX;

  const rawRotate = rotate ? useTransform(scrollYProgress, [0, 1], rotate) : undefined;
  const smoothRotate = rawRotate && smooth
    ? useSpring(rawRotate, { stiffness: 60, damping: 20 })
    : rawRotate;

  const rawScale = scale ? useTransform(scrollYProgress, [0, 1], scale) : undefined;
  const smoothScale = rawScale && smooth
    ? useSpring(rawScale, { stiffness: 80, damping: 25 })
    : rawScale;

  const rawOpacity = opacity ? useTransform(scrollYProgress, [0, 1], opacity) : undefined;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        x: smoothX,
        rotate: smoothRotate,
        scale: smoothScale,
        opacity: rawOpacity,
      }}
    >
      {children}
    </motion.div>
  );
}
