import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles as SparklesIcon } from "lucide-react";
import GiftGlow from "./GiftGlow";

const THEMES = {
  rose: { body: "from-blossom to-[#c73f73]", lid: "from-blossom-soft to-blossom", accent: "#f5a3c7" },
  lavender: { body: "from-lavender to-orchid", lid: "from-[#e6d9fb] to-lavender", accent: "#c9b6f0" },
  gold: { body: "from-gold to-[#c98f2e]", lid: "from-[#ffe9b8] to-gold", accent: "#f6c667" },
};

/**
 * One gift in the "Three Little Gifts" grid — locked/idle/opened.
 * Distinct from the app-wide GiftBox (used by Welcome/SurpriseOpening)
 * since this one needs theme colors, a lock overlay, and a label that
 * changes with state.
 */
export default function GiftRevealBox({ theme = "rose", title, state, onClick, size = 130, emphasis = false }) {
  const [hovered, setHovered] = useState(false);
  const t = THEMES[theme];
  const locked = state === "locked";
  const opened = state === "opened";

  return (
    <div className="flex flex-col items-center">
      <motion.button
        type="button"
        disabled={locked}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={locked ? `${title} - locked` : opened ? `${title} - opened` : `Open ${title}`}
        className="relative flex items-center justify-center bg-transparent disabled:cursor-not-allowed"
        style={{ width: size, height: size * 1.05 }}
        animate={locked ? { opacity: 0.45, y: 0 } : { opacity: 1, y: opened ? 0 : [0, -8, 0] }}
        transition={locked || opened ? { duration: 0.3 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={locked ? {} : { scale: 1.05 }}
      >
        {emphasis && <GiftGlow size={size * 2.4} />}

        <motion.div
          className="absolute rounded-full blur-2xl"
          style={{ width: size * 1.5, height: size * 1.5, background: `radial-gradient(circle, ${t.accent}66, transparent 70%)` }}
          animate={
            emphasis
              ? { opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }
              : { opacity: locked ? 0.15 : hovered ? 0.8 : 0.5 }
          }
          transition={emphasis ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
        />

        <div
          className={`absolute bottom-0 rounded-xl bg-gradient-to-b ${t.body} shadow-[0_16px_36px_rgba(0,0,0,0.4)]`}
          style={{ width: size, height: size * 0.6 }}
        >
          <div className="absolute left-1/2 top-0 h-full w-[14%] -translate-x-1/2 bg-cream/90" />
          <div className="absolute left-0 top-1/2 h-[14%] w-full -translate-y-1/2 bg-cream/90" />
        </div>

        <div
          className={`absolute rounded-lg bg-gradient-to-b ${t.lid} shadow-lg ${opened ? "opacity-90" : ""}`}
          style={{
            width: size * 1.08,
            height: size * 0.26,
            bottom: size * 0.6 - size * 0.26 * 0.25,
            transform: opened ? "translateY(-6px) rotate(-4deg)" : "none",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-cream/90"
            style={{ width: size * 0.16, height: size * 0.26 * 0.9 }}
          />
          {!opened && (
            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-cream/90" />
          )}
        </div>

        {locked && (
          <div className="absolute -top-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-midnight-deep/80 text-cream shadow">
            <Lock size={13} />
          </div>
        )}

        {!locked && !opened && hovered && (
          <SparklesIcon size={14} className="absolute -right-1 -top-1 animate-twinkle text-gold" />
        )}
      </motion.button>

      <p className="mt-3 text-center text-xs font-medium text-cream/90 sm:text-sm">{title}</p>
      <p className="mt-1 text-center text-[11px] uppercase tracking-wide text-lavender/80">
        {opened ? "Opened ❤️" : locked ? "🔒 Locked" : hovered ? "Open me 👀" : "OPEN ME 🎁"}
      </p>
    </div>
  );
}
