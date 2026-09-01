import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Shared ambient particle field. Renders a small, fixed number of
 * DOM nodes (never grows) driven purely by CSS animation, so it stays
 * cheap even on low-end phones. FloatingHearts and Sparkles are thin
 * presets over this.
 */
export default function Particles({
  count = 14,
  icon: Icon,
  mode = "drift", // "drift" (rises from bottom) | "twinkle" (fixed, pulsing)
  colorClassName = "text-blossom",
  minSize = 12,
  maxSize = 22,
  className = "",
}) {
  const reduceMotion = useReducedMotion();
  const effectiveCount = reduceMotion ? Math.min(count, 6) : count;

  const particles = useMemo(() => {
    return Array.from({ length: effectiveCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: mode === "twinkle" ? Math.random() * 100 : undefined,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: mode === "drift" ? 8 + Math.random() * 10 : 1.8 + Math.random() * 2.4,
      delay: Math.random() * 6,
      opacity: 0.35 + Math.random() * 0.45,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveCount, mode]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <Icon
          key={p.id}
          className={`absolute ${colorClassName} ${reduceMotion ? "" : mode === "drift" ? "animate-drift" : "animate-twinkle"}`}
          style={{
            left: `${p.left}%`,
            top: mode === "twinkle" ? `${p.top}%` : undefined,
            bottom: mode === "drift" ? "-10%" : undefined,
            width: p.size,
            height: p.size,
            opacity: reduceMotion ? p.opacity * 0.6 : p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
