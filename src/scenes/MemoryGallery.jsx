import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import PhotoCard from "../components/PhotoCard";
import PrimaryButton from "../components/PrimaryButton";
import MemoryDetail from "./MemoryDetail";
import { memories, memoryCategories } from "../data/birthdayData";

const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];

export default function MemoryGallery({ onNext }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return memories;
    return memories.filter((m) => m.category === activeCategory.toLowerCase());
  }, [activeCategory]);

  return (
    <SceneContainer variant="slideUp" bgClassName="bg-gradient-to-b from-blossom-soft via-lavender/60 to-white">
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <h2 className="font-script text-4xl text-plum sm:text-5xl">Our Beautiful Memories ❤️</h2>

        <div className="no-scrollbar mt-5 flex w-full gap-2 overflow-x-auto pb-1">
          {memoryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-plum text-cream"
                  : "bg-white/70 text-plum hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-6 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
          <AnimatePresence>
            {filtered.map((memory, i) => (
              <motion.div
                key={memory.image}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="flex justify-center"
              >
                <PhotoCard
                  memory={memory}
                  rotate={ROTATIONS[i % ROTATIONS.length]}
                  onClick={() => setOpenIndex(i)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8">
          <PrimaryButton onClick={onNext} icon={ArrowRight}>
            Continue
          </PrimaryButton>
        </div>
      </div>

      {openIndex !== null && (
        <MemoryDetail
          memories={filtered}
          index={openIndex}
          setIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </SceneContainer>
  );
}
