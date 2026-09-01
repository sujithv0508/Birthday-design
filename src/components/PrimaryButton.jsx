import { motion } from "framer-motion";

/**
 * Shared premium CTA button used across scenes for the main
 * forward action ("Start the Surprise", "Continue", etc).
 */
export default function PrimaryButton({ children, onClick, className = "", icon: Icon, disabled }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blossom to-orchid px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(165,87,201,0.45)] disabled:opacity-40 sm:text-base ${className}`}
      whileHover={disabled ? {} : { scale: 1.05, boxShadow: "0 14px 36px rgba(165,87,201,0.6)" }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      {children}
      {Icon && <Icon size={18} />}
    </motion.button>
  );
}
