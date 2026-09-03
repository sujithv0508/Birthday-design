import { motion, useReducedMotion } from "framer-motion";
import { Heart, Star, Sparkles as SparklesIcon } from "lucide-react";

const WORDS = [
  "Sister",
  "Thangachi",
  "Soeur",
  "Schwester",
  "Hermana",
  "Sorella",
  "Irmã",
  "姉妹",
  "妹",
  "姐姐",
  "妹妹",
  "बहन",
  "बहिण",
  "சகோதரி",
  "సోదరి",
  "സഹോദരി",
  "ಅಕ್ಕ / ತಂಗಿ",
  "Petite sœur",
  "الأخت الصغرى",
  "אחות קטנה",
  "妹",
];

const ICONS = [Heart, Star, SparklesIcon];

function WordSequence({ celebrating }) {
  return (
    <div className="flex shrink-0 items-center gap-4 px-4">
      {WORDS.map((word, i) => {
        const isThangachi = word === "Thangachi";
        const Icon = ICONS[i % ICONS.length];
        return (
          <span key={`${word}-${i}`} className="flex items-center gap-4">
            <span
              className={
                isThangachi
                  ? "font-script text-lg text-gold sm:text-xl"
                  : "text-xs font-medium text-lavender/80 sm:text-sm"
              }
              style={celebrating ? { animation: `border-glow 2.4s ease-in-out ${(i * 0.15).toFixed(2)}s infinite` } : undefined}
            >
              {word}
            </span>
            <Icon size={10} className="shrink-0 text-blossom/60" />
          </span>
        );
      })}
    </div>
  );
}

/**
 * The decorative "Sister" ticker framing the final deal card — a
 * seamless looping strip of the word "sister" in many languages, with
 * "Thangachi" (Tamil) highlighted since it's the one that matters here.
 */
export default function SisterLanguageBorder({ celebrating = false, reverse = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden py-1.5">
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <WordSequence celebrating={celebrating} />
        <WordSequence celebrating={celebrating} />
      </motion.div>
    </div>
  );
}
