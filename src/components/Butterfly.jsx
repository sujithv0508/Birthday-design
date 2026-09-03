import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ButterflyIcon from "./ButterflyIcon";

const JAR_TARGET = { left: "50%", top: "88%" };

/**
 * A single flying, catchable butterfly. Wanders a randomized looping
 * path within its (percentage-positioned) parent until tapped, then
 * flies to the jar and shrinks away — `onCaught` fires once that
 * landing animation finishes.
 */
export default function Butterfly({ hex, label, index, onCaught, disabled }) {
  const [caught, setCaught] = useState(false);
  const reduceMotion = useReducedMotion();

  const path = useMemo(() => {
    const rand = (min, max) => min + Math.random() * (max - min);
    const points = Array.from({ length: 4 }, () => ({
      left: `${rand(10, 82)}%`,
      top: `${rand(8, 62)}%`,
    }));
    return {
      left: [...points.map((p) => p.left), points[0].left],
      top: [...points.map((p) => p.top), points[0].top],
      rotate: [rand(-10, 10), rand(-10, 10), rand(-10, 10), rand(-10, 10), rand(-10, 10)],
      duration: rand(9, 15),
      delay: rand(0, 1.5) + index * 0.15,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClick() {
    if (caught || disabled) return;
    setCaught(true);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={caught || disabled}
      aria-label={caught ? `${label} butterfly caught` : `Catch the ${label} butterfly`}
      className="absolute flex touch-manipulation items-center justify-center disabled:pointer-events-none"
      style={{ width: 56, height: 56, marginLeft: -28, marginTop: -28 }}
      initial={{ left: path.left[0], top: path.top[0], opacity: 0, scale: 0.6 }}
      animate={
        caught
          ? { left: JAR_TARGET.left, top: JAR_TARGET.top, scale: 0.25, opacity: 0, rotate: 0 }
          : reduceMotion
            ? { left: path.left[0], top: path.top[0], opacity: 1, scale: 1 }
            : { left: path.left, top: path.top, rotate: path.rotate, opacity: 1, scale: 1 }
      }
      transition={
        caught
          ? { duration: 0.7, ease: [0.4, 0, 0.6, 1] }
          : {
              opacity: { duration: 0.5, delay: path.delay },
              scale: { duration: 0.5, delay: path.delay },
              left: { duration: path.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: path.delay },
              top: { duration: path.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: path.delay },
              rotate: { duration: path.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: path.delay },
            }
      }
      onAnimationComplete={() => {
        if (caught) onCaught?.(index);
      }}
      whileHover={caught || disabled ? {} : { scale: 1.15 }}
      whileTap={caught || disabled ? {} : { scale: 0.9 }}
    >
      <ButterflyIcon hex={hex} size={40} flutter={!caught} />
    </motion.button>
  );
}
