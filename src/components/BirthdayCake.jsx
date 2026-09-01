import { useState } from "react";
import { motion } from "framer-motion";

const CANDLE_COUNT = 5;

/**
 * Interactive cake: tap it to blow out the candles one by one.
 * `onBlown` fires once, after the last candle finishes extinguishing.
 */
export default function BirthdayCake({ size = 220, onBlown }) {
  const [blown, setBlown] = useState(false);
  const w = size;

  function handleClick() {
    if (blown) return;
    setBlown(true);
    setTimeout(() => onBlown?.(), CANDLE_COUNT * 90 + 400);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Blow out the candles and make a wish"
      className="relative mx-auto block"
      style={{ width: w, height: w * 0.85 }}
    >
      {!blown && (
        <motion.span
          className="absolute rounded-full bg-gold/40"
          style={{ width: w * 0.8, height: w * 0.08, bottom: w * 0.08, left: "50%", x: "-50%" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(246,198,103,0.45)", "0 0 0 24px rgba(246,198,103,0)"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* plate */}
      <div
        className="absolute rounded-full bg-white/15 blur-[1px]"
        style={{ width: w * 0.82, height: w * 0.07, left: "50%", bottom: w * 0.08, x: "-50%", transform: "translateX(-50%)" }}
      />
      {/* bottom tier */}
      <div
        className="absolute rounded-xl bg-gradient-to-b from-orchid to-plum shadow-lg"
        style={{ width: w * 0.74, height: w * 0.24, left: "50%", bottom: w * 0.15, transform: "translateX(-50%)" }}
      />
      {/* top tier */}
      <div
        className="absolute rounded-lg bg-gradient-to-b from-gold to-[#d9a53f] shadow-lg"
        style={{ width: w * 0.52, height: w * 0.19, left: "50%", bottom: w * 0.36, transform: "translateX(-50%)" }}
      />
      {/* frosting */}
      <div
        className="absolute rounded-t-full bg-cream"
        style={{ width: w * 0.56, height: w * 0.09, left: "50%", bottom: w * 0.53, transform: "translateX(-50%)" }}
      />

      {/* candles */}
      <div
        className="absolute flex justify-center gap-[6%]"
        style={{ left: "50%", bottom: w * 0.6, transform: "translateX(-50%)" }}
      >
        {Array.from({ length: CANDLE_COUNT }).map((_, i) => (
          <div key={i} className="relative" style={{ width: w * 0.022, height: w * 0.16 }}>
            <div className="h-full w-full rounded-sm bg-gradient-to-b from-blossom to-orchid" />
            <motion.div
              className="absolute left-1/2 rounded-full"
              style={{
                width: w * 0.045,
                height: w * 0.07,
                top: -w * 0.06,
                background: "radial-gradient(circle at 50% 30%, #fff6d8, #f6c667 60%, #a557c9 100%)",
                filter: "drop-shadow(0 0 6px rgba(246,198,103,0.7))",
              }}
              initial={false}
              animate={
                blown
                  ? { opacity: 0, y: -10, scale: 0.3, x: "-50%" }
                  : { opacity: 1, y: 0, scale: 1, x: "-50%" }
              }
              transition={
                blown
                  ? { duration: 0.35, delay: i * 0.09 }
                  : { duration: 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.12 }
              }
            />
          </div>
        ))}
      </div>
    </button>
  );
}
