import { Question, Player, GameLevel, GameTheme } from '../types';
import { calculateQuestionDistribution, getValidInteractionPartners } from './interactionRules';
import { questions } from '../data/questions';

type QuestionType = 'truth' | 'dare';

// Order in which to look for questions when the current level has none.
const LEVEL_ORDER = ['Sweet', 'Hot', 'Sexy', 'Spicy', 'WetnWild'];

const levelKey = (level: GameLevel): string => (level === 'Wet & Wild' ? 'WetnWild' : level);

const getPool = (theme: GameTheme, level: string, type: QuestionType): Question[] => {
  const byTheme = (questions as unknown as Record<string, Record<string, Record<string, Question[]>>> | undefined)?.[theme];
  return byTheme?.[level]?.[type] ?? [];
};

// Returns the current level's questions, or the closest level that has questions
// (first going down, then up), so the game never ends up with an empty card.
const getPoolWithFallback = (theme: GameTheme, gameLevel: GameLevel, type: QuestionType): Question[] => {
  const current = levelKey(gameLevel);
  const start = Math.max(0, LEVEL_ORDER.indexOf(current));
  const order = [
    current,
    ...LEVEL_ORDER.slice(0, start).reverse(),
    ...LEVEL_ORDER.slice(start + 1),
  ];
  for (const level of order) {
    const pool = getPool(theme, level, type);
    if (pool.length > 0) return pool;
  }
  return [];
};

const pickRandom = (list: Question[]): Question | null =>
  list.length > 0 ? list[Math.floor(Math.random() * list.length)] : null;

export const selectQuestion = (
  currentPlayer: Player,
  allPlayers: Player[],
  gameTheme: GameTheme,
  gameLevel: GameLevel,
  type: QuestionType
): Question | null => {
  const questionPool = getPoolWithFallback(gameTheme, gameLevel, type);
  const soloQuestions = questionPool.filter(q => !q.requiresPartner);

  if (type === 'truth') {
    // For truths, only select solo questions
    return pickRandom(soloQuestions);
  }

  // For dares, consider the distribution and valid partners
  const questionType = calculateQuestionDistribution(currentPlayer, allPlayers);
  const validPartners = getValidInteractionPartners(currentPlayer, allPlayers);

  const availableQuestions = questionPool.filter(q => {
    if (questionType === 'solo') {
      return !q.requiresPartner;
    }
    // Only include partner questions if there are valid partners
    return q.requiresPartner && validPartners.length > 0;
  });

  return pickRandom(availableQuestions) ?? pickRandom(soloQuestions);
};
