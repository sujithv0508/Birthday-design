import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SceneContainer from "../components/SceneContainer";
import Envelope from "../components/Envelope";
import PrimaryButton from "../components/PrimaryButton";
import MessageOpened from "./MessageOpened";
import { birthdayData, getSecretMessages } from "../data/birthdayData";

const MESSAGES = getSecretMessages(birthdayData);

export default function SecretMessages({ onNext }) {
  const [openId, setOpenId] = useState(null);
  const [readIds, setReadIds] = useState(new Set());

  function open(id) {
    setOpenId(id);
    setReadIds((prev) => new Set(prev).add(id));
  }

  const openMessage = MESSAGES.find((m) => m.id === openId);
  const hasRead = readIds.size > 0;

  return (
    <SceneContainer variant="blur" bgClassName="bg-gradient-to-b from-lavender via-blossom-soft to-cream">
      <div className="relative z-10 w-full max-w-md text-center">
        <h2 className="font-script text-4xl text-plum">Secret Messages For You 💌</h2>
        <p className="mt-2 text-sm text-plum/80">Click an envelope to open it.</p>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {MESSAGES.map((m) => (
            <Envelope key={m.id} message={m} opened={readIds.has(m.id)} onClick={() => open(m.id)} />
          ))}
        </div>

        <div className="mt-8">
          <PrimaryButton onClick={onNext} icon={ArrowRight} disabled={!hasRead}>
            Continue
          </PrimaryButton>
          {!hasRead && <p className="mt-2 text-xs text-plum/70">open at least one envelope to continue</p>}
        </div>
      </div>

      {openMessage && <MessageOpened message={openMessage} onClose={() => setOpenId(null)} />}
    </SceneContainer>
  );
}
