import { motion, useReducedMotion } from "framer-motion";

/**
 * A stylized butterfly silhouette (not an emoji, for consistent color
 * control across platforms) with a continuous wing-flutter animation.
 */
export default function ButterflyIcon({ hex, size = 44, flutter = true, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      style={{ filter: `drop-shadow(0 0 6px ${hex}aa)` }}
      animate={flutter && !reduceMotion ? { scaleX: [1, 0.82, 1] } : {}}
      transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
    >
      <g fill={hex}>
        <path d="M24 24 C 10 6, 0 12, 5 26 C 9 35, 20 31, 24 24 Z" opacity="0.92" />
        <path d="M24 24 C 38 6, 48 12, 43 26 C 39 35, 28 31, 24 24 Z" opacity="0.92" />
        <path d="M24 24 C 13 29, 7 43, 14 47 C 20 43, 23 33, 24 24 Z" opacity="0.72" />
        <path d="M24 24 C 35 29, 41 43, 34 47 C 28 43, 25 33, 24 24 Z" opacity="0.72" />
      </g>
      <rect x="22.4" y="13" width="3.2" height="25" rx="1.6" fill="#2a1245" />
    </motion.svg>
  );
}
