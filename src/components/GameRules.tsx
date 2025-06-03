import React from 'react';
import { motion } from 'framer-motion';
import { Shield, SkipForward, Heart, Flame, Timer, Star } from 'lucide-react';
import Button from './Button';

interface GameRulesProps {
  onClose: () => void;
}

const GameRules: React.FC<GameRulesProps> = ({ onClose }) => {
  const rules = [
    {
      icon: Shield,
      title: "Joker",
      description: "Your one-time get-out-of-jail-free card! Use it wisely, as it's a one-time escape from any challenge.",
      color: "text-yellow-500"
    },
    {
      icon: SkipForward,
      title: "Pass",
      description: "Choose to pass, but beware - there will be consequences! The group decides your fate.",
      color: "text-red-500"
    },
    {
      icon: Heart,
      title: "Truth",
      description: "When choosing truth, you must solemnly swear to tell the truth, the whole truth, and nothing but the truth!",
      color: "text-blue-500"
    },
    {
      icon: Flame,
      title: "Dare",
      description: "Accept the dare and complete it as if your life depends on it. No half-measures allowed!",
      color: "text-orange-500"
    },
    {
      icon: Timer,
      title: "Timer",
      description: "Race against time! Complete your truth or dare before the timer runs out, or face the consequences.",
      color: "text-purple-500"
    },
    {
      icon: Star,
      title: "Have Fun!",
      description: "Remember, this is all about having fun! Keep it playful, respectful, and entertaining for everyone.",
      color: "text-green-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-violet-600 to-orange-500 text-transparent bg-clip-text">
          Game Rules
        </h2>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className={`${rule.color} p-2 rounded-full bg-opacity-10 flex-shrink-0`}>
                <rule.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{rule.title}</h3>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Button
            onClick={onClose}
            color="orange"
            className="w-full flex items-center justify-center text-lg font-bold py-4"
          >
            Let's Play!
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameRules;