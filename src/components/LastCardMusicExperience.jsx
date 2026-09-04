import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Music2, Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";

const EQ_BARS = [0, 1, 2, 3];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VolumeIcon({ volume }) {
  if (volume === 0) return <VolumeX size={14} />;
  if (volume < 0.5) return <Volume1 size={14} />;
  return <Volume2 size={14} />;
}

/**
 * The final card's own "one last song" moment: a one-time ask-popup
 * (never plays automatically) that, on "Play Song", hands off to a
 * small persistent mini-player. Entirely self-contained — FinalDeal
 * only needs to call `stop()` via ref when she leaves the card, and
 * pass through the `onMusicStart`/`onMusicStop` background-track
 * override hooks (same pattern the butterfly/gift chapters use).
 */
const LastCardMusicExperience = forwardRef(function LastCardMusicExperience(
  { onMusicStart, onMusicStop },
  ref
) {
  const audioRef = useRef(null);
  const [promptState, setPromptState] = useState("hidden"); // "hidden" | "asking" | "declined" | "playing"
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [playError, setPlayError] = useState(false);

  useImperativeHandle(ref, () => ({
    stop() {
      const audio = audioRef.current;
      if (audio) audio.pause();
      setIsPlaying(false);
    },
  }));

  // The invitation appears once, shortly after the card's own entrance
  // settles — never automatically playing anything.
  useEffect(() => {
    const t = setTimeout(() => setPromptState((s) => (s === "hidden" ? "asking" : s)), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.pause();
      onMusicStop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePlaySong() {
    const audio = audioRef.current;
    setPromptState("playing");
    if (!audio) return;
    setPlayError(false);
    audio.loop = true;
    audio.volume = volume;
    onMusicStart?.();
    audio.play().catch(() => setPlayError(true));
  }

  function handleNotNow() {
    setPromptState("declined");
  }

  function togglePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setPlayError(false);
      audio.play().catch(() => setPlayError(true));
    } else {
      audio.pause();
    }
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = Number(e.target.value);
  }

  function handleVolume(e) {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio ref={audioRef} src="/music/lastcard.mp3" preload="auto" />

      <AnimatePresence>
        {promptState === "asking" && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-midnight-deep/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FloatingHearts count={7} colorClassName="text-blossom/50 fill-blossom/30" />
            <Sparkles count={10} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { type: "spring", stiffness: 170, damping: 18 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
              }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              style={{
                background: "linear-gradient(160deg, rgba(114,36,58,0.55), rgba(58,24,85,0.6))",
                boxShadow: "0 0 50px rgba(245,163,199,0.2), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10"
              >
                <Music2 size={22} className="text-blossom" />
              </motion.div>

              <h3 className="mt-3 font-script text-2xl text-blossom" style={{ textShadow: "0 0 18px rgba(245,163,199,0.4)" }}>
                One Last Song For You
              </h3>
              <p className="mt-2 text-xs text-cream/70">A special song chosen by Anna just for you ❤️</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/90">
                Before you finish this surprise…
                <br />
                Do you want to listen to one last song from Anna? ❤️
              </p>

              <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blossom to-orchid">
                    <Music2 size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-cream">Last Song For You</p>
                    <p className="truncate text-xs text-cream/60">— Your Anna ❤️</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-cream/50">
                  <span>0:00</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-0 rounded-full bg-blossom" />
                  </div>
                  <span>0:00</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <motion.button
                  type="button"
                  onClick={handlePlaySong}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Play Song"
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blossom to-orchid px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(165,87,201,0.45)]"
                >
                  <Play size={15} className="fill-white" /> Play Song ❤️
                </motion.button>
                <button
                  type="button"
                  onClick={handleNotNow}
                  aria-label="Not now"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-cream/80 transition hover:bg-white/10"
                >
                  Not Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {promptState === "playing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              boxShadow: isPlaying
                ? [
                    "0 0 20px 2px rgba(165,87,201,0.3)",
                    "0 0 30px 6px rgba(245,163,199,0.4)",
                    "0 0 20px 2px rgba(165,87,201,0.3)",
                  ]
                : "0 10px 30px rgba(0,0,0,0.4)",
            }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{
              default: { type: "spring", stiffness: 170, damping: 20 },
              boxShadow: isPlaying ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 },
            }}
            className="fixed bottom-5 right-5 z-[70] w-[240px] max-w-[78vw] overflow-hidden rounded-2xl border border-white/20 p-3 backdrop-blur-xl sm:w-[260px]"
            style={{ background: "linear-gradient(160deg, rgba(114,36,58,0.65), rgba(58,24,85,0.7))" }}
          >
            {isPlaying && <Sparkles count={5} />}

            <div className="flex items-center gap-2.5">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blossom to-orchid"
              >
                <Music2 size={14} className="text-white" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-cream">Last Song For You</p>
                <p className="truncate text-[10px] text-cream/60">Your Anna ❤️</p>
              </div>

              {isPlaying && (
                <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
                  {EQ_BARS.map((i) => (
                    <motion.span
                      key={i}
                      className="w-[2.5px] rounded-full bg-blossom"
                      animate={{ height: ["25%", "100%", "40%", "80%", "25%"] }}
                      transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
                    />
                  ))}
                </span>
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="w-7 shrink-0 text-[9px] tabular-nums text-cream/60">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(currentTime, duration || 0)}
                onChange={handleSeek}
                aria-label="Song progress"
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-blossom"
                style={{ backgroundImage: `linear-gradient(to right, #f5a3c7 ${progressPct}%, transparent ${progressPct}%)` }}
              />
              <span className="w-7 shrink-0 text-right text-[9px] tabular-nums text-cream/60">{formatTime(duration)}</span>
            </div>

            <div className="mt-2.5 flex items-center gap-2.5">
              <motion.button
                type="button"
                onClick={togglePlayPause}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label={isPlaying ? "Pause song" : "Play song"}
                aria-pressed={isPlaying}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-cream"
              >
                {isPlaying ? <Pause size={13} className="fill-cream" /> : <Play size={13} className="fill-cream" />}
              </motion.button>

              <VolumeIcon volume={volume} />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={handleVolume}
                aria-label="Volume"
                className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/15 accent-blossom"
              />

              {playError && (
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="ml-auto flex items-center gap-1 text-[9px] italic text-lavender/80 underline underline-offset-2"
                >
                  <Heart size={9} /> Tap to try again
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default LastCardMusicExperience;
