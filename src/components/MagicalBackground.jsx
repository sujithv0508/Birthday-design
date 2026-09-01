import { motion, useReducedMotion } from "framer-motion";
import FloatingStars from "./FloatingStars";
import FloatingHearts from "./FloatingHearts";

const BALLOONS = [
  { color: "#f5a3c7", left: "6%", top: "14%", size: 26 },
  { color: "#c9b6f0", left: "90%", top: "20%", size: 22 },
  { color: "#f6c667", left: "9%", top: "72%", size: 20 },
  { color: "#a557c9", left: "88%", top: "66%", size: 24 },
];

/**
 * The "Midnight Birthday Dream" backdrop: gradient wash, a slow light
 * beam, distant balloons, and layered star/heart fields with a subtle
 * parallax offset driven by the caller's pointer position.
 */
export default function MagicalBackground({ pointer = { x: 0, y: 0 }, auto = false }) {
  const reduceMotion = useReducedMotion();
  const drift = !reduceMotion && auto;
  const follow = !reduceMotion && !auto;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundImage: [
          "radial-gradient(circle at 50% 35%, rgba(164, 84, 255, 0.35), transparent 35%)",
          "radial-gradient(circle at 20% 70%, rgba(255, 93, 177, 0.15), transparent 30%)",
          "linear-gradient(135deg, #08051B, #171047, #27106B)",
        ].join(", "),
      }}
    >
      <motion.div
        className="absolute -top-1/4 left-1/2 h-[160%] w-36 -translate-x-1/2 blur-3xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(232,184,109,0.16) 45%, rgba(255,255,255,0) 100%)",
          rotate: 8,
        }}
        animate={reduceMotion ? {} : { x: ["-16%", "16%", "-16%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {BALLOONS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-25"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size * 1.25, background: b.color }}
          animate={reduceMotion ? {} : { y: [0, -14, 0], x: [0, i % 2 ? 8 : -8, 0] }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        animate={drift ? { x: [0, 6, 0, -6, 0], y: [0, -4, 0, 4, 0] } : follow ? { x: pointer.x * 10, y: pointer.y * 8 } : {}}
        transition={drift ? { duration: 14, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 40, damping: 20 }}
      >
        <FloatingStars count={40} />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={drift ? { x: [0, -8, 0, 8, 0] } : follow ? { x: pointer.x * 18, y: pointer.y * 14 } : {}}
        transition={drift ? { duration: 16, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 40, damping: 20 }}
      >
        <FloatingHearts count={7} colorClassName="text-blossom/50 fill-blossom/30" />
        <FloatingHearts count={5} colorClassName="text-lavender/50 fill-lavender/30" />
        <FloatingHearts count={4} colorClassName="text-gold/50 fill-gold/30" />
      </motion.div>
    </div>
  );
}
