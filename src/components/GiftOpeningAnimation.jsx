import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicalParticles from "./MagicalParticles";
import GiftPhotoReveal from "./GiftPhotoReveal";
import { useConfetti } from "./Confetti";

const THEME_GRADIENT = {
  rose: "from-blossom to-[#c73f73]",
  lavender: "from-lavender to-orchid",
  gold: "from-gold to-[#c98f2e]",
};
const THEME_LID = {
  rose: "from-blossom-soft to-blossom",
  lavender: "from-[#e6d9fb] to-lavender",
  gold: "from-[#ffe9b8] to-gold",
};

/**
 * The cinematic sequence played when a gift is clicked: anticipation
 * shake, lid lifting, a burst of light, then it hands off to
 * GiftPhotoReveal for the photo + message + Continue button.
 * `isFinal` (gift 3) gets a darker backdrop and a bigger burst.
 */
export default function GiftOpeningAnimation({ gift, isFinal, onContinue, onReveal }) {
  const [step, setStep] = useState(0); // 0 anticipation, 1 lid opens, 2 light burst, 3 photo
  const { fire } = useConfetti();
  const size = 160;

  useEffect(() => {
    // The final gift gets a slower, more deliberate build-up (~3s vs ~1.9s).
    const lidDelay = isFinal ? 1000 : 700;
    const lightDelay = isFinal ? 2000 : 1300;
    const photoDelay = isFinal ? 3000 : 1900;

    const timers = [
      setTimeout(() => setStep(1), lidDelay),
      setTimeout(() => {
        setStep(2);
        fire({ count: isFinal ? 90 : 55, y: window.innerHeight * 0.4 });
      }, lightDelay),
      setTimeout(() => {
        setStep(3);
        onReveal?.();
      }, photoDelay),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[92] flex flex-col items-center justify-center px-5 py-10"
      style={{ background: isFinal ? "rgba(8,5,29,0.94)" : "rgba(18,6,33,0.88)" }}
    >
      <AnimatePresence mode="wait">
        {step < 3 ? (
          <motion.div key="box" exit={{ opacity: 0, scale: 0.9 }} className="relative flex flex-col items-center">
            <p className="mb-6 text-center font-script text-2xl text-cream">
              {step === 0 ? "What's inside? 👀" : isFinal ? "The last little surprise... ❤️" : " "}
            </p>

            <div className="relative flex items-center justify-center" style={{ width: size * 1.6, height: size * 1.6 }}>
              <MagicalParticles active={step >= 2} count={isFinal ? 40 : 26} spread={140} />

              {step >= 2 && (
                <motion.div
                  className="absolute rounded-full blur-3xl"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0.6], scale: [0.4, 1.6, 1.3] }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    width: size * 1.4,
                    height: size * 1.4,
                    background: "radial-gradient(circle, rgba(255,247,240,0.9), rgba(246,198,103,0.6) 40%, transparent 75%)",
                  }}
                />
              )}

              <motion.div
                animate={step === 0 ? { rotate: [0, -4, 4, -3, 3, -1, 1, 0] } : {}}
                transition={{ duration: 0.6, repeat: step === 0 ? Infinity : 0 }}
                className="relative flex items-center justify-center"
                style={{ width: size, height: size * 1.05 }}
              >
                <div
                  className={`absolute bottom-0 rounded-xl bg-gradient-to-b ${THEME_GRADIENT[gift.theme]} shadow-2xl`}
                  style={{ width: size, height: size * 0.62 }}
                >
                  <div className="absolute left-1/2 top-0 h-full w-[14%] -translate-x-1/2 bg-cream/90" />
                  <div className="absolute left-0 top-1/2 h-[14%] w-full -translate-y-1/2 bg-cream/90" />
                </div>
                <motion.div
                  className={`absolute rounded-lg bg-gradient-to-b ${THEME_LID[gift.theme]} shadow-lg`}
                  style={{ width: size * 1.08, height: size * 0.28 }}
                  animate={
                    step >= 1
                      ? { y: -size * 0.5, rotate: -18, opacity: 0.95 }
                      : { y: size * 0.62 - size * 0.28 * 0.75, rotate: 0 }
                  }
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-cream/90"
                    style={{ width: size * 0.16, height: size * 0.28 * 0.85 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <GiftPhotoReveal key="photo" gift={gift} isFinal={isFinal} onContinue={onContinue} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
