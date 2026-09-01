import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SceneContainer from "../components/SceneContainer";
import FloatingStars from "../components/FloatingStars";
import FloatingHearts from "../components/FloatingHearts";
import GiftRevealBox from "../components/GiftRevealBox";
import GiftOpeningAnimation from "../components/GiftOpeningAnimation";
import GiftFinaleMessage from "../components/GiftFinaleMessage";
import GiftProgress from "../components/GiftProgress";
import { gifts } from "../data/birthdayData";

const TRANSIT_MESSAGES = ["Your next surprise is ready... 👀", "One last surprise... 👀❤️"];

export default function GiftRevealScene({ onNext }) {
  const [openedCount, setOpenedCount] = useState(0);
  const [openingIndex, setOpeningIndex] = useState(null);
  const [phase, setPhase] = useState("gifts"); // "gifts" | "final"

  function openGift(i) {
    if (i !== openedCount) return; // locked or already opened
    setOpeningIndex(i);
  }

  function handleContinueFromGift() {
    const justOpened = openingIndex;
    setOpeningIndex(null);
    setOpenedCount((c) => Math.max(c, justOpened + 1));
    if (justOpened === gifts.length - 1) {
      setPhase("final");
    }
  }

  return (
    <SceneContainer variant="cinematic" bgClassName="bg-transparent" className="!p-0">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 50% 45%, rgba(139, 92, 246, 0.38), transparent 40%)",
            "linear-gradient(135deg, #08051D, #170A3D, #281064)",
          ].join(", "),
        }}
      >
        <FloatingStars count={30} />
        <FloatingHearts count={10} colorClassName="text-blossom/40 fill-blossom/25" />
        <FloatingHearts count={6} colorClassName="text-gold/40 fill-gold/25" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-5 py-6 sm:px-8 sm:py-8">
        {phase === "gifts" ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="font-script text-4xl text-cream sm:text-5xl lg:text-4xl">Three Little Gifts For You 🎁</h1>
              <p className="mt-2 font-display italic text-lavender">Because one gift could never be enough ❤️</p>
              <p className="mt-1 text-sm text-cream/70">Open them one by one... 👀</p>
            </motion.div>

            <div className="mt-4">
              <GiftProgress current={openedCount} total={gifts.length} />
            </div>

            <div className="mt-6 flex w-full max-w-md flex-col items-center gap-6 sm:max-w-2xl sm:flex-row sm:items-start sm:justify-center sm:gap-8 lg:gap-10">
              {gifts.map((g, i) => (
                <GiftRevealBox
                  key={g.id}
                  theme={g.theme}
                  title={g.title}
                  state={i < openedCount ? "opened" : i === openedCount ? "idle" : "locked"}
                  onClick={() => openGift(i)}
                  size={110}
                  emphasis={i === gifts.length - 1 && i === openedCount}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {openedCount > 0 && openedCount < gifts.length && (
                <motion.p
                  key={openedCount}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-center font-script text-xl text-gold"
                >
                  {TRANSIT_MESSAGES[openedCount - 1]}
                </motion.p>
              )}
            </AnimatePresence>
          </>
        ) : (
          <GiftFinaleMessage onNext={onNext} />
        )}
      </div>

      {openingIndex !== null && (
        <GiftOpeningAnimation
          gift={gifts[openingIndex]}
          isFinal={openingIndex === gifts.length - 1}
          onContinue={handleContinueFromGift}
        />
      )}
    </SceneContainer>
  );
}
