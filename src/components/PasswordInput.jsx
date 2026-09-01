import { motion, useReducedMotion } from "framer-motion";

const DIGIT_COUNT = 6;

/**
 * Six individually-boxed digit inputs behaving like a single OTP field:
 * auto-advance on type, backspace navigates back, and a 6-digit paste
 * fills every box at once. `status` drives the shared shake/glow look.
 */
export default function PasswordInput({ digits, inputsRef, status = "idle", disabled = false, onDigitChange, onPasteCode }) {
  const reduceMotion = useReducedMotion();

  function handleChange(e, index) {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      onDigitChange(index, "");
      return;
    }
    onDigitChange(index, val[val.length - 1]);
    if (index < DIGIT_COUNT - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key !== "Backspace") return;
    if (digits[index]) {
      onDigitChange(index, "");
    } else if (index > 0) {
      onDigitChange(index - 1, "");
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (text.length < DIGIT_COUNT) return;
    e.preventDefault();
    onPasteCode(text.slice(0, DIGIT_COUNT));
    inputsRef.current[DIGIT_COUNT - 1]?.focus();
  }

  const boxAnimate = (index) => {
    if (status === "wrong" && !reduceMotion) {
      return { x: [0, -8, 8, -6, 6, -2, 2, 0] };
    }
    if (status === "success" && !reduceMotion) {
      return {
        scale: [1, 1.16, 1],
        boxShadow: [
          "0 0 0px rgba(232,184,109,0)",
          "0 0 22px rgba(232,184,109,0.85)",
          "0 0 10px rgba(232,184,109,0.55)",
        ],
        transition: { duration: 0.5, delay: index * 0.1 },
      };
    }
    return {};
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" role="group" aria-label="6-digit secret code">
      {Array.from({ length: DIGIT_COUNT }).map((_, i) => (
        <motion.input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete="one-time-code"
          value={digits[i] || ""}
          disabled={disabled}
          aria-label={`Password digit ${i + 1}`}
          aria-invalid={status === "wrong"}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          animate={boxAnimate(i)}
          transition={status === "wrong" ? { duration: 0.45 } : undefined}
          whileFocus={reduceMotion ? {} : { scale: 1.04 }}
          className={`h-11 w-9 rounded-xl border-2 bg-card-cream text-center font-display text-xl font-semibold text-burgundy-deep shadow-sm outline-none transition-colors duration-200 sm:h-14 sm:w-12 sm:text-2xl ${
            status === "wrong"
              ? "border-burgundy"
              : status === "success"
                ? "border-amber-soft"
                : "border-burgundy/25 focus:border-burgundy focus:shadow-[0_0_12px_rgba(114,36,58,0.25)]"
          }`}
        />
      ))}
    </div>
  );
}
