import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function PhotoCard({ memory, rotate = 0, onClick }) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      onTapStart={() => setHovering(true)}
      onTap={() => setHovering(false)}
      className="relative w-full max-w-[168px] rounded-sm bg-cream p-2.5 pb-6 text-left shadow-[0_10px_24px_rgba(26,11,46,0.35)]"
      style={{ rotate: `${rotate}deg` }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10, boxShadow: "0 22px 40px rgba(26,11,46,0.5)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-plum/40">
        <motion.img
          src={memory.image}
          alt={memory.title}
          className="h-full w-full object-cover"
          animate={{ scale: hovering ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
        />
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-1.5 top-1.5 rounded-full bg-white/80 p-1"
          >
            <Heart size={14} className="fill-blossom text-blossom" />
          </motion.div>
        )}
      </div>
      <p className="mt-2 truncate font-script text-base text-midnight-deep">{memory.title}</p>
    </motion.button>
  );
}
