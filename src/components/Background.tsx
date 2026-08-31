/* ═══════════════════════════════════════════
   Background — Intelligent scroll-reactive
   Subtle gradients, mouse light, thin lines
   ═══════════════════════════════════════════ */

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();

  const lightX = useTransform(scrollYProgress, [0, 1], ["40%", "60%"]);
  const lightY = useTransform(scrollYProgress, [0, 1], ["20%", "70%"]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.06, 0.04, 0.02]);

  /* ── Mouse-following soft light ── */
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth;
      mouseY.current = e.clientY / window.innerHeight;
    };

    let raf: number;
    const animate = () => {
      if (lightRef.current) {
        const targetX = 30 + mouseX.current * 40;
        const targetY = 20 + mouseY.current * 30;
        const currentX = parseFloat(lightRef.current.style.left || "40");
        const currentY = parseFloat(lightRef.current.style.top || "30");
        lightRef.current.style.left = `${currentX + (targetX - currentX) * 0.015}%`;
        lightRef.current.style.top = `${currentY + (targetY - currentY) * 0.015}%`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-dark" />

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #050505 30%, #080808 70%, #050505 100%)",
        }}
      />

      {/* Primary radial light — scroll-reactive */}
      <motion.div
        className="absolute"
        style={{
          left: lightX,
          top: lightY,
          width: "60vw",
          height: "60vh",
          opacity: lightOpacity,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(138, 152, 165, 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Mouse-following soft light */}
      <div
        ref={lightRef}
        className="absolute pointer-events-none"
        style={{
          width: "50vw",
          height: "50vh",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(185, 197, 206, 0.03) 0%, transparent 60%)",
          filter: "blur(60px)",
          transition: "none",
        }}
      />

      {/* Bottom fog */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30vh]"
        style={{
          background: "linear-gradient(to top, rgba(5, 5, 5, 0.8) 0%, transparent 100%)",
        }}
      />

      {/* Top gradient for navbar */}
      <div
        className="absolute top-0 left-0 right-0 h-28"
        style={{
          background: "linear-gradient(to bottom, rgba(5, 5, 5, 0.7) 0%, transparent 100%)",
        }}
      />

      {/* Subtle grid lines — very faint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-off-white/20" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-off-white/20" />
        <div className="absolute top-0 bottom-0 left-[75%] w-px bg-off-white/20" />
      </div>
    </div>
  );
}
