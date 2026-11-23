import React, { useState } from 'react';
import { MapPin, LocateFixed } from 'lucide-react';
import { CITIES, COUNTRIES, Place, countryName } from '../utils/geo';
import { Btn, Sheet } from './ui';

/* 📍 Leiden · 50 km   of   📍 NL · Noord-Holland — tik om te kiezen.
   Met een plaats: alles binnen de straal, gesorteerd op afstand.
   Zonder plaats: land/regio, gegroepeerd per regio. */
const RADII = [25, 50, 100, 0];

const PlaceChip: React.FC<{ place: Place; onChange: (p: Place) => void }> = ({ place, onChange }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Place>(place);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState('');
  const regions = COUNTRIES.find(c => c.code === draft.country)?.regions || [];
  const cities = CITIES.filter(c => !draft.country || c.country === draft.country);

  const label = place.lat != null
    ? `${place.city || 'Near me'} · ${place.radius ? `${place.radius} km` : 'all'}`
    : `${place.country || 'All'}${place.region ? ` · ${place.region}` : ''}`;

  const useMyLocation = () => {
    setLocError('');
    if (!navigator.geolocation) { setLocError('Location is not available on this device.'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocating(false);
        // Afgerond op ~1 km: genoeg voor afstand, niet exact
        const lat = Math.round(pos.coords.latitude * 100) / 100, lng = Math.round(pos.coords.longitude * 100) / 100;
        setDraft(d => ({ ...d, city: 'Near me', lat, lng, radius: d.radius ?? 50 }));
      },
      () => { setLocating(false); setLocError("Couldn't get your location. Pick a town instead."); },
      { maximumAge: 600000, timeout: 10000 }
    );
  };

  const pickCity = (name: string) => {
    const c = CITIES.find(x => x.name === name);
    if (!c) { setDraft(d => ({ country: d.country, region: d.region })); return; }
    setDraft(d => ({ country: c.country, region: c.region, city: c.name, lat: c.lat, lng: c.lng, radius: d.radius ?? 50 }));
  };

  return (
    <>
      <button onClick={() => { setDraft(place); setLocError(''); setOpen(true); }}
        className="shrink-0 flex items-center gap-1 text-[13px] font-semibold px-3 py-1.5 rounded-full bg-paper ring-1 ring-inset ring-sand mt-2">
        <MapPin size={14} strokeWidth={1.5} />{label}
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Where are you? 📍">
        <p className="text-muted text-[15px] mb-3">We use this only to show what's near you. It stays on this device.</p>

        <button onClick={useMyLocation} disabled={locating}
          className="w-full h-12 mb-3 rounded-btn ring-1 ring-inset ring-sand flex items-center justify-center gap-2 font-semibold">
          <LocateFixed size={18} strokeWidth={1.5} />{locating ? 'Finding you…' : draft.city === 'Near me' ? 'Using your location ✓' : 'Use my location'}
        </button>
        {locError && <p className="text-[13px] text-rouge mb-3">{locError}</p>}

        <label className="block text-[13px] font-semibold mb-1">Or pick a town</label>
        <select value={draft.city && draft.city !== 'Near me' ? draft.city : ''} onChange={e => pickCity(e.target.value)}
          className="w-full h-12 px-3 rounded-field bg-paper ring-1 ring-inset ring-sand mb-3">
          <option value="">No town (show by region)</option>
          {COUNTRIES.filter(c => cities.some(x => x.country === c.code)).map(c => (
            <optgroup key={c.code} label={c.name}>
              {cities.filter(x => x.country === c.code).map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
            </optgroup>
          ))}
        </select>

        {draft.lat != null ? (
          <>
            <label className="block text-[13px] font-semibold mb-1">Distance</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {RADII.map(r => (
                <button key={r} onClick={() => setDraft(d => ({ ...d, radius: r }))}
                  className={`h-11 rounded-btn text-[14px] font-semibold ring-1 ring-inset ${ (draft.radius ?? 50) === r ? 'bg-ink text-cream ring-ink' : 'ring-sand'}`}>
                  {r ? `${r} km` : 'All'}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
        <Btn variant="primary" full onClick={() => { onChange(draft); setOpen(false); }}>Save</Btn>
      </Sheet>
    </>
  );
};
export default PlaceChip;
