import { motion } from "framer-motion";

/**
 * Reusable animated gift box.
 *
 * stage:
 *  - "idle"    closed box, gentle bounce, waiting to be tapped
 *  - "shaking" brief pre-open wiggle
 *  - "open"    lid off, light burst glowing behind it
 */
export default function GiftBox({ stage = "idle", size = 180, onClick, label }) {
  const boxSize = size;
  const lidHeight = size * 0.26;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label || "Open the gift"}
      className="relative flex items-center justify-center bg-transparent"
      style={{ width: boxSize, height: boxSize * 1.05 }}
      animate={
        stage === "shaking"
          ? { rotate: [0, -4, 4, -3, 3, -1, 1, 0] }
          : stage === "idle"
            ? { y: [0, -14, 0] }
            : { y: 0 }
      }
      transition={
        stage === "shaking"
          ? { duration: 0.55, ease: "easeInOut" }
          : stage === "idle"
            ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
      }
      whileTap={{ scale: 0.94 }}
    >
      {/* light burst behind the box once opened */}
      {stage === "open" && (
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-gold via-blossom to-transparent blur-2xl"
          style={{ width: boxSize * 1.6, height: boxSize * 1.6 }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* base */}
      <div
        className="absolute bottom-0 rounded-xl bg-gradient-to-b from-orchid to-plum shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        style={{ width: boxSize, height: boxSize * 0.62 }}
      >
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-gold/90"
          style={{ width: boxSize * 0.14 }}
        />
        <div
          className="absolute left-0 top-1/2 w-full -translate-y-1/2 bg-gold/90"
          style={{ height: boxSize * 0.14 }}
        />
      </div>

      {/* lid */}
      <motion.div
        className="absolute rounded-lg bg-gradient-to-b from-gold to-[#d9a53f] shadow-lg"
        style={{
          width: boxSize * 1.08,
          height: lidHeight,
          bottom: boxSize * 0.62 - lidHeight * 0.25,
        }}
        animate={
          stage === "open"
            ? { y: -boxSize * 0.55, rotate: -28, opacity: 0.95 }
            : { y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-blossom"
          style={{ width: boxSize * 0.16, height: lidHeight * 0.9 }}
        />
        <div
          className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-blossom bg-transparent"
          style={{ opacity: stage === "open" ? 0 : 1 }}
        />
      </motion.div>
    </motion.button>
  );
}
