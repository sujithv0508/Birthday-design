import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";
import ButterflyIcon from "./ButterflyIcon";

/**
 * The secret message revealed after catching a butterfly. Deliberately
 * has no backdrop-click-to-close — she has to press "Keep Going" so a
 * message never gets skipped by accident.
 */
export default function SecretMessageCard({ hex, message, onKeepGoing }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight-deep/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={6} />
      <Sparkles count={10} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-6 pt-10 text-center shadow-2xl backdrop-blur-xl"
        style={{ boxShadow: `0 0 60px ${hex}44` }}
      >
        <div
          className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-midnight-deep/70 shadow-lg"
          style={{ boxShadow: `0 0 30px ${hex}aa` }}
        >
          <ButterflyIcon hex={hex} size={38} />
        </div>

        <p className="font-script text-2xl text-cream">A little secret...</p>
        <p className="mt-3 text-base leading-relaxed text-cream/90">{message}</p>

        <motion.button
          type="button"
          onClick={onKeepGoing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="mt-6 rounded-full bg-gradient-to-r from-blossom to-orchid px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(165,87,201,0.45)]"
        >
          Keep Going 🦋
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
