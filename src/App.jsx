import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MusicController from "./components/MusicController";
import { ConfettiProvider } from "./components/Confetti";
import ProgressIndicator from "./components/ProgressIndicator";
import PreviousButton from "./components/PreviousButton";

import SecretLockScreen from "./scenes/SecretLockScreen";
import Welcome from "./scenes/Welcome";
import SurpriseOpening from "./scenes/SurpriseOpening";
import MemoryGallery from "./scenes/MemoryGallery";
import AboutHerQuiz from "./scenes/AboutHerQuiz";
import ButterflyGame from "./scenes/ButterflyGame";
import FinalWish from "./scenes/FinalWish";
import GiftRevealScene from "./scenes/GiftRevealScene";
import FinalDeal from "./scenes/FinalDeal";

// The top-level chapters of the journey. A few of the named scenes
// from the spec (MemoryDetail, CorrectAnswer, WrongAnswer) are
// sub-states owned by their parent chapter instead of separate steps
// here — see README for why.
const SCENES = [
  "secretLock",
  "welcome",
  "surpriseOpening",
  "memoryGallery",
  "aboutHerQuiz",
  "butterflyGame",
  "finalWish",
  "giftReveal",
  "finalDeal",
];

export default function App() {
  const [index, setIndex] = useState(0);
  const musicRef = useRef(null);

  const current = SCENES[index];
  const goNext = () => setIndex((i) => Math.min(i + 1, SCENES.length - 1));
  const goBack = () => setIndex((i) => Math.max(i - 1, 0));

  // The progress pill and the global Previous button share the same
  // bookend rule: hidden on the lock/welcome intro and on the final
  // card, which has its own "Return to Journey" button instead.
  const showChrome = index > 1 && index < SCENES.length - 1;

  return (
    <ConfettiProvider>
      <MusicController ref={musicRef} />
      {showChrome && <ProgressIndicator current={index + 1} total={SCENES.length} />}
      {showChrome && <PreviousButton onClick={goBack} />}

      <AnimatePresence mode="wait">
        {current === "secretLock" && <SecretLockScreen key="secretLock" onUnlock={goNext} />}
        {current === "welcome" && (
          <Welcome key="welcome" onStartMusic={() => musicRef.current?.start()} onNext={goNext} />
        )}
        {current === "surpriseOpening" && <SurpriseOpening key="surpriseOpening" onNext={goNext} />}
        {current === "memoryGallery" && <MemoryGallery key="memoryGallery" onNext={goNext} />}
        {current === "aboutHerQuiz" && <AboutHerQuiz key="aboutHerQuiz" onComplete={goNext} />}
        {current === "butterflyGame" && <ButterflyGame key="butterflyGame" onNext={goNext} />}
        {current === "finalWish" && <FinalWish key="finalWish" onNext={goNext} />}
        {current === "giftReveal" && <GiftRevealScene key="giftReveal" onNext={goNext} />}
        {current === "finalDeal" && <FinalDeal key="finalDeal" onBack={goBack} />}
      </AnimatePresence>
    </ConfettiProvider>
  );
}
