import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SparkleEffect from "./SparkleEffect";

/**
 * The scene's "portal" CTA: a translucent glass pill with a gold rim
 * that glows and throws a few sparkles on hover, and nudges its arrow
 * forward — a step up from the app-wide PrimaryButton just for this
 * more cinematic opening moment.
 */
export default function MagicalButton({ children, onClick, disabled }) {
  const [hovered, setHovered] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);

  function handleEnter() {
    setHovered(true);
    setSparkleKey((k) => k + 1);
  }

  return (
    <div className="relative">
      <SparkleEffect triggerKey={hovered ? sparkleKey : 0} count={5} />
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
        whileHover={disabled ? {} : { scale: 1.06 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="relative flex items-center gap-2 rounded-full border border-gold/50 bg-gradient-to-r from-blossom/30 via-orchid/30 to-lavender/30 px-8 py-3.5 text-sm font-semibold text-cream shadow-[0_0_30px_rgba(197,140,255,0.35)] backdrop-blur-md disabled:opacity-40 sm:text-base"
      >
        {children}
        <motion.span animate={hovered ? { x: 4 } : { x: 0 }} transition={{ duration: 0.25 }}>
          <ArrowRight size={18} />
        </motion.span>
      </motion.button>
    </div>
  );
}
