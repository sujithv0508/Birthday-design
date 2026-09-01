import { motion } from "framer-motion";

/**
 * A quiet "journey" marker rather than a generic website progress
 * pill — the scene count stays accessible without dominating the view.
 */
export default function ProgressIndicator({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="fixed top-4 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-1.5">
      <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-cream/75">
        <span className="text-gold">✦</span>
        Chapter {current} of {total}
        <span className="text-gold">✦</span>
      </span>
      <div className="h-[3px] w-20 overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blossom via-gold to-lavender"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
