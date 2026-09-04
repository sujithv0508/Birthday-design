import { motion } from "framer-motion";
import { Music2, Play } from "lucide-react";

const BARS = [0, 1, 2];

/**
 * The Butterfly chapter's own floating music control — a small
 * Spotify-mini-player-inspired glass button (not a copy of Spotify's
 * UI) with an animated equalizer while playing. Purely presentational;
 * ButterflyGame owns the actual <audio> element and playback state.
 */
export default function ButterflyMusicButton({ isPlaying, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      aria-pressed={isPlaying}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: isPlaying
          ? [
              "0 0 18px 2px rgba(165,87,201,0.35)",
              "0 0 26px 6px rgba(245,163,199,0.45)",
              "0 0 18px 2px rgba(165,87,201,0.35)",
            ]
          : "0 8px 20px rgba(0,0,0,0.35)",
      }}
      transition={
        isPlaying
          ? { boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }
          : { duration: 0.4 }
      }
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur-md"
    >
      <Music2 size={20} className={isPlaying ? "text-blossom" : "text-cream/70"} />

      {isPlaying ? (
        <span className="absolute bottom-1.5 flex h-2.5 items-end gap-[2px]" aria-hidden="true">
          {BARS.map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-blossom"
              animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
              transition={{ duration: 1 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}
        </span>
      ) : (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-midnight-deep/80 text-cream shadow-md">
          <Play size={9} className="ml-px fill-cream" />
        </span>
      )}
    </motion.button>
  );
}
