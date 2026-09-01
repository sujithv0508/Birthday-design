import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import { sujiNaQuiz } from "../data/birthdayData";

/**
 * Shown once all three questions are answered — no score, just a warm
 * recap of what she picked before continuing the journey.
 */
export default function SujiQuizResult({ answers, onContinue }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex w-full max-w-[600px] flex-col items-center overflow-hidden rounded-[28px] border border-quiz-lavender/20 bg-quiz-bg-purple/60 px-6 py-10 text-center shadow-[0_30px_80px_-20px_rgba(8,5,29,0.6)] backdrop-blur-md sm:px-10"
    >
      <Sparkles count={16} colorClassName="text-quiz-lavender fill-quiz-lavender/70" />
      <FloatingHearts count={8} colorClassName="text-quiz-pink/50 fill-quiz-pink/30" />

      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-quiz-pink to-quiz-violet shadow-[0_0_50px_rgba(244,63,142,0.55)]"
      >
        <Heart size={36} className="fill-white text-white" />
      </motion.div>

      <h2 className="relative z-10 mt-6 font-script text-4xl text-quiz-pink sm:text-5xl" style={{ textShadow: "0 0 28px rgba(244,63,142,0.4)" }}>
        You know me pretty well! ❤️
      </h2>

      <div className="relative z-10 mt-7 flex w-full flex-col gap-3 text-left">
        {sujiNaQuiz.map((q, i) => (
          <div key={q.question} className="rounded-2xl border border-quiz-lavender/20 bg-white/5 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-quiz-lavender/80">{q.question}</p>
            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
              {answers[i] !== null ? q.options[answers[i]] : "—"}
            </p>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        className="relative z-10 mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-quiz-pink to-quiz-bright-pink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(244,63,142,0.45)] sm:text-base"
      >
        Continue the Surprise <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
}
