export type GameLevel = 'Sweet' | 'Sexy' | 'Spicy' | 'Wet & Wild';
export type GameTheme = '🍍' | 'lovers' | 'friends';
export type Gender = 'male' | 'female';
export type Orientation = 'straight' | 'bisexual';

export interface Player {
  name: string;
  gender: Gender;
  orientation: Orientation;
  questionsAnswered: number;
  jokersLeft: number;
  passesLeft: number;
}

export interface Question {
  text: string;
  requiresPartner: boolean;
  type: 'solo' | 'partner';
  timer?: number; // Optional timer for the question
}
