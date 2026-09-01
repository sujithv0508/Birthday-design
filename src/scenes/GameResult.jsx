import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingHearts from "../components/FloatingHearts";
import PrimaryButton from "../components/PrimaryButton";
import { useConfetti } from "../components/Confetti";
import { useCountUp } from "../hooks/useCountUp";

function messageFor(score) {
  if (score >= 90) return "You're amazing! ❤️";
  if (score >= 60) return "Pretty impressive! 😍";
  if (score >= 30) return "Not bad! 😂";
  return "Well, you tried! 😂💕";
}

export default function GameResult({ score, onNext }) {
  const shown = useCountUp(score, 1100);
  const { fire } = useConfetti();

  useEffect(() => {
    fire({ count: 34 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneContainer variant="scale" bgClassName="bg-gradient-to-b from-plum via-orchid to-blossom">
      <FloatingHearts count={10} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="font-script text-4xl text-white">Great Job! 🎉</h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="mt-4 font-display text-7xl font-bold text-white tabular-nums"
        >
          {shown}
        </motion.p>
        <p className="mt-1 text-sm uppercase tracking-widest text-white/80">Memories Collected ❤️</p>
        <p className="mt-5 text-xl font-semibold text-white">{messageFor(score)}</p>
        <p className="mt-2 text-white/85">Ready for the final surprises?</p>

        <div className="mt-8">
          <PrimaryButton onClick={onNext} icon={ArrowRight}>
            Continue
          </PrimaryButton>
        </div>
      </div>
    </SceneContainer>
  );
}
