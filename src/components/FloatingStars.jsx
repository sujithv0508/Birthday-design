import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cheap CSS-only star field — plain glowing dots (not the Sparkles
 * icon component), sized/timed randomly so the sky reads as alive
 * without any per-frame JS.
 */
export default function FloatingStars({ count = 40 }) {
  const reduceMotion = useReducedMotion();
  const effectiveCount = reduceMotion ? Math.min(count, 14) : count;

  const stars = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      })),
    [effectiveCount]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className={`absolute rounded-full bg-white ${reduceMotion ? "opacity-50" : "animate-twinkle"}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 3}px ${s.size}px rgba(255,255,255,0.5)`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
