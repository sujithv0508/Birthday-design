import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles as SparklesIcon } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import GiftBox from "../components/GiftBox";
import PrimaryButton from "../components/PrimaryButton";
import { useConfetti } from "../components/Confetti";
import { birthdayData } from "../data/birthdayData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.45, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Welcome({ onStartMusic, onNext }) {
  const [starting, setStarting] = useState(false);
  const { fire } = useConfetti();

  function handleStart() {
    if (starting) return;
    setStarting(true);
    onStartMusic?.();
    fire({ y: window.innerHeight * 0.55 });
    setTimeout(() => onNext?.(), 700);
  }

  return (
    <SceneContainer variant="cinematic" bgClassName="bg-gradient-to-b from-[#1a0b2e] via-[#22103a] to-midnight-deep">
      {/* fairy lights */}
      <div className="absolute inset-x-0 top-0 flex justify-center gap-4 pt-3 opacity-80 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_3px_rgba(246,198,103,0.6)] animate-twinkle"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>

      <Sparkles count={22} />
      <FloatingHearts count={10} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.p variants={item} className="font-body text-base text-lavender sm:text-lg">
          Hey {birthdayData.sisterName}... 👀
        </motion.p>
        <motion.p variants={item} className="mt-2 max-w-xs font-display text-xl italic text-cream sm:max-w-sm sm:text-2xl">
          {birthdayData.creatorName}❤️ made something special for you.
        </motion.p>

        <motion.div variants={item} className="mt-8">
          <GiftBox stage={starting ? "shaking" : "idle"} onClick={handleStart} label="Start the surprise" />
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <PrimaryButton onClick={handleStart} disabled={starting} icon={SparklesIcon}>
            Start the Surprise
          </PrimaryButton>
        </motion.div>
      </motion.div>
    </SceneContainer>
  );
}
