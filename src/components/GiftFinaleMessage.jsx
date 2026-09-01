import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "./PrimaryButton";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";

const STEPS = {
  HEADING: 1,
  PROBLEM1: 2,
  PROBLEM2: 3,
  PROBLEM3: 4,
  EMOTIONAL1: 5,
  EMOTIONAL2: 6,
  EMOTIONAL3: 7,
  TEASER: 8,
  BUTTON: 9,
};

const TIMINGS = [
  { step: STEPS.HEADING, at: 200 },
  { step: STEPS.PROBLEM1, at: 1000 },
  { step: STEPS.PROBLEM2, at: 1700 },
  { step: STEPS.PROBLEM3, at: 2400 },
  { step: STEPS.EMOTIONAL1, at: 3400 },
  { step: STEPS.EMOTIONAL2, at: 4200 },
  { step: STEPS.EMOTIONAL3, at: 5400 },
  { step: STEPS.TEASER, at: 6500 },
  { step: STEPS.BUTTON, at: 7300 },
];

/**
 * Shown once all three gifts are opened, before handing off to the
 * final celebration. A short, playful "Anna's gift-giving confession"
 * that warms up emotionally near the end. Manages its own timing —
 * the parent just needs to render it and pass `onNext`.
 */
export default function GiftFinaleMessage({ onNext }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = TIMINGS.map(({ step: s, at }) => setTimeout(() => setStep(s), at));
    return () => timers.forEach(clearTimeout);
  }, []);

  const warm = step >= STEPS.EMOTIONAL3;

  return (
    <div className="relative flex min-h-[55vh] w-full max-w-md flex-col items-center justify-center text-center sm:max-w-lg">
      {warm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ background: "radial-gradient(circle at 50% 45%, rgba(245,163,199,0.28), transparent 60%)" }}
          />
          <FloatingHearts count={8} colorClassName="text-blossom/50 fill-blossom/30" />
          <Sparkles count={12} colorClassName="text-gold fill-gold/70" />
        </>
      )}

      <AnimatePresence>
        {step >= STEPS.HEADING && (
          <motion.h2
            key="heading"
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="font-script text-2xl text-cream sm:text-3xl"
          >
            Okay Keerthi... your Anna has entered gift-giving mode!{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              😎🎁
            </motion.span>
          </motion.h2>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-col gap-2.5">
        <AnimatePresence>
          {step >= STEPS.PROBLEM1 && (
            <motion.p
              key="p1"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="text-cream/90"
            >
              Problem #1: I don&apos;t know what girls like.{" "}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, -12, 12, -8, 0] }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                😂
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= STEPS.PROBLEM2 && (
            <motion.p
              key="p2"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="text-cream/90"
            >
              Problem #2: I don&apos;t know what gift to choose.{" "}
              <motion.span
                className="inline-block"
                animate={{ y: [0, -4, 0, -3, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                😭
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= STEPS.PROBLEM3 && (
            <motion.p
              key="p3"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="text-cream/90"
            >
              Problem #3: Somehow, I still decided to surprise you.{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.25, 0.9, 1.1, 1], rotate: [0, 6, -6, 3, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                🤣
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <AnimatePresence>
          {step >= STEPS.EMOTIONAL1 && (
            <motion.p
              key="e1"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="text-cream/90"
            >
              I picked this because I really hope it makes you happy. ❤️
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= STEPS.EMOTIONAL2 && (
            <motion.p
              key="e2"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="text-cream/90"
            >
              It&apos;s something from my wishlist that I always wanted to give to someone special. ✨
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= STEPS.EMOTIONAL3 && (
            <motion.p
              key="e3"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1 }}
              className="font-script text-2xl text-blossom"
            >
              And yes... you earned that place. 🥹❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step >= STEPS.TEASER && (
          <motion.p
            key="teaser"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-lg text-cream/90"
          >
            Now let&apos;s find out whether Anna actually has good taste!{" "}
            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              😂👀🎁
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>

      {step >= STEPS.BUTTON && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <PrimaryButton onClick={onNext}>Continue →</PrimaryButton>
        </motion.div>
      )}
    </div>
  );
}
