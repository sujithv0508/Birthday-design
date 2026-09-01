import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles as SparklesIcon } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import BirthdayCake from "../components/BirthdayCake";
import PrimaryButton from "../components/PrimaryButton";
import { useConfetti } from "../components/Confetti";

const BALLOON_COLORS = ["#f5a3c7", "#c9b6f0", "#f6c667"];

export default function Celebration({ onReplay }) {
  const [wished, setWished] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const { fire } = useConfetti();

  function handleBlown() {
    setWished(true);
    fire({ count: 70 });
  }

  function handleSendWish() {
    if (!wishText.trim()) return;
    try {
      localStorage.setItem("birthdayWish", wishText.trim());
    } catch {
      // ignore storage failures, the wish still gets its animation
    }
    setWishSent(true);
    fire({ count: 40 });
  }

  return (
    <SceneContainer variant="spring" bgClassName="bg-gradient-to-b from-orchid via-plum to-midnight-deep">
      <Sparkles count={24} />
      <FloatingHearts count={14} />

      {BALLOON_COLORS.map((color, i) => (
        <motion.div
          key={color}
          className="absolute rounded-full opacity-85"
          style={{ width: 40, height: 52, background: color, left: `${12 + i * 32}%`, top: `${8 + (i % 2) * 10}%` }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="font-script text-4xl text-white sm:text-5xl">Enjoy Your Day! 🎉</h2>
        <p className="mt-2 text-white/90">You deserve all the happiness in the world! ❤️</p>

        <div className="mt-8">
          <BirthdayCake size={220} onBlown={handleBlown} />
        </div>

        <p className="mt-4 text-sm text-white/70">
          {wished ? "wish made ✨" : "tap the cake to make a wish"}
        </p>

        <AnimatePresence mode="wait">
          {wished && !wishSent && (
            <motion.div
              key="wishBox"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-6 flex w-full max-w-sm flex-col items-center gap-3"
            >
              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Write your wish here..."
                rows={3}
                maxLength={300}
                className="w-full resize-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream placeholder:text-white/50 backdrop-blur-sm focus:border-blossom focus:outline-none focus:ring-2 focus:ring-blossom/50"
              />
              <PrimaryButton onClick={handleSendWish} icon={SparklesIcon} disabled={!wishText.trim()}>
                Make a Wish
              </PrimaryButton>
            </motion.div>
          )}

          {wishSent && (
            <motion.p
              key="wishSent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-sm font-script text-2xl text-gold"
            >
              Your wish has flown to the stars ✨
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-9">
          <PrimaryButton onClick={onReplay} icon={RotateCcw}>
            Replay the Journey
          </PrimaryButton>
        </div>

        <p className="mt-10 font-script text-lg text-lavender">Made with ❤️ for you</p>
      </div>
    </SceneContainer>
  );
}
