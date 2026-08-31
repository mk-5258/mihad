/* ═══════════════════════════════════════════
   Custom Cursor — Smooth follow + context labels
   ═══════════════════════════════════════════ */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  label: string;
}

export function Cursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    label: "",
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const onMouseDown = useCallback(() => {
    setState((prev) => ({ ...prev, isClicking: true }));
  }, []);

  const onMouseUp = useCallback(() => {
    setState((prev) => ({ ...prev, isClicking: false }));
  }, []);

  useEffect(() => {
    // Detect touch device
    if ("ontouchstart" in window) return;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Observe hover targets
    const observer = new MutationObserver(() => {
      document.querySelectorAll("[data-cursor]").forEach((el) => {
        const el_ = el as HTMLElement;
        if (el_.getAttribute("data-cursor-bound")) return;
        el_.setAttribute("data-cursor-bound", "true");

        el_.addEventListener("mouseenter", () => {
          setState({
            isHovering: true,
            isClicking: stateRef.current.isClicking,
            label: el_.getAttribute("data-cursor") || "",
          });
        });

        el_.addEventListener("mouseleave", () => {
          setState({
            isHovering: false,
            isClicking: stateRef.current.isClicking,
            label: "",
          });
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, [onMouseMove, onMouseDown, onMouseUp]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          animate={{
            width: state.isHovering ? 64 : 8,
            height: state.isHovering ? 64 : 8,
            scale: state.isClicking ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          className="rounded-full border border-light/40 bg-off-white/90"
          style={{ x: "-50%", y: "-50%" }}
        />
      </motion.div>

      {/* Context label */}
      {state.label && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999]"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <span
            className="absolute left-6 top-6 text-[10px] font-medium uppercase tracking-[0.2em]"
            style={{ x: "-50%", y: "-50%" }}
          >
            {state.label}
          </span>
        </motion.div>
      )}
    </>
  );
}
