/* ═══════════════════════════════════════════
   useScrollAnimation — Reusable scroll motion system
   Provides progress, velocity, and smooth transforms
   ═══════════════════════════════════════════ */

import { useRef, useEffect, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

interface ScrollAnimationConfig {
  /** Element to track */
  ref?: React.RefObject<HTMLElement | null>;
  /** Scroll offset for start/end detection */
  offset?: [string, string];
  /** Whether to enable velocity tracking */
  trackVelocity?: boolean;
}

interface ScrollAnimationReturn {
  /** Raw scroll progress 0-1 within the element */
  progress: MotionValue<number>;
  /** Smoothed progress with spring physics */
  smoothProgress: MotionValue<number>;
  /** Current scroll velocity (pixels/frame) */
  velocity: MotionValue<number>;
  /** Section ref to attach */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether element is in viewport */
  isInView: boolean;
}

export function useScrollAnimation(config: ScrollAnimationConfig = {}): ScrollAnimationReturn {
  const internalRef = useRef<HTMLElement>(null);
  const ref = config.ref || internalRef;
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const velocity = useMotionValue(0);
  const lastProgress = useRef(0);

  useEffect(() => {
    if (!config.trackVelocity) return;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      const delta = v - lastProgress.current;
      lastProgress.current = v;
      velocity.set(delta * 1000);
    });

    return () => unsubscribe();
  }, [scrollYProgress, velocity, config.trackVelocity]);

  // IntersectionObserver for isInView
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "-10%" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return {
    progress: scrollYProgress,
    smoothProgress,
    velocity,
    ref,
    isInView,
  };
}

/* ── Transform helpers ── */

/** Map scroll progress to a value range */
export function useScrollRange(
  progress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
): MotionValue<number> {
  return useTransform(progress, inputRange, outputRange);
}

/** Create a spring-smoothed version of any MotionValue */
export function useSmoothedValue(
  value: MotionValue<number>,
  config = { stiffness: 120, damping: 25, mass: 0.5 },
): MotionValue<number> {
  return useSpring(value, config);
}
