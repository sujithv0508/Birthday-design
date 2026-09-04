import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Persistent floating music button. Mounted once at the app root so it
 * survives every scene transition. Parent scenes trigger playback via
 * the exposed `start()` method (call it from a user click/tap so the
 * browser's autoplay policy allows it).
 */
const MusicController = forwardRef(function MusicController({ hidden = false }, ref) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const wasPlayingBeforeOverrideRef = useRef(false);

  useImperativeHandle(ref, () => ({
    start() {
      const audio = audioRef.current;
      if (!audio) return;
      setAttempted(true);
      audio.volume = 0.35;
      audio.play().catch(() => {
        // Autoplay was blocked — the button remains available so she can start it manually.
      });
    },
    // Lets a chapter with its own music (the butterfly game) take over
    // the background track without both playing at once.
    pauseForOverride() {
      const audio = audioRef.current;
      if (!audio) return;
      wasPlayingBeforeOverrideRef.current = !audio.paused;
      audio.pause();
    },
    resumeAfterOverride() {
      const audio = audioRef.current;
      if (!audio || !wasPlayingBeforeOverrideRef.current) return;
      wasPlayingBeforeOverrideRef.current = false;
      audio.play().catch(() => {});
    },
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    setAttempted(true);
    if (audio.paused) {
      audio.volume = 0.35;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/birthday.mp3" loop preload="none" />
      {!hidden && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          aria-pressed={isPlaying}
          className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cream shadow-lg backdrop-blur-md"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blossom">
              <Music size={10} className="animate-twinkle" />
            </span>
          )}
        </motion.button>
      )}
      {!attempted && (
        <span className="sr-only">Music will start once you begin the surprise.</span>
      )}
    </>
  );
});

export default MusicController;
