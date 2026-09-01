import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MusicController from "./components/MusicController";
import { ConfettiProvider } from "./components/Confetti";
import ProgressIndicator from "./components/ProgressIndicator";

import SecretLockScreen from "./scenes/SecretLockScreen";
import Welcome from "./scenes/Welcome";
import SurpriseOpening from "./scenes/SurpriseOpening";
import MemoryGallery from "./scenes/MemoryGallery";
import SiblingQuiz from "./scenes/SiblingQuiz";
import AboutHerQuiz from "./scenes/AboutHerQuiz";
import HeartGame from "./scenes/HeartGame";
import GameResult from "./scenes/GameResult";
import SecretMessages from "./scenes/SecretMessages";
import FinalSurprise from "./scenes/FinalSurprise";
import FinalWish from "./scenes/FinalWish";
import GiftRevealScene from "./scenes/GiftRevealScene";
import Celebration from "./scenes/Celebration";

// The top-level chapters of the journey. A few of the named scenes
// from the spec (MemoryDetail, CorrectAnswer, WrongAnswer,
// MessageOpened) are sub-states owned by their parent chapter instead
// of separate steps here — see README for why.
const SCENES = [
  "secretLock",
  "welcome",
  "surpriseOpening",
  "memoryGallery",
  "siblingQuiz",
  "aboutHerQuiz",
  "heartGame",
  "gameResult",
  "secretMessages",
  "finalSurprise",
  "finalWish",
  "giftReveal",
  "celebration",
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const musicRef = useRef(null);

  const current = SCENES[index];
  const goNext = () => setIndex((i) => Math.min(i + 1, SCENES.length - 1));

  function replay() {
    setGameScore(0);
    setIndex(1); // back to Welcome — no need to re-enter the secret code
  }

  const showProgress = index > 1 && index < SCENES.length - 1;

  return (
    <ConfettiProvider>
      <MusicController ref={musicRef} />
      {showProgress && <ProgressIndicator current={index + 1} total={SCENES.length} />}

      <AnimatePresence mode="wait">
        {current === "secretLock" && <SecretLockScreen key="secretLock" onUnlock={goNext} />}
        {current === "welcome" && (
          <Welcome key="welcome" onStartMusic={() => musicRef.current?.start()} onNext={goNext} />
        )}
        {current === "surpriseOpening" && <SurpriseOpening key="surpriseOpening" onNext={goNext} />}
        {current === "memoryGallery" && <MemoryGallery key="memoryGallery" onNext={goNext} />}
        {current === "siblingQuiz" && <SiblingQuiz key="siblingQuiz" onComplete={goNext} />}
        {current === "aboutHerQuiz" && <AboutHerQuiz key="aboutHerQuiz" onComplete={goNext} />}
        {current === "heartGame" && (
          <HeartGame
            key="heartGame"
            onComplete={(score) => {
              setGameScore(score);
              goNext();
            }}
          />
        )}
        {current === "gameResult" && <GameResult key="gameResult" score={gameScore} onNext={goNext} />}
        {current === "secretMessages" && <SecretMessages key="secretMessages" onNext={goNext} />}
        {current === "finalSurprise" && <FinalSurprise key="finalSurprise" onNext={goNext} />}
        {current === "finalWish" && <FinalWish key="finalWish" onNext={goNext} />}
        {current === "giftReveal" && <GiftRevealScene key="giftReveal" onNext={goNext} />}
        {current === "celebration" && <Celebration key="celebration" onReplay={replay} />}
      </AnimatePresence>
    </ConfettiProvider>
  );
}
