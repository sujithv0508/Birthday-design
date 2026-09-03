import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import QuizOption from "../components/QuizOption";
import PrimaryButton from "../components/PrimaryButton";
import { siblingQuiz } from "../data/birthdayData";

export default function SiblingQuiz({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [sparkleKey, setSparkleKey] = useState(0);

  const question = siblingQuiz[index];
  const isLast = index === siblingQuiz.length - 1;

  function choose(i) {
    if (selected !== null) return;
    setSelected(i);
    setSparkleKey((k) => k + 1);
  }

  function next() {
    if (isLast) {
      onComplete?.();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  return (
    <SceneContainer variant="slideUp" bgClassName="bg-gradient-to-b from-lavender via-[#b79be0] to-orchid">
      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-medium text-white/70">
            Chapter {index + 1} of {siblingQuiz.length}
          </span>
          <div className="h-[3px] w-20 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold to-cream"
              animate={{ width: `${((index + 1) / siblingQuiz.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-white/80">
          Question {index + 1} of {siblingQuiz.length}
        </p>
        <h2 className="mt-2 text-center font-script text-4xl text-white">A Little Heart-to-Heart ❤️</h2>
        <p className="mt-2 text-center text-sm text-white/75">Just answer honestly... 🥹</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="mt-6"
          >
            <p className="mb-4 text-center text-lg font-semibold text-white">{question.question}</p>
            <div className="flex flex-col gap-3">
              {question.options.map((opt, i) => (
                <QuizOption
                  key={opt}
                  label={opt}
                  index={i}
                  state={selected === i ? "selected" : "idle"}
                  disabled={selected !== null}
                  onClick={() => choose(i)}
                  sparkleKey={sparkleKey}
                />
              ))}
            </div>

            {selected !== null && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-sm leading-relaxed text-gold sm:text-base"
              >
                {question.reactions[selected]}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-center">
            <PrimaryButton onClick={next} icon={ArrowRight}>
              {isLast ? "Next Round" : "Next"}
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </SceneContainer>
  );
}
