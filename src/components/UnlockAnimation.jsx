import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LockKeyholeOpen } from "lucide-react";
import { useConfetti } from "./Confetti";

const LINES = ["Unlocked! ❤️", "You found the secret...", "There's something waiting for you."];

/**
 * Full-screen cinematic burst played once the code is correct: gold
 * flash, opened lock, heart particles, then a short line sequence
 * before `onDone` fires and the app transitions into the real Scene 1.
 */
export default function UnlockAnimation({ onDone }) {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const { fire } = useConfetti();

  useEffect(() => {
    const stepDelay = reduceMotion ? 350 : 700;
    fire({ count: reduceMotion ? 30 : 120, y: window.innerHeight * 0.45 });

    const timers = LINES.map((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * stepDelay));
    const finalDelay = LINES.length * stepDelay + (reduceMotion ? 500 : 1400);
    timers.push(setTimeout(() => onDone?.(), finalDelay));

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ivory"
      aria-live="polite"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.5] }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(232,184,109,0.65), transparent 65%)" }}
      />

      <motion.div
        initial={{ scale: 0.6, rotate: -8 }}
        animate={{ scale: [0.6, 1.25, 1], rotate: [-8, 6, 0] }}
        transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-card-cream shadow-[0_0_60px_20px_rgba(232,184,109,0.55)]"
      >
        <LockKeyholeOpen size={44} className="text-burgundy" />
      </motion.div>

      <div className="relative z-10 mt-8 flex max-w-xs flex-col items-center gap-2 text-center">
        {LINES.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 12 }}
            animate={step > i ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={i === 0 ? "font-script text-3xl text-burgundy" : "text-sm text-burgundy-deep/85"}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
