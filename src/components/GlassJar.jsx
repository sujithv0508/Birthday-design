import { motion } from "framer-motion";
import ButterflyIcon from "./ButterflyIcon";

const SLOT_POSITIONS = [
  { left: "32%", top: "62%" },
  { left: "56%", top: "68%" },
  { left: "44%", top: "46%" },
  { left: "66%", top: "50%" },
  { left: "36%", top: "34%" },
  { left: "58%", top: "32%" },
];

/**
 * The glass jar at the bottom of the game — glows brighter and holds
 * each caught butterfly as it lands. `lidOpen` plays the completion
 * sequence's lid-lift; `glowBoost` adds extra brightness during it.
 */
export default function GlassJar({ collected, lidOpen = false, glowBoost = 0 }) {
  const progress = collected.length / 6;

  return (
    <div className="relative flex flex-col items-center" style={{ width: 130, height: 148 }}>
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(246,198,103,0.55), transparent 70%)" }}
        animate={{ opacity: 0.22 + progress * 0.5 + glowBoost, scale: 1 + progress * 0.22 + glowBoost * 0.4 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="absolute left-1/2 top-1 h-4 w-14 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold to-[#c98f2e] shadow-md"
        animate={lidOpen ? { y: -24, rotate: -14, opacity: 0.9 } : { y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      />

      <div className="relative mt-5 h-[112px] w-[104px] overflow-hidden rounded-b-[36px] rounded-t-xl border border-white/40 bg-white/10 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
        <div className="pointer-events-none absolute left-2 top-2 h-full w-2.5 rounded-full bg-white/30 blur-[1px]" />

        {collected.map((c, i) => {
          const pos = SLOT_POSITIONS[i % SLOT_POSITIONS.length];
          return (
            <motion.div
              key={c.color}
              className="absolute"
              style={{ left: pos.left, top: pos.top, marginLeft: -9, marginTop: -9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              <ButterflyIcon hex={c.hex} size={18} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
