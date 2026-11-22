import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Timer, Shield, SkipForward } from 'lucide-react';
import { GameLevel, Player, Question } from '../types';
import { getValidInteractionPartners } from '../utils/interactionRules';
import { Btn, LevelBar, Sheet, Wordmark } from '../components/ui';

interface Props {
  type: 'truth' | 'dare';
  question: Question;
  players: Player[];
  currentPlayerIndex: number;
  level: GameLevel;
  countdown: number;
  timerStarted: boolean;
  onStartTimer: () => void;
  onNext: () => void;
  onJoker: () => void;
  onPass: () => void;
  onStop: () => void;
}

const GameScreen: React.FC<Props> = ({
  type, question, players, currentPlayerIndex, level, countdown, timerStarted,
  onStartTimer, onNext, onJoker, onPass, onStop,
}) => {
  const current = players[currentPlayerIndex];
  const [sheet, setSheet] = useState<null | 'players' | 'stop' | 'joker' | 'pass'>(null);

  // Eén partner per kaart kiezen (verandert niet bij elke render)
  const partner = useMemo(() => {
    if (!question.requiresPartner) return null;
    const valid = getValidInteractionPartners(current, players, question.forPartner);
    return valid.length ? valid[Math.floor(Math.random() * valid.length)] : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, currentPlayerIndex]);

  const parts = useMemo(() => {
    const name = partner ? partner.name : 'a player of your choice';
    return question.text.split(/\[partner\]/i).flatMap((t, i, arr) =>
      i < arr.length - 1 ? [t, { name }] : [t]
    );
  }, [question, partner]);

  const total = question.timer || 30;
  const isDare = type === 'dare';
  // timer 1 in de database betekent: geen timer
  const hasTimer = isDare && total > 1;
  const longText = question.text.length > 140;

  return (
    <div className="flex flex-col h-full px-4 sm:px-6 pt-2 pb-safe mx-auto w-full max-w-2xl">
      {/* Kopregel */}
      <header className="flex items-center justify-between h-14 shrink-0">
        <Btn variant="ghost" aria-label="Stop game" onClick={() => setSheet('stop')}><X size={22} strokeWidth={1.5} /></Btn>
        <Wordmark className="text-2xl" />
        <Btn variant="ghost" aria-label="Players" onClick={() => setSheet('players')}><Users size={22} strokeWidth={1.5} /></Btn>
      </header>
      <LevelBar level={level} className="shrink-0 mb-3" />

      {/* Spelkaart: vult de beschikbare ruimte */}
      <AnimatePresence mode="wait">
        <motion.article
          key={question.text + currentPlayerIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="relative flex-1 min-h-0 bg-paper rounded-card shadow-card p-6 sm:p-10 flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between">
            {isDare ? (
              <span className="font-serif text-[40px] leading-none text-rouge">Dare 😈</span>
            ) : (
              <span className="font-serif text-[34px] leading-none px-4 py-1 rounded-full bg-blush">Truth 🤭</span>
            )}
            {hasTimer && timerStarted && (
              <span className="font-serif text-[34px] leading-none tabular-nums text-rouge">{Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}</span>
            )}
          </div>
          <p className={`font-serif font-medium my-auto py-4 overflow-y-auto ${longText ? 'text-[21px] sm:text-[26px]' : 'text-[24px] sm:text-[32px]'} leading-snug`}>
            {parts.map((p, i) => (typeof p === 'string' ? <span key={i}>{p}</span> : <span key={i} className="text-rouge">{p.name}</span>))}
          </p>
          {hasTimer && !timerStarted && (
            <button onClick={onStartTimer} className="self-start flex items-center gap-2 h-11 px-4 rounded-full bg-blush font-semibold text-[15px]">
              <Timer size={18} strokeWidth={1.5} /> Start {Math.floor(total / 60)}:{String(total % 60).padStart(2, '0')} timer
            </button>
          )}
          {hasTimer && timerStarted && (
            <div className="absolute left-0 bottom-0 h-[3px] bg-rouge transition-all duration-1000 ease-linear" style={{ width: `${(countdown / total) * 100}%` }} />
          )}
        </motion.article>
      </AnimatePresence>

      {/* Beurt + acties */}
      <p className="shrink-0 text-[13px] font-semibold tracking-[0.08em] uppercase text-muted mt-3 mb-2">
        {current.name}, your turn 🫣
      </p>
      <div className="shrink-0 flex gap-2 pb-2">
        <Btn className="flex-1" disabled={current.passesLeft === 0} onClick={() => setSheet('pass')}>
          <SkipForward size={18} strokeWidth={1.5} /> Pass <span className="text-muted font-medium">{current.passesLeft}</span>
        </Btn>
        <Btn className="flex-1" disabled={current.jokersLeft === 0} onClick={() => setSheet('joker')}>
          <Shield size={18} strokeWidth={1.5} /> Joker <span className="text-muted font-medium">{current.jokersLeft}</span>
        </Btn>
        <Btn variant="primary" className="flex-[1.4]" onClick={onNext}>
          {hasTimer && timerStarted ? 'Done ✓' : 'Next ›'}
        </Btn>
      </div>

      {/* Panelen */}
      <Sheet open={sheet === 'players'} onClose={() => setSheet(null)} title="Players">
        <ul className="divide-y divide-sand">
          {players.map((p, i) => (
            <li key={p.name} className="flex items-center gap-3 py-3">
              <span className={`w-2 h-2 rounded-full ${i === currentPlayerIndex ? 'bg-rouge' : 'bg-transparent'}`} />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-[13px] text-muted">{p.gender === 'male' ? 'Man' : 'Woman'} · {p.orientation === 'bisexual' ? 'Bi' : 'Straight'}</div>
              </div>
              <span className="text-[13px] text-muted">Pass {p.passesLeft} · Joker {p.jokersLeft}</span>
            </li>
          ))}
        </ul>
        <Btn full className="mt-4" onClick={() => setSheet(null)}>Close</Btn>
      </Sheet>

      <Sheet open={sheet === 'stop'} onClose={() => setSheet(null)} title="Stop game?">
        <p className="text-muted mb-4">The game ends and the levels start over. Your players stay saved.</p>
        <div className="flex gap-2">
          <Btn className="flex-1" onClick={() => setSheet(null)}>Keep playing</Btn>
          <Btn variant="primary" className="flex-1" onClick={() => { setSheet(null); onStop(); }}>Stop</Btn>
        </div>
      </Sheet>

      <Sheet open={sheet === 'pass'} onClose={() => setSheet(null)} title="Pass?">
        <p className="text-muted mb-4">No is a full answer. The group may think of a small, sweet alternative for you 😏</p>
        <div className="flex gap-2">
          <Btn className="flex-1" onClick={() => setSheet(null)}>Cancel</Btn>
          <Btn variant="primary" className="flex-1" onClick={() => { setSheet(null); onPass(); }}>Use pass</Btn>
        </div>
      </Sheet>

      <Sheet open={sheet === 'joker'} onClose={() => setSheet(null)} title="Use your joker?">
        <p className="text-muted mb-4">Skip this card, no questions asked. You only have one.</p>
        <div className="flex gap-2">
          <Btn className="flex-1" onClick={() => setSheet(null)}>Cancel</Btn>
          <Btn variant="primary" className="flex-1" onClick={() => { setSheet(null); onJoker(); }}>Use joker</Btn>
        </div>
      </Sheet>
    </div>
  );
};

export default GameScreen;
