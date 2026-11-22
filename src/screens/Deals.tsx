import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { track } from '../utils/analytics';
import { Place, matchesPlace, countryName } from '../utils/geo';
import { Pill, ScreenTitle } from '../components/ui';
import PlaceChip from '../components/PlaceChip';

type Deal = { id: number | string; title: string; description: string | null; image: string | null; link: string; discount: string | null; country: string | null; region: string | null; label: string | null };

const Deals: React.FC<{ place: Place; onPlace: (p: Place) => void }> = ({ place, onPlace }) => {
  const [deals, setDeals] = useState<Deal[] | null>(null);
  useEffect(() => {
    supabase.from('sponsors').select('*').eq('is_fullscreen', false).then(({ data, error }) => {
      if (error) console.warn('sponsors', error);
      setDeals((data as Deal[]) || []);
    });
  }, []);
  const list = (deals || []).filter(d => matchesPlace(d, place));

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 pt-4 pb-8">
        <div className="flex items-start justify-between">
          <ScreenTitle sub={`Offers for ${place.region || countryName(place.country)}`}>Deals 🎁</ScreenTitle>
          <PlaceChip place={place} onChange={onPlace} />
        </div>
        {!deals && <p className="text-muted py-8 text-center">Loading…</p>}
        {deals && !list.length && <p className="text-muted py-8 text-center">No deals for your region right now. Try “All countries” 📍</p>}
        <ul className="grid gap-4 sm:grid-cols-2">
          {list.map(d => (
            <li key={d.id}>
              <a href={d.link} target="_blank" rel="noopener noreferrer sponsored"
                onClick={() => track('sponsor_click', { placement: 'deals_tab', sponsor: String(d.title ?? '') })}
                className="block bg-paper ring-1 ring-inset ring-sand rounded-card overflow-hidden h-full">
                <div className="relative aspect-[16/9] bg-blush">
                  {d.image && <img src={d.image} alt="" className="w-full h-full object-cover" />}
                  {d.discount && <span className="absolute top-3 right-3 bg-rouge text-rouge-ink text-[13px] font-semibold px-2.5 py-1 rounded-full">{d.discount}</span>}
                </div>
                <div className="p-4">
                  <Pill tone={d.label === 'partner' ? 'sand' : 'blush'} className="mb-1.5">{d.label === 'partner' ? 'Partner' : 'Affiliate'}</Pill>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-serif text-[22px] font-semibold leading-tight">{d.title}</span>
                    <ExternalLink size={16} strokeWidth={1.5} className="text-muted mt-1 shrink-0" />
                  </div>
                  {d.description && <p className="text-[15px] text-muted mt-1">{d.description}</p>}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Deals;
