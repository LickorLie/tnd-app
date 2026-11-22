import React from 'react';

interface AgeGateProps {
  onConfirm: () => void;
  onDecline: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onConfirm, onDecline }) => (
  <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 flex items-center justify-center p-4">
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
      <div className="text-5xl mb-4">🔞</div>
      <h1 className="text-2xl font-bold mb-3 text-gray-900">Adults only</h1>
      <p className="text-gray-600 mb-6">
        This game contains sexual content and is only meant for people aged 18 or older.
        By continuing you confirm that you are at least 18 years old and that all players are too.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onConfirm}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-orange-500 hover:opacity-90"
        >
          I am 18 or older – enter
        </button>
        <button
          onClick={onDecline}
          className="w-full py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          I am under 18 – leave
        </button>
      </div>
    </div>
  </div>
);

export default AgeGate;
