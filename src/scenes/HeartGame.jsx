import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SceneContainer from "../components/SceneContainer";
import Sparkles from "../components/Sparkles";
import { gameConfig } from "../data/birthdayData";

const ITEM_SIZE = 40;
const BASKET_WIDTH = 56;
const BASKET_HEIGHT = 40;
const EMOJI = { heart: "❤️", gold: "⭐", bomb: "💣" };

function randomType() {
  const r = Math.random();
  if (r < gameConfig.bombChance) return "bomb";
  if (r < gameConfig.bombChance + gameConfig.goldChance) return "gold";
  return "heart";
}

/**
 * A real, playable 30-second mini-game. Falling items are driven by a
 * single requestAnimationFrame loop; mutable per-frame data lives in
 * refs so the loop itself never needs to be torn down and rebuilt.
 */
export default function HeartGame({ onComplete }) {
  const areaRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameConfig.durationSeconds);
  const [items, setItems] = useState([]);
  const [playerX, setPlayerX] = useState(140);
  const [popups, setPopups] = useState([]);

  const itemsRef = useRef([]);
  const playerXRef = useRef(140);
  const scoreRef = useRef(0);
  const keysRef = useRef(new Set());
  const pointerXRef = useRef(null);
  const rafRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const countdownRef = useRef(null);
  const idRef = useRef(0);
  const endedRef = useRef(false);
  const popupTimeoutsRef = useRef([]);

  useEffect(() => {
    function measure() {
      if (!areaRef.current) return;
      const rect = areaRef.current.getBoundingClientRect();
      playerXRef.current = rect.width / 2 - BASKET_WIDTH / 2;
      setPlayerX(playerXRef.current);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keysRef.current.add(e.key);
        e.preventDefault();
      }
    }
    function onKeyUp(e) {
      keysRef.current.delete(e.key);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  function handlePointerMove(e) {
    const rect = areaRef.current.getBoundingClientRect();
    pointerXRef.current = e.clientX - rect.left - BASKET_WIDTH / 2;
  }

  const endGame = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    clearInterval(spawnIntervalRef.current);
    clearInterval(countdownRef.current);
    cancelAnimationFrame(rafRef.current);
    popupTimeoutsRef.current.forEach(clearTimeout);
    onComplete?.(scoreRef.current);
  }, [onComplete]);

  // main animation loop
  useEffect(() => {
    let last = performance.now();

    function loop(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const KEY_SPEED = 480;
      if (keysRef.current.has("ArrowLeft")) playerXRef.current -= KEY_SPEED * dt;
      if (keysRef.current.has("ArrowRight")) playerXRef.current += KEY_SPEED * dt;
      if (pointerXRef.current !== null) {
        playerXRef.current += (pointerXRef.current - playerXRef.current) * Math.min(dt * 14, 1);
      }
      const areaWidth = areaRef.current ? areaRef.current.clientWidth : 320;
      const areaHeight = areaRef.current ? areaRef.current.clientHeight : 420;
      playerXRef.current = Math.max(0, Math.min(areaWidth - BASKET_WIDTH, playerXRef.current));
      setPlayerX(playerXRef.current);

      const basketTop = areaHeight - BASKET_HEIGHT - 6;
      const basketLeft = playerXRef.current;
      const basketRight = playerXRef.current + BASKET_WIDTH;
      const newPopups = [];
      const next = [];

      for (const it of itemsRef.current) {
        const ny = it.y + it.speed * dt;
        const itemLeft = it.x;
        const itemRight = it.x + ITEM_SIZE;
        const overlapsX = itemRight > basketLeft && itemLeft < basketRight;
        const reachedBasket = ny + ITEM_SIZE >= basketTop;

        if (reachedBasket && overlapsX) {
          if (it.type === "bomb") {
            scoreRef.current = Math.max(0, scoreRef.current - gameConfig.bombPenalty);
            newPopups.push({ id: idRef.current++, x: it.x, text: `-${gameConfig.bombPenalty}`, bad: true });
          } else {
            const pts = it.type === "gold" ? gameConfig.goldHeartPoints : gameConfig.heartPoints;
            scoreRef.current += pts;
            newPopups.push({ id: idRef.current++, x: it.x, text: `+${pts}`, bad: false });
          }
          continue;
        }
        if (ny > areaHeight + ITEM_SIZE) continue;
        next.push({ ...it, y: ny });
      }

      itemsRef.current = next;
      setItems(next);

      if (newPopups.length) {
        setScore(scoreRef.current);
        setPopups((p) => [...p, ...newPopups]);
        newPopups.forEach((p) => {
          const t = setTimeout(() => setPopups((prev) => prev.filter((x) => x.id !== p.id)), 700);
          popupTimeoutsRef.current.push(t);
        });
      }

      if (!endedRef.current) rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // spawning
  useEffect(() => {
    spawnIntervalRef.current = setInterval(() => {
      const areaWidth = areaRef.current ? areaRef.current.clientWidth : 320;
      const x = Math.random() * Math.max(areaWidth - ITEM_SIZE, 10);
      itemsRef.current = [
        ...itemsRef.current,
        { id: idRef.current++, x, y: -ITEM_SIZE, type: randomType(), speed: 90 + Math.random() * 70 },
      ];
    }, gameConfig.spawnIntervalMs);
    return () => clearInterval(spawnIntervalRef.current);
  }, []);

  // countdown — the updater only computes the next value; the side
  // effect of ending the game reacts to timeLeft separately below, so
  // we never call setState-triggering code from inside another
  // component's render pass.
  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) endGame();
  }, [timeLeft, endGame]);

  return (
    <SceneContainer variant="fade" bgClassName="bg-gradient-to-b from-midnight-deep via-plum to-midnight">
      <Sparkles count={16} />
      <div className="relative z-10 w-full max-w-md">
        <h2 className="text-center font-script text-4xl text-white">Catch the Hearts! ❤️</h2>
        <div className="mt-3 flex items-center justify-between px-1 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold tabular-nums">Score: {score}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold tabular-nums">Time: {timeLeft}s</span>
        </div>

        <div
          ref={areaRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          className="relative mt-4 h-[58vh] max-h-[480px] w-full touch-none select-none overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#150726] to-[#2a1240] shadow-inner"
        >
          {items.map((it) => (
            <span
              key={it.id}
              className="absolute text-3xl leading-none"
              style={{ left: it.x, top: it.y, width: ITEM_SIZE, height: ITEM_SIZE }}
            >
              {EMOJI[it.type]}
            </span>
          ))}

          {popups.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className={`pointer-events-none absolute text-sm font-bold ${p.bad ? "text-rose-300" : "text-emerald-300"}`}
              style={{ left: p.x, bottom: BASKET_HEIGHT + 10 }}
            >
              {p.text}
            </motion.span>
          ))}

          <div
            className="absolute flex items-center justify-center text-3xl leading-none"
            style={{ left: playerX, bottom: 6, width: BASKET_WIDTH, height: BASKET_HEIGHT }}
          >
            🧺
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-white/60">drag your finger to move · or use ← → keys</p>
      </div>
    </SceneContainer>
  );
}
