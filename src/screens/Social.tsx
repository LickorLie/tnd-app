import React, { useEffect, useState } from 'react';
import { ChevronLeft, ExternalLink, MapPin } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { track } from '../utils/analytics';
import { Place, matchesPlace } from '../utils/geo';
import { Btn, Pill, Segmented, ScreenTitle } from '../components/ui';
import PlaceChip from '../components/PlaceChip';

type Section = 'agenda' | 'poll' | 'clubs' | 'blog' | 'partners' | 'submit';
const SECTIONS: { id: Section; label: string }[] = [
  { id: 'agenda', label: 'Agenda' },
  { id: 'poll', label: 'Poll' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'blog', label: 'Blog' },
  { id: 'partners', label: 'Partners' },
  { id: 'submit', label: 'Your card' },
];

/* Kleine helper: rijen ophalen uit een tabel; leeg als de tabel (nog) niet bestaat */
function useRows<T>(table: string, query: (q: any) => any): T[] | null {
  const [rows, setRows] = useState<T[] | null>(null);
  useEffect(() => {
    let alive = true;
    query(supabase.from(table).select('*')).then(({ data, error }: { data: T[] | null; error: unknown }) => {
      if (!alive) return;
      if (error) console.warn(table, error);
      setRows(data || []);
    });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);
  return rows;
}

const Empty: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-muted text-[15px] py-8 text-center">{children}</p>
);

/* ---------- Agenda ---------- */
type EventRow = { id: string; title: string; starts_at: string; city: string | null; country: string | null; region: string | null; venue: string | null; category: string | null; url: string | null; featured: boolean };

const Agenda: React.FC<{ place: Place }> = ({ place }) => {
  const rows = useRows<EventRow>('events', q => q.eq('active', true).gte('starts_at', new Date(Date.now() - 864e5).toISOString()).order('starts_at'));
  if (!rows) return <Empty>Loading…</Empty>;
  const list = rows.filter(r => matchesPlace(r, place));
  if (!list.length) return <Empty>No events in your region yet. Check back soon 📅</Empty>;
  return (
    <ul className="divide-y divide-sand">
      {list.map(e => {
        const d = new Date(e.starts_at);
        return (
          <li key={e.id}>
            <a
              href={e.url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('event_click', { event: e.title })}
              className="flex gap-4 py-3.5"
            >
              <div className="w-12 text-center font-serif leading-none shrink-0">
                <b className="block text-[28px] text-rouge font-semibold">{d.getDate()}</b>
                <small className="text-[11px] uppercase text-muted font-sans">{d.toLocaleDateString('en', { month: 'short' })}</small>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{e.title} {e.featured && <Pill className="ml-1">Featured</Pill>}</div>
                <div className="text-[13px] text-muted">{[e.venue, e.city, e.category].filter(Boolean).join(' · ')}</div>
              </div>
              {e.url && <ExternalLink size={16} strokeWidth={1.5} className="text-muted mt-1" />}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

/* ---------- Vraag van de week ---------- */
type PollRow = { id: string; question: string; options: string[] };

const Poll: React.FC = () => {
  const rows = useRows<PollRow>('polls', q => q.eq('active', true).order('starts_at', { ascending: false }).limit(1));
  const poll = rows?.[0];
  const key = poll ? `poll_${poll.id}` : '';
  const [voted, setVoted] = useState<number | null>(null);
  const [results, setResults] = useState<number[] | null>(null);

  useEffect(() => {
    if (!poll) return;
    try { const v = localStorage.getItem(key); if (v !== null) setVoted(Number(v)); } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll?.id]);

  const loadResults = async (p: PollRow) => {
    const { data } = await supabase.rpc('poll_results', { p_poll: p.id });
    setResults(p.options.map((_, i) => Number((data || []).find((r: { option_index: number; votes: number }) => r.option_index === i)?.votes || 0)));
  };

  // Uitslag laden als je al eerder had gestemd
  useEffect(() => {
    if (poll && voted !== null && results === null) loadResults(poll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll?.id, voted]);

  if (!rows) return <Empty>Loading…</Empty>;
  if (!poll) return <Empty>A new question of the week is coming soon 🤭</Empty>;

  const vote = async (i: number) => {
    setVoted(i);
    try { localStorage.setItem(key, String(i)); } catch { /* ignore */ }
    track('poll_vote', { poll: poll.question });
    // Eerst de stem opslaan, dan pas de uitslag ophalen (anders telt je eigen stem niet mee)
    await supabase.from('poll_votes').insert({ poll_id: poll.id, option_index: i });
    await loadResults(poll);
  };
  const total = results?.reduce((a, b) => a + b, 0) || 0;

  return (
    <div>
      <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-rouge mb-2">Question of the week</p>
      <h2 className="font-serif text-[28px] leading-tight font-medium mb-5">{poll.question}</h2>
      <div className="space-y-2.5">
        {poll.options.map((o, i) => {
          const pct = total ? Math.round(((results?.[i] || 0) / total) * 100) : 0;
          return voted === null ? (
            <Btn key={i} full onClick={() => vote(i)} className="justify-start">{o}</Btn>
          ) : (
            <div key={i} className="relative h-[52px] rounded-btn bg-paper ring-1 ring-inset ring-sand overflow-hidden flex items-center px-4">
              <div className="absolute inset-y-0 left-0 bg-blush transition-all duration-700" style={{ width: `${pct}%` }} />
              <span className="relative flex-1 font-medium">{o} {voted === i && '✓'}</span>
              <span className="relative text-[13px] font-semibold">{results ? `${pct}%` : ''}</span>
            </div>
          );
        })}
      </div>
      {voted !== null && <p className="text-[13px] text-muted mt-3">{total} votes · anonymous</p>}
    </div>
  );
};

/* ---------- Clubs & plekken ---------- */
type PlaceRow = { id: string; name: string; city: string | null; country: string | null; region: string | null; category: string | null; url: string | null; description: string | null; featured: boolean };

const Clubs: React.FC<{ place: Place }> = ({ place }) => {
  const rows = useRows<PlaceRow>('places', q => q.eq('active', true).order('featured', { ascending: false }).order('name'));
  if (!rows) return <Empty>Loading…</Empty>;
  const list = rows.filter(r => matchesPlace(r, place));
  if (!list.length) return <Empty>Clubs and places in your region are coming soon 📍</Empty>;
  return (
    <ul className="space-y-3">
      {list.map(p => (
        <li key={p.id}>
          <a href={p.url || undefined} target="_blank" rel="noopener noreferrer" onClick={() => track('place_click', { place: p.name })}
            className="block bg-paper ring-1 ring-inset ring-sand rounded-card p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-serif text-[22px] font-semibold leading-tight">{p.name}</span>
              {p.featured && <Pill tone="sand">Partner</Pill>}
            </div>
            <div className="text-[13px] text-muted flex items-center gap-1 mt-0.5"><MapPin size={13} strokeWidth={1.5} />{[p.city, p.category].filter(Boolean).join(' · ')}</div>
            {p.description && <p className="text-[15px] mt-2">{p.description}</p>}
          </a>
        </li>
      ))}
    </ul>
  );
};

/* ---------- Blog ---------- */
type PostRow = { id: string; title: string; excerpt: string | null; body: string; image_url: string | null; published_at: string; country: string | null };

const Blog: React.FC<{ place: Place }> = ({ place }) => {
  const rows = useRows<PostRow>('posts', q => q.eq('status', 'published').order('published_at', { ascending: false }));
  const [open, setOpen] = useState<PostRow | null>(null);
  if (!rows) return <Empty>Loading…</Empty>;
  if (open) {
    return (
      <article>
        <button onClick={() => setOpen(null)} className="flex items-center gap-1 text-muted text-[15px] mb-3"><ChevronLeft size={18} strokeWidth={1.5} />Blog</button>
        {open.image_url && <img src={open.image_url} alt="" className="w-full rounded-card mb-4 aspect-[16/9] object-cover" />}
        <h2 className="font-serif text-[32px] leading-tight font-medium mb-2">{open.title}</h2>
        <p className="text-[13px] text-muted mb-5">{new Date(open.published_at).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div className="text-[17px] leading-relaxed whitespace-pre-line">{open.body}</div>
      </article>
    );
  }
  const list = rows.filter(r => matchesPlace(r, place));
  if (!list.length) return <Empty>Stories and tips are coming soon 🧠</Empty>;
  return (
    <ul className="space-y-3">
      {list.map(p => (
        <li key={p.id}>
          <button onClick={() => { setOpen(p); track('post_open', { post: p.title }); }} className="w-full text-left bg-paper ring-1 ring-inset ring-sand rounded-card overflow-hidden">
            {p.image_url && <img src={p.image_url} alt="" className="w-full aspect-[16/9] object-cover" />}
            <div className="p-4">
              <span className="font-serif text-[22px] font-semibold leading-tight block">{p.title}</span>
              {p.excerpt && <span className="text-[15px] text-muted block mt-1">{p.excerpt}</span>}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

/* ---------- Partners (affiliate) ---------- */
type PartnerRow = { id: string; name: string; description: string | null; url: string; category: string | null; country: string | null; region: string | null; label: string | null; image_url: string | null };

const Partners: React.FC<{ place: Place }> = ({ place }) => {
  const rows = useRows<PartnerRow>('partners', q => q.eq('active', true).order('sort'));
  if (!rows) return <Empty>Loading…</Empty>;
  const list = rows.filter(r => matchesPlace(r, place));
  if (!list.length) return <Empty>Partner apps and communities are coming soon 🦄</Empty>;
  return (
    <ul className="space-y-3">
      {list.map(p => (
        <li key={p.id}>
          <a href={p.url} target="_blank" rel="noopener noreferrer sponsored" onClick={() => track('partner_click', { partner: p.name })}
            className="flex gap-4 items-center bg-paper ring-1 ring-inset ring-sand rounded-card p-4">
            {p.image_url ? <img src={p.image_url} alt="" className="w-14 h-14 rounded-btn object-cover shrink-0" /> : <span className="w-14 h-14 rounded-btn bg-blush shrink-0" />}
            <div className="flex-1 min-w-0">
              <Pill className="mb-1">{p.label === 'partner' ? 'Partner' : 'Affiliate'}</Pill>
              <div className="font-semibold">{p.name}</div>
              {p.description && <div className="text-[13px] text-muted">{p.description}</div>}
            </div>
            <ExternalLink size={16} strokeWidth={1.5} className="text-muted shrink-0" />
          </a>
        </li>
      ))}
    </ul>
  );
};

/* ---------- Kaart insturen ---------- */
const SubmitCard: React.FC = () => {
  const [type, setType] = useState<'truth' | 'dare'>('dare');
  const [level, setLevel] = useState<'Sweet' | 'Sexy' | 'Spicy' | 'WetnWild'>('Sexy');
  const [text, setText] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 10) return;
    setState('sending');
    const { error } = await supabase.from('card_submissions').insert({ theme: '🍍', type, level, question: text.trim() });
    if (error) { setState('error'); return; }
    track('card_submitted', { type, level });
    setState('done');
    setText('');
  };

  if (state === 'done') {
    return (
      <div className="text-center py-8">
        <p className="font-serif text-[28px] mb-2">Thank you 😈</p>
        <p className="text-muted mb-5">We check every card before it goes into the game.</p>
        <Btn onClick={() => setState('idle')}>Send another one</Btn>
      </div>
    );
  }
  return (
    <form onSubmit={send} className="space-y-3">
      <h2 className="font-serif text-[28px] leading-tight font-medium">Send in your own card ✍️</h2>
      <Segmented value={type} onChange={setType} options={[{ value: 'truth', label: 'Truth' }, { value: 'dare', label: 'Dare' }]} />
      <div className="flex flex-wrap gap-2">
        {(['Sweet', 'Sexy', 'Spicy', 'WetnWild'] as const).map(l => (
          <button type="button" key={l} onClick={() => setLevel(l)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${level === l ? 'bg-ink text-cream ring-ink' : 'bg-paper ring-sand'}`}>
            {l === 'WetnWild' ? 'Wet & Wild' : l}
          </button>
        ))}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} maxLength={300} rows={4} placeholder="Your question or dare… use [partner] for another player"
        className="w-full p-3.5 rounded-field bg-paper ring-1 ring-inset ring-sand placeholder:text-muted outline-none focus:ring-ink" />
      <p className="text-[13px] text-muted">We check every card before it goes into the game 🫣 Don't include names or personal details.</p>
      {state === 'error' && <p className="text-[13px] text-rouge">Something went wrong. Please try again later.</p>}
      <Btn variant="primary" full type="submit" disabled={text.trim().length < 10 || state === 'sending'}>Send in</Btn>
    </form>
  );
};

/* ---------- Social-pagina ---------- */
const Social: React.FC<{ place: Place; onPlace: (p: Place) => void }> = ({ place, onPlace }) => {
  const [section, setSection] = useState<Section>('agenda');
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 pt-4 pb-8">
        <div className="flex items-start justify-between">
          <ScreenTitle sub="Events, stories and more from the spicy world">Social 🦄</ScreenTitle>
          <PlaceChip place={place} onChange={onPlace} />
        </div>
        <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 mb-4 [scrollbar-width:none]">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium ring-1 ring-inset ${section === s.id ? 'bg-ink text-cream ring-ink' : 'bg-paper ring-sand'}`}>
              {s.label}
            </button>
          ))}
        </div>
        {section === 'agenda' && <Agenda place={place} />}
        {section === 'poll' && <Poll />}
        {section === 'clubs' && <Clubs place={place} />}
        {section === 'blog' && <Blog place={place} />}
        {section === 'partners' && <Partners place={place} />}
        {section === 'submit' && <SubmitCard />}
      </div>
    </div>
  );
};

export default Social;
