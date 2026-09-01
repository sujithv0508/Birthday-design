import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

/**
 * The cinematic hand-off played when "Let's Begin" is tapped: hearts
 * fly toward the viewer while the screen washes from violet to a warm
 * flash, then `onComplete` fires so the app can advance to the next
 * scene right as the flash peaks.
 */
export default function SceneTransition({ onComplete }) {
  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  const hearts = useMemo(
    () =>
      Array.from({ length: reduceMotion ? 0 : 18 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        delay: Math.random() * 0.4,
        size: 14 + Math.random() * 18,
      })),
    [reduceMotion]
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => onComplete?.(), reduceMotion ? 500 : 1500);
    return () => clearTimeout(timerRef.current);
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[95] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundColor: "rgba(58,24,85,0)" }}
        animate={{ backgroundColor: ["rgba(58,24,85,0)", "rgba(245,163,199,0.55)", "rgba(255,247,240,0.95)"] }}
        transition={{ duration: reduceMotion ? 0.4 : 1.4, times: [0, 0.6, 1], ease: "easeInOut" }}
      />

      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{ left: `${h.left}%`, top: `${h.top}%` }}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.2, 2.4, 3.2],
            x: "calc(50vw - 50%)",
            y: "calc(45vh - 50%)",
          }}
          transition={{ duration: 1.1, delay: h.delay, ease: [0.3, 0, 0.7, 1] }}
        >
          <Heart size={h.size} className="fill-blossom text-blossom" />
        </motion.span>
      ))}
    </motion.div>
  );
}
