import MemoryModal from "../components/MemoryModal";

export default function MemoryDetail({ memories, index, setIndex, onClose }) {
  const memory = memories[index];
  if (!memory) return null;

  function prev() {
    setIndex((index - 1 + memories.length) % memories.length);
  }
  function next() {
    setIndex((index + 1) % memories.length);
  }

  return <MemoryModal memory={memory} onPrev={prev} onNext={next} onClose={onClose} />;
}
