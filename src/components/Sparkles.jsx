import { Star } from "lucide-react";
import Particles from "./Particles";

export default function Sparkles({ count = 20, colorClassName = "text-gold fill-gold/80" }) {
  return <Particles count={count} icon={Star} mode="twinkle" colorClassName={colorClassName} minSize={6} maxSize={14} />;
}
