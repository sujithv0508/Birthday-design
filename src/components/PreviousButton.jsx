import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/**
 * The global "go back one chapter" control — rendered once at the App
 * level (not copy-pasted into every scene) and fixed to the same
 * corner throughout the journey. Hidden on the bookend scenes that
 * have nowhere meaningful to go back to.
 */
export default function PreviousButton({ onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Go back to the previous chapter"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.18)" }}
      whileTap={{ scale: 0.94 }}
      className="fixed left-4 top-4 z-[70] flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-cream shadow-lg backdrop-blur-md sm:left-6 sm:top-6 sm:text-sm"
    >
      <ArrowLeft size={14} />
      Previous
    </motion.button>
  );
}
