import React from 'react';

interface AgeGateProps {
  onConfirm: () => void;
  onDecline: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onConfirm, onDecline }) => (
  <div className="h-screen-safe bg-cream flex items-center justify-center p-5">
    <div className="max-w-md w-full">
      <h1 className="font-serif font-semibold text-[56px] leading-[0.92] mb-6">
        Lick <i className="text-rouge font-medium">or</i><br />Lie
      </h1>
      <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-rouge mb-2">Adults only · 18+</p>
      <p className="text-muted mb-6 text-[16px] leading-relaxed">
        This game contains sexual content and is only meant for people aged 18 or older.
        By continuing you confirm that you and all players are at least 18.
      </p>
      <div className="flex flex-col gap-2.5">
        <button onClick={onConfirm} className="h-[52px] rounded-btn font-semibold bg-rouge text-rouge-ink">I am 18 or older 😈</button>
        <button onClick={onDecline} className="h-[52px] rounded-btn font-semibold bg-paper ring-1 ring-inset ring-sand">I am under 18</button>
      </div>
    </div>
  </div>
);

export default AgeGate;
