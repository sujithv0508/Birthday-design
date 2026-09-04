import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Star, Undo2 } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import FloatingStars from "../components/FloatingStars";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import MagicalParticles from "../components/MagicalParticles";
import ButterflyIcon from "../components/ButterflyIcon";
import SisterLanguageBorder from "../components/SisterLanguageBorder";
import LastCardMusicExperience from "../components/LastCardMusicExperience";
import { useConfetti } from "../components/Confetti";

const BUTTERFLY_HEXES = ["#f5a3c7", "#a557c9", "#6db8f2", "#f6c667"];

// Decorative background layer for the final card, split into a LEFT and
// a RIGHT field so the magic reads as alive on both sides of the card
// rather than only drifting vertically. Each entry drifts on its own
// horizontal + vertical (sometimes diagonal) path, timing, and size so
// the two sides never feel like mirrored copies of each other. Purely
// decorative — the card and its content never move.
// Positions stay within ~0-3% of the true screen edge — the card can
// leave a fairly narrow side margin on mid-width laptop screens, and
// anything placed further in than that risks rendering behind the card
// instead of beside it.
const LEFT_GLOWS = [
  { color: "bg-blossom/30", size: 190, top: "6%", left: "-1%", x: [0, 30, -12, 0], y: [0, -22, 16, 0], duration: 17 },
  { color: "bg-gold/22", size: 140, top: "70%", left: "0%", x: [0, -20, 18, 0], y: [0, 18, -14, 0], duration: 14 },
  { color: "bg-lavender/18", size: 110, top: "42%", left: "1%", x: [0, 14, -20, 0], y: [0, -26, 10, 0], duration: 20 },
];
const RIGHT_GLOWS = [
  { color: "bg-orchid/28", size: 220, top: "12%", right: "-1%", x: [0, -36, 20, 0], y: [0, 26, -18, 0], duration: 21 },
  { color: "bg-lavender/20", size: 150, top: "72%", right: "0%", x: [0, 28, -16, 0], y: [0, -18, 22, 0], duration: 15.5 },
  { color: "bg-blossom/20", size: 120, top: "38%", right: "1.5%", x: [0, -16, 22, 0], y: [0, 20, -12, 0], duration: 19 },
];

const LEFT_ICONS = [
  { icon: Heart, size: 20, color: "text-blossom/80 fill-blossom/60", top: "22%", left: "1.5%", x: [0, -14, 10, 0], y: [0, 20, -10, 0], duration: 12, delay: 0.4 },
  { icon: Star, size: 15, color: "text-gold/90 fill-gold/70", top: "48%", left: "-0.5%", x: [0, 16, -8, 0], y: [0, -14, 12, 0], duration: 10, delay: 1.1 },
  { icon: Heart, size: 14, color: "text-lavender/70 fill-lavender/50", top: "82%", left: "2%", x: [0, 10, -14, 0], y: [0, -12, 8, 0], duration: 15, delay: 1.8 },
];
const RIGHT_ICONS = [
  { icon: Star, size: 17, color: "text-lavender/90 fill-lavender/70", top: "18%", right: "1.5%", x: [0, -16, 10, 0], y: [0, 16, -13, 0], duration: 13, delay: 0.8 },
  { icon: Heart, size: 22, color: "text-gold/80 fill-gold/60", top: "56%", right: "-0.5%", x: [0, 14, -12, 0], y: [0, -18, 15, 0], duration: 11, delay: 0.2 },
  { icon: Star, size: 13, color: "text-blossom/70 fill-blossom/50", top: "84%", right: "2%", x: [0, -10, 14, 0], y: [0, 13, -9, 0], duration: 16, delay: 1.5 },
];

/**
 * The true end of the journey — one last question, framed by a
 * "sister" ticker in many languages, ending in a permanent birthday
 * moment. `onBack` powers "Return to Journey", the only navigation
 * left here — it steps back one chapter rather than restarting.
 */
export default function FinalDeal({ onBack, onLastCardMusicStart, onLastCardMusicStop }) {
  const [phase, setPhase] = useState("asking"); // "asking" | "celebrating" | "final"
  const [showNiceTry, setShowNiceTry] = useState(false);
  const { fire } = useConfetti();
  const timersRef = useRef([]);
  const musicExpRef = useRef(null);
  const reduceMotion = useReducedMotion();

  function handleReturnToJourney() {
    musicExpRef.current?.stop();
    onBack();
  }

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (phase !== "asking") return;
    const t = setTimeout(() => setShowNiceTry(true), 7000);
    return () => clearTimeout(t);
  }, [phase]);

  function handleAccept() {
    if (phase !== "asking") return;
    setPhase("celebrating");
    fire({ count: 80 });
    timersRef.current.push(setTimeout(() => fire({ count: 60, y: window.innerHeight * 0.4 }), 900));
    timersRef.current.push(setTimeout(() => setPhase("final"), 3400));
  }

  return (
    <SceneContainer variant="cinematic" bgClassName="bg-transparent" className="!p-0">
      <LastCardMusicExperience ref={musicExpRef} onMusicStart={onLastCardMusicStart} onMusicStop={onLastCardMusicStop} />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 50% 30%, rgba(245, 163, 199, 0.28), transparent 55%)",
            "linear-gradient(180deg, #170a29, #2a1245, #170a29)",
          ].join(", "),
        }}
      >
        <FloatingStars count={36} />
        <FloatingHearts count={10} colorClassName="text-blossom/40 fill-blossom/25" />
        <FloatingHearts count={6} colorClassName="text-gold/40 fill-gold/25" />

        {[...LEFT_GLOWS, ...RIGHT_GLOWS].map((o, i) =>
          reduceMotion ? (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl ${o.color}`}
              style={{ width: o.size, height: o.size, top: o.top, left: o.left, right: o.right }}
            />
          ) : (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-3xl ${o.color}`}
              style={{ width: o.size, height: o.size, top: o.top, left: o.left, right: o.right }}
              animate={{ x: o.x, y: o.y }}
              transition={{ duration: o.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          )
        )}

        {[...LEFT_ICONS, ...RIGHT_ICONS].map((p, i) => {
          const Icon = p.icon;
          return reduceMotion ? (
            <Icon
              key={i}
              size={p.size}
              className={`absolute opacity-60 ${p.color}`}
              style={{ top: p.top, left: p.left, right: p.right }}
            />
          ) : (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: p.top, left: p.left, right: p.right }}
              animate={{ x: p.x, y: p.y, opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon size={p.size} className={p.color} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 py-6 sm:px-8 md:py-8">
        {phase !== "final" ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={
              phase === "celebrating"
                ? { opacity: 1, y: 0, scale: 1.04, filter: "brightness(0.75)" }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[92vw] overflow-hidden rounded-[28px] border border-white/20 bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl md:w-[88vw] md:max-w-[1150px]"
          >
            {phase === "celebrating" && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                <MagicalParticles active count={50} spread={200} />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.3, 1], opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Heart size={72} className="fill-blossom text-blossom drop-shadow-[0_0_30px_rgba(245,163,199,0.8)]" />
                </motion.div>
              </div>
            )}

            <SisterLanguageBorder celebrating={phase === "celebrating"} />

            <div className="px-5 py-5 sm:px-10 sm:py-6 md:px-14 md:py-7">
              <h1
                className="text-center font-script text-3xl text-blossom sm:text-4xl md:text-5xl"
                style={{ textShadow: "0 0 26px rgba(245,163,199,0.4)" }}
              >
                One Last Question, Keerthi... ❤️
              </h1>
              <p className="mx-auto mt-1.5 max-w-2xl text-center text-sm text-cream/80 sm:text-base md:text-lg">
                Before you leave this little surprise... your Anna has one final thing to ask you. 🥹
              </p>

              <div className="mx-auto mt-4 max-w-3xl text-left text-sm leading-relaxed text-cream/90 sm:text-base md:columns-2 md:gap-8 md:text-[15.5px] md:leading-[1.65]">
                <p className="mb-3">
                  Okay Keerthi... ❤️ Now tell me honestly... did you like all my birthday wishes and this little
                  surprise I made for you? 🥹 Did it make you happy? Did it make you emotional? Did you smile while
                  going through all these <span className="font-semibold text-blossom">memories</span>? ❤️
                </p>

                <p className="mb-1.5">Or... did you think:</p>
                <p className="mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 italic text-cream/80 break-inside-avoid">
                  &ldquo;Indha Anna-ku vera velaiye illaya? 😂 Ivlo neram spend panni website create
                  pannirukaan!&rdquo; 🤦‍♂️🤣
                  <br />
                  Maybe you even thought — &ldquo;Enakku already so many brothers irukaanga... Idhula ivanum vera
                  oruthana?&rdquo; 😂
                </p>

                <p className="mb-3">
                  But listen... I don&apos;t want to be just another brother in the list. I want to be your{" "}
                  <span className="font-semibold text-blossom">Anna</span>. ❤️ The one you can call whenever you
                  need me, the one you can fight with, the one you can irritate, the one who will irritate you back
                  😂 — and the one who will <span className="font-semibold text-blossom">always</span> stand by you.
                </p>

                <p className="mb-3">
                  And yes... from all the things I asked you in the previous pages, I have one final question — will
                  you accept all my little &ldquo;deals&rdquo; with you? 🥹❤️
                </p>

                <div className="mb-1 rounded-xl border border-gold/25 bg-white/5 px-3.5 py-3 break-inside-avoid">
                  <p className="mb-1.5 font-script text-lg text-gold">Our little deals ❤️</p>
                  <ul className="space-y-1 text-cream/90">
                    <li>
                      • I&apos;m your <span className="font-semibold text-blossom">Anna</span>, you&apos;re my{" "}
                      <span className="font-semibold text-blossom">Thangachi</span>.
                    </li>
                    <li>
                      • We create many more <span className="font-semibold text-blossom">memories</span> together.
                    </li>
                    <li>• We take more photos and go on more outings.</li>
                    <li>• We keep annoying each other for many years. 😂</li>
                    <li>
                      • No matter how much life changes, this brother-sister bond stays the{" "}
                      <span className="font-semibold text-blossom">same</span>, always. ❤️
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mx-auto mt-4 max-w-2xl text-center text-base font-bold leading-snug text-gold sm:text-lg md:text-2xl">
                SO... KEERTHI, DO YOU ACCEPT MY DEALS? 🥹❤️
              </p>

              <div className="mx-auto mt-4 flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <motion.button
                  type="button"
                  onClick={handleAccept}
                  whileHover={{ x: [0, -3, 3, -2, 2, 0] }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.5 }}
                  className="w-full rounded-full bg-gradient-to-r from-blossom to-orchid px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(165,87,201,0.45)] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
                >
                  YES, ANNA ❤️
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleAccept}
                  whileHover={{ x: [0, 3, -3, 2, -2, 0] }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.5 }}
                  className="w-full rounded-full border border-gold/50 bg-white/10 px-6 py-3 text-sm font-semibold text-cream shadow-[0_10px_30px_rgba(246,198,103,0.25)] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
                >
                  OF COURSE, ANNA! 🥹❤️
                </motion.button>
              </div>

              {showNiceTry && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center text-xs italic text-lavender/80 sm:text-sm"
                >
                  Nice try... 😂❤️
                </motion.p>
              )}
            </div>

            <SisterLanguageBorder celebrating={phase === "celebrating"} reverse />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-2xl flex-col items-center text-center"
          >
            <Sparkles count={26} />
            <FloatingHearts count={14} colorClassName="text-blossom/50 fill-blossom/30" />
            {BUTTERFLY_HEXES.map((hex, i) => (
              <motion.div
                key={hex}
                className="pointer-events-none absolute"
                style={{ left: `${15 + i * 22}%`, top: `${10 + (i % 2) * 55}%` }}
                animate={{ y: [0, -18, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              >
                <ButterflyIcon hex={hex} size={28} />
              </motion.div>
            ))}

            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative font-script text-4xl text-gold sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 0 30px rgba(246,198,103,0.5)" }}
            >
              Deal Accepted! ❤️🥹
            </motion.h2>

            <div className="relative mx-auto mt-5 max-w-lg space-y-2.5 text-sm leading-relaxed text-cream/90 sm:text-base md:text-lg">
              <p>Okay... it&apos;s official. 😂</p>
              <p>You&apos;re stuck with your Anna for life.</p>
              <p>
                No return.
                <br />
                No replacement.
                <br />
                No cancellation.
                <br />
                No escape. 🤣❤️
              </p>
              <p>And honestly...</p>
              <p>I wouldn&apos;t want it any other way.</p>
              <p>Happy Birthday once again, Keerthi. 🎂❤️</p>
              <p>
                My Thangachi.
                <br />
                Always.
              </p>
            </div>

            <motion.h1
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative mt-7 font-script text-4xl text-blossom sm:text-5xl md:text-6xl"
              style={{ textShadow: "0 0 30px rgba(245,163,199,0.5)" }}
            >
              Happy Birthday, Keerthi! 🎂❤️
            </motion.h1>
            <p className="relative mt-2 text-cream/90 sm:text-lg">Once again... Happy Birthday, my Thangachi. ❤️</p>
            <p className="relative mt-4 font-script text-lg text-lavender sm:text-xl">
              With love,
              <br />
              Your Anna 🫶
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="relative mt-8"
            >
              <motion.button
                type="button"
                onClick={handleReturnToJourney}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-6 py-3 text-sm font-semibold text-cream shadow-[0_10px_30px_rgba(246,198,103,0.25)] backdrop-blur-md sm:px-7 sm:py-3.5 sm:text-base"
              >
                <Undo2 size={16} />
                Return to Journey
              </motion.button>
            </motion.div>

            <p className="relative mt-8 text-xs text-cream/40">Made with ❤️ by your Anna</p>
          </motion.div>
        )}
      </div>
    </SceneContainer>
  );
}
