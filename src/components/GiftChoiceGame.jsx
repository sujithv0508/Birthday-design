import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sparkles from "./Sparkles";
import FloatingHearts from "./FloatingHearts";
import { useConfetti } from "./Confetti";

const ESCAPE_MESSAGES = [
  "Nice try! 😂",
  "Nope! 😜",
  "Too slow! 🏃‍♂️💨",
  "Not this one! 😂🎁",
  "Anna says NO! 🤣",
  "Try again! 👀",
  "Almost... but NO! 😂",
];

const PROXIMITY_PX = 85;
const ESCAPE_COOLDOWN_MS = 350;

/**
 * A small joke below the "All Your Gifts" recap: Gift 1 and Gift 2 dodge
 * the cursor/touch and can never actually be picked, Gift 3 is the only
 * real option and doubles as the chapter's Continue action. Movement is
 * clamped to this component's own contained box, so the fake buttons can
 * never drift over the gift cards above or off the edge of the screen.
 */
export default function GiftChoiceGame({ onContinue }) {
  const areaRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const btn3Ref = useRef(null);
  const btnRefs = { 1: btn1Ref, 2: btn2Ref };

  const [offsets, setOffsets] = useState({ 1: { x: 0, y: 0, rot: 0 }, 2: { x: 0, y: 0, rot: 0 } });
  const [bubble, setBubble] = useState(null);
  const [solved, setSolved] = useState(false);
  const lastEscapeRef = useRef({});
  const { fire } = useConfetti();

  function escape(id) {
    if (solved) return;
    const now = Date.now();
    if (lastEscapeRef.current[id] && now - lastEscapeRef.current[id] < ESCAPE_COOLDOWN_MS) return;
    lastEscapeRef.current[id] = now;

    const area = areaRef.current;
    const btn = btnRefs[id].current;
    if (!area || !btn) return;
    const areaRect = area.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const pad = 10;
    const minX = areaRect.left + pad;
    const maxX = areaRect.right - btnRect.width - pad;
    const minY = areaRect.top + pad;
    const maxY = areaRect.bottom - btnRect.height - pad;

    const targetLeft = maxX > minX ? minX + Math.random() * (maxX - minX) : btnRect.left;
    const targetTop = maxY > minY ? minY + Math.random() * (maxY - minY) : btnRect.top;

    const deltaX = targetLeft - btnRect.left;
    const deltaY = targetTop - btnRect.top;

    setOffsets((prev) => {
      const cur = prev[id];
      return { ...prev, [id]: { x: cur.x + deltaX, y: cur.y + deltaY, rot: (Math.random() - 0.5) * 32 } };
    });

    if (Math.random() < 0.55) {
      const text = ESCAPE_MESSAGES[Math.floor(Math.random() * ESCAPE_MESSAGES.length)];
      setBubble({ id, text, key: now });
      setTimeout(() => setBubble((b) => (b?.key === now ? null : b)), 1100);
    }
  }

  function handleAreaPointerMove(e) {
    if (solved) return;
    for (const id of [1, 2]) {
      const btn = btnRefs[id].current;
      if (!btn) continue;
      const r = btn.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (dist < PROXIMITY_PX) escape(id);
    }
  }

  function handleFakeGiftPointerDown(id, e) {
    e.preventDefault();
    escape(id);
  }

  function handleGift3Click() {
    if (solved) return;
    setSolved(true);
    fire({ count: 70 });
    setTimeout(() => onContinue(), 1700);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-7 w-full max-w-lg text-center"
    >
      <p className="font-script text-xl text-cream sm:text-2xl">Okay Keerthi... 👀🎁</p>
      <p className="mt-0.5 text-sm text-cream/80 sm:text-base">Which gift do you think you need?</p>

      <div
        ref={areaRef}
        onPointerMove={handleAreaPointerMove}
        className="relative mx-auto mt-4 min-h-[150px] w-full max-w-md touch-none rounded-2xl border border-white/10 bg-white/5 px-4 py-5 select-none sm:min-h-[130px]"
      >
        {!solved && <Sparkles count={8} />}

        <div className="relative flex flex-wrap items-center justify-center gap-3">
          {[1, 2].map((id) => (
            <div key={id} className="relative">
              <motion.button
                ref={btnRefs[id]}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onPointerDown={(e) => handleFakeGiftPointerDown(id, e)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                initial={{ opacity: 0, scale: 0.6, x: 0, y: 0, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, x: offsets[id].x, y: offsets[id].y, rotate: offsets[id].rot }}
                transition={{
                  default: { type: "spring", stiffness: 320, damping: 15 },
                  opacity: { delay: (id - 1) * 0.15, duration: 0.4 },
                  scale: { delay: (id - 1) * 0.15, type: "spring", stiffness: 260, damping: 18 },
                }}
                className="relative z-10 rounded-full border border-gold/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-md sm:text-base"
              >
                🎁 Gift {id}
              </motion.button>

              <AnimatePresence>
                {bubble?.id === id && (
                  <motion.span
                    key={bubble.key}
                    initial={{ opacity: 0, y: 4, scale: 0.8 }}
                    animate={{ opacity: 1, y: -8, scale: 1 }}
                    exit={{ opacity: 0, y: -14 }}
                    className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-midnight-deep/90 px-2.5 py-1 text-xs text-gold shadow-lg"
                  >
                    {bubble.text}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}

          <motion.button
            ref={btn3Ref}
            type="button"
            onClick={handleGift3Click}
            disabled={solved}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={solved ? { opacity: 1, scale: [1, 1.18, 1] } : { opacity: 1, scale: 1 }}
            transition={solved ? { duration: 0.5 } : { delay: 0.3, type: "spring", stiffness: 260, damping: 18 }}
            whileHover={!solved ? { scale: 1.06 } : {}}
            whileTap={!solved ? { scale: 0.94 } : {}}
            style={solved ? { boxShadow: "0 0 40px 14px rgba(246,198,103,0.6)" } : undefined}
            className="relative z-10 rounded-full bg-gradient-to-r from-blossom to-orchid px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(165,87,201,0.45)] disabled:pointer-events-none sm:text-base"
          >
            🎁 Gift 3
          </motion.button>
        </div>

        <AnimatePresence>
          {solved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 flex items-end justify-center pb-2"
            >
              <FloatingHearts count={10} colorClassName="text-blossom/60 fill-blossom/40" />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative font-script text-lg text-gold sm:text-xl"
              >
                Correct choice! 😂🎁❤️
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!solved && <p className="mt-2 text-xs italic text-lavender/70">Choose wisely... 😌</p>}
    </motion.div>
  );
}
