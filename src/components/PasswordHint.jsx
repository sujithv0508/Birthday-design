import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MailOpen, X, Heart } from "lucide-react";
import { birthdayData } from "../data/birthdayData";

/**
 * "Need a hint?" toggle that opens like a secret note — never reveals
 * the actual digits, only points at the date they're drawn from.
 */
export default function PasswordHint() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 flex flex-col items-center">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 text-sm font-medium text-wine"
      >
        {open ? <MailOpen size={16} /> : <Mail size={16} />}
        {open ? "Hide the hint" : "Need a hint? 👀"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="hint-card"
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 w-full overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative rounded-2xl border border-burgundy/20 bg-blush/60 px-5 py-4 text-center shadow-inner"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close hint"
                className="absolute right-2.5 top-2.5 text-burgundy-deep/50 hover:text-burgundy-deep"
              >
                <X size={14} />
              </button>

              <p className="font-script text-lg text-burgundy">Hint 💌</p>
              <p className="mt-1 text-sm text-burgundy-deep/90">It&apos;s a very special date...</p>
              <p className="mt-1 text-sm font-semibold text-burgundy-deep">{birthdayData.creatorName}&apos;s birthday ❤️</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-burgundy-deep/60">Think: DDMMYYYY</p>

              <div className="pointer-events-none absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-2 opacity-70">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <Heart size={10} className="fill-wine text-wine" />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
