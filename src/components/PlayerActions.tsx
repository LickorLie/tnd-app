import React, { useState } from 'react';
import { Shield, SkipForward, AlertCircle } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';

interface PlayerActionsProps {
  onUseJoker: () => void;
  onUsePass: () => void;
  jokersLeft: number;
  passesLeft: number;
}

const PlayerActions: React.FC<PlayerActionsProps> = ({
  onUseJoker,
  onUsePass,
  jokersLeft,
  passesLeft,
}) => {
  const [showJokerModal, setShowJokerModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [showDisabledMessage, setShowDisabledMessage] = useState<'joker' | 'pass' | null>(null);

  const handleJokerClick = () => {
    if (jokersLeft > 0) {
      setShowJokerModal(true);
    } else {
      setShowDisabledMessage('joker');
    }
  };

  const handlePassClick = () => {
    if (passesLeft > 0) {
      setShowPassModal(true);
    } else {
      setShowDisabledMessage('pass');
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <Button
        onClick={handleJokerClick}
        color="orange"
        disabled={jokersLeft === 0}
        className="flex items-center justify-center min-w-[120px]"
      >
        <Shield className="mr-2" size={20} />
        <span>
          Joker {jokersLeft === 0 ? '(Used)' : `(${jokersLeft})`}
        </span>
      </Button>
      
      <Button
        onClick={handlePassClick}
        color="red"
        disabled={passesLeft === 0}
        className="flex items-center justify-center min-w-[120px]"
      >
        <SkipForward className="mr-2" size={20} />
        <span>
          Pass {passesLeft === 0 ? '(Used)' : `(${passesLeft})`}
        </span>
      </Button>

      <Modal
        isOpen={showDisabledMessage === 'joker'}
        onClose={() => setShowDisabledMessage(null)}
        title="Joker Already Used"
      >
        <div className="p-6">
          <div className="flex items-center mb-4 bg-gray-100 p-4 rounded-lg">
            <AlertCircle className="text-gray-500 mr-3" size={24} />
            <p className="text-gray-800">
              You've already used your Joker! Each player only gets one Joker per game.
              You'll need to face this challenge head-on!
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowDisabledMessage(null)}
              color="gray"
            >
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDisabledMessage === 'pass'}
        onClose={() => setShowDisabledMessage(null)}
        title="No Passes Left"
      >
        <div className="p-6">
          <div className="flex items-center mb-4 bg-gray-100 p-4 rounded-lg">
            <AlertCircle className="text-gray-500 mr-3" size={24} />
            <p className="text-gray-800">
              You've used all your passes! Each player only gets two passes per game.
              Time to face the challenge!
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowDisabledMessage(null)}
              color="gray"
            >
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showJokerModal}
        onClose={() => setShowJokerModal(false)}
        title="Use Joker"
      >
        <div className="p-6">
          <div className="flex items-center mb-4 bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg">
            <Shield className="text-amber-500 mr-3" size={24} />
            <p className="text-gray-800">
              Using your Joker will let you skip this challenge without any consequences.
              This is your one-time get-out-of-jail-free card!
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowJokerModal(false)} color="gray">
              Cancel
            </Button>
            <Button
              onClick={() => {
                onUseJoker();
                setShowJokerModal(false);
              }}
              color="orange"
              className="flex items-center"
            >
              <Shield className="mr-2" size={20} />
              Use Joker
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showPassModal}
        onClose={() => setShowPassModal(false)}
        title="Use Pass"
      >
        <div className="p-6">
          <div className="flex items-center mb-4 bg-gradient-to-r from-rose-100 to-red-100 p-4 rounded-lg">
            <SkipForward className="text-rose-500 mr-3" size={24} />
            <p className="text-gray-800">
              Using a Pass means you must take either a Shot or a Toke as a consequence
              for skipping the challenge. You have {passesLeft} {passesLeft === 1 ? 'pass' : 'passes'} remaining.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowPassModal(false)} color="gray">
              Cancel
            </Button>
            <Button
              onClick={() => {
                onUsePass();
                setShowPassModal(false);
              }}
              color="red"
              className="flex items-center"
            >
              <SkipForward className="mr-2" size={20} />
              Use Pass
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlayerActions;