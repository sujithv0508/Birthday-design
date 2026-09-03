import { motion } from "framer-motion";
import GiftChoiceGame from "./GiftChoiceGame";

function messageLines(message) {
  const arr = Array.isArray(message) ? message : [message];
  return arr.map((line) => (typeof line === "string" ? line : line.text));
}

/**
 * The compact recap shown right after all three gifts are opened — every
 * gift's photo and message together in one glance, instead of only being
 * visible one at a time during the opening sequence. Purely a summary
 * view: the full staggered reveal, signature, and easter eggs still play
 * out in GiftPhotoReveal during the actual opening, untouched by this.
 */
export default function AllGiftsRevealed({ gifts, onContinue }) {
  return (
    <div className="relative flex w-full flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-script text-3xl text-cream sm:text-4xl">All Your Gifts 🎁❤️</h2>
        <p className="mt-1 text-sm text-cream/70">Every little gift, together at last ✨</p>
      </motion.div>

      <div className="mt-5 grid w-[min(94vw,1200px)] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {gifts.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/8 p-3.5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-4"
          >
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream p-1.5 sm:h-32 sm:w-32">
              <img src={g.image} alt={g.title} className="h-full w-full object-contain" />
            </div>
            <p className="mt-2.5 font-script text-lg text-gold sm:text-xl">{g.title}</p>
            <div className="mt-1.5 space-y-1 text-xs leading-snug text-cream/85">
              {messageLines(g.message).map((line, li) => (
                <p key={li}>{line}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <GiftChoiceGame onContinue={onContinue} />
    </div>
  );
}
