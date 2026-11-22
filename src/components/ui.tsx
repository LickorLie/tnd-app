import React from 'react';
import { GameLevel } from '../types';

/* Gedeelde bouwstenen volgens het LickOrLie-brandbook */

type BtnVariant = 'primary' | 'secondary' | 'ghost';

export const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; full?: boolean }> = ({
  variant = 'secondary',
  full,
  className = '',
  children,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-btn font-semibold text-base whitespace-nowrap transition active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100';
  const variants: Record<BtnVariant, string> = {
    primary: 'h-[52px] px-5 bg-rouge text-rouge-ink',
    secondary: 'h-[52px] px-4 bg-paper text-ink ring-1 ring-inset ring-sand',
    ghost: 'h-11 w-11 text-ink',
  };
  return (
    <button className={`${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export const Wordmark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`font-serif font-semibold tracking-[0.01em] ${className}`}>
    Lick <i className="text-rouge font-medium">or</i> Lie
  </span>
);

export const Pill: React.FC<{ children: React.ReactNode; tone?: 'blush' | 'sand' | 'ink'; className?: string }> = ({
  children,
  tone = 'blush',
  className = '',
}) => {
  const tones = { blush: 'bg-blush text-ink', sand: 'bg-sand text-ink', ink: 'bg-ink text-cream' };
  return <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${tones[tone]} ${className}`}>{children}</span>;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  small,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  small?: boolean;
}) {
  return (
    <div className="inline-flex rounded-btn overflow-hidden ring-1 ring-inset ring-sand bg-paper">
      {options.map(o => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`${small ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-[15px]'} font-medium ${
            o.value === value ? 'bg-ink text-cream' : 'text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export const LEVELS: GameLevel[] = ['Sweet', 'Sexy', 'Spicy', 'Wet & Wild'];
export const LEVEL_EMOJI: Record<GameLevel, string> = { Sweet: '🍒', Sexy: '🍑', Spicy: '🥵', 'Wet & Wild': '💦' };
const LEVEL_BG = ['bg-lvl-1', 'bg-lvl-2', 'bg-lvl-3', 'bg-lvl-4'];

export const LevelBar: React.FC<{ level: GameLevel; className?: string }> = ({ level, className = '' }) => {
  const idx = LEVELS.indexOf(level);
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-1 w-24">
        {LEVELS.map((_, i) => (
          <span key={i} className={`flex-1 h-1 rounded-full ${i <= idx ? LEVEL_BG[i] : 'bg-sand'}`} />
        ))}
      </div>
      <span className="text-[13px] font-semibold">
        {level} {LEVEL_EMOJI[level]}
      </span>
    </div>
  );
};

/* Paneel dat van onderen inschuift (in plaats van pop-ups midden in beeld) */
export const Sheet: React.FC<{ open: boolean; onClose: () => void; title?: string; children: React.ReactNode }> = ({
  open,
  onClose,
  title,
  children,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-cream rounded-t-card sm:rounded-card p-5 pb-safe max-h-[85dvh] overflow-y-auto">
        {title && <h2 className="font-serif text-2xl font-semibold mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export const ScreenTitle: React.FC<{ children: React.ReactNode; sub?: React.ReactNode }> = ({ children, sub }) => (
  <div className="mb-4">
    <h1 className="font-serif text-[32px] leading-tight font-medium">{children}</h1>
    {sub && <p className="text-muted text-[15px] mt-1">{sub}</p>}
  </div>
);
