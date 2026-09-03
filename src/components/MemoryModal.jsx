import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";

// Lightweight `**phrase**` markup so a data-file paragraph can emphasize
// a specific phrase without needing JSX — splits on the markers and
// wraps the in-between segments in the same highlight style used
// elsewhere for emotionally important words.
function renderRich(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-blossom">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/**
 * The opened memory: message on the left, the large photo on the right
 * (desktop), stacked photo-then-message on mobile — the same
 * image/text balance as the gift reveal, mirrored for memories.
 */
export default function MemoryModal({ memory, onPrev, onNext, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-midnight-deep/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <FloatingHearts count={8} />
      <Sparkles count={12} />

      <AnimatePresence mode="wait">
        <motion.div
          key={memory.image}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="relative w-[min(92vw,1150px)] max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6 md:p-8 lg:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close memory"
            className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-midnight-deep shadow-md"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col gap-6 md:grid md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-8 lg:gap-12">
            <div className="order-2 flex flex-col md:order-1">
              <h3
                className="font-script text-2xl text-blossom sm:text-3xl"
                style={{ textShadow: "0 0 20px rgba(245,163,199,0.35)" }}
              >
                {memory.title}
              </h3>

              {memory.messageParagraphs ? (
                <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-cream/90 sm:text-base md:text-[16px] md:leading-relaxed">
                  {memory.messageParagraphs.map((para, i) => {
                    if (typeof para === "string") return <p key={i}>{renderRich(para)}</p>;

                    if (para.quote) {
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7 }}
                          className="relative flex items-start gap-2 rounded-xl border border-gold/25 bg-gold/[0.06] px-3.5 py-2.5 italic text-cream shadow-[0_0_24px_rgba(246,198,103,0.15)]"
                        >
                          <Heart size={15} className="mt-0.5 shrink-0 fill-blossom text-blossom" />
                          <span>{para.quote}</span>
                        </motion.div>
                      );
                    }

                    if (para.list) {
                      return (
                        <ul key={i} className="space-y-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3">
                          {para.list.map((item, li) => (
                            <li key={li}>{item}</li>
                          ))}
                        </ul>
                      );
                    }

                    return null;
                  })}
                </div>
              ) : (
                <div className="mt-3 flex items-start gap-2">
                  <Heart size={18} className="mt-1 shrink-0 fill-blossom text-blossom" />
                  <p className="text-sm leading-relaxed text-cream/90 sm:text-base md:text-[17px] md:leading-relaxed">
                    Do you remember this day? 🥹❤️
                    <br />
                    {memory.caption}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-6 flex items-center gap-1.5 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-cream/90 shadow-sm transition hover:bg-white/20 sm:text-sm"
              >
                <ArrowLeft size={14} /> Back to Memories
              </button>
            </div>

            <div className="order-1 md:order-2">
              <div
                className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl bg-cream p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:max-w-[320px] md:max-w-none lg:p-3"
                style={{ boxShadow: "0 0 40px 6px rgba(245,163,199,0.25), 0 20px 50px rgba(0,0,0,0.4)" }}
              >
                <img src={memory.image} alt={memory.title} className="h-full w-full rounded-xl object-contain" />
              </div>
            </div>
          </div>

          <div className="order-3 mt-6 flex items-center justify-center gap-3 md:justify-end">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous memory"
              className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-2 text-sm text-cream active:scale-95"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next memory"
              className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-2 text-sm text-cream active:scale-95"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
