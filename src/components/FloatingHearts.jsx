import { Heart } from "lucide-react";
import Particles from "./Particles";

export default function FloatingHearts({ count = 12, colorClassName = "text-blossom fill-blossom/70" }) {
  return <Particles count={count} icon={Heart} mode="drift" colorClassName={colorClassName} minSize={14} maxSize={26} />;
}
