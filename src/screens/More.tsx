import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Mail, BookOpen, ShieldCheck, Lock } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { track } from '../utils/analytics';
import { Btn, ScreenTitle, Segmented } from '../components/ui';

type Page = 'menu' | 'contact' | 'rules' | 'adults' | 'privacy';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', type: 'idea' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const field = 'w-full h-12 px-3.5 rounded-field bg-paper ring-1 ring-inset ring-sand outline-none focus:ring-ink';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    const { error } = await supabase.from('contact').insert([form]);
    if (error) { setState('error'); return; }
    track('contact_submit', { type: form.type });
    setState('done');
    setForm({ name: '', email: '', message: '', type: 'idea' });
  };

  if (state === 'done') return <p className="py-8 text-center font-serif text-[24px]">Thank you! We'll get back to you soon 💌</p>;
  return (
    <form onSubmit={submit} className="space-y-3">
      <Segmented value={form.type} onChange={v => setForm({ ...form, type: v })}
        options={[{ value: 'idea', label: 'Idea' }, { value: 'feedback', label: 'Feedback' }, { value: 'partner', label: 'Partner' }]} />
      <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={field} />
      <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={field} />
      <textarea required rows={5} placeholder="Your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={`${field} h-auto py-3`} />
      {state === 'error' && <p className="text-[13px] text-rouge">Something went wrong. Please try again later.</p>}
      <Btn variant="primary" full type="submit" disabled={state === 'sending'}>Send</Btn>
    </form>
  );
};

const Rules: React.FC = () => (
  <div className="space-y-4 text-[16px] leading-relaxed">
    {[
      ['Truth 🤭', 'Answer honestly. The whole truth, nothing but the truth.'],
      ['Dare 😈', 'Do it with full commitment, or use a pass or joker.'],
      ['Pass', 'You have two. No is a full answer; the group may think of a sweet alternative.'],
      ['Joker', 'One per game. Skip any card, no questions asked.'],
      ['Timer', 'Some dares have a timer. Start it when you are ready.'],
      ['Levels', 'Sweet 🍒 → Sexy 🍑 → Spicy 🥵 → Wet & Wild 💦. The game gets bolder as you play.'],
      ['Consent', 'Only if you both want to. Anyone can stop at any time. Agree on a safeword before you start.'],
    ].map(([t, d]) => (
      <div key={t} className="border-b border-sand pb-3"><h3 className="font-serif text-[22px] font-semibold">{t}</h3><p className="text-muted">{d}</p></div>
    ))}
  </div>
);

const Adults: React.FC = () => (
  <div className="space-y-3 text-[16px] leading-relaxed">
    <p>Lick or Lie is made for adults only. Every player must be 18 or older.</p>
    <p className="text-muted">The cards contain sexual content. Play with people you trust, respect every boundary, and stop whenever someone wants to.</p>
  </div>
);

const Privacy: React.FC = () => (
  <div className="space-y-3 text-[16px] leading-relaxed">
    <p>Player names, genders and orientations stay on your device. We never store them.</p>
    <p><button onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} className="underline underline-offset-4 font-medium">Cookie settings 🍪</button></p>
    <p className="text-muted">With your permission we use Google Analytics cookies to count anonymous game events (for example: a game started, a level was reached). To show deals and events near you, we read only your country from your connection; your chosen region stays on your device. Messages you send through the contact form are only used to reply to you.</p>
  </div>
);

const More: React.FC = () => {
  const [page, setPage] = useState<Page>('menu');
  const items: { id: Page; label: string; Icon: React.FC<{ size?: number; strokeWidth?: number }> }[] = [
    { id: 'contact', label: 'Contact', Icon: Mail },
    { id: 'rules', label: 'Game rules', Icon: BookOpen },
    { id: 'adults', label: '18+ only', Icon: ShieldCheck },
    { id: 'privacy', label: 'Privacy', Icon: Lock },
  ];
  const title = items.find(i => i.id === page)?.label;
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-xl px-5 sm:px-6 pt-4 pb-8">
        {page === 'menu' ? (
          <>
            <ScreenTitle>More</ScreenTitle>
            <ul className="bg-paper ring-1 ring-inset ring-sand rounded-card divide-y divide-sand overflow-hidden">
              {items.map(({ id, label, Icon }) => (
                <li key={id}>
                  <button onClick={() => setPage(id)} className="w-full flex items-center gap-3 px-4 h-14 text-left">
                    <Icon size={20} strokeWidth={1.5} /><span className="flex-1 font-medium">{label}</span><ChevronRight size={18} strokeWidth={1.5} className="text-muted" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-muted mt-6">Lick or Lie · lickorlie.com</p>
          </>
        ) : (
          <>
            <button onClick={() => setPage('menu')} className="flex items-center gap-1 text-muted text-[15px] mb-2"><ChevronLeft size={18} strokeWidth={1.5} />More</button>
            <ScreenTitle>{title}</ScreenTitle>
            {page === 'contact' && <Contact />}
            {page === 'rules' && <Rules />}
            {page === 'adults' && <Adults />}
            {page === 'privacy' && <Privacy />}
          </>
        )}
      </div>
    </div>
  );
};

export default More;
