import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const BALLOON_COLORS = ["#f5a3c7", "#c9b6f0", "#f6c667", "#a557c9"];

/**
 * A memory photo hanging from a small floating balloon on a curved
 * string — the gallery's "memories floating in the air" card. Entrance
 * is a staggered rise-and-settle (via `index`); afterwards the balloon
 * bobs and the photo sways gently, each on slightly different timing
 * so the grid doesn't move in lockstep. Reduced-motion users get the
 * entrance only, no looping animation.
 */
export default function PhotoCard({ memory, index = 0, onClick }) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const color = BALLOON_COLORS[index % BALLOON_COLORS.length];
  const rotate = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3) * 0.3);
  const bobDuration = 3.4 + (index % 3) * 0.5;
  const swayDuration = 4 + (index % 4) * 0.4;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 26, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 260, damping: 15 }}
    >
      <motion.div
        className="relative h-6 w-5 rounded-full sm:h-7 sm:w-6 lg:h-8 lg:w-7"
        style={{ background: `radial-gradient(circle at 35% 30%, #fff8, ${color})` }}
        initial={{ scale: 0 }}
        animate={
          reduceMotion
            ? { scale: 1 }
            : { scale: 1, y: [0, -5, 0] }
        }
        transition={
          reduceMotion
            ? { delay: index * 0.12 + 0.1, type: "spring", stiffness: 240, damping: 12 }
            : {
                scale: { delay: index * 0.12 + 0.1, type: "spring", stiffness: 240, damping: 12 },
                y: { duration: bobDuration, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
              }
        }
      >
        <div
          className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45"
          style={{ background: color }}
        />
      </motion.div>

      <svg width="8" height="16" viewBox="0 0 8 16" className="text-plum/30" aria-hidden="true">
        <path d="M4 0 Q 7 8 4 16" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>

      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTapStart={() => setHovered(true)}
        aria-label={`View memory: ${memory.title}`}
        className="relative w-full max-w-[168px] rounded-sm bg-cream p-2 pb-3 shadow-[0_10px_24px_rgba(26,11,46,0.3)] lg:max-w-[220px] lg:p-3 lg:pb-4 xl:max-w-[240px]"
        animate={reduceMotion ? { rotate: 0 } : { rotate: [rotate, -rotate, rotate] }}
        transition={reduceMotion ? {} : { duration: swayDuration, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        whileHover={{ scale: 1.06, y: -6, rotate: 0, boxShadow: `0 20px 38px -6px ${color}99` }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-plum/20">
          <motion.img
            src={memory.image}
            alt={memory.title}
            className="h-full w-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute inset-x-1 bottom-1 rounded-full bg-midnight-deep/80 px-1.5 py-1 text-center text-[9px] font-medium leading-none text-cream shadow-md sm:text-[10px] lg:px-2 lg:py-1.5 lg:text-xs"
            >
              Click to remember ❤️
            </motion.span>
          )}
        </div>
      </motion.button>
    </motion.div>
  );
}
