import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DUST_COLORS = ["#f6c667", "#f5a3c7", "#c9b6f0"];

/**
 * A breathing radial aura behind the gift plus a handful of fairy-dust
 * motes drifting outward from its center. Purely decorative/absolute,
 * meant to sit behind an interactive element.
 */
export default function GiftGlow({ size = 300 }) {
  const reduceMotion = useReducedMotion();

  const dust = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.5;
        const distance = 60 + Math.random() * 70;
        return {
          id: i,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          size: 2 + Math.random() * 3,
          delay: Math.random() * 4,
          duration: 3 + Math.random() * 3,
          color: DUST_COLORS[i % DUST_COLORS.length],
        };
      }),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle, rgba(165,87,201,0.55), rgba(245,163,199,0.35) 45%, transparent 72%)",
        }}
        animate={reduceMotion ? {} : { scale: [0.85, 1.15, 0.85], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reduceMotion &&
        dust.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full"
            style={{ width: d.size, height: d.size, background: d.color, boxShadow: `0 0 6px 2px ${d.color}` }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
            animate={{ x: [0, d.dx], y: [0, d.dy], opacity: [0, 1, 0], scale: [0.5, 1, 0.6] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "easeOut" }}
          />
        ))}
    </div>
  );
}
