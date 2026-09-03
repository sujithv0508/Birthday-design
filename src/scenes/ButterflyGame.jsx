import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SceneContainer from "../components/SceneContainer";
import FloatingStars from "../components/FloatingStars";
import Butterfly from "../components/Butterfly";
import GlassJar from "../components/GlassJar";
import SecretMessageCard from "../components/SecretMessageCard";
import MagicalParticles from "../components/MagicalParticles";
import ButterflyIcon from "../components/ButterflyIcon";
import FinalButterflyCard from "../components/FinalButterflyCard";
import { useConfetti } from "../components/Confetti";
import { butterflyMessages } from "../data/birthdayData";

// Six points sampled around a parametric heart curve, scaled to pixel
// offsets from screen center — the shape the collected butterflies fly
// into during the completion sequence.
const HEART_POINTS = Array.from({ length: 6 }, (_, i) => {
  const t = (i / 6) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3;
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * 4, y: y * 4 };
});

export default function ButterflyGame({ onNext }) {
  const [caught, setCaught] = useState(() => Array(butterflyMessages.length).fill(false));
  const [activeMessage, setActiveMessage] = useState(null);
  const [phase, setPhase] = useState("playing"); // "playing" | "completing" | "final"
  const [completionStep, setCompletionStep] = useState(0);
  const { fire } = useConfetti();
  const timersRef = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const collected = butterflyMessages.filter((_, i) => caught[i]);
  const collectedCount = collected.length;

  function handleCaught(i) {
    setCaught((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
    fire({ count: 20, y: window.innerHeight * 0.7 });
    setActiveMessage(i);
  }

  function handleKeepGoing() {
    const justClosed = activeMessage;
    setActiveMessage(null);
    const allCaught = caught.every((c, idx) => (idx === justClosed ? true : c));
    if (allCaught) startCompletion();
  }

  function startCompletion() {
    setPhase("completing");
    timersRef.current.push(setTimeout(() => setCompletionStep(1), 900));
    timersRef.current.push(
      setTimeout(() => {
        setCompletionStep(2);
        fire({ count: 70, y: window.innerHeight * 0.45 });
      }, 2100)
    );
    timersRef.current.push(setTimeout(() => setCompletionStep(3), 3600));
    timersRef.current.push(setTimeout(() => setPhase("final"), 4400));
  }

  return (
    <SceneContainer variant="fade" bgClassName="bg-transparent" className="!p-0">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.28), transparent 55%)",
            "linear-gradient(180deg, #0b0620, #1a0d33, #100721)",
          ].join(", "),
        }}
      >
        <FloatingStars count={40} />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-5 py-6 sm:px-8">
        {phase !== "final" && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center font-script text-3xl text-cream sm:text-4xl"
            >
              Catch the Flying Butterflies 🦋✨
            </motion.h2>
            <p className="mt-1 text-center text-sm font-medium text-cream/80">
              Butterflies Collected: {collectedCount} / {butterflyMessages.length}
            </p>

            <motion.div
              animate={phase === "completing" ? { opacity: 0.35 } : { opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mt-4 h-[56vh] max-h-[460px] w-full max-w-md touch-none select-none overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
            >
              {butterflyMessages.map((b, i) =>
                !caught[i] ? (
                  <Butterfly
                    key={b.color}
                    hex={b.hex}
                    label={b.color}
                    index={i}
                    onCaught={handleCaught}
                    disabled={activeMessage !== null || phase !== "playing"}
                  />
                ) : null
              )}

              <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2">
                <GlassJar collected={collected} lidOpen={completionStep >= 1} glowBoost={phase === "completing" ? 0.35 : 0} />
              </div>
            </motion.div>

            <p className="mt-3 text-center text-xs text-cream/60">Tap a butterfly to catch it ✨</p>
          </>
        )}

        {phase === "completing" && completionStep >= 2 && (
          <div className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center">
            {collected.map((c, i) => (
              <motion.div
                key={c.color}
                className="absolute"
                initial={{ x: 0, y: 80, opacity: 0, scale: 0.5 }}
                animate={{ x: HEART_POINTS[i].x, y: HEART_POINTS[i].y, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.7] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <ButterflyIcon hex={c.hex} size={34} />
              </motion.div>
            ))}
          </div>
        )}

        {phase === "completing" && completionStep >= 3 && (
          <div className="pointer-events-none fixed inset-0 z-[64] flex items-center justify-center">
            <MagicalParticles active count={50} spread={240} />
          </div>
        )}

        <AnimatePresence>
          {activeMessage !== null && (
            <SecretMessageCard
              hex={butterflyMessages[activeMessage].hex}
              message={butterflyMessages[activeMessage].message}
              onKeepGoing={handleKeepGoing}
            />
          )}
        </AnimatePresence>

        {phase === "final" && <FinalButterflyCard onNext={onNext} />}
      </div>
    </SceneContainer>
  );
}
