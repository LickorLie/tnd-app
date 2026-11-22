import { Player, GenderTarget } from '../types';

// Regels:
// - Man + vrouw (straight of bi, in elke combinatie): mag altijd.
// - Zelfde geslacht: mag alleen als BEIDE spelers bi zijn.
export const isValidInteraction = (player1: Player, player2: Player): boolean => {
  if (player1.gender !== player2.gender) return true;
  return player1.orientation === 'bisexual' && player2.orientation === 'bisexual';
};

export const matchesGender = (player: Player, target?: GenderTarget): boolean =>
  !target || target === 'any' || player.gender === target;

export const getValidInteractionPartners = (
  currentPlayer: Player,
  allPlayers: Player[],
  partnerGender?: GenderTarget
): Player[] =>
  allPlayers.filter(
    player =>
      player.name !== currentPlayer.name &&
      isValidInteraction(currentPlayer, player) &&
      matchesGender(player, partnerGender)
  );

export const calculateQuestionDistribution = (
  currentPlayer: Player,
  allPlayers: Player[]
): 'solo' | 'partner' => {
  if (getValidInteractionPartners(currentPlayer, allPlayers).length === 0) return 'solo';
  // 30% solo, 70% partner questions
  return Math.random() < 0.3 ? 'solo' : 'partner';
};
