import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Sparkles from "./Sparkles";
import PrimaryButton from "./PrimaryButton";
import { birthdayData } from "../data/birthdayData";

/**
 * The emotional payoff after all six butterflies are collected — a
 * premium "letter" card rather than a generic modal/alert.
 */
export default function FinalButterflyCard({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
      className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-plum/80 to-midnight-deep/90 p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md sm:p-8"
    >
      <FloatingHearts count={10} colorClassName="text-blossom/50 fill-blossom/30" />
      <Sparkles count={14} />

      <motion.h2
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative font-script text-3xl text-blossom sm:text-4xl"
        style={{ textShadow: "0 0 30px rgba(245,163,199,0.5)" }}
      >
        Happy Birthday, {birthdayData.sisterName} ❤️
      </motion.h2>

      <div className="relative mt-5 max-h-[42vh] space-y-3 overflow-y-auto px-1 text-left text-sm leading-relaxed text-cream/90 sm:text-base">
        <p>{birthdayData.sisterName}... ❤️</p>
        <p>You collected all six butterflies, but honestly, the real treasure was never inside the jar.</p>
        <p>
          It was all the little memories, laughs, fights, outings, conversations and moments that slowly made you my
          Thangachi. 🥹❤️
        </p>
        <p>I don&apos;t know when exactly it happened...</p>
        <p>But somewhere along the way, you became someone very special to me.</p>
        <p>From now on, let&apos;s not worry about the memories we missed in childhood.</p>
        <p>Let&apos;s create many more from now. 📸❤️</p>
        <p>
          More photos.
          <br />
          More outings.
          <br />
          More random plans.
          <br />
          More memories.
          <br />
          More brother-sister fights. 😂
          <br />
          And many more years of this bond.
        </p>
        <p>No matter where life takes us, remember one thing:</p>
        <p>Your {birthdayData.creatorName} will always be there for you. ❤️</p>
        <p>Happy Birthday, my Thangachi. 🎂🦋</p>
      </div>

      <p className="relative mt-4 font-script text-lg text-lavender">— Your {birthdayData.creatorName} 🫶</p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative mt-6"
      >
        <PrimaryButton onClick={onNext} icon={ArrowRight}>
          Continue the Surprise
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );
}
