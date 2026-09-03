import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import PhotoCard from "../components/PhotoCard";
import PrimaryButton from "../components/PrimaryButton";
import MemoryDetail from "./MemoryDetail";
import { memories } from "../data/birthdayData";

export default function MemoryGallery({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <SceneContainer variant="slideUp" bgClassName="bg-gradient-to-b from-blossom-soft via-lavender/60 to-white" className="!p-0">
      <div className="relative z-10 flex w-full flex-col items-center px-5 py-6 sm:px-8 sm:py-8">
        <h2 className="text-center font-script text-3xl text-plum sm:text-4xl">Our Beautiful Memories ❤️</h2>
        <p className="mt-1 text-center font-display text-sm italic text-plum/70">Little moments, big memories ❤️</p>

        <div className="relative mt-5 w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
            <FloatingHearts count={7} colorClassName="text-blossom/50 fill-blossom/30" />
            <Sparkles count={10} />
          </div>

          <div className="relative grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
            {memories.map((memory, i) => (
              <PhotoCard key={memory.image} memory={memory} index={i} onClick={() => setOpenIndex(i)} />
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-plum/60 sm:text-sm">Click a memory to relive it ❤️</p>

        <div className="mt-5">
          <PrimaryButton onClick={onNext} icon={ArrowRight}>
            Continue
          </PrimaryButton>
        </div>
      </div>

      {openIndex !== null && (
        <MemoryDetail
          memories={memories}
          index={openIndex}
          setIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </SceneContainer>
  );
}
