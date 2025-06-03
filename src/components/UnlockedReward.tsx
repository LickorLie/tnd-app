import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

interface UnlockedRewardProps {
  title: string;
  description: string;
  onClose: () => void;
}

const UnlockedReward: React.FC<UnlockedRewardProps> = ({
  title,
  description,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-xl p-6 max-w-sm w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Gift size={32} className="text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="text-sm text-purple-600 mb-4">
            Switch to the Rewards tab to view your prize! Don't worry, your game progress will be saved.
          </p>
          <button
            onClick={onClose}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UnlockedReward;