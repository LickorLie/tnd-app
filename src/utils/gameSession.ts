// Lopend spel bewaren in DIT tabblad (sessionStorage), zodat per ongeluk verversen
// de voortgang niet kost. Vervalt na 3 uur zonder activiteit of als het tabblad sluit.
import { GameLevel, GameTheme, Player, Question } from '../types';

const KEY = 'game_session_v1';
const MAX_IDLE_MS = 3 * 60 * 60 * 1000;

export type GameSnapshot = {
  players: Player[];
  currentPlayerIndex: number;
  gameLevel: GameLevel;
  gameTheme: GameTheme;
  gameStartTime: number | null;
  isGameActive: boolean;
  gameType: 'truth' | 'dare' | null;
  currentQuestion: Question | null;
  showThemeSelection: boolean;
  seen: string[];
  savedAt: number;
};

export const loadGame = (): GameSnapshot | null => {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) || 'null') as GameSnapshot | null;
    if (!s || Date.now() - s.savedAt > MAX_IDLE_MS) { sessionStorage.removeItem(KEY); return null; }
    return s;
  } catch { return null; }
};

export const saveGame = (s: Omit<GameSnapshot, 'savedAt'>) => {
  try { sessionStorage.setItem(KEY, JSON.stringify({ ...s, savedAt: Date.now() })); } catch { /* ignore */ }
};

export const clearGame = () => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } };
