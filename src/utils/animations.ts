/* ═══════════════════════════════════════════
   Animation Utilities — Framer Motion Variants
   ═══════════════════════════════════════════ */

import type { Variants, Transition } from "framer-motion";

/* ── Timing Constants ── */
export const EASE_OUT_EXPO: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
};

export const EASE_OUT_QUART: Transition = {
  duration: 0.8,
  ease: [0.25, 1, 0.5, 1],
};

export const EASE_IN_OUT_QUART: Transition = {
  duration: 1.0,
  ease: [0.76, 0, 0.24, 1],
};

export const STAGGER: Transition = {
  duration: 0.8,
  ease: [0.25, 1, 0.5, 1],
  staggerChildren: 0.08,
};

export const STAGGER_SLOW: Transition = {
  duration: 1.0,
  ease: [0.25, 1, 0.5, 1],
  staggerChildren: 0.15,
};

/* ── Reusable Variants ── */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: EASE_OUT_QUART,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: EASE_OUT_QUART,
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASE_OUT_EXPO,
  },
};

export const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: EASE_OUT_QUART,
  },
};

export const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: EASE_OUT_QUART,
  },
};

export const lineExpand: Variants = {
  hidden: {
    scaleX: 0,
    transformOrigin: "left",
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.4,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.3,
    },
  },
};

export const textReveal: Variants = {
  hidden: {
    y: "110%",
  },
  visible: {
    y: "0%",
    transition: {
      duration: 1.0,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: STAGGER,
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: STAGGER_SLOW,
  },
};

/* ── Navbar specific ── */
export const navbarSlide: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

export const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

/* ── Hero specific ── */
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const heroLine: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

/* ── Section Transition Variants ── */
export const sectionClipReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const largeTextSlide: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const expandLine: Variants = {
  hidden: {
    scaleX: 0,
    transformOrigin: "left",
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const circleExpand: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const socialLinkHover: Variants = {
  rest: {
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  },
  hover: {
    x: 12,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  },
};
