import { createContext, useCallback, useContext, useRef, useState } from "react";

const ConfettiContext = createContext(null);

const COLORS = ["#f5a3c7", "#c9b6f0", "#f6c667", "#fff7f0", "#a557c9"];
const SHAPES = ["rounded-full", "rounded-sm"];

let uid = 0;

/**
 * Mount once near the root. Any descendant can call
 * `const { fire } = useConfetti()` to trigger a burst
 * from a given screen position (defaults to top-center).
 */
export function ConfettiProvider({ children }) {
  const [bursts, setBursts] = useState([]);
  const reduceMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const fire = useCallback((opts = {}) => {
    const { x = window.innerWidth / 2, y = window.innerHeight * 0.35, count = 36 } = opts;
    const id = uid++;
    const pieceCount = reduceMotion.current ? Math.min(count, 14) : count;

    const pieces = Array.from({ length: pieceCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 160;
      return {
        key: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - 60,
        rot: Math.random() * 720 - 360,
        delay: Math.random() * 0.12,
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        size: 6 + Math.random() * 6,
      };
    });

    setBursts((prev) => [...prev, { id, x, y, pieces }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1800);
  }, []);

  return (
    <ConfettiContext.Provider value={{ fire }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
        {bursts.map((burst) => (
          <div key={burst.id} style={{ position: "absolute", left: burst.x, top: burst.y }}>
            {burst.pieces.map((p) => (
              <span
                key={p.key}
                className={`absolute block ${p.shape}`}
                style={{
                  width: p.size,
                  height: p.size * 1.4,
                  background: p.color,
                  animation: `confetti-piece 1.4s cubic-bezier(0.15,0.8,0.3,1) ${p.delay}s forwards`,
                  "--tx": `${p.tx}px`,
                  "--ty": `${p.ty}px`,
                  "--rot": `${p.rot}deg`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes confetti-piece {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>
    </ConfettiContext.Provider>
  );
}

export function useConfetti() {
  const ctx = useContext(ConfettiContext);
  if (!ctx) {
    return { fire: () => {} };
  }
  return ctx;
}
