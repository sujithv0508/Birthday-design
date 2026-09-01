import { motion } from "framer-motion";
import { X } from "lucide-react";
import FloatingHearts from "../components/FloatingHearts";

export default function MessageOpened({ message, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-midnight-deep/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={8} />
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: 25 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className={`relative w-full max-w-sm rounded-2xl bg-gradient-to-br ${message.color} p-7 text-center shadow-2xl`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close message"
          className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-midnight-deep shadow-md"
        >
          <X size={18} />
        </button>
        <h3 className="font-script text-3xl text-midnight-deep">{message.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-midnight-deep/90">{message.body}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-full bg-white/70 px-6 py-2 text-sm font-semibold text-midnight-deep active:scale-95"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
