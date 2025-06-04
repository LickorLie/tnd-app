import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import Button from './Button';
import { Player, Question } from '../types';
import { getValidInteractionPartners } from '../utils/interactionRules';
import { questions } from '../data/questions';

interface GameCardProps {
  type: 'truth' | 'dare';
  question: Question;
  currentPlayer: Player;
  allPlayers: Player[];
  countdown?: number;
  timerStarted: boolean;
  onStartTimer?: () => void;
  onSelectPartner: (partner: Player) => void;
}

const GameCard: React.FC<GameCardProps> = ({ 
  type, 
  question,
  currentPlayer,
  allPlayers,
  countdown,
  timerStarted,
  onStartTimer,
  onSelectPartner
}) => {
  const [displayText, setDisplayText] = useState(question.text);

  useEffect(() => {
    if (question.requiresPartner) {
      const validPartners = getValidInteractionPartners(currentPlayer, allPlayers);
      if (validPartners.length > 0) {
        // Randomly select a partner from valid partners
        const randomPartner = validPartners[Math.floor(Math.random() * validPartners.length)];
        onSelectPartner(randomPartner);
        setDisplayText(question.text.replace(/\[partner\]/g, randomPartner.name));
      }
    } else {
      setDisplayText(question.text);
    }
  }, [question, currentPlayer, allPlayers, onSelectPartner]);

  const styles = {
    truth: {
      background: 'bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600',
      text: 'text-white',
      border: 'border-pink-300',
      emoji: '🤔'
    },
    dare: {
      background: 'bg-gradient-to-br from-purple-400 via-fuchsia-500 to-pink-600',
      text: 'text-white',
      border: 'border-purple-300',
      emoji: '😈'
    }
  };

  const currentStyle = styles[type];

  const validPartners = getValidInteractionPartners(currentPlayer, allPlayers);
  const generateRandomTruthQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.friends.Mild.truth.length);
    return questions.friends.Mild.truth[randomIndex];
  };
  if (question.requiresPartner && validPartners.length === 0) {
    // If no valid partners are available show a truth card  with random question
    const randomTruth = generateRandomTruthQuestion();
    currentPlayer.questionsAnswered += 1; // Increment the question count for the current player
    return (
  <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 *:text-white border-pink-300 
        border-2 rounded-2xl p-6 mb-6 shadow-xl backdrop-blur-sm`}
    >
      <h2 className="text-3xl font-bold mb-4 capitalize flex items-center justify-center">
        No Truth 🤔
      </h2>
      
      <p className="text-xl mb-6 text-center font-medium">{ randomTruth.text }</p>
      
      <div className="flex justify-between items-center mt-4">
        {currentPlayer.gender==="male"?<p className="text-lg font-semibold rounded-md bg-blue-400 text-white px-4">"{currentPlayer.name}, it’s your turn now!”</p>:
        <p className="text-lg font-semibold rounded-md bg-pink-400 text-white px-4">"{currentPlayer.name}, it’s your turn now!”</p>}

      </div>
      
    </motion.div>        

    );

    // return (
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     exit={{ opacity: 0, y: -20 }}
    //     className="bg-red-100 border-2 border-red-300 rounded-2xl p-6 mb-6"
    //   >
    //     <h3 className="text-xl font-bold text-red-600 mb-2">No Valid Partners Available</h3>
    //     <p className="text-red-600">
    //       Based on the orientations and preferences, there are no valid partners for this interaction.
    //       Try using a Joker or Pass to skip this turn.
    //     </p>
    //   </motion.div>
    // );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${currentStyle.background} ${currentStyle.text} ${currentStyle.border} 
        border-2 rounded-2xl p-6 mb-6 shadow-xl backdrop-blur-sm`}
    >
      <h2 className="text-3xl font-bold mb-4 capitalize flex items-center justify-center">
        {type} {currentStyle.emoji}
      </h2>
      
      <p className="text-xl mb-6 text-center font-medium">{displayText}</p>
      
      {type === 'dare' && !timerStarted && onStartTimer && (
        <div className="flex justify-center mb-6">
          <Button
            onClick={onStartTimer}
            color="green"
            className="flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30"
          >
            <Timer size={20} className="mr-2" />
            Start Timer
          </Button>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        {currentPlayer.gender==="male"?<p className="text-lg font-semibold rounded-md bg-blue-400 text-white px-4">"{currentPlayer.name}, it’s your turn now!”</p>:
        <p className="text-lg font-semibold rounded-md bg-pink-400 text-white px-4">"{currentPlayer.name}, it’s your turn now!”</p>}
        {type === 'dare' && timerStarted && (
          <span className="text-lg font-bold">
            {countdown}s ⏱️
          </span>
        )}
      </div>
      
      {type === 'dare' && timerStarted && (
        <div className="w-full bg-white/30 rounded-full h-2 mt-3 overflow-hidden backdrop-blur-sm">
          <div
            className="bg-white h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown! / 30) * 100}%` }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default GameCard;