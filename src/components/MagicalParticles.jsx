import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Star } from "lucide-react";

const PALETTE = ["#f6c667", "#f5a3c7", "#c9b6f0", "#ffffff"];

/**
 * A mixed heart/star/gold-dust burst radiating outward from the
 * center — used for the gift's "light comes out" moment and the
 * photo's brief glow. Renders nothing while `active` is false.
 */
export default function MagicalParticles({ active, count = 24, spread = 110 }) {
  const reduceMotion = useReducedMotion();
  const effectiveCount = reduceMotion ? Math.min(count, 8) : count;

  const particles = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * spread;
        return {
          id: i,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          delay: Math.random() * 0.4,
          size: 6 + Math.random() * 8,
          color: PALETTE[i % PALETTE.length],
          isHeart: i % 3 === 0,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [effectiveCount, spread]
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {particles.map((p) => {
        const Icon = p.isHeart ? Heart : Star;
        return (
          <motion.span
            key={p.id}
            className="absolute"
            initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.3, 1.1, 0.7], x: p.dx, y: p.dy }}
            transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
          >
            <Icon size={p.size} style={{ color: p.color, fill: p.color }} />
          </motion.span>
        );
      })}
    </div>
  );
}
