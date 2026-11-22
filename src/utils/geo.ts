import { useEffect, useState } from 'react';

/* Land + regio voor Deals en Agenda.
   1. De speler kan zelf kiezen (onthouden op dit apparaat).
   2. Anders: land automatisch via /api/geo (alleen het land, niets opgeslagen). */

export const COUNTRIES: { code: string; name: string; regions: string[] }[] = [
  { code: 'NL', name: 'Nederland', regions: ['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'Noord-Brabant', 'Noord-Holland', 'Overijssel', 'Utrecht', 'Zeeland', 'Zuid-Holland'] },
  { code: 'BE', name: 'België', regions: ['Antwerpen', 'Brussel', 'Henegouwen', 'Limburg (BE)', 'Luik', 'Luxemburg', 'Namen', 'Oost-Vlaanderen', 'Vlaams-Brabant', 'Waals-Brabant', 'West-Vlaanderen'] },
  { code: 'DE', name: 'Deutschland', regions: [] },
  { code: 'GB', name: 'United Kingdom', regions: [] },
  { code: 'FR', name: 'France', regions: [] },
  { code: 'ES', name: 'España', regions: [] },
];

export type Place = { country: string; region: string };
const KEY = 'lol_place';

export function countryName(code: string) {
  return COUNTRIES.find(c => c.code === code)?.name || code || 'Worldwide';
}

export function usePlace(): [Place, (p: Place) => void] {
  const [place, setPlaceState] = useState<Place>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null') || { country: '', region: '' }; } catch { return { country: '', region: '' }; }
  });

  useEffect(() => {
    if (place.country) return;
    fetch('/api/geo')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d?.country) setPlaceState(p => (p.country ? p : { country: d.country, region: '' })); })
      .catch(() => { /* lokaal of offline: geen land */ });
  }, [place.country]);

  const setPlace = (p: Place) => {
    setPlaceState(p);
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
  };
  return [place, setPlace];
}

/* Een item past bij de plek als het geen land heeft (overal), of hetzelfde land
   en (geen regio of dezelfde regio). */
export function matchesPlace(item: { country?: string | null; region?: string | null }, place: Place) {
  if (!item.country) return true;
  if (!place.country) return true;
  if (item.country !== place.country) return false;
  if (!item.region || !place.region) return true;
  return item.region === place.region;
}
