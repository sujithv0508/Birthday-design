import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import PasswordInput from "../components/PasswordInput";
import PasswordHint from "../components/PasswordHint";
import UnlockAnimation from "../components/UnlockAnimation";
import { birthdayData } from "../data/birthdayData";

const DIGIT_COUNT = 6;
const EMPTY_DIGITS = Array(DIGIT_COUNT).fill("");

const WRONG_MESSAGES = [
  "Hmm... not quite! 👀",
  "This secret is waiting for you... try again ❤️",
  "Maybe think about a very special date? ✨",
];

export default function SecretLockScreen({ onUnlock }) {
  const [digits, setDigits] = useState(EMPTY_DIGITS);
  const [status, setStatus] = useState("idle"); // idle | wrong | success | unlocking
  const [pulseKey, setPulseKey] = useState(0);
  const inputsRef = useRef([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (status !== "idle") return;
    if (digits.every((d) => d !== "")) {
      validate(digits.join(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits, status]);

  function validate(code) {
    if (code === birthdayData.secretCode) {
      setStatus("success");
      setTimeout(() => setStatus("unlocking"), reduceMotion ? 300 : 1100);
    } else {
      setStatus("wrong");
      setTimeout(() => {
        setDigits(EMPTY_DIGITS);
        setStatus("idle");
        inputsRef.current[0]?.focus();
      }, 1100);
    }
  }

  function handleDigitChange(index, value) {
    if (status !== "idle") return;
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value) setPulseKey((k) => k + 1);
  }

  function handlePasteCode(code) {
    if (status !== "idle") return;
    setDigits(code.split(""));
    setPulseKey((k) => k + 1);
  }

  if (status === "unlocking") {
    return <UnlockAnimation onDone={onUnlock} />;
  }

  return (
    <SceneContainer
      variant="cinematic"
      bgClassName="bg-ivory"
      className="text-burgundy-deep"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at 50% 32%, rgba(243,217,222,0.9), transparent 60%)" }}
      />
      <FloatingHearts count={12} colorClassName="text-wine/40 fill-wine/20" />
      <Sparkles count={16} colorClassName="text-amber-soft fill-amber-soft/70" />

      <motion.div
        animate={reduceMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-burgundy/15 bg-card-cream/95 px-6 py-9 text-center shadow-[0_25px_70px_-20px_rgba(74,41,51,0.35)] backdrop-blur-sm sm:px-10 sm:py-11"
      >
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <motion.div
            key={pulseKey}
            animate={
              reduceMotion
                ? {}
                : status === "wrong"
                  ? { x: [0, -6, 6, -4, 4, 0] }
                  : { scale: [1, 1.14, 1] }
            }
            transition={{ duration: pulseKey === 0 ? 1.8 : 0.5, repeat: pulseKey === 0 && status === "idle" ? Infinity : 0 }}
            className={`flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_28px_6px_rgba(114,36,58,0.22)] ${
              status === "wrong" ? "bg-blush" : "bg-blush/80"
            }`}
          >
            <Lock size={28} className="text-burgundy" />
          </motion.div>

          <AnimatePresence>
            {pulseKey > 0 && status === "idle" && (
              <motion.span
                key={`sparkle-${pulseKey}`}
                initial={{ opacity: 0, scale: 0.4, x: 18, y: -14 }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.7] }}
                transition={{ duration: 0.7 }}
                className="absolute"
              >
                <Star size={14} className="fill-amber-soft text-amber-soft" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <h1 className="mt-5 font-script text-4xl text-burgundy sm:text-5xl">Happy Birthday</h1>
        <p className="mt-1 font-display italic text-burgundy-deep/80">to my favourite person ❤️</p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-burgundy-deep/70">
          Enter our secret code to open
        </p>
        <p className="mt-1 text-xs text-burgundy-deep/50">A little secret is waiting for you... ✨</p>

        <div className="mt-6">
          <PasswordInput
            digits={digits}
            inputsRef={inputsRef}
            status={status}
            disabled={status !== "idle"}
            onDigitChange={handleDigitChange}
            onPasteCode={handlePasteCode}
          />
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-wine">
          <Star size={12} className="fill-amber-soft text-amber-soft" />
          <span aria-hidden="true">♥</span>
          <Star size={12} className="fill-amber-soft text-amber-soft" />
        </div>

        <AnimatePresence mode="wait">
          {status === "wrong" && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 space-y-1"
              role="alert"
            >
              {WRONG_MESSAGES.map((line, i) => (
                <p key={line} className={i === 0 ? "text-sm font-semibold text-burgundy" : "text-xs text-burgundy-deep/70"}>
                  {line}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {status === "idle" && <PasswordHint />}
      </motion.div>
    </SceneContainer>
  );
}
