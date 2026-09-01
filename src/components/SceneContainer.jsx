import { motion } from "framer-motion";

const VARIANTS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.06 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  slideUp: {
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -48 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(16px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(16px)" },
    transition: { duration: 0.7, ease: "easeOut" },
  },
  spring: {
    initial: { opacity: 0, scale: 0.82, rotate: -2 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 130, damping: 15 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  },
  cinematic: {
    initial: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.97, filter: "blur(10px)" },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Full-viewport wrapper every scene renders inside of.
 * `variant` picks the enter/exit motion preset; `bgClassName` sets
 * that scene's own visual identity (gradient, tone).
 */
export default function SceneContainer({
  children,
  variant = "fade",
  bgClassName = "bg-midnight-deep",
  className = "",
}) {
  const v = VARIANTS[variant] || VARIANTS.fade;

  return (
    <motion.section
      className={`relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-12 sm:px-8 ${bgClassName} ${className}`}
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={v.transition}
    >
      {children}
    </motion.section>
  );
}
