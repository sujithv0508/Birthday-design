import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift as GiftIcon, Undo2 } from "lucide-react";
import MagicalParticles from "./MagicalParticles";
import SparkleEffect from "./SparkleEffect";
import FloatingHearts from "./FloatingHearts";
import { useConfetti } from "./Confetti";

/**
 * The photo rising out of an opened gift, framed like a polaroid on the
 * left with the personal message on the right (stacked on narrow
 * mobile screens), followed by a Continue button.
 *
 * `gift.message` can be:
 *  - a single string (one-liner gifts)
 *  - an array of strings (uniform ~400ms staggered reveal)
 *  - an array of `{ text, delay, effect }` objects for full control —
 *    `delay` overrides the gap before that line (ms, from the previous
 *    line or the photo), and `effect` is one of "funny" | "emotional" |
 *    "heartglow" | "finale" for the special per-line treatments below.
 *
 * `gift.signature`, `gift.easterEgg`, `gift.photoCaption`, and
 * `gift.imageFit` are optional extras only some gifts use.
 */
export default function GiftPhotoReveal({ gift, isFinal, onContinue }) {
  const rawLines = Array.isArray(gift.message) ? gift.message : [gift.message];
  const lines = rawLines.map((l) => (typeof l === "string" ? { text: l } : l));
  const isMultiLine = lines.length > 1;
  const { fire } = useConfetti();

  const [visibleLines, setVisibleLines] = useState(0);
  const [showSignature, setShowSignature] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [finaleKey, setFinaleKey] = useState(0);
  const [funnyShakeKey, setFunnyShakeKey] = useState(0);
  const [showFunnyStamp, setShowFunnyStamp] = useState(false);
  const [emotionalMode, setEmotionalMode] = useState(false);
  const [heartGlow, setHeartGlow] = useState(false);
  const [trailingSparkleKey, setTrailingSparkleKey] = useState(0);
  const hasFinaleLine = lines.some((l) => l.effect === "finale");

  useEffect(() => {
    const timers = [];
    let cumulative = 0;

    lines.forEach((line, i) => {
      cumulative += line.delay ?? (i === 0 ? 500 : 400);
      const at = cumulative;
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          if (line.effect === "funny") {
            setFunnyShakeKey((k) => k + 1);
            setShowFunnyStamp(true);
          }
          if (line.effect === "emotional") setEmotionalMode(true);
          if (line.effect === "heartglow") setHeartGlow(true);
          if (line.effect === "finale") {
            setFinaleKey((k) => k + 1);
            fire({ count: 40, y: window.innerHeight * 0.35 });
          }
        }, at)
      );
      if (line.effect === "funny") {
        timers.push(setTimeout(() => setShowFunnyStamp(false), at + 1400));
      }
    });

    const afterLines = cumulative;
    if (gift.signature) {
      timers.push(setTimeout(() => setShowSignature(true), afterLines + 200));
    }
    timers.push(
      setTimeout(
        () => {
          setShowContinue(true);
          setTrailingSparkleKey((k) => k + 1);
        },
        afterLines + (gift.signature ? 700 : 300)
      )
    );
    if (gift.easterEgg) {
      timers.push(setTimeout(() => setShowEasterEgg(true), afterLines + (gift.signature ? 1200 : 800)));
    }

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageFitClass = gift.imageFit === "contain" ? "object-contain p-2" : "object-cover";
  const photoCaption = gift.photoCaption || gift.title;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mx-auto flex w-full max-w-xl flex-col items-center px-4"
    >
      <MagicalParticles active count={isFinal ? 34 : 20} spread={130} />
      {emotionalMode && <FloatingHearts count={4} colorClassName="text-blossom/40 fill-blossom/25" />}

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 80, rotate: -8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: -2,
            boxShadow: heartGlow
              ? [
                  "0 20px 50px rgba(0,0,0,0.5)",
                  "0 0 40px 10px rgba(246,198,103,0.55)",
                  "0 20px 50px rgba(0,0,0,0.5)",
                ]
              : emotionalMode
                ? "0 0 30px 6px rgba(245,163,199,0.35)"
                : "0 20px 50px rgba(0,0,0,0.5)",
          }}
          transition={
            heartGlow
              ? { boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }
              : { type: "spring", stiffness: 120, damping: 14 }
          }
          className="relative w-40 shrink-0 rounded-xl bg-cream p-2 pb-5 sm:w-44"
        >
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blossom text-white shadow-lg">
            <Heart size={12} className="fill-white" />
          </div>
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-white">
            <img src={gift.image} alt={gift.title} className={`h-full w-full ${imageFitClass}`} />
          </div>
          <p className="mt-2 text-center font-script text-base text-burgundy-deep">{photoCaption}</p>
        </motion.div>

        <div className="flex max-w-xs flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          {lines.map((line, i) => {
            const isRevealed = visibleLines > i;
            const isTrailingFlourish = isMultiLine && i === lines.length - 1 && !line.effect;

            if (line.effect === "finale") {
              return (
                <motion.div key={line.text} className="relative">
                  <motion.p
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={
                      isRevealed
                        ? { opacity: 1, y: 0, filter: "blur(0px)", scale: [1, 1.06, 1] }
                        : {}
                    }
                    transition={{
                      duration: 0.7,
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                    }}
                    className="font-script text-2xl text-gold sm:text-3xl"
                    style={{ textShadow: "0 0 24px rgba(246,198,103,0.55)" }}
                  >
                    {line.text}
                  </motion.p>
                  <SparkleEffect triggerKey={finaleKey} count={8} />
                </motion.div>
              );
            }

            return (
              <motion.p
                key={line.text}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.5 }}
                className={`relative text-sm ${isTrailingFlourish ? "font-semibold text-cream" : "text-cream/90"}`}
              >
                <motion.span
                  animate={line.effect === "funny" && funnyShakeKey ? { x: [0, -4, 4, -3, 3, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {line.text}
                </motion.span>

                {isTrailingFlourish && (
                  <motion.span
                    className="ml-1.5 inline-flex items-center gap-1 align-middle"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={isRevealed ? { scale: [0, 1.3, 1], rotate: [0, -8, 0] } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <GiftIcon size={14} className="text-gold" />
                    <Heart size={11} className="fill-blossom text-blossom" />
                  </motion.span>
                )}

                {line.effect === "funny" && (
                  <AnimatePresence>
                    {showFunnyStamp && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                        animate={{ opacity: 1, scale: 1, rotate: -8 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        className="ml-2 inline-flex items-center gap-1 rounded-md border-2 border-rose-400 bg-rose-500/20 px-1.5 py-0.5 align-middle text-[10px] font-bold uppercase text-rose-200"
                      >
                        <Undo2 size={10} /> No returns 😂
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </motion.p>
            );
          })}

          {gift.signature && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={showSignature ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mt-1 font-script text-base text-lavender"
            >
              {gift.signature}
            </motion.p>
          )}

          {gift.easterEgg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={showEasterEgg ? { opacity: 1, y: [0, -4, 0] } : {}}
              transition={{ opacity: { duration: 0.6 }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
              className="text-xs italic text-gold/80"
            >
              {gift.easterEgg}
            </motion.p>
          )}
        </div>
      </div>

      {isMultiLine && !hasFinaleLine && <SparkleEffect triggerKey={trailingSparkleKey} count={6} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={showContinue ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="mt-5"
      >
        <motion.button
          type="button"
          onClick={onContinue}
          disabled={!showContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="rounded-full bg-gradient-to-r from-blossom to-orchid px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(165,87,201,0.45)] disabled:pointer-events-none"
        >
          {gift.continueLabel}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
