import { motion } from "framer-motion";
import SparkleEffect from "./SparkleEffect";

const LETTERS = ["A", "B", "C", "D"];

/**
 * One answer row for the "All About Suji Na" quiz: translucent purple
 * pill with a lettered badge, brightening pink on selection with a
 * small sparkle burst. No disabled/locked state — she can change her
 * mind freely before moving on.
 */
export default function SujiQuizOption({ label, index, selected, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`relative flex w-full min-h-[52px] items-center gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm font-medium sm:min-h-[58px] sm:px-[18px] sm:text-[16px] ${
        selected
          ? "border-quiz-bright-pink bg-gradient-to-r from-quiz-pink/35 to-quiz-bright-pink/25 text-white shadow-[0_0_28px_rgba(255,79,154,0.45)]"
          : "border-quiz-lavender/35 bg-quiz-purple/10 text-white/90 hover:border-quiz-lavender/60 hover:bg-quiz-purple/20"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-[0_0_14px_rgba(109,60,255,0.55)] sm:h-[38px] sm:w-[38px] sm:text-sm ${
          selected ? "bg-white text-quiz-pink" : "bg-gradient-to-br from-quiz-purple to-quiz-violet text-white"
        }`}
      >
        {LETTERS[index]}
      </span>
      <span className="flex-1">{label}</span>
      {selected && <SparkleEffect triggerKey={1} count={5} />}
    </motion.button>
  );
}
