import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SceneContainer from "../components/SceneContainer";
import MagicalBackground from "../components/MagicalBackground";
import MagicalGift from "../components/MagicalGift";
import BirthdayTitle from "../components/BirthdayTitle";
import MagicalButton from "../components/MagicalButton";
import EasterEggStar from "../components/EasterEggStar";
import SceneTransition from "../components/SceneTransition";
import { usePointerParallax } from "../hooks/usePointerParallax";

const EASTER_EGGS = [
  { style: { left: "10%", top: "18%" }, message: "You found a little sparkle ✨" },
  { style: { right: "8%", top: "55%" }, message: "A little piece of magic for you 💗" },
  { style: { left: "14%", bottom: "10%" }, message: "Keep going... 👀" },
];

const REVEAL_DELAYS = [1000, 1400, 1800, 2100, 2400];

export default function SurpriseOpening({ onNext }) {
  const [giftStage, setGiftStage] = useState("idle");
  const [revealStep, setRevealStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { pointer, auto } = usePointerParallax();

  useEffect(() => {
    const timers = REVEAL_DELAYS.map((delay, i) => setTimeout(() => setRevealStep(i + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  function handleBegin() {
    if (transitioning) return;
    setTransitioning(true);
  }

  return (
    <SceneContainer variant="scale" bgClassName="bg-transparent" className="!p-0">
      <MagicalBackground pointer={pointer} auto={auto} />

      {EASTER_EGGS.map((egg, i) => (
        <EasterEggStar key={i} style={egg.style} message={egg.message} />
      ))}

      <motion.div
        animate={
          transitioning
            ? { scale: 1.15, filter: "blur(6px)", opacity: 0.4 }
            : { scale: 1, filter: "blur(0px)", opacity: 1 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full flex-col items-center px-5 py-12 text-center sm:px-8"
      >
        <motion.div
          animate={auto ? {} : { x: pointer.x * 6, y: pointer.y * 5 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        >
          <MagicalGift stage={giftStage} onStageChange={setGiftStage} />
        </motion.div>

        <div className="mt-8">
          <BirthdayTitle revealStep={revealStep} />
        </div>

        {revealStep >= 5 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-9">
            <MagicalButton onClick={handleBegin}>Let&apos;s Begin ✨</MagicalButton>
          </motion.div>
        )}
      </motion.div>

      {transitioning && <SceneTransition onComplete={onNext} />}
    </SceneContainer>
  );
}
