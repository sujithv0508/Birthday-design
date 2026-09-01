import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Envelope({ message, opened, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Open envelope: ${message.label}`}
      className="relative aspect-[4/3] w-full rounded-xl shadow-lg"
      whileHover={{ y: -6, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${message.color} ${opened ? "opacity-60" : ""}`} />
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-white/25"
        style={{ clipPath: "polygon(0 0, 50% 62%, 100% 0)" }}
      />
      <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow">
        <Heart size={16} className="fill-blossom text-blossom" />
      </div>
      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-midnight-deep">
        {message.id}
      </span>
      <span className="absolute inset-x-0 bottom-2 text-center text-xs font-semibold text-white drop-shadow">
        {message.label}
      </span>
      {opened && (
        <span className="absolute right-2 top-2 rounded-full bg-white/85 px-1.5 py-0.5 text-[10px] font-bold text-midnight-deep">
          read
        </span>
      )}
    </motion.button>
  );
}
