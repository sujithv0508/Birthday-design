import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const LETTERS = ["A", "B", "C", "D"];

/**
 * state: "idle" | "selected" | "correct" | "incorrect"
 */
export default function QuizOption({ label, index, state = "idle", onClick, disabled }) {
  const base =
    "w-full rounded-2xl border px-4 py-3.5 text-left text-sm sm:text-base font-medium flex items-center gap-3 transition-colors";

  const styles = {
    idle: "border-white/20 bg-white/10 text-cream",
    selected: "border-lavender bg-white/20 text-cream",
    correct: "border-emerald-300 bg-emerald-400/25 text-cream",
    incorrect: "border-rose-300 bg-rose-500/25 text-cream",
  };

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${styles[state]}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      animate={state === "incorrect" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
        {LETTERS[index]}
      </span>
      <span className="flex-1">{label}</span>
      {state === "correct" && <Check size={18} className="shrink-0 text-emerald-200" />}
      {state === "incorrect" && <X size={18} className="shrink-0 text-rose-200" />}
    </motion.button>
  );
}
