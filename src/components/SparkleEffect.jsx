import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * A one-shot outward sparkle burst. Pass an incrementing `triggerKey`
 * (0 = nothing shown yet) to fire a fresh burst — remounting on each
 * new key restarts the animation.
 */
export default function SparkleEffect({ triggerKey = 0, count = 6 }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (i / count) * Math.PI * 2,
        distance: 28 + Math.random() * 22,
        delay: Math.random() * 0.25,
        size: 7 + Math.random() * 6,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, triggerKey]
  );

  if (!triggerKey) return null;

  return (
    <div key={triggerKey} className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute"
          initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.6],
            x: Math.cos(s.angle) * s.distance,
            y: Math.sin(s.angle) * s.distance,
          }}
          transition={{ duration: 0.9, delay: s.delay, ease: "easeOut" }}
        >
          <Star size={s.size} className="fill-gold text-gold" />
        </motion.span>
      ))}
    </div>
  );
}
