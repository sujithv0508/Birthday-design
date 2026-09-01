import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "../data/birthdayData";

/**
 * The cinematic text reveal: "Happy Birthday" fades in first, then her
 * name writes itself in letter by letter, then the two personal lines.
 * Driven entirely by the `revealStep` (0-4) the parent scene owns.
 */
export default function BirthdayTitle({ revealStep }) {
  const letters = birthdayData.sisterName.split("");

  return (
    <div className="flex flex-col items-center text-center">
      <AnimatePresence>
        {revealStep >= 1 && (
          <motion.h1
            key="headline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-semibold tracking-wide text-cream sm:text-4xl"
          >
            Happy Birthday
          </motion.h1>
        )}
      </AnimatePresence>

      {revealStep >= 2 && (
        <h2
          className="mt-1 flex font-script text-5xl text-blossom sm:text-6xl"
          style={{ textShadow: "0 0 24px rgba(246,198,103,0.35)" }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14, rotate: -6, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>
      )}

      <AnimatePresence>
        {revealStep >= 3 && (
          <motion.p
            key="subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 flex items-center gap-1.5 text-base text-cream/90 sm:text-lg"
          >
            Today is all about YOU!
            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              💗
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealStep >= 4 && (
          <motion.p
            key="signature"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 font-script text-lg text-lavender"
          >
            — Love, {birthdayData.creatorName} ❤️
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
