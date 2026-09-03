import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles as SparklesIcon, Gift, MessageCircleHeart, Star as StarIcon, Heart } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingStars from "../components/FloatingStars";
import FloatingHearts from "../components/FloatingHearts";
import SujiQuizOption from "../components/SujiQuizOption";
import { sujiNaQuiz } from "../data/birthdayData";

const QUESTIONS = sujiNaQuiz;

const FOOTER_CHIPS = [
  { icon: SparklesIcon, label: "Fun & Personal Questions" },
  { icon: MessageCircleHeart, label: "Made with love just for you" },
  { icon: StarIcon, label: "Your answers matter" },
  { icon: Gift, label: "A sweet surprise at the end" },
];

export default function AboutHerQuiz({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [direction, setDirection] = useState(1);

  const question = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;

  function choose(i) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = i;
      return next;
    });
  }

  function goPrev() {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  }

  function advance() {
    if (answers[index] === null) return;
    if (isLast) {
      onComplete?.();
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  }

  return (
    <SceneContainer variant="blur" bgClassName="bg-transparent" className="!p-0">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 50% 45%, rgba(117, 63, 255, 0.35), transparent 45%)",
            "linear-gradient(135deg, #08051d 0%, #160b3d 45%, #25105c 100%)",
          ].join(", "),
        }}
      >
        <FloatingStars count={36} />
        <FloatingHearts count={8} colorClassName="text-quiz-pink/40 fill-quiz-pink/25" />
        <FloatingHearts count={6} colorClassName="text-quiz-lavender/40 fill-quiz-lavender/25" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-[calc(100%-32px)] max-w-[700px] rounded-[22px] border border-quiz-lavender/20 bg-quiz-bg-purple/60 px-5 py-5 shadow-[0_30px_80px_-20px_rgba(8,5,29,0.6)] backdrop-blur-md sm:px-7 sm:py-6">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-2 text-[11px] font-medium text-quiz-lavender">
              <StarIcon size={10} className="fill-quiz-lavender text-quiz-lavender" />
              Chapter {index + 1} of {QUESTIONS.length}
              <StarIcon size={10} className="fill-quiz-lavender text-quiz-lavender" />
            </span>
            <div className="h-[3px] w-[70px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-quiz-pink to-quiz-violet"
                animate={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Question {index + 1} of {QUESTIONS.length}
          </p>
          <h1
            className="mt-1.5 text-center font-script text-3xl text-quiz-pink sm:text-4xl lg:text-[42px]"
            style={{ textShadow: "0 0 28px rgba(244,63,142,0.35)" }}
          >
            All About Suji Na ❤️
          </h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={`q-${index}`}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mt-3 text-center text-[17px] font-semibold leading-[1.3] text-white sm:text-xl lg:text-[22px]">
                {question.question}
              </p>

              <div className="mt-3 flex flex-col gap-2.5">
                {question.options.map((opt, i) => (
                  <SujiQuizOption key={opt} label={opt} index={i} selected={answers[index] === i} onClick={() => choose(i)} />
                ))}
              </div>

              <div className="mt-3.5 flex items-center justify-between gap-3">
                {index > 0 ? (
                  <motion.button
                    type="button"
                    onClick={goPrev}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-[42px] items-center rounded-[22px] border border-quiz-lavender/40 bg-white/5 px-[18px] text-sm font-medium text-white/80 hover:bg-white/10"
                  >
                    ← Previous
                  </motion.button>
                ) : (
                  <span />
                )}

                <motion.button
                  type="button"
                  onClick={advance}
                  disabled={answers[index] === null}
                  whileHover={answers[index] === null ? {} : { scale: 1.05 }}
                  whileTap={answers[index] === null ? {} : { scale: 0.94 }}
                  className="flex h-[42px] items-center gap-2 rounded-[22px] bg-gradient-to-r from-quiz-pink to-quiz-bright-pink px-[22px] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(244,63,142,0.45)] disabled:opacity-40"
                >
                  {isLast ? "Continue the Surprise →" : "Next →"}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex w-[calc(100%-32px)] max-w-[700px] flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-quiz-lavender/70">
            <span>✦</span>
            <Heart size={10} className="fill-quiz-pink text-quiz-pink" />
            <span>✦</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {FOOTER_CHIPS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 rounded-full border border-quiz-lavender/20 bg-white/5 px-2.5 py-1 text-[10px] text-white/70"
              >
                <Icon size={10} className="text-quiz-lavender" />
                {label}
              </span>
            ))}
          </div>
          <span className="rounded-full border border-quiz-pink/30 bg-quiz-pink/10 px-3 py-1 text-[10px] text-white/70">
            Answer all {QUESTIONS.length} questions to unlock a special message ❤️
          </span>
        </div>
      </div>
    </SceneContainer>
  );
}
