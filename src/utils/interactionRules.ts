import { Player, Gender, Orientation } from '../types';

const isValidSameGenderInteraction = (
  gender: Gender,
  orientation1: Orientation,
  orientation2: Orientation
): boolean => {
  // For same-gender interactions, both must be bisexual
  return orientation1 === 'bisexual' && orientation2 === 'bisexual';
};

const isValidDifferentGenderInteraction = (): boolean => {
  // Different gender interactions are always allowed
  return true;
};

export const isValidInteraction = (player1: Player, player2: Player): boolean => {
  // Same gender case
  if (player1.gender === player2.gender) {
    return isValidSameGenderInteraction(
      player1.gender,
      player1.orientation,
      player2.orientation
    );
  }
  
  // Different gender case
  return isValidDifferentGenderInteraction();
};

export const getValidInteractionPartners = (
  currentPlayer: Player,
  allPlayers: Player[]
): Player[] => {
  return allPlayers.filter(
    player => 
      // Don't include the current player
      player.name !== currentPlayer.name && 
      // Check if the interaction is valid based on orientation rules
      isValidInteraction(currentPlayer, player)
  );
};

export const calculateQuestionDistribution = (
  currentPlayer: Player,
  allPlayers: Player[]
): 'solo' | 'partner' => {
  const validPartners = getValidInteractionPartners(currentPlayer, allPlayers);
  
  // If no valid partners are available, force solo question
  if (validPartners.length === 0) {
    return 'solo';
  }
  
  // 30% solo, 70% partner questions
  return Math.random() < 0.3 ? 'solo' : 'partner';
};