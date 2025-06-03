import React from 'react';
import { Shield, SkipForward } from 'lucide-react';
import Modal from './Modal';

interface Player {
  name: string;
  gender: 'male' | 'female';
  orientation: 'straight' | 'bisexual';
  questionsAnswered: number;
  jokersLeft: number;
  passesLeft: number;
}

interface PlayerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  currentPlayerIndex: number;
}

const PlayerListModal: React.FC<PlayerListModalProps> = ({
  isOpen,
  onClose,
  players,
  currentPlayerIndex
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Players"
    >
      <div className="p-4 space-y-4">
        {players.map((player, index) => (
          <div 
            key={index}
            className={`p-4 rounded-xl ${
              index === currentPlayerIndex 
                ? 'bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-lg">
                {player.name}
                {index === currentPlayerIndex && (
                  <span className="ml-2 text-sm text-violet-600">(Current)</span>
                )}
              </span>
              <span className="text-sm text-gray-500">
                Questions: {player.questionsAnswered}
              </span>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <Shield size={16} className={player.jokersLeft > 0 ? "text-orange-500" : "text-gray-300"} />
                <span className={`ml-1 text-sm ${player.jokersLeft > 0 ? "text-orange-500" : "text-gray-400"}`}>
                  {player.jokersLeft} Joker
                </span>
              </div>
              <div className="flex items-center">
                <SkipForward size={16} className={player.passesLeft > 0 ? "text-red-500" : "text-gray-300"} />
                <span className={`ml-1 text-sm ${player.passesLeft > 0 ? "text-red-500" : "text-gray-400"}`}>
                  {player.passesLeft} Passes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PlayerListModal;