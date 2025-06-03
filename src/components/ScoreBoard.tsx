import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  scores: Record<string, number>;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6"
    >
      <h2 className="text-xl font-semibold mb-2">Scoreboard</h2>
      <ul>
        {sortedScores.map(([player, score], index) => (
          <li key={player} className="flex justify-between items-center mb-1">
            <span>{player}</span>
            <span className="font-semibold">{score}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ScoreBoard;