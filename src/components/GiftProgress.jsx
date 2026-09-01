/**
 * "🎁 2 / 3" plus a small row of glowing dots — not a boring bar.
 * A dot lights up gold once its gift has been opened and continued
 * past; the current one pulses white; the rest stay dim.
 */
export default function GiftProgress({ current, total }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium tracking-wide text-lavender/90">
        🎁 {Math.min(current + 1, total)} / {total}
      </span>
      <div className="flex items-center">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                i < current
                  ? "bg-gradient-to-br from-gold to-blossom shadow-[0_0_8px_rgba(246,198,103,0.8)]"
                  : i === current
                    ? "animate-pulse bg-white/80"
                    : "bg-white/15"
              }`}
            />
            {i < total - 1 && <span className={`h-px w-5 ${i < current ? "bg-gold/60" : "bg-white/15"}`} />}
          </span>
        ))}
      </div>
    </div>
  );
}
