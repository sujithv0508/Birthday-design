import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import FloatingHearts from "./FloatingHearts";

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

      <AnimatePresence mode="wait">
        <motion.div
          key={memory.image}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, rotateY: 12 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close memory"
            className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-midnight-deep shadow-md"
          >
            <X size={18} />
          </button>

          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-plum/40">
            <img src={memory.image} alt={memory.title} className="h-full w-full object-cover" />
          </div>

          <div className="mt-4 flex items-start gap-2 px-1">
            <Heart size={18} className="mt-1 shrink-0 fill-blossom text-blossom" />
            <div>
              <h3 className="font-script text-2xl leading-tight text-cream">{memory.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-cream/80">{memory.caption}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between px-1">
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
