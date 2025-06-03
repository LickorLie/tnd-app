import { Question, Player, GameLevel, GameTheme } from '../types';
import { calculateQuestionDistribution, getValidInteractionPartners } from './interactionRules';
import { questions } from '../data/questions';

export const selectQuestion = (
  currentPlayer: Player,
  allPlayers: Player[],
  gameTheme: GameTheme,
  gameLevel: GameLevel,
  type: 'truth' | 'dare'
): Question | null => {
  const questionPool = questions[gameTheme][gameLevel][type];
  
  if (type === 'truth') {
    // For truths, only select solo questions
    const soloQuestions = questionPool.filter(q => !q.requiresPartner);
    const randomIndex = Math.floor(Math.random() * soloQuestions.length);
    return soloQuestions[randomIndex];
  }
  
  // For dares, consider the distribution and valid partners
  const questionType = calculateQuestionDistribution(currentPlayer, allPlayers);
  const validPartners = getValidInteractionPartners(currentPlayer, allPlayers);
  
  // Filter questions based on the calculated distribution
  const availableQuestions = questionPool.filter(q => {
    if (questionType === 'solo') {
      return !q.requiresPartner;
    }
    // Only include partner questions if there are valid partners
    return q.requiresPartner && validPartners.length > 0;
  });
  
  if (availableQuestions.length === 0) {
    // If no valid questions are available, try to find a solo question
    const soloQuestions = questionPool.filter(q => !q.requiresPartner);
    if (soloQuestions.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * soloQuestions.length);
    return soloQuestions[randomIndex];
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};