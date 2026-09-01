import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

/**
 * A tiny, easy-to-miss glowing star hidden in the scene. Not required
 * for progress — just a small delight for anyone who taps it.
 */
export default function EasterEggStar({ style, message }) {
  const [found, setFound] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(hideTimerRef.current), []);

  function handleClick() {
    setFound(true);
    setShowToast(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowToast(false), 2200);
  }

  return (
    <div className="absolute z-20" style={style}>
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label="A hidden sparkle"
        className="p-2"
        animate={found ? { opacity: 0.15, scale: 0.8 } : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.6, repeat: found ? 0 : Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.7 }}
      >
        <Star size={14} className="fill-gold text-gold" />
      </motion.button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 rounded-full bg-midnight-deep/90 px-3 py-1.5 text-xs text-cream shadow-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
