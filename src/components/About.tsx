/* ═══════════════════════════════════════════
   About — Concise editorial with animated stats
   ═══════════════════════════════════════════ */

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingY = useSpring(
    useTransform(scrollYProgress, [0.05, 0.45], [60, -15]),
    { stiffness: 70, damping: 25 },
  );
  const bodyY = useSpring(
    useTransform(scrollYProgress, [0.1, 0.5], [40, -25]),
    { stiffness: 70, damping: 25 },
  );
  const lineScale = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);

  const stats = [
    { value: 2, suffix: "K+", label: "YouTube Subscribers", delay: 0.3 },
    { value: 0, suffix: "Worldwide", label: "Discord Community", custom: true, delay: 0.45 },
    { value: 2, suffix: "", label: "Instagram Profiles", delay: 0.6 },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute -left-[8%] top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [30, -30]),
        }}
      >
        <span className="font-display font-medium text-off-white/[0.015] leading-none tracking-tight whitespace-nowrap"
          style={{ fontSize: "clamp(5rem, 16vw, 14rem)" }}
        >
          WHO IS
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
            01 / About
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mb-10 md:mb-14"
          style={{ y: headingY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden mb-2"
          >
            <h2 className="editorial-heading"
              style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)" }}
            >
              An editor, creator
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.08 }}
            className="overflow-hidden"
          >
            <h2 className="editorial-heading text-off-white/35"
              style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)" }}
            >
              and community builder.
            </h2>
          </motion.div>
        </motion.div>

        {/* Expanding line */}
        <motion.div
          className="editorial-divider mb-10 md:mb-14"
          style={{ scaleX: lineScale, transformOrigin: "left" }}
        />

        {/* Body */}
        <motion.div
          className="max-w-2xl mb-14 md:mb-20"
          style={{ y: bodyY }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="editorial-body text-sm md:text-[15px]"
          >
            Crafting visual stories across YouTube and Instagram, while building
            and leading a worldwide Discord community. What started as a passion
            for editing has grown into a multi-platform creative presence.
          </motion.p>
        </motion.div>

        {/* Animated stats — no background boxes, just text */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x sm:divide-slate/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.12,
                duration: 0.7,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="sm:pl-6 md:pl-8 first:sm:pl-0"
            >
              <span className="block font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-off-white tracking-tight">
                {stat.custom ? (
                  stat.suffix
                ) : (
                  <>
                    <AnimatedNumber target={stat.value} />
                    {stat.suffix}
                  </>
                )}
              </span>
              <span className="block font-body text-[10px] md:text-[11px] font-light tracking-[0.15em] uppercase text-muted/50 mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
