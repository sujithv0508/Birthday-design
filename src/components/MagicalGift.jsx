import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import GiftBox from "./GiftBox";
import GiftGlow from "./GiftGlow";
import SparkleEffect from "./SparkleEffect";
import { useConfetti } from "./Confetti";

/**
 * The gift as a small interactive moment rather than a static prop:
 * a swinging tag, a breathing glow, hover sparkles + hint text, and a
 * playful (non-navigating) open animation with two confetti bursts.
 */
export default function MagicalGift({ stage, onStageChange }) {
  const [hovered, setHovered] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);
  const { fire } = useConfetti();
  const reduceMotion = useReducedMotion();
  const timersRef = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  function schedule(fn, delay) {
    timersRef.current.push(setTimeout(fn, delay));
  }

  function handleEnter() {
    setHovered(true);
    setSparkleKey((k) => k + 1);
  }

  function handleClick() {
    if (stage !== "idle") return;
    onStageChange("shaking");
    schedule(() => {
      onStageChange("open");
      fire({ count: 50, y: window.innerHeight * 0.42 });
    }, 550);
    schedule(() => fire({ count: 70, y: window.innerHeight * 0.4 }), 950);
  }

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleEnter}
    >
      <motion.div
        animate={reduceMotion ? {} : { rotate: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-3 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-medium text-lavender backdrop-blur-sm"
      >
        A little something for you...
      </motion.div>

      <div className="relative">
        <GiftGlow size={280} />
        <SparkleEffect triggerKey={hovered ? sparkleKey : 0} count={7} />
        <GiftBox stage={stage} size={190} onClick={handleClick} label="A gift, just because" />
      </div>

      <motion.p
        animate={{ opacity: hovered && stage === "idle" ? 1 : 0, y: hovered && stage === "idle" ? 0 : 6 }}
        transition={{ duration: 0.3 }}
        className="mt-3 text-xs text-lavender/90 sm:text-sm"
      >
        Something is waiting inside... 👀
      </motion.p>
    </div>
  );
}
