import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { COUNTRIES, Place, countryName } from '../utils/geo';
import { Btn, Sheet } from './ui';

/* 📍 NL · Noord-Holland — tik om land/regio te kiezen */
const PlaceChip: React.FC<{ place: Place; onChange: (p: Place) => void }> = ({ place, onChange }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Place>(place);
  const regions = COUNTRIES.find(c => c.code === draft.country)?.regions || [];
  return (
    <>
      <button onClick={() => { setDraft(place); setOpen(true); }}
        className="shrink-0 flex items-center gap-1 text-[13px] font-semibold px-3 py-1.5 rounded-full bg-paper ring-1 ring-inset ring-sand mt-2">
        <MapPin size={14} strokeWidth={1.5} />{place.country || 'All'}{place.region ? ` · ${place.region}` : ''}
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Your region 📍">
        <p className="text-muted text-[15px] mb-3">We use this only to show events and deals near you. It stays on this device.</p>
        <label className="block text-[13px] font-semibold mb-1">Country</label>
        <select value={draft.country} onChange={e => setDraft({ country: e.target.value, region: '' })}
          className="w-full h-12 px-3 rounded-field bg-paper ring-1 ring-inset ring-sand mb-3">
          <option value="">All countries</option>
          {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          {draft.country && !COUNTRIES.some(c => c.code === draft.country) && <option value={draft.country}>{countryName(draft.country)}</option>}
        </select>
        {regions.length > 0 && (
          <>
            <label className="block text-[13px] font-semibold mb-1">Region</label>
            <select value={draft.region} onChange={e => setDraft({ ...draft, region: e.target.value })}
              className="w-full h-12 px-3 rounded-field bg-paper ring-1 ring-inset ring-sand mb-3">
              <option value="">Whole country</option>
              {regions.map(r => <option key={r}>{r}</option>)}
            </select>
          </>
        )}
        <Btn variant="primary" full onClick={() => { onChange(draft); setOpen(false); }}>Save</Btn>
      </Sheet>
    </>
  );
};
export default PlaceChip;
