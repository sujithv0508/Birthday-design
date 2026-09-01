import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import PrimaryButton from "../components/PrimaryButton";
import { birthdayData } from "../data/birthdayData";

const BALLOON_COLORS = ["#f5a3c7", "#c9b6f0", "#f6c667", "#a557c9"];

function Fireworks() {
  const bursts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top: 8 + Math.random() * 40,
        delay: i * 0.9,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {bursts.map((b) => (
        <span
          key={b.id}
          className="absolute h-1.5 w-1.5 rounded-full animate-firework"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            background: b.color,
            boxShadow: `0 0 20px 6px ${b.color}`,
            animationDelay: `${b.delay}s`,
            animationDuration: "2.6s",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default function FinalWish({ onNext }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [1, 2, 3, 4].map((s) => setTimeout(() => setStep(s), s * 900));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneContainer variant="cinematic" bgClassName="bg-gradient-to-b from-[#170a29] via-plum to-midnight-deep">
      <Sparkles count={26} />
      <FloatingHearts count={12} />
      <Fireworks />

      {BALLOON_COLORS.map((color, i) => (
        <motion.div
          key={color}
          className="absolute rounded-full opacity-85"
          style={{ width: 40, height: 52, background: color, left: `${8 + i * 26}%`, bottom: "-10%" }}
          animate={{ y: ["10%", "-120%"] }}
          transition={{ duration: 9 + i * 1.4, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="mb-4 drop-shadow-[0_0_45px_rgba(245,163,199,0.75)]"
        >
          <Heart size={64} className="fill-blossom text-blossom" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-cream sm:text-5xl"
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 130 }}
          className="mt-1 font-script text-6xl text-blossom sm:text-7xl"
        >
          {birthdayData.sisterName} 🎂
        </motion.h2>

        <div className="mt-7 flex max-w-sm flex-col gap-3">
          <AnimatePresence>
            {step >= 1 && (
              <motion.p key="line1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-cream/90">
                {birthdayData.birthdayMessage}
              </motion.p>
            )}
            {step >= 2 && (
              <motion.p key="line2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-cream/90">
                May all your dreams come true and may you always be happy.
              </motion.p>
            )}
            {step >= 3 && (
              <motion.p key="line3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-cream/90">
                I&apos;m always here for you, today, tomorrow and forever. ❤️
              </motion.p>
            )}
            {step >= 4 && (
              <motion.p
                key="line4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-script text-2xl text-gold"
              >
                Love you to the moon and back! 🌙
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {step >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-9">
            <PrimaryButton onClick={onNext}>One More Thing →</PrimaryButton>
          </motion.div>
        )}
      </div>
    </SceneContainer>
  );
}
