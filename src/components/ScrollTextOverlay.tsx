/* ═══════════════════════════════════════════
   ScrollTextOverlay — Coordinated background text
   Large words move horizontally at different speeds
   ═══════════════════════════════════════════ */

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TextLayer {
  text: string;
  top: string;
  fromX: string;
  toX: string;
  opacity: number;
  size: string;
}

const textLayers: TextLayer[] = [
  { text: "MIHAD", top: "8%", fromX: "5%", toX: "-15%", opacity: 0.018, size: "clamp(5rem,14vw,13rem)" },
  { text: "EDIT", top: "22%", fromX: "-10%", toX: "12%", opacity: 0.015, size: "clamp(4rem,11vw,10rem)" },
  { text: "CREATE", top: "38%", fromX: "8%", toX: "-20%", opacity: 0.013, size: "clamp(4rem,12vw,10rem)" },
  { text: "YOUTUBE", top: "52%", fromX: "-8%", toX: "15%", opacity: 0.014, size: "clamp(3.5rem,9vw,8rem)" },
  { text: "DISCORD", top: "65%", fromX: "12%", toX: "-18%", opacity: 0.012, size: "clamp(3.5rem,10vw,8.5rem)" },
  { text: "INSTAGRAM", top: "78%", fromX: "-5%", toX: "10%", opacity: 0.013, size: "clamp(3rem,8vw,7rem)" },
  { text: "COMMUNITY", top: "90%", fromX: "6%", toX: "-12%", opacity: 0.011, size: "clamp(2.5rem,7vw,6rem)" },
];

function ScrollTextItem({ layer, scrollYProgress }: { layer: TextLayer; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const rawX = useTransform(scrollYProgress, [0, 1], [layer.fromX, layer.toX]);
  const x = useSpring(rawX, { stiffness: 50, damping: 30 });

  return (
    <motion.span
      className="absolute font-display font-medium whitespace-nowrap select-none"
      style={{
        top: layer.top,
        left: 0,
        fontSize: layer.size,
        letterSpacing: "-0.04em",
        color: `rgba(212, 221, 228, ${layer.opacity})`,
        x,
        willChange: "transform",
      }}
    >
      {layer.text}
    </motion.span>
  );
}

export function ScrollTextOverlay() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" style={{ clipPath: "inset(0 0 0 0)" }}>
      {textLayers.map((layer) => (
        <ScrollTextItem key={layer.text} layer={layer} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
