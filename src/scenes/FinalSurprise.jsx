import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles as SparklesIcon } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import PrimaryButton from "../components/PrimaryButton";
import { memories } from "../data/birthdayData";

const LINES = [
  "Through all the ups and downs,",
  "the laughs and fights,",
  "we'll always be each other's",
  "forever friends and siblings. ❤️",
];

const CORNER_PHOTOS = memories.slice(0, 4);
const POSITIONS = [
  { top: "8%", left: "6%", rotate: -8 },
  { top: "10%", right: "6%", rotate: 7 },
  { bottom: "12%", left: "8%", rotate: 6 },
  { bottom: "10%", right: "7%", rotate: -6 },
];

export default function FinalSurprise({ onNext }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showFinalHint, setShowFinalHint] = useState(false);

  useEffect(() => {
    const timers = LINES.map((_, i) => setTimeout(() => setLineIndex(i + 1), 900 + i * 1300));
    const hint = setTimeout(() => setShowFinalHint(true), 900 + LINES.length * 1300 + 700);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hint);
    };
  }, []);

  return (
    <SceneContainer variant="cinematic" bgClassName="bg-gradient-to-b from-midnight-deep via-[#1c0e30] to-plum">
      {CORNER_PHOTOS.map((m, i) => (
        <motion.img
          key={m.image}
          src={m.image}
          alt=""
          aria-hidden="true"
          className="absolute h-20 w-20 rounded-xl object-cover opacity-30 blur-[1px] sm:h-28 sm:w-28"
          style={{ ...POSITIONS[i], rotate: POSITIONS[i].rotate }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_0_35px_rgba(245,163,199,0.65)]"
        >
          <Heart size={72} className="fill-blossom text-blossom" />
        </motion.div>

        <div className="mt-8 flex min-h-[9rem] flex-col items-center justify-center gap-2">
          <AnimatePresence>
            {LINES.slice(0, lineIndex).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-xl italic text-cream sm:text-2xl"
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showFinalHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col items-center gap-6"
            >
              <p className="flex items-center gap-1.5 text-sm text-lavender">
                <SparklesIcon size={14} /> And there&apos;s one more thing...
              </p>
              <PrimaryButton onClick={onNext}>Open Your Final Surprise ✨</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneContainer>
  );
}
