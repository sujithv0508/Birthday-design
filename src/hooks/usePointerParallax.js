import { useEffect, useState } from "react";

/**
 * Normalized (-1..1) pointer position for subtle parallax layers.
 * On coarse-pointer (touch) devices no listener is attached — callers
 * get `auto: true` and should fall back to a gentle automatic drift.
 */
export function usePointerParallax() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isCoarse] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches);

  useEffect(() => {
    if (isCoarse) return;
    function handleMove(e) {
      setPointer({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isCoarse]);

  return { pointer, auto: isCoarse };
}
