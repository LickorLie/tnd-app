import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Share2 } from 'lucide-react';
import { GameTheme, Player, Gender, Orientation } from '../types';
import { Btn, Segmented, Sheet, Wordmark } from '../components/ui';

/* ---------- 1. Start: kies een editie ---------- */

const EDITIONS: { id: GameTheme; name: string; emoji: string; sub: string }[] = [
  { id: '🍍', name: 'Spicy', emoji: '🍆', sub: 'For open-minded players' },
  { id: 'lovers', name: 'Lovers', emoji: '👅', sub: 'For couples' },
  { id: 'friends', name: 'Friends', emoji: '🦄', sub: 'For adventurous friends' },
];

export const EditionPicker: React.FC<{ onPick: (t: GameTheme) => void; onShare: () => void }> = ({ onPick, onShare }) => (
  <div className="h-full overflow-y-auto">
    <div className="mx-auto w-full max-w-xl px-5 sm:px-6 pt-4 pb-6 flex flex-col min-h-full">
      <div className="flex justify-between items-center text-muted text-sm">
        <span className="font-semibold">18+</span>
        <Btn variant="ghost" aria-label="Share" onClick={onShare}><Share2 size={20} strokeWidth={1.5} /></Btn>
      </div>
      <div className="mt-[6vh] mb-8">
        <h1 className="font-serif font-semibold text-[56px] sm:text-[72px] leading-[0.92]">
          Lick <i className="text-rouge font-medium">or</i><br />Lie
        </h1>
        <p className="text-muted mt-3 text-[15px]">Truth or dare, for grown-ups.</p>
      </div>
      <div className="space-y-3">
        {EDITIONS.map(e => (
          <button
            key={e.id}
            onClick={() => onPick(e.id)}
            className="w-full text-left bg-paper ring-1 ring-inset ring-sand rounded-card px-5 py-4 active:scale-[0.99] transition"
          >
            <span className="block font-serif text-[26px] font-semibold leading-tight">{e.name} {e.emoji}</span>
            <span className="text-muted text-[15px]">{e.sub}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- 2. Spelers ---------- */

type NewPlayer = { name: string; gender: Gender; orientation: Orientation };

export const PlayerSetup: React.FC<{
  players: Player[];
  onAdd: (p: NewPlayer) => void;
  onUpdate: (i: number, p: NewPlayer) => void;
  onRemove: (i: number) => void;
  onRemoveAll: () => void;
  onBack: () => void;
  onStart: () => void;
}> = ({ players, onAdd, onUpdate, onRemove, onRemoveAll, onBack, onStart }) => {
  const [form, setForm] = useState<NewPlayer>({ name: '', gender: 'female', orientation: 'straight' });
  const [menuFor, setMenuFor] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const duplicate = players.some((p, i) => i !== editing && p.name.toLowerCase() === form.name.trim().toLowerCase());

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const name = form.name.trim();
    if (!name || duplicate) return;
    if (editing !== null) {
      onUpdate(editing, { ...form, name });
      setEditing(null);
    } else {
      onAdd({ ...form, name });
    }
    setForm({ ...form, name: '' });
  };

  return (
    <div className="flex flex-col h-full mx-auto w-full max-w-xl px-5 sm:px-6 pt-2">
      <header className="flex items-center justify-between h-14 shrink-0">
        <Btn variant="ghost" aria-label="Back" onClick={onBack}><ChevronLeft size={24} strokeWidth={1.5} /></Btn>
        <Wordmark className="text-2xl" />
        <span className="w-11" />
      </header>
      <h1 className="font-serif text-[30px] font-medium shrink-0 mb-3">Who's playing? 🤭</h1>

      <form onSubmit={submit} className="shrink-0 space-y-2.5">
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Player name"
          maxLength={20}
          className="w-full h-12 px-3.5 rounded-field bg-paper ring-1 ring-inset ring-sand placeholder:text-muted outline-none focus:ring-ink"
        />
        <div className="flex flex-wrap gap-2">
          <Segmented small value={form.gender} onChange={g => setForm({ ...form, gender: g })} options={[{ value: 'male', label: 'Man' }, { value: 'female', label: 'Woman' }]} />
          <Segmented small value={form.orientation} onChange={o => setForm({ ...form, orientation: o })} options={[{ value: 'straight', label: 'Straight' }, { value: 'bisexual', label: 'Bi' }]} />
        </div>
        <Btn type="submit" full disabled={!form.name.trim() || duplicate}>
          {editing !== null ? 'Save player' : '+ Add player'}
        </Btn>
        {duplicate && form.name.trim() && <p className="text-[13px] text-rouge">This name is already playing.</p>}
      </form>

      {/* Alleen de lijst scrollt */}
      <ul className="flex-1 min-h-0 overflow-y-auto mt-4 border-t border-sand">
        {players.map((p, i) => (
          <li key={p.name} className="flex items-center gap-3 py-3 border-b border-sand">
            <div className="flex-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-[13px] text-muted">{p.gender === 'male' ? 'Man' : 'Woman'} · {p.orientation === 'bisexual' ? 'Bi' : 'Straight'}</div>
            </div>
            <Btn variant="ghost" aria-label={`Options for ${p.name}`} onClick={() => setMenuFor(i)}><MoreHorizontal size={20} strokeWidth={1.5} /></Btn>
          </li>
        ))}
        {players.length === 0 && <li className="py-6 text-muted text-[15px]">Add at least two players to start.</li>}
        {players.length > 1 && (
          <li className="py-3">
            <button onClick={onRemoveAll} className="text-[13px] text-muted underline">Remove all players</button>
          </li>
        )}
      </ul>

      <div className="shrink-0 py-3">
        <Btn variant="primary" full disabled={players.length < 2} onClick={onStart}>
          {players.length < 2 ? `Add ${2 - players.length} more player${players.length === 1 ? '' : 's'}` : 'Start game'}
        </Btn>
      </div>

      <Sheet open={menuFor !== null} onClose={() => setMenuFor(null)} title={menuFor !== null ? players[menuFor]?.name : ''}>
        <div className="flex flex-col gap-2">
          <Btn full onClick={() => { if (menuFor === null) return; const p = players[menuFor]; setForm({ name: p.name, gender: p.gender, orientation: p.orientation }); setEditing(menuFor); setMenuFor(null); }}>Edit</Btn>
          <Btn full onClick={() => { if (menuFor !== null) onRemove(menuFor); setMenuFor(null); }}>Remove</Btn>
        </div>
      </Sheet>
    </div>
  );
};
